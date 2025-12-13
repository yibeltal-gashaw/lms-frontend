import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";

export const mockLabActorData = {
  "admin@lab.com": {
    password: "admin123",
    user: {
      id: "1",
      email: "admin@lab.com",
      firstName: "Estifanos",
      lastName: "Gashaw",
      role: "admin",
    },
  },
  "head@lab.com": {
    password: "head123",
    user: {
      id: "2",
      email: "head@lab.com",
      firstName: "Demeke",
      lastName: "Mola",
      role: "department_head",
      department: "swe",
    },
  },
  "tech@lab.com": {
    password: "tech123",
    user: {
      id: "3",
      email: "tech@lab.com",
      firstName: "Abera",
      lastName: "Feqadu",
      role: "technical_assistant",
      department: "swe",
    },
  },
  "gens@lab.com": {
    password: "gens123",
    user: {
      id: "4",
      email: "gens@lab.com",
      firstName: "Belete",
      lastName: "Sewunet",
      role: "general_service",
    },
  },
  "ict@lab.com": {
    password: "ict123",
    user: {
      id: "5",
      email: "ict@lab.com",
      firstName: "Abrham",
      lastName: "Mezgebu",
      role: "ict_director",
    },
  },
  "clg@lab.com": {
    password: "clg123",
    user: {
      id: "5",
      email: "clg@lab.com",
      firstName: "Melese",
      lastName: "Alemante",
      role: "college_dean",
      college: "CCI",
    },
  },
};
// Approval mock data
export const assetRequests = [
  {
    id: "AR-001",
    assetName: "Centrifuge Machine",
    category: "Laboratory Equipment",
    lab: "Chemistry Lab",
    quantity: 2,
    estimatedCost: 15000,
    requestedBy: "Dr. melaku baye",
    requestDate: "2024-01-15",
    justification:
      "Required for advanced biochemistry experiments in the new curriculum",
    priority: "high",
    status: "pending",
  },
  {
    id: "AR-002",
    assetName: "Digital Oscilloscope",
    category: "Electronics",
    lab: "Electronics Lab",
    quantity: 5,
    estimatedCost: 8500,
    requestedBy: "Prof. shewakenaw Chen",
    requestDate: "2024-01-14",
    justification:
      "Current oscilloscopes are outdated and unable to measure high-frequency signals",
    priority: "medium",
    status: "pending",
  },
  {
    id: "AR-003",
    assetName: "3D Printer",
    category: "Manufacturing",
    lab: "Engineering Lab",
    quantity: 1,
    estimatedCost: 25000,
    requestedBy: "Mr. Addisu Anley",
    requestDate: "2024-01-12",
    justification: "Enable rapid prototyping for student projects and research",
    priority: "critical",
    status: "pending",
  },
  {
    id: "AR-004",
    assetName: "Fume Hood",
    category: "Safety Equipment",
    lab: "Chemistry Lab",
    quantity: 3,
    estimatedCost: 12000,
    requestedBy: "Mr. Melese Alem",
    requestDate: "2024-01-10",
    justification:
      "Safety compliance requirement for handling volatile chemicals",
    priority: "critical",
    status: "pending",
  },
];

export const reportReviews = [
  {
    id: "RR-001",
    title: "Q4 2023 Lab Utilization Report",
    type: "Utilization Report",
    period: "Oct - Dec 2023",
    submittedBy: "adisalem yihune",
    submittedDate: "2024-01-16",
    lab: "All Labs",
    status: "pending",
  },
  {
    id: "RR-002",
    title: "Annual Equipment Maintenance Summary",
    type: "Maintenance Report",
    period: "2023",
    submittedBy: "Tsehayu Gebeyaw",
    submittedDate: "2024-01-15",
    lab: "Engineering Lab",
    status: "pending",
  },
  {
    id: "RR-003",
    title: "Safety Compliance Audit Report",
    type: "Safety Report",
    period: "Q4 2023",
    submittedBy: "Dr. ashalew walle",
    submittedDate: "2024-01-14",
    lab: "Chemistry Lab",
    status: "pending",
  },
  {
    id: "RR-004",
    title: "Student Lab Hours Analysis",
    type: "Analytics Report",
    period: "Fall Semester 2023",
    submittedBy: "Prof. dessie balcha",
    submittedDate: "2024-01-13",
    lab: "Electronics Lab",
    status: "pending",
  },
];


