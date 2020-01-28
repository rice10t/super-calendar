import React, { FC } from "react"
import styles from "./Calendar.css"
import { CalendarHead } from "./CalendarHead"
import { CalendarBody } from "./CalendarBody"
import Event = gapi.client.calendar.Event

export const Calendar: FC<{ events: Array<Event> }> = (props) => {

  return (
    <div className={styles.root}>
      <CalendarHead/>
      <CalendarBody events={props.events}/>
    </div>
  )
}