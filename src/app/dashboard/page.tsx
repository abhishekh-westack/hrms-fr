"use client"

import { Hourglass } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)]">
      <Card className="w-[380px] shadow-md border border-gray-200">
        <CardContent className="flex flex-col items-center gap-3 py-10">
          <Hourglass className="w-10 h-10 text-blue-600 animate-pulse" />
          <h1 className="text-xl font-semibold text-gray-800">Coming Soon</h1>
          <p className="text-sm text-gray-500 text-center">
            We’re working on this Dashboard page. New analytics, charts, and reports will be here soon.
          </p>

          <Button variant="default" className="mt-3">
            Notify Me
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