// User data
export const mockUsers = [
  {
    id: "1",
    name: "Abebe Kebede",
    email: "abebe.kebede@university.edu.et",
    role: "Technical Assistant",
    department: "Computer Science",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Tigist Haile",
    email: "tigist.haile@university.edu.et",
    role: "Department Head",
    department: "Electrical Engineering",
    status: "active",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Dawit Mengstu",
    email: "dawit.mengistu@university.edu.et",
    role: "Lab Coordinator",
    department: "All Departments",
    status: "active",
    createdAt: "2024-03-10",
  },
  {
    id: "4",
    name: "Sara Tesfaye",
    email: "sara.tesfaye@university.edu.et",
    role: "General Service",
    department: "Facilities",
    status: "inactive",
    createdAt: "2024-01-05",
  },
  {
    id: "5",
    name: "Yohans Girma",
    email: "yohannes.girma@university.edu.et",
    role: "ICT Directorate",
    department: "ICT",
    status: "active",
    createdAt: "2024-04-12",
  },
  {
    id: "6",
    name: "Meron Alemu",
    email: "meron.alemu@university.edu.et",
    role: "College Dean",
    department: "Engineering College",
    status: "active",
    createdAt: "2024-02-28",
  },
];

export const roleColors = {
  "Technical Assistant":
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Department Head":
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "Lab Coordinator":
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "General Service":
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  "ICT Directorate":
    "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  College:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  "System Admin": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

//  Analytics data

export const assetTrends = [
  { month: "Jan", added: 15, removed: 5, maintenance: 8 },
  { month: "Feb", added: 22, removed: 3, maintenance: 12 },
  { month: "Mar", added: 18, removed: 7, maintenance: 6 },
  { month: "Apr", added: 25, removed: 4, maintenance: 10 },
  { month: "May", added: 30, removed: 8, maintenance: 15 },
  { month: "Jun", added: 12, removed: 6, maintenance: 9 },
  { month: "Jul", added: 28, removed: 5, maintenance: 11 },
  { month: "Aug", added: 20, removed: 9, maintenance: 7 },
  { month: "Sep", added: 35, removed: 4, maintenance: 13 },
  { month: "Oct", added: 18, removed: 6, maintenance: 8 },
  { month: "Nov", added: 24, removed: 7, maintenance: 10 },
  { month: "Dec", added: 16, removed: 3, maintenance: 5 },
];

export const labUtilization = [
  { name: "Chemistry Lab A", value: 85 },
  { name: "Biology Lab B", value: 72 },
  { name: "Physics Lab", value: 68 },
  { name: "Genetics Lab", value: 90 },
  { name: "Computer Lab", value: 55 },
];

export const categoryDistribution = [
  { name: "Microscopy", value: 45, color: "hsl(217, 91%, 45%)" },
  { name: "Centrifugation", value: 28, color: "hsl(142, 76%, 36%)" },
  { name: "PCR Equipment", value: 35, color: "hsl(35, 92%, 50%)" },
  { name: "Spectroscopy", value: 22, color: "hsl(280, 65%, 60%)" },
  { name: "Safety Equipment", value: 50, color: "hsl(0, 84%, 60%)" },
  { name: "Other", value: 40, color: "hsl(215, 20%, 65%)" },
];

//  Lab asset mock data

export const assets = [
  {
    id: "AST-001",
    name: "Olympus CX23 Microscope",
    category: "Microscopy",
    lab: "Biology Lab A",
    status: "Active",
    quantity: 5,
    lastUpdated: "2024-12-01",
  },
  {
    id: "AST-002",
    name: "Eppendorf Centrifuge 5425",
    category: "Centrifugation",
    lab: "Chemistry Lab B",
    status: "Under Maintenance",
    quantity: 2,
    lastUpdated: "2024-11-28",
  },
  {
    id: "AST-003",
    name: "Thermo Fisher PCR Machine",
    category: "PCR Equipment",
    lab: "Genetics Lab",
    status: "Active",
    quantity: 3,
    lastUpdated: "2024-12-05",
  },
  {
    id: "AST-004",
    name: "Analytical Balance",
    category: "Weighing",
    lab: "Chemistry Lab A",
    status: "Damaged",
    quantity: 1,
    lastUpdated: "2024-11-20",
  },
  {
    id: "AST-005",
    name: "Spectrophotometer UV-Vis",
    category: "Spectroscopy",
    lab: "Physics Lab",
    status: "Active",
    quantity: 2,
    lastUpdated: "2024-12-03",
  },
  {
    id: "AST-006",
    name: "Fume Hood",
    category: "Safety Equipment",
    lab: "Chemistry Lab A",
    status: "Active",
    quantity: 4,
    lastUpdated: "2024-11-15",
  },
  {
    id: "AST-007",
    name: "Hot Plate Stirrer",
    category: "Heating",
    lab: "Chemistry Lab B",
    status: "Transferred",
    quantity: 3,
    lastUpdated: "2024-12-02",
  },
  {
    id: "AST-008",
    name: "Hp Core i7 13th Gen Desktop",
    category: "Computer Equipment",
    lab: "Computer Lab",
    status: "Active",
    quantity: 2,
    lastUpdated: "2024-10-30",
  },
];

// common mock data and style
export const statusStyles = {
  Active: "bg-success/10 text-success border-success/20",
  "Under Maintenance": "bg-warning/10 text-warning border-warning/20",
  Damaged: "bg-destructive/10 text-destructive border-destructive/20",
  Transferred: "bg-primary/10 text-primary border-primary/20",
  Expired: "bg-muted text-muted-foreground border-muted-foreground/20",
  Approved: "bg-success/10 text-success border-success/20",
  "Pending Review": "bg-warning/10 text-warning border-warning/20",
  Submitted: "bg-primary/10 text-primary border-primary/20",
  Draft: "bg-muted text-muted-foreground border-muted-foreground/20",

  // approval
  pending: "bg-amber-500/10 text-amber-600",
  approved: "bg-emerald-500/10 text-emerald-600",
  rejected: "bg-destructive/10 text-destructive",
  revision_requested: "bg-blue-500/10 text-blue-600",
};

export const priorityStyles = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low: "bg-muted text-muted-foreground border-muted-foreground/20",

  // approval
  low: "bg-muted text-muted-foreground",
  medium: "bg-blue-500/10 text-blue-600",
  high: "bg-amber-500/10 text-amber-600",
  critical: "bg-destructive/10 text-destructive",
};

