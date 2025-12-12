const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const DAYS_FULL = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

function getSlotKey(day, time, lab) {
  return `${day}-${time}-${lab}`;
}

function addHours(time, hours) {
  const [h, m] = time.split(":").map(Number);
  const newHour = h + hours;
  return `${String(newHour).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function isSlotAvailable(occupied, day, time, lab, duration) {
  const timeIndex = TIME_SLOTS.indexOf(time);
  if (timeIndex === -1) return false;

  // Check if we have enough consecutive slots
  for (let i = 0; i < duration; i++) {
    const checkTimeIndex = timeIndex + i;
    if (checkTimeIndex >= TIME_SLOTS.length) return false;

    const checkTime = TIME_SLOTS[checkTimeIndex];
    const key = getSlotKey(day, checkTime, lab);
    if (occupied[key]) return false;
  }

  return true;
}

function markSlotsOccupied(occupied, day, time, lab, duration) {
  const timeIndex = TIME_SLOTS.indexOf(time);
  for (let i = 0; i < duration; i++) {
    const checkTime = TIME_SLOTS[timeIndex + i];
    const key = getSlotKey(day, checkTime, lab);
    occupied[key] = true;
  }
}

function getDayIndex(dayFull) {
  return DAYS_FULL.indexOf(dayFull);
}

export function generateSchedule(courses, weekStartDate) {
  const occupied = {};
  const schedule = DAYS.map((day, index) => ({
    day,
    dayFull: DAYS_FULL[index],
    date: weekStartDate + index,
    slots: [],
  }));

  // Sort courses: prioritized ones first (those with preferences), then by lab hours
  const sortedCourses = [...courses].sort((a, b) => {
    const aHasPreference = a.preferredDay || a.preferredTime ? 1 : 0;
    const bHasPreference = b.preferredDay || b.preferredTime ? 1 : 0;
    if (bHasPreference !== aHasPreference)
      return bHasPreference - aHasPreference;
    return b.labHoursPerWeek - a.labHoursPerWeek;
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

    // Try preferred day with any time
    if (!scheduled && course.preferredDay) {
      const dayIndex = getDayIndex(course.preferredDay);
      if (dayIndex !== -1) {
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
      }
    }

    // Try preferred time on any day
    if (!scheduled && course.preferredTime) {
      for (let dayIndex = 0; dayIndex < DAYS.length; dayIndex++) {
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

    // Find any available slot
    if (!scheduled) {
      outer: for (let dayIndex = 0; dayIndex < DAYS.length; dayIndex++) {
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
