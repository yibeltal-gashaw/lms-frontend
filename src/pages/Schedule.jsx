import { Calendar, ChevronLeft, ChevronRight, Clock, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import {scheduleData, labColors} from "@/data/mockdata";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useMemo, useState } from "react";
import { AddCourseDialog } from "@/components/dialogs/AddCourseDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  generateSchedule,
  filterScheduleByDepartment,
} from "@/utils/scheduleGenerator";

const departmentColors = {
  Chemistry: "bg-primary text-primary-foreground",
  "Computer Science": "bg-success text-white",
  Physics: "bg-accent text-accent-foreground",
  biology: "bg-chart-5 text-white",
  Genetics: "bg-chart-4 text-white",
};

// Initial sample courses
const initialCourses = [
  { id: "1", courseCode: "CHEM 101", courseName: "General Chemistry", labName: "Chemistry Lab A", creditHours: 3, labHoursPerWeek: 2, studentCount: 30, instructor: "Dr. Smith", department: "Chemistry" },
  { id: "2", courseCode: "BIO 201", courseName: "Cell Biology", labName: "Biology Lab B", creditHours: 4, labHoursPerWeek: 3, studentCount: 25, instructor: "Dr. Johnson", department: "Biology" },
  { id: "3", courseCode: "PHY 102", courseName: "Physics II", labName: "Physics Lab", creditHours: 4, labHoursPerWeek: 2, studentCount: 28, instructor: "Dr. Brown", department: "Physics" },
  { id: "4", courseCode: "BIO 301", courseName: "Genetics", labName: "Genetics Lab", creditHours: 3, labHoursPerWeek: 2, studentCount: 20, instructor: "Dr. Williams", department: "Genetics" },
  { id: "5", courseCode: "CS 201", courseName: "Data Structures Lab", labName: "Computer Lab", creditHours: 3, labHoursPerWeek: 2, studentCount: 35, instructor: "Prof. Wilson", department: "Computer Science" },
  { id: "6", courseCode: "CHEM 201", courseName: "Organic Chemistry", labName: "Chemistry Lab B", creditHours: 4, labHoursPerWeek: 3, studentCount: 22, instructor: "Dr. Davis", department: "Chemistry" },
  { id: "7", courseCode: "CS 101", courseName: "Introduction to Programming Lab", labName: "Computer Lab", creditHours: 3, labHoursPerWeek: 2, studentCount: 40, instructor: "Prof. Anderson", department: "Computer Science" },
  { id: "8", courseCode: "CS 202", courseName: "Algorithms and Data Structures Lab", labName: "Computer Lab", creditHours: 4, labHoursPerWeek: 3, studentCount: 32, instructor: "Dr. Martinez", department: "Computer Science" },
  { id: "9", courseCode: "CS 301", courseName: "Database Systems Lab", labName: "Computer Lab", creditHours: 3, labHoursPerWeek: 2, studentCount: 28, instructor: "Prof. Thompson", department: "Computer Science" },
  { id: "10", courseCode: "CS 302", courseName: "Web Development Lab", labName: "Computer Lab", creditHours: 3, labHoursPerWeek: 2, studentCount: 30, instructor: "Dr. Lee", department: "Computer Science" },
  { id: "11", courseCode: "CS 401", courseName: "Software Engineering Lab", labName: "Computer Lab", creditHours: 4, labHoursPerWeek: 3, studentCount: 25, instructor: "Prof. Garcia", department: "Computer Science" },
];

// Map department codes to readable names
const departmentCodeMap = {
  swe: "Computer Science",
  chemistry: "Chemistry",
  biology: "Biology",
  physics: "Physics",
  genetics: "Genetics",
};

const normalizeDepartment = (dept) => {
  if (!dept) return null;
  const lower = dept.toLowerCase();
  if (departmentCodeMap[lower]) return departmentCodeMap[lower];
  return dept;
};