export const roles = [
  { value: "technical-assistant", label: "Technical Assistant" },
  { value: "department-head", label: "Department Head" },
  { value: "college", label: "College" },
  { value: "lab-coordinator", label: "Lab Coordinator" },
  { value: "general-service", label: "General Service" },
  { value: "ict-directorate", label: "ICT Directorate" },
];
// report mock data
export const reports = [
  {
    id: "RPT-001",
    title: "Monthly Lab Inventory Report",
    type: "Inventory",
    period: "November 2024",
    status: "Approved",
    createdDate: "2024-12-01",
    dueDate: "2024-12-05",
  },
  {
    id: "RPT-002",
    title: "Equipment Maintenance Summary",
    type: "Maintenance",
    period: "Q3 2024",
    status: "Pending Review",
    createdDate: "2024-11-28",
    dueDate: "2024-12-10",
  },
  {
    id: "RPT-003",
    title: "Lab Utilization Report",
    type: "Utilization",
    period: "October 2024",
    status: "Approved",
    createdDate: "2024-11-05",
    dueDate: "2024-11-10",
  },
  {
    id: "RPT-004",
    title: "Asset Acquisition Request",
    type: "Acquisition",
    period: "FY 2024-25",
    status: "Submitted",
    createdDate: "2024-12-03",
    dueDate: "2024-12-15",
  },
  {
    id: "RPT-005",
    title: "Student Lab Results Summary",
    type: "Results",
    period: "Fall Semester 2024",
    status: "Draft",
    createdDate: "2024-12-05",
    dueDate: "2024-12-20",
  },
];

