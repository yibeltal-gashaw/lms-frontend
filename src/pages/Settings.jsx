import { useContext, useState } from "react";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Settings as SettingsIcon, Bell, Building2, Shield, Palette } from "lucide-react";
import { ThemeContext } from "@/contexts/ThemeContext";

const Settings = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

  const { hasPermission } = useRoleAccess();
  const isAdmin = hasPermission("canManageUsers");
  const [compactMode, setCompactMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [serviceRequestAlerts, setServiceRequestAlerts] = useState(true);
  const [approvalAlerts, setApprovalAlerts] = useState(true);
  const [maintenanceReminders, setMaintenanceReminders] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);

  // Lab/Organization Config (Admin only)
  const [organizationName, setOrganizationName] = useState("University Lab");
  const [departmentPrefix, setDepartmentPrefix] = useState("UL");
  const [fiscalYearStart, setFiscalYearStart] = useState("january");
  const [maintenanceSchedule, setMaintenanceSchedule] = useState("monthly");
  const [autoArchiveDays, setAutoArchiveDays] = useState("90");

  // Security & Access (Admin only)
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [requireMFA, setRequireMFA] = useState(false);
  const [passwordExpiry, setPasswordExpiry] = useState("90");
  const [loginAttempts, setLoginAttempts] = useState("5");
  const [auditLogging, setAuditLogging] = useState(true);

  const handleSaveSettings = () => {
    // In production, this would save to backend
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage system-wide preferences and configurations</p>
        </div>
      </div>

      <Tabs defaultValue="display" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="display" className="gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Display</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          {isAdmin && (
            <>
              <TabsTrigger value="organization" className="gap-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Organization</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
            </>
          )}
        </TabsList>

        {/* Theme & Display Settings */}
        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle>Theme & Display</CardTitle>
              <CardDescription>Customize the appearance and layout of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="theme">Theme</Label>
                  <p className="text-sm text-muted-foreground">Select your preferred color theme</p>
                </div>
                <Select value={theme} onValueChange={toggleTheme}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">Reduce spacing and padding throughout the UI</p>
                </div>
                <Switch id="compact" checked={compactMode} onCheckedChange={setCompactMode} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations">Animations</Label>
                  <p className="text-sm text-muted-foreground">Enable smooth transitions and animations</p>
                </div>
                <Switch id="animations" checked={animationsEnabled} onCheckedChange={setAnimationsEnabled} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sidebar">Collapsed Sidebar</Label>
                  <p className="text-sm text-muted-foreground">Start with sidebar collapsed by default</p>
                </div>
                <Switch id="sidebar" checked={sidebarCollapsed} onCheckedChange={setSidebarCollapsed} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notif">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch id="email-notif" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notif">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                </div>
                <Switch id="push-notif" checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="service-alerts">Service Request Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified about service request updates</p>
                </div>
                <Switch id="service-alerts" checked={serviceRequestAlerts} onCheckedChange={setServiceRequestAlerts} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="approval-alerts">Approval Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when items need your approval</p>
                </div>
                <Switch id="approval-alerts" checked={approvalAlerts} onCheckedChange={setApprovalAlerts} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-reminders">Maintenance Reminders</Label>
                  <p className="text-sm text-muted-foreground">Receive reminders for scheduled maintenance</p>
                </div>
                <Switch id="maintenance-reminders" checked={maintenanceReminders} onCheckedChange={setMaintenanceReminders} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="daily-digest">Daily Digest</Label>
                  <p className="text-sm text-muted-foreground">Receive a daily summary email instead of individual notifications</p>
                </div>
                <Switch id="daily-digest" checked={dailyDigest} onCheckedChange={setDailyDigest} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lab/Organization Config (Admin only) */}
        {isAdmin && (
          <TabsContent value="organization">
            <Card>
              <CardHeader>
                <CardTitle>Organization Configuration</CardTitle>
                <CardDescription>Configure organization-wide settings and defaults</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input 
                      id="org-name" 
                      value={organizationName} 
                      onChange={(e) => setOrganizationName(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dept-prefix">Department Prefix</Label>
                    <Input 
                      id="dept-prefix" 
                      value={departmentPrefix} 
                      onChange={(e) => setDepartmentPrefix(e.target.value)} 
                    />
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="fiscal-year">Fiscal Year Start</Label>
                    <p className="text-sm text-muted-foreground">Set when your fiscal year begins</p>
                  </div>
                  <Select value={fiscalYearStart} onValueChange={setFiscalYearStart}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="january">January</SelectItem>
                      <SelectItem value="april">April</SelectItem>
                      <SelectItem value="july">July</SelectItem>
                      <SelectItem value="october">October</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-schedule">Default Maintenance Schedule</Label>
                    <p className="text-sm text-muted-foreground">Default schedule for new equipment</p>
                  </div>
                  <Select value={maintenanceSchedule} onValueChange={setMaintenanceSchedule}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-archive">Auto-Archive Records (Days)</Label>
                    <p className="text-sm text-muted-foreground">Automatically archive old records</p>
                  </div>
                  <Select value={autoArchiveDays} onValueChange={setAutoArchiveDays}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Security & Access (Admin only) */}
        {isAdmin && (
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security & Access Control</CardTitle>
                <CardDescription>Configure security policies and access settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="session-timeout">Session Timeout (Minutes)</Label>
                    <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                  </div>
                  <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-mfa">Require Multi-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Enforce MFA for all users</p>
                  </div>
                  <Switch id="require-mfa" checked={requireMFA} onCheckedChange={setRequireMFA} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-expiry">Password Expiry (Days)</Label>
                    <p className="text-sm text-muted-foreground">Force password change after period</p>
                  </div>
                  <Select value={passwordExpiry} onValueChange={setPasswordExpiry}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="login-attempts">Max Login Attempts</Label>
                    <p className="text-sm text-muted-foreground">Lock account after failed attempts</p>
                  </div>
                  <Select value={loginAttempts} onValueChange={setLoginAttempts}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                      <SelectItem value="10">10 attempts</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="audit-logging">Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all user actions for compliance</p>
                  </div>
                  <Switch id="audit-logging" checked={auditLogging} onCheckedChange={setAuditLogging} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} size="lg">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
