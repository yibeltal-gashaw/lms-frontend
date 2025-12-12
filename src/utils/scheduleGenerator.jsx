const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const DAYS_FULL = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
// Time slots matching sample schedule pattern (afternoon/evening times)
const TIME_SLOTS = [
  "14:30",  // 2:30 PM
  "16:30",  // 4:30 PM
  "17:30",  // 5:30 PM
  "19:30",  // 7:30 PM
  "21:30",  // 9:30 PM
  "22:30",  // 10:30 PM
];

function addHours(time, hours) {
  const [h, m] = time.split(":").map(Number);
  const totalMinutes = h * 60 + m + hours * 60;
  const newHour = Math.floor(totalMinutes / 60);
  const newMinute = totalMinutes % 60;
  return `${String(newHour).padStart(2, "0")}:${String(newMinute).padStart(2, "0")}`;
}

function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function isSlotAvailable(occupied, day, time, lab, duration) {
  // Check if the starting time is in our available time slots
  if (!TIME_SLOTS.includes(time)) return false;

  const startMinutes = timeToMinutes(time);
  const endMinutes = startMinutes + duration * 60;
  
  // Get occupied ranges for this day and lab
  const key = `${day}-${lab}`;
  const occupiedRanges = occupied[key] || [];
  
  // Check if our time range overlaps with any existing range
  for (const range of occupiedRanges) {
    // Check for overlap: our start is before their end AND our end is after their start
    if (startMinutes < range.end && endMinutes > range.start) {
      return false;
    }
  }

  return true;
}

function markSlotsOccupied(occupied, day, time, lab, duration) {
  const startMinutes = timeToMinutes(time);
  const endMinutes = startMinutes + duration * 60;
  
  const key = `${day}-${lab}`;
  if (!occupied[key]) {
    occupied[key] = [];
  }
  
  // Add this time range to occupied ranges
  occupied[key].push({ start: startMinutes, end: endMinutes });
}

function getDayIndex(dayFull) {
  return DAYS_FULL.indexOf(dayFull);
}

function getDayLoad(schedule, dayIndex) {
  return schedule[dayIndex].slots.reduce((sum, slot) => {
    // Calculate duration in hours from time strings (handles minutes)
    const [startH, startM] = slot.time.split(":").map(Number);
    const [endH, endM] = slot.endTime.split(":").map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    const durationHours = (endMinutes - startMinutes) / 60;
    return sum + durationHours;
  }, 0);
}

function getDaysByLoad(schedule) {
  // Prioritize deterministically: fewer courses, then total hours, then day index
  const dayIndexes = [0, 1, 2, 3, 4];
  return dayIndexes.sort((a, b) => {
    const aCourses = schedule[a].slots.length;
    const bCourses = schedule[b].slots.length;
    if (aCourses !== bCourses) return aCourses - bCourses;
    const loadDiff = getDayLoad(schedule, a) - getDayLoad(schedule, b);
    if (loadDiff !== 0) return loadDiff;
    return a - b;
  });
}

