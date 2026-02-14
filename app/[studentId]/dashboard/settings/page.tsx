"use client"

import { useState, useEffect } from "react"
import {
  Bell,
  Lock,
  User,
  Mail,
  Globe,
  LogOut,
  Download,
  Eye,
  EyeOff,
  ChevronRight,
  Settings,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingWrapper } from "@/components/loading-wrapper"
import {
  DashboardStatsSkeleton,
} from "@/components/skeletons/dashboard-skeleton"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [settingsModal, setSettingsModal] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black tracking-tight">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your account preferences and privacy</p>
      </div>

      {/* Settings Grid */}
      <LoadingWrapper
        isLoading={isLoading}
        skeleton={<DashboardStatsSkeleton />}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Account Settings */}
          <Card 
            className="neo-brutalism-card cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSettingsModal("account")}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 border-2 border-foreground">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="font-black text-sm mb-1">Account Settings</h3>
              <p className="text-xs text-muted-foreground">Update your profile information</p>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card 
            className="neo-brutalism-card cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSettingsModal("security")}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-red-500/10 border-2 border-foreground">
                  <Lock className="h-5 w-5 text-red-600" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="font-black text-sm mb-1">Privacy & Security</h3>
              <p className="text-xs text-muted-foreground">Change password and security options</p>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card 
            className="neo-brutalism-card cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSettingsModal("notifications")}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500/10 border-2 border-foreground">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="font-black text-sm mb-1">Notifications</h3>
              <p className="text-xs text-muted-foreground">Configure alert preferences</p>
            </CardContent>
          </Card>

          {/* Email Preferences */}
          <Card 
            className="neo-brutalism-card cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSettingsModal("email")}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-yellow-500/10 border-2 border-foreground">
                  <Mail className="h-5 w-5 text-yellow-600" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="font-black text-sm mb-1">Email Preferences</h3>
              <p className="text-xs text-muted-foreground">Manage email communications</p>
            </CardContent>
          </Card>

          {/* Language & Region */}
          <Card 
            className="neo-brutalism-card cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSettingsModal("language")}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-purple-500/10 border-2 border-foreground">
                  <Globe className="h-5 w-5 text-purple-600" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="font-black text-sm mb-1">Language & Region</h3>
              <p className="text-xs text-muted-foreground">Choose language and timezone</p>
            </CardContent>
          </Card>

          {/* Data & Privacy */}
          <Card 
            className="neo-brutalism-card cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSettingsModal("data")}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-500/10 border-2 border-foreground">
                  <Download className="h-5 w-5 text-green-600" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="font-black text-sm mb-1">Data & Privacy</h3>
              <p className="text-xs text-muted-foreground">Export data and privacy controls</p>
            </CardContent>
          </Card>
        </div>
      </LoadingWrapper>

      {/* Account Settings Modal */}
      {settingsModal === "account" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="neo-brutalism-card w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b-2 border-foreground p-4">
              <h2 className="text-lg font-black">Account Settings</h2>
              <button 
                onClick={() => setSettingsModal(null)}
                className="rounded-md p-1 hover:bg-muted"
              >
                ✕
              </button>
            </div>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">First Name</Label>
                <Input 
                  defaultValue="Raj" 
                  className="border-2 border-foreground"
                  placeholder="Enter first name"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Last Name</Label>
                <Input 
                  defaultValue="Patel" 
                  className="border-2 border-foreground"
                  placeholder="Enter last name"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Date of Birth</Label>
                <Input 
                  type="date"
                  defaultValue="2008-05-15"
                  className="border-2 border-foreground"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Phone Number</Label>
                <Input 
                  defaultValue="+91 98765 43210"
                  className="border-2 border-foreground"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">School/Institute</Label>
                <Input 
                  defaultValue="St. Xavier's School, Mumbai"
                  className="border-2 border-foreground"
                  placeholder="Enter institution"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1 neo-brutalism-button text-sm">Save Changes</Button>
                <Button variant="outline" className="neo-brutalism-button-outline text-sm bg-transparent" onClick={() => setSettingsModal(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Security Modal */}
      {settingsModal === "security" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="neo-brutalism-card w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b-2 border-foreground p-4">
              <h2 className="text-lg font-black">Privacy & Security</h2>
              <button 
                onClick={() => setSettingsModal(null)}
                className="rounded-md p-1 hover:bg-muted"
              >
                ✕
              </button>
            </div>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Current Password</Label>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"}
                    className="border-2 border-foreground pr-10"
                    placeholder="Enter current password"
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">New Password</Label>
                <div className="relative">
                  <Input 
                    type={showConfirmPassword ? "text" : "password"}
                    className="border-2 border-foreground pr-10"
                    placeholder="Enter new password"
                  />
                  <button 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Confirm Password</Label>
                <Input 
                  type="password"
                  className="border-2 border-foreground"
                  placeholder="Confirm new password"
                />
              </div>
              <div className="rounded-md border-2 border-yellow-600 bg-yellow-500/10 p-3">
                <p className="text-xs font-bold text-yellow-800 mb-1">Password Requirements:</p>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>• At least 8 characters</li>
                  <li>• Contains uppercase and lowercase letters</li>
                  <li>• Contains numbers and special characters</li>
                </ul>
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1 neo-brutalism-button text-sm">Change Password</Button>
                <Button variant="outline" className="neo-brutalism-button-outline text-sm bg-transparent" onClick={() => setSettingsModal(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notifications Modal */}
      {settingsModal === "notifications" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="neo-brutalism-card w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b-2 border-foreground p-4">
              <h2 className="text-lg font-black">Notifications</h2>
              <button 
                onClick={() => setSettingsModal(null)}
                className="rounded-md p-1 hover:bg-muted"
              >
                ✕
              </button>
            </div>
            <CardContent className="space-y-4 pt-4">
              {[
                { label: "Assignment Submissions", desc: "Get notified when assignments are due" },
                { label: "Grade Updates", desc: "Receive alerts when grades are posted" },
                { label: "Course Updates", desc: "Stay informed about new course materials" },
                { label: "Teacher Messages", desc: "Notifications from your teachers" },
                { label: "Class Announcements", desc: "Important class-wide announcements" },
                { label: "Performance Reports", desc: "Weekly performance summaries" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-md border-2 border-foreground p-3">
                  <div>
                    <p className="font-bold text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
              ))}
              <div className="flex gap-2 pt-4">
                <Button className="flex-1 neo-brutalism-button text-sm">Save Preferences</Button>
                <Button variant="outline" className="neo-brutalism-button-outline text-sm bg-transparent" onClick={() => setSettingsModal(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Email Preferences Modal */}
      {settingsModal === "email" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="neo-brutalism-card w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b-2 border-foreground p-4">
              <h2 className="text-lg font-black">Email Preferences</h2>
              <button 
                onClick={() => setSettingsModal(null)}
                className="rounded-md p-1 hover:bg-muted"
              >
                ✕
              </button>
            </div>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Email Address</Label>
                <Input 
                  defaultValue="raj.patel@email.com"
                  type="email"
                  className="border-2 border-foreground"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Secondary Email</Label>
                <Input 
                  type="email"
                  className="border-2 border-foreground"
                  placeholder="Add secondary email"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">Email Frequency</Label>
                <div className="space-y-2">
                  {["Instant", "Daily", "Weekly", "Never"].map((freq) => (
                    <div key={freq} className="flex items-center gap-2">
                      <input type="radio" name="frequency" value={freq} defaultChecked={freq === "Daily"} className="h-4 w-4" />
                      <label className="text-xs cursor-pointer">{freq}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1 neo-brutalism-button text-sm">Save Preferences</Button>
                <Button variant="outline" className="neo-brutalism-button-outline text-sm bg-transparent" onClick={() => setSettingsModal(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Language & Region Modal */}
      {settingsModal === "language" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="neo-brutalism-card w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b-2 border-foreground p-4">
              <h2 className="text-lg font-black">Language & Region</h2>
              <button 
                onClick={() => setSettingsModal(null)}
                className="rounded-md p-1 hover:bg-muted"
              >
                ✕
              </button>
            </div>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Language</Label>
                <select className="flex h-9 w-full rounded-md border-2 border-foreground bg-background px-3 text-sm">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Timezone</Label>
                <select className="flex h-9 w-full rounded-md border-2 border-foreground bg-background px-3 text-sm">
                  <option selected>IST (UTC+5:30)</option>
                  <option>PST (UTC-8:00)</option>
                  <option>EST (UTC-5:00)</option>
                  <option>GMT (UTC+0:00)</option>
                  <option>CET (UTC+1:00)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Date Format</Label>
                <select className="flex h-9 w-full rounded-md border-2 border-foreground bg-background px-3 text-sm">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1 neo-brutalism-button text-sm">Save Settings</Button>
                <Button variant="outline" className="neo-brutalism-button-outline text-sm bg-transparent" onClick={() => setSettingsModal(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Data & Privacy Modal */}
      {settingsModal === "data" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="neo-brutalism-card w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b-2 border-foreground p-4">
              <h2 className="text-lg font-black">Data & Privacy</h2>
              <button 
                onClick={() => setSettingsModal(null)}
                className="rounded-md p-1 hover:bg-muted"
              >
                ✕
              </button>
            </div>
            <CardContent className="space-y-4 pt-4">
              <div className="rounded-md border-2 border-blue-600 bg-blue-500/10 p-3 space-y-3">
                <h3 className="font-bold text-sm text-blue-900">Export Your Data</h3>
                <p className="text-xs text-blue-800">Download a copy of your data in CSV or PDF format</p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 neo-brutalism-button-sm text-xs">
                    <Download className="h-3 w-3 mr-1" /> CSV
                  </Button>
                  <Button size="sm" className="flex-1 neo-brutalism-button-sm text-xs">
                    <Download className="h-3 w-3 mr-1" /> PDF
                  </Button>
                </div>
              </div>

              <div className="rounded-md border-2 border-yellow-600 bg-yellow-500/10 p-3 space-y-3">
                <h3 className="font-bold text-sm text-yellow-900">Delete Account</h3>
                <p className="text-xs text-yellow-800">Permanently delete your account and all associated data</p>
                <Button size="sm" variant="outline" className="w-full neo-brutalism-button-outline text-xs">
                  <LogOut className="h-3 w-3 mr-1" /> Delete Account
                </Button>
              </div>

              <div className="rounded-md border-2 border-green-600 bg-green-500/10 p-3 space-y-3">
                <h3 className="font-bold text-sm text-green-900">Privacy Policy</h3>
                <p className="text-xs text-green-800">Review our data protection and privacy practices</p>
                <Button size="sm" className="w-full neo-brutalism-button-sm text-xs">
                  View Policy
                </Button>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 neo-brutalism-button-outline text-sm bg-transparent" onClick={() => setSettingsModal(null)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
