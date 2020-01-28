import React, { FC } from "react"
import styles from "./CalendarBody.css"
import Event = gapi.client.calendar.Event

const Time: FC = ({ children }) => {
  return (
    <div className={styles.timeContainer}>
      <div className={styles.time}>{children}</div>
    </div>
  )
}

const CalendarEvent: FC<{ event: Event }> = (props) => {
  // const start = props.event.start?.dateTime
  // const top = start *

  return (
    <div className={styles.event} style={{
      top: top + "px"
    }}>
      {props.event.summary}
    </div>
  )
}

export const CalendarBody: FC<{ events: Array<Event> }> = (props) => {
  return (
    <div className={styles.root}>
      <div className={styles.times}>
        <Time></Time>
        <Time>01:00</Time>
        <Time>02:00</Time>
        <Time>03:00</Time>
        <Time>04:00</Time>
        <Time>05:00</Time>
        <Time>06:00</Time>
        <Time>07:00</Time>
        <Time>08:00</Time>
        <Time>09:00</Time>
        <Time>10:00</Time>
        <Time>11:00</Time>
        <Time>12:00</Time>
        <Time>13:00</Time>
        <Time>14:00</Time>
        <Time>15:00</Time>
        <Time>16:00</Time>
        <Time>17:00</Time>
        <Time>18:00</Time>
        <Time>19:00</Time>
        <Time>20:00</Time>
        <Time>21:00</Time>
        <Time>22:00</Time>
        <Time>23:00</Time>
      </div>
      <div className={styles.eventsContainer}>
        <div className={styles.lines}>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
        </div>
        {props.events.map((item) => {
          return <CalendarEvent event={item}/>
        })}
      </div>
    </div>
  )
}