export const departments = [
  { value: "software-engineering", label: "Software Engineering" },
  { value: "computer-science", label: "Computer Science" },
  { value: "information-technology", label: "Information Technology" },
  { value: "agriculture", label: "Agriculture" },
  { value: "biology", label: "Biology" },
  { value: "chemistry", label: "Chemistry" },
  { value: "physics", label: "Physics" },
  { value: "geology", label: "Geology" },
  { value: "all", label: "All Departments" },
];

export const allRoles = [
  {
    id: "technical-assistant",
    label: "Technical Assistant",
    description: "Register assets, request maintenance, generate reports",
  },
  {
    id: "department-head",
    label: "Department Head",
    description: "Approve acquisitions, manage schedules, view department assets",
  },
  {
    id: "college",
    label: "College",
    description: "Approve department requests, request reports, share to coordinator",
  },
  {
    id: "lab-coordinator",
    label: "Lab Coordinator",
    description: "View all analytics, generate aggregate reports",
  },
  {
    id: "general-service",
    label: "General Service",
    description: "Handle cleaning, electric, water, furniture services",
  },
  {
    id: "ict-directorate",
    label: "ICT Directorate",
    description: "Handle network and computer maintenance services",
  },
  {
    id: "system-admin",
    label: "System Admin",
    description: "Full system access, user management, privilege control",
  },
];

export const roleToId = {
  "Technical Assistant": "technical-assistant",
  "Department Head": "department-head",
  "College": "college",
  "Lab Coordinator": "lab-coordinator",
  "General Service": "general-service",
  "ICT Directorate": "ict-directorate",
  "System Admin": "system-admin",
};

export const reportTypes = [
  { value: "Inventory", label: "Lab Inventory Report" },
  { value: "Maintenance", label: "Equipment Maintenance Summary" },
  { value: "Utilization", label: "Lab Utilization Report" },
  { value: "Acquisition", label: "Asset Acquisition Request" },
  { value: "Results", label: "Student Lab Results Summary" },
];

export const allLabs = [
  "Biology Lab A",
  "Biology Lab B",
  "Chemistry Lab A",
  "Chemistry Lab B",
  "Physics Lab",
  "Genetics Lab",
  "Computer Lab",
];

export const labToDepartmentMap = {
  "Biology Lab A": "Biology",
  "Biology Lab B": "Biology",
  "Chemistry Lab A": "Chemistry",
  "Chemistry Lab B": "Chemistry",
  "Physics Lab": "Physics",
  "Genetics Lab": "Genetics",
  "Computer Lab": "Computer Science",
};

export const departmentCodeMap = {
  swe: "Computer Science",
  chemistry: "Chemistry",
  biology: "Biology",
  physics: "Physics",
  genetics: "Genetics",
};

export const categories = [
  "Microscopy",
  "Centrifugation",
  "PCR Equipment",
  "Weighing",
  "Spectroscopy",
  "Safety Equipment",
  "Heating",
  "Measurement",
  "Glassware",
  "Chemicals",
  "Computer Equipment",
  "Other",
];

// Schedule mock data