export function Schedule() {
  const { user } = useAuth();
  const { hasPermission, role } = useRoleAccess();
  
  const [courses, setCourses] = useState(initialCourses);
  const [weekOffset, setWeekOffset] = useState(0);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("schedule");

  const canManageCourses = role === "admin" || role === "department_head";
  const userDepartment = normalizeDepartment(user?.department);
  const selectedDepartment = userDepartment || "__none__";

  // Generate schedule from courses
  const fullSchedule = useMemo(() => {
    const baseDate = 9 + weekOffset * 7;
    return generateSchedule(courses, baseDate);
  }, [courses, weekOffset]);

  // Filter schedule by department
  const filteredSchedule = useMemo(() => {
    return filterScheduleByDepartment(fullSchedule, selectedDepartment);
  }, [fullSchedule, selectedDepartment]);

  // Stats
  const stats = useMemo(() => {
    const filtered = selectedDepartment === "all"
      ? courses
      : courses.filter((c) => c.department === selectedDepartment);
    
    return {
      totalCourses: filtered.length,
      totalStudents: filtered.reduce((sum, c) => sum + c.studentCount, 0),
      totalLabHours: filtered.reduce((sum, c) => sum + c.labHoursPerWeek, 0),
    };
  }, [courses, selectedDepartment]);

  const handleAddCourse = (course) => {
    setCourses((prev) => [...prev, course]);
  };

  const handleDeleteCourse = (courseId) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    toast.success("The course has been removed from the schedule.");
  };

  const handleGenerateSchedule = () => {
    toast.success("The weekly schedule has been automatically generated based on course requirements.");
  };

  const getWeekDateRange = () => {
    const startDay = 9 + weekOffset * 7;
    const endDay = startDay + 4;
    return `December ${startDay} - ${endDay}, 2024`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lab Schedule</h1>
          <p className="mt-1 text-muted-foreground">
            View and manage weekly laboratory schedules by department
          </p>
        </div>
        <div className="flex gap-2">
          {canManageCourses && (
            <>
              <Button variant="outline" onClick={handleGenerateSchedule}>
                <Calendar className="mr-2 h-4 w-4" />
                Regenerate Schedule
              </Button>
              <Button onClick={() => setIsAddCourseOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              {selectedDepartment === "all"
                ? "Across all departments"
                : selectedDepartment === "__none__"
                  ? "No department assigned"
                  : `In ${selectedDepartment}`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Enrolled in lab courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Lab Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLabHours}</div>
            <p className="text-xs text-muted-foreground">Hours scheduled per week</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="courses">Course List</TabsTrigger>
          </TabsList>

          <Badge variant="outline" className="justify-center">
            Department: {selectedDepartment === "__none__" ? "Not assigned" : selectedDepartment}
          </Badge>
        </div>

        {/* Weekly Schedule View */}
        <TabsContent value="schedule" className="space-y-4">
          {/* Week Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => setWeekOffset((prev) => prev - 1)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold">{getWeekDateRange()}</h2>
            <Button variant="ghost" size="icon" onClick={() => setWeekOffset((prev) => prev + 1)}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Schedule Grid */}
          <div className="grid gap-4 md:grid-cols-5">
            {filteredSchedule.map((day) => (
              <div key={day.day} className="space-y-3">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">{day.day}</p>
                  <p className="text-2xl font-bold">{day.date}</p>
                </div>
                <div className="space-y-2 min-h-[200px]">
                  {day.slots.map((slot, idx) => (
                    <Card
                      key={idx}
                      className={cn(
                        "border-l-4 transition-shadow hover:shadow-md cursor-pointer",
                        labColors[slot.lab] || "bg-muted border-l-muted-foreground"
                      )}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {slot.time} - {slot.endTime}
                          </Badge>
                        </div>
                        <p className="font-semibold text-sm">{slot.class}</p>
                        <p className="text-xs text-muted-foreground">{slot.courseName}</p>
                        <p className="text-xs text-muted-foreground">{slot.lab}</p>
                        <p className="text-xs text-muted-foreground mt-1">{slot.instructor}</p>
                        <Badge 
                          className={cn("mt-2 text-xs", departmentColors[slot.department] || "bg-muted")}
                        >
                          {slot.department}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                  {day.slots.length === 0 && (
                    <div className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground h-full flex items-center justify-center">
                      No sessions
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <Card>
            <CardContent className="flex flex-wrap gap-4 p-4">
              <span className="text-sm font-medium text-muted-foreground">Labs:</span>
              {Object.keys(labColors).map((lab) => (
                <div key={lab} className="flex items-center gap-2">
                  <div className={cn("h-3 w-3 rounded", labColors[lab].split(" ")[0])} />
                  <span className="text-sm">{lab}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Course List View */}
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registered Courses with Labs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Lab</TableHead>
                    <TableHead className="text-center">Credit Hours</TableHead>
                    <TableHead className="text-center">Lab Hours/Week</TableHead>
                    <TableHead className="text-center">Students</TableHead>
                    <TableHead>Instructor</TableHead>
                    {canManageCourses && <TableHead className="text-right">Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses
                    .filter((c) => selectedDepartment === "all" || c.department === selectedDepartment)
                    .map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.courseCode}</TableCell>
                        <TableCell>{course.courseName}</TableCell>
                        <TableCell>
                          <Badge className={cn(departmentColors[course.department] || "bg-muted")}>
                            {course.department}
                          </Badge>
                        </TableCell>
                        <TableCell>{course.labName}</TableCell>
                        <TableCell className="text-center">{course.creditHours}</TableCell>
                        <TableCell className="text-center">{course.labHoursPerWeek}</TableCell>
                        <TableCell className="text-center">{course.studentCount}</TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        {canManageCourses && (
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteCourse(course.id)}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Course Dialog */}
      <AddCourseDialog
        open={isAddCourseOpen}
        onOpenChange={setIsAddCourseOpen}
        department={userDepartment}
        onCourseAdded={handleAddCourse}
      />
    </div>
  );
}
