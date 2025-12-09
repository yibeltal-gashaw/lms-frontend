# Project Milestones for LMS Frontend

## 1. User Management
- Implement user registration and login functionality.
- Create user roles: Technical Assistant, Department Head, College, Lab Coordinator, General Service, ICT Directorate, System Admin, Guest Account.
- System Admin: Create, grant/revoke privileges, reset passwords for all user types.

## 2. Lab Asset Management
- Register lab assets by category (by Technical Assistant).
- Update lab asset status: Transferred, Returned, Replaced, Under Maintenance, Damaged, Expired, ያለቀ.
- View registered lab assets (Department Head).

## 3. Asset Acquisition Process
- Technical Assistant: Request new lab asset acquisition to Department.
- Department Head: Approve requests; request acquisition to College.
- College: Approve requests from Department Head.

## 4. Lab Scheduling
- Department Head: Generate and publish lab schedules.
- LMS System: Generate lab schedule.

## 5. Report Management
- Technical Assistant: Generate, export, and share reports; upload lab report results to repository.
- Department Head and College: Request, approve, and export reports; share to Lab Coordinator.
- Lab Coordinator: View analytics; generate aggregate reports.

## 6. Service Requests and Scheduling
- Technical Assistant: Service maintenance request.
- General Service (Cleaning, Electric, Water, Furniture): View and schedule requested services.
- ICT Directorate (Network, Computer): View and schedule requested services.

## 7. Analytics & Aggregate Reporting
- Lab Coordinator and LMS System: Generate analytics; produce aggregate and specific reports.

## 8. Approval Workflows
- Multi-stage approval for asset acquisition and report management (Technical Assistant → Department Head → College).
- Report approval by Department Head.

## 9. Guest Account Features
- Guest view of reports and analytics (where permitted).

## 10. Integration & Testing
- Integrate all modules and workflows.
- Perform system-wide testing and user acceptance testing.