export function generateSchedule(courses, weekStartDate) {
  const occupied = {};
  const schedule = DAYS.map((day, index) => ({
    day,
    dayFull: DAYS_FULL[index],
    date: weekStartDate + index,
    slots: [],
  }));

  // Sort courses: prioritized ones first (those with preferences), then by lab hours, then by course code for stability
  const sortedCourses = [...courses].sort((a, b) => {
    const aHasPreference = a.preferredDay || a.preferredTime ? 1 : 0;
    const bHasPreference = b.preferredDay || b.preferredTime ? 1 : 0;
    if (bHasPreference !== aHasPreference)
      return bHasPreference - aHasPreference;
    const labDiff = b.labHoursPerWeek - a.labHoursPerWeek;
    if (labDiff !== 0) return labDiff;
    return a.courseCode.localeCompare(b.courseCode);
  });

  for (const course of sortedCourses) {
    const duration = Math.min(course.labHoursPerWeek, 3); // Max 3 hours per session
    let scheduled = false;

    // Try preferred day/time first
    if (course.preferredDay && course.preferredTime) {
      const dayIndex = getDayIndex(course.preferredDay);
      if (
        dayIndex !== -1 &&
        isSlotAvailable(
          occupied,
          DAYS[dayIndex],
          course.preferredTime,
          course.labName,
          duration
        )
      ) {
        markSlotsOccupied(
          occupied,
          DAYS[dayIndex],
          course.preferredTime,
          course.labName,
          duration
        );
        schedule[dayIndex].slots.push({
          time: course.preferredTime,
          endTime: addHours(course.preferredTime, duration),
          lab: course.labName,
          class: course.courseCode,
          courseName: course.courseName,
          instructor: course.instructor,
          department: course.department,
          studentCount: course.studentCount,
        });
        scheduled = true;
      }
    }

    // Try preferred day with any time (try less loaded days after the preferred one)
    if (!scheduled && course.preferredDay) {
      const preferredIndex = getDayIndex(course.preferredDay);
      const loadOrderedDays = getDaysByLoad(schedule);
      const candidateDayIndexes = preferredIndex === -1
        ? loadOrderedDays
        : [preferredIndex, ...loadOrderedDays.filter((d) => d !== preferredIndex)];

      for (const dayIndex of candidateDayIndexes) {
        for (const time of TIME_SLOTS) {
          if (
            isSlotAvailable(
              occupied,
              DAYS[dayIndex],
              time,
              course.labName,
              duration
            )
          ) {
            markSlotsOccupied(
              occupied,
              DAYS[dayIndex],
              time,
              course.labName,
              duration
            );
            schedule[dayIndex].slots.push({
              time,
              endTime: addHours(time, duration),
              lab: course.labName,
              class: course.courseCode,
              courseName: course.courseName,
              instructor: course.instructor,
              department: course.department,
              studentCount: course.studentCount,
            });
            scheduled = true;
            break;
          }
        }
        if (scheduled) break;
      }
    }

    // Try preferred time on any day (choose least-loaded days first)
    if (!scheduled && course.preferredTime) {
      for (const dayIndex of getDaysByLoad(schedule)) {
        if (
          isSlotAvailable(
            occupied,
            DAYS[dayIndex],
            course.preferredTime,
            course.labName,
            duration
          )
        ) {
          markSlotsOccupied(
            occupied,
            DAYS[dayIndex],
            course.preferredTime,
            course.labName,
            duration
          );
          schedule[dayIndex].slots.push({
            time: course.preferredTime,
            endTime: addHours(course.preferredTime, duration),
            lab: course.labName,
            class: course.courseCode,
            courseName: course.courseName,
            instructor: course.instructor,
            department: course.department,
            studentCount: course.studentCount,
          });
          scheduled = true;
          break;
        }
      }
    }

    // Find any available slot (least-loaded days first, randomize times)
    if (!scheduled) {
      outer: for (const dayIndex of getDaysByLoad(schedule)) {
        for (const time of TIME_SLOTS) {
          if (
            isSlotAvailable(
              occupied,
              DAYS[dayIndex],
              time,
              course.labName,
              duration
            )
          ) {
            markSlotsOccupied(
              occupied,
              DAYS[dayIndex],
              time,
              course.labName,
              duration
            );
            schedule[dayIndex].slots.push({
              time,
              endTime: addHours(time, duration),
              lab: course.labName,
              class: course.courseCode,
              courseName: course.courseName,
              instructor: course.instructor,
              department: course.department,
              studentCount: course.studentCount,
            });
            scheduled = true;
            break outer;
          }
        }
      }
    }
  }

  // Sort slots by time for each day
  for (const day of schedule) {
    day.slots.sort((a, b) => a.time.localeCompare(b.time));
  }

  return schedule;
}

export function filterScheduleByDepartment(schedule, department) {
  if (!department || department === "all") return schedule;

  return schedule.map((day) => ({
    ...day,
    slots: day.slots.filter((slot) => slot.department === department),
  }));
}
