"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const days = ["Mon", "Wed", "Fri"]

// Generate random activity data
const generateActivityData = () => {
  const data: number[][] = []
  for (let week = 0; week < 52; week++) {
    const weekData: number[] = []
    for (let day = 0; day < 7; day++) {
      weekData.push(Math.floor(Math.random() * 5))
    }
    data.push(weekData)
  }
  return data
}

const getActivityColor = (level: number) => {
  const colors = ["bg-muted", "bg-[#0077C0]/20", "bg-[#0077C0]/40", "bg-[#0077C0]/60", "bg-[#0077C0]"]
  return colors[level] || colors[0]
}

export function ActivityHeatmap() {
  const [view, setView] = useState<"monthly" | "weekly">("monthly")
  const [activityData, setActivityData] = useState<number[][]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setActivityData(generateActivityData())
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering until client-side
  if (!mounted) {
    return (
      <Card className="rounded-2xl border-none bg-card shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-xl font-bold text-foreground">Activity</CardTitle>
          <div className="flex gap-1 rounded-lg bg-muted p-1">
            <Button
              variant="default"
              size="sm"
              className="rounded-md px-4 py-1.5 text-sm bg-primary text-primary-foreground"
            >
              Monthly
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-md px-4 py-1.5 text-sm"
            >
              Weekly
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="mb-2 flex pl-10">
            {months.map((month, i) => (
              <span
                key={month}
                className="flex-1 text-center text-sm text-muted-foreground"
                style={{ display: i % 2 === 0 ? "block" : "none" }}
              >
                {month}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col justify-around py-1">
              {days.map((day) => (
                <span key={day} className="text-sm text-muted-foreground">
                  {day}
                </span>
              ))}
            </div>
            <div className="flex flex-1 gap-[3px] overflow-hidden">
              {/* Empty placeholder during SSR */}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end gap-2">
            <span className="text-sm text-muted-foreground">Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className={`h-3.5 w-3.5 rounded-[4px] ${getActivityColor(level)}`} />
            ))}
            <span className="text-sm text-muted-foreground">More</span>
          </div>
        </CardContent>
      </Card>
    )
  }


  return (
    <Card className="rounded-2xl border-none bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-xl font-bold text-foreground">Activity</CardTitle>
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          <Button
            variant={view === "monthly" ? "default" : "ghost"}
            size="sm"
            className={`rounded-md px-4 py-1.5 text-sm ${view === "monthly" ? "bg-primary text-primary-foreground" : ""}`}
            onClick={() => setView("monthly")}
          >
            Monthly
          </Button>
          <Button
            variant={view === "weekly" ? "default" : "ghost"}
            size="sm"
            className={`rounded-md px-4 py-1.5 text-sm ${view === "weekly" ? "bg-primary text-primary-foreground" : ""}`}
            onClick={() => setView("weekly")}
          >
            Weekly
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {/* Month labels */}
        <div className="mb-2 flex pl-10">
          {months.map((month, i) => (
            <span
              key={month}
              className="flex-1 text-center text-sm text-muted-foreground"
              style={{ display: i % 2 === 0 ? "block" : "none" }}
            >
              {month}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {/* Day labels */}
          <div className="flex flex-col justify-around py-1">
            {days.map((day) => (
              <span key={day} className="text-sm text-muted-foreground">
                {day}
              </span>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="flex flex-1 gap-[3px] overflow-hidden">
            {activityData.slice(0, view === "weekly" ? 12 : 52).map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((activity, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`h-3.5 w-3.5 rounded-[4px] ${getActivityColor(activity)} transition-colors hover:ring-2 hover:ring-primary/50`}
                    title={`${activity} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-end gap-2">
          <span className="text-sm text-muted-foreground">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`h-3.5 w-3.5 rounded-[4px] ${getActivityColor(level)}`} />
          ))}
          <span className="text-sm text-muted-foreground">More</span>
        </div>
      </CardContent>
    </Card>
  )
}
