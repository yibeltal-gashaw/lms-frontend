import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  UserPlus,
  MoreHorizontal,
  Shield,
  KeyRound,
  UserX,
  CheckCircle,
  XCircle,
  Building,
  UserCheck,
} from "lucide-react";
import { CreateUserDialog } from "@/components/dialogs/CreateUserDialog";
import { CreateRoleDialog } from "@/components/dialogs/CreateRoleDialog";
import { CreateDepartmentDialog } from "@/components/dialogs/CreateDepartmentDialog";
import { ManageRolesDialog } from "@/components/dialogs/ManageRolesDialog";
import { ResetPasswordDialog } from "@/components/dialogs/ResetPasswordDialog";
import { toast } from "sonner";
import {mockUsers} from "@/data/mockdata";
import {roleColors} from "@/data/mockdata";

export function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isRolesDialogOpen, setIsRolesDialogOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isCreateDepartmentOpen, setIsCreateDepartmentOpen] = useState(false);
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleManageRoles = (user) => {
    setSelectedUser(user);
    setIsRolesDialogOpen(true);
  };

  const handleResetPassword = (user) => {
    setSelectedUser(user);
    setIsResetPasswordOpen(true);
  };

  const handleToggleStatus = (user) => {
    const newStatus = user.status === "active" ? "deactivated" : "activated";
    toast.error(`${user.name}'s account has been ${newStatus}.`);
  };

  const stats = {
    total: mockUsers.length,
    active: mockUsers.filter((u) => u.status === "active").length,
    inactive: mockUsers.filter((u) => u.status === "inactive").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Create accounts, assign roles, and manage user privileges
          </p>
        </div>
        <Button onClick={() => setIsCreateDepartmentOpen(true)} className="gap-2">
          <Building className="h-4 w-4" />
          Add Department
        </Button>
        <Button onClick={() => setIsCreateRoleOpen(true)} className="gap-2">
          <UserCheck className="h-4 w-4" />
          Create Role
        </Button>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Create User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {stats.active}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Inactive Users
            </CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">
              {stats.inactive}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>All Users</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        roleColors[user.role] || "bg-gray-100 text-gray-800"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : "secondary"
                      }
                      className={
                        user.status === "active"
                          ? "bg-success/10 text-success hover:bg-success/20"
                          : ""
                      }
                    >
                      {user.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleManageRoles(user)}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Manage Roles
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleResetPassword(user)}
                        >
                          <KeyRound className="mr-2 h-4 w-4" />
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleStatus(user)}
                          className={
                            user.status === "active"
                              ? "text-destructive"
                              : "text-success"
                          }
                        >
                          {user.status === "active" ? (
                            <>
                              <UserX className="mr-2 h-4 w-4" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateUserDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
      <CreateDepartmentDialog
        open={isCreateDepartmentOpen}
        onOpenChange={setIsCreateDepartmentOpen}
      />
      <CreateRoleDialog
        open={isCreateRoleOpen}
        onOpenChange={setIsCreateRoleOpen}
      />
      <ManageRolesDialog
        open={isRolesDialogOpen}
        onOpenChange={setIsRolesDialogOpen}
        user={selectedUser}
      />
      <ResetPasswordDialog
        open={isResetPasswordOpen}
        onOpenChange={setIsResetPasswordOpen}
        user={selectedUser}
      />
    </div>
  );
}
