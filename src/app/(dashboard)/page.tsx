import { ProfileSummary } from "@/components/dashboard/profile-summary"
import { ActivityHeatmap } from "@/components/dashboard/activity-heatmap"
import { Announcements } from "@/components/dashboard/announcements"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
        <p className="text-lg text-muted-foreground">Here's what's happening with your account today.</p>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Announcements + Activity (stacked vertically) */}
        <div className="space-y-6 lg:col-span-2">
          <Announcements />
          <div className="hidden lg:block">
            <ActivityHeatmap />
          </div>
        </div>

        {/* Right Column - Profile + Recent */}
        <div className="space-y-6">
          <div className="hidden lg:block">
            <ProfileSummary />
          </div>
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
