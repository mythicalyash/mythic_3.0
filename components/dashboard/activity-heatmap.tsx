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
  const [yearData, setYearData] = useState<{ name: string; days: number[] }[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const data = []
    const currentYear = new Date().getFullYear()

    for (let i = 0; i < 12; i++) {
      const daysInMonth = new Date(currentYear, i + 1, 0).getDate()
      const monthData = []
      for (let d = 0; d < daysInMonth; d++) {
        monthData.push(Math.floor(Math.random() * 5))
      }
      data.push({
        name: months[i],
        days: monthData
      })
    }

    setYearData(data)
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Card className="rounded-2xl border-none bg-card shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-foreground">Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full items-end justify-between gap-2 overflow-x-auto pb-2">
          {yearData.map((month) => (
            <div key={month.name} className="flex flex-col gap-2">
              <div className="grid grid-rows-7 grid-flow-col gap-1">
                {month.days.map((level, i) => (
                  <div
                    key={i}
                    className={`h-2.5 w-2.5 rounded-[2px] ${getActivityColor(level)} transition-all hover:scale-125 hover:ring-1 hover:ring-primary/50`}
                    title={`${month.name} ${i + 1}: ${level} contributions`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-muted-foreground text-center">{month.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <span className="text-sm text-muted-foreground">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`h-3 w-3 rounded-sm ${getActivityColor(level)}`} />
          ))}
          <span className="text-sm text-muted-foreground">More</span>
        </div>
      </CardContent>
    </Card>
  )
}