export const scheduleData = [
  {
    day: "Mon",
    date: 9,
    slots: [
      {
        time: "09:00",
        lab: "Chemistry Lab A",
        class: "CHEM 101",
        instructor: "Dr. Smith",
      },
      {
        time: "14:00",
        lab: "Biology Lab B",
        class: "BIO 201",
        instructor: "Dr. Johnson",
      },
    ],
  },
  {
    day: "Tue",
    date: 10,
    slots: [
      {
        time: "10:00",
        lab: "Physics Lab",
        class: "PHY 102",
        instructor: "Dr. Brown",
      },
      {
        time: "13:00",
        lab: "Genetics Lab",
        class: "BIO 301",
        instructor: "Dr. Williams",
      },
      {
        time: "16:00",
        lab: "Chemistry Lab B",
        class: "CHEM 201",
        instructor: "Dr. Davis",
      },
    ],
  },
  {
    day: "Wed",
    date: 11,
    slots: [
      {
        time: "08:00",
        lab: "Chemistry Lab A",
        class: "CHEM 101",
        instructor: "Dr. Smith",
      },
    ],
  },
  {
    day: "Thu",
    date: 12,
    slots: [
      {
        time: "09:00",
        lab: "Biology Lab A",
        class: "BIO 101",
        instructor: "Dr. Miller",
      },
      {
        time: "11:00",
        lab: "Computer Lab",
        class: "CS 201",
        instructor: "Prof. Wilson",
      },
      {
        time: "14:00",
        lab: "Physics Lab",
        class: "PHY 201",
        instructor: "Dr. Brown",
      },
    ],
  },
  {
    day: "Fri",
    date: 13,
    slots: [
      {
        time: "10:00",
        lab: "Genetics Lab",
        class: "BIO 401",
        instructor: "Dr. Williams",
      },
      {
        time: "15:00",
        lab: "Chemistry Lab A",
        class: "CHEM 301",
        instructor: "Dr. Garcia",
      },
    ],
  },
];

