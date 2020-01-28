import React from "react"
import { format } from "date-fns/fp"

export const CalendarHead = () => {
  return (
    <div>
      {format("yyyy-MM-dd", new Date())}
    </div>
  )
}