export const labColors = {
  "Chemistry Lab A": "bg-primary/10 border-l-primary",
  "Chemistry Lab B": "bg-primary/20 border-l-primary",
  "Computer Lab": "bg-success/10 border-l-success",
  "Biology Lab B": "bg-success/20 border-l-success",
  "Physics Lab": "bg-accent/10 border-l-accent",
  "Genetics Lab": "bg-chart-4/10 border-l-chart-4",
  "Biology Lab A": "bg-chart-5/10 border-l-chart-5",
};
export const initialCourses = [
  {
    id: "1",
    courseCode: "CHEM 101",
    courseName: "General Chemistry",
    labName: "Chemistry Lab A",
    creditHours: 3,
    labHoursPerWeek: 2,
    studentCount: 30,
    instructor: "Dr. Smith",
    department: "Chemistry",
  },
  {
    id: "2",
    courseCode: "BIO 201",
    courseName: "Cell Biology",
    labName: "Biology Lab B",
    creditHours: 4,
    labHoursPerWeek: 3,
    studentCount: 25,
    instructor: "Dr. Johnson",
    department: "Biology",
  },
  {
    id: "3",
    courseCode: "PHY 102",
    courseName: "Physics II",
    labName: "Physics Lab",
    creditHours: 4,
    labHoursPerWeek: 2,
    studentCount: 28,
    instructor: "Dr. Brown",
    department: "Physics",
  },
  {
    id: "4",
    courseCode: "BIO 301",
    courseName: "Genetics",
    labName: "Genetics Lab",
    creditHours: 3,
    labHoursPerWeek: 2,
    studentCount: 20,
    instructor: "Dr. Williams",
    department: "Genetics",
  },
  {
    id: "5",
    courseCode: "CS 201",
    courseName: "Data Structures Lab",
    labName: "Computer Lab",
    creditHours: 3,
    labHoursPerWeek: 2,
    studentCount: 35,
    instructor: "Prof. Wilson",
    department: "Computer Science",
  },
  {
    id: "6",
    courseCode: "CHEM 201",
    courseName: "Organic Chemistry",
    labName: "Chemistry Lab B",
    creditHours: 4,
    labHoursPerWeek: 3,
    studentCount: 22,
    instructor: "Dr. Davis",
    department: "Chemistry",
  },
  {
    id: "7",
    courseCode: "CS 101",
    courseName: "Introduction to Programming Lab",
    labName: "Computer Lab",
    creditHours: 3,
    labHoursPerWeek: 2,
    studentCount: 40,
    instructor: "Prof. Anderson",
    department: "Computer Science",
  },
  {
    id: "8",
    courseCode: "CS 202",
    courseName: "Algorithms and Data Structures Lab",
    labName: "Computer Lab",
    creditHours: 4,
    labHoursPerWeek: 3,
    studentCount: 32,
    instructor: "Dr. Martinez",
    department: "Computer Science",
  },
  {
    id: "9",
    courseCode: "CS 301",
    courseName: "Database Systems Lab",
    labName: "Computer Lab",
    creditHours: 3,
    labHoursPerWeek: 2,
    studentCount: 28,
    instructor: "Prof. Thompson",
    department: "Computer Science",
  },
  {
    id: "10",
    courseCode: "CS 302",
    courseName: "Web Development Lab",
    labName: "Computer Lab",
    creditHours: 3,
    labHoursPerWeek: 2,
    studentCount: 30,
    instructor: "Dr. Lee",
    department: "Computer Science",
  },
  {
    id: "11",
    courseCode: "CS 401",
    courseName: "Software Engineering Lab",
    labName: "Computer Lab",
    creditHours: 4,
    labHoursPerWeek: 3,
    studentCount: 25,
    instructor: "Prof. Garcia",
    department: "Computer Science",
  },
];
export const departmentColors = {
  Chemistry: "bg-primary text-primary-foreground",
  "Computer Science": "bg-success text-white",
  Physics: "bg-accent text-accent-foreground",
  biology: "bg-chart-5 text-white",
  Genetics: "bg-chart-4 text-white",
};
// service request mock data
export const serviceRequests = [
  {
    id: "SR-001",
    title: "Electrical Socket Repair",
    type: "Electrical",
    lab: "Chemistry Lab A",
    status: "Pending",
    priority: "High",
    requestedBy: "John Doe",
    requestDate: "2024-12-05",
    description:
      "Faulty electrical socket near the fume hood needs immediate repair.",
  },
  {
    id: "SR-002",
    title: "Air Conditioning Maintenance",
    type: "Electrical",
    lab: "Biology Lab B",
    status: "In Progress",
    priority: "Medium",
    requestedBy: "Jane Smith",
    requestDate: "2024-12-04",
    description:
      "AC unit not cooling properly, affecting temperature-sensitive experiments.",
  },
  {
    id: "SR-003",
    title: "Water Leak Repair",
    type: "Water",
    lab: "Physics Lab",
    status: "Completed",
    priority: "High",
    requestedBy: "Mike Johnson",
    requestDate: "2024-12-01",
    description: "Water leaking from sink pipe, resolved by plumber on Dec 2.",
  },
  {
    id: "SR-004",
    title: "Lab Table Replacement",
    type: "Furniture",
    lab: "Chemistry Lab B",
    status: "Pending",
    priority: "Low",
    requestedBy: "Sarah Williams",
    requestDate: "2024-12-03",
    description: "Old lab table needs replacement due to chemical damage.",
  },
  {
    id: "SR-005",
    title: "Deep Cleaning Request",
    type: "Cleaning",
    lab: "Genetics Lab",
    status: "Scheduled",
    priority: "Medium",
    requestedBy: "John Doe",
    requestDate: "2024-12-05",
    description:
      "Scheduled for weekend deep cleaning before new equipment installation.",
  },
  {
    id: "SR-006",
    title: "Network Cable Installation",
    type: "ICT",
    lab: "Computer Lab",
    status: "Pending",
    priority: "Medium",
    requestedBy: "Tom Brown",
    requestDate: "2024-12-04",
    description: "Need additional ethernet ports for new workstations.",
  },
];

export const statusConfig = {
  Pending: { icon: Clock, color: "text-warning", bgColor: "bg-warning/10" },
  "In Progress": {
    icon: AlertCircle,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  Completed: {
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  Scheduled: { icon: Clock, color: "text-chart-4", bgColor: "bg-chart-4/10" },
  Rejected: {
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
};

export const serviceTypes = [
  { value: "Cleaning", label: "Cleaning Service", department: "General Service" },
  { value: "Electrical", label: "Electrical Installation/Maintenance", department: "General Service" },
  { value: "Water", label: "Water Maintenance", department: "General Service" },
  { value: "Furniture", label: "Furniture Installation/Maintenance", department: "General Service" },
  { value: "ICT", label: "Network/Computer Maintenance", department: "ICT Directorate" },
];
export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
export const times = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];
