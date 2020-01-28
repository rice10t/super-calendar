import React, { useState, useEffect } from "react"
import { useGapi } from "../gapi"
import { GapiWrapper } from "../GapiWrapper"
import Event = gapi.client.calendar.Event
import Events = gapi.client.calendar.Events
import Response = gapi.client.Response
import { Calendar } from "./Calendar"

interface RootState {
  upcomingEvents?: Event[]
  todaysEvents?: Event[]
}

const handleAdd30Minutes = (gapiWrapper: GapiWrapper, events?: Event[]) => {
  if (events === undefined) return

  gapiWrapper.add30Minutes(events)
}

export const Root = () => {
  const [state, setState] = useState<RootState>({
    upcomingEvents: undefined,
    todaysEvents: undefined,
  })

  const { gapiWrapper } = useGapi()

  useEffect(() => {
    if (gapiWrapper && gapiWrapper.isSignedIn()) {
      gapiWrapper
        .upcomingEvents()
        .then((response: Response<Events>) => {
          const events = response.result.items

          setState(prevState => ({
            ...prevState,
            upcomingEvents: events,
          }))
        })
        .catch((error: any) => {
          console.log(error)
        })
    }

    if (gapiWrapper && gapiWrapper.isSignedIn()) {
      gapiWrapper
        .todayEvents()
        .then((res: Response<Events>) => {
          const events = res.result.items

          setState(prevState => ({
            ...prevState,
            todaysEvents: events,
          }))
        })
        .catch((err: any) => {
          console.log(err)
        })
    }
  }, [gapiWrapper])

  return (
    <div>
      {gapiWrapper ? (
        gapiWrapper.isSignedIn() ? (
          <>
            <button onClick={() => gapiWrapper.signOut()}>Sign Out</button>
          </>
        ) : (
          <>
            <button onClick={() => gapiWrapper.signIn()}>Authorize</button>
          </>
        )
      ) : null}

      <pre style={{ whiteSpace: "pre-wrap" }}>
        {state.upcomingEvents && state.upcomingEvents.length > 0
          ? (<div>
            <button onClick={() => handleAdd30Minutes(gapiWrapper, state.upcomingEvents)}>Add 30 minutes</button>
            <br/>
            {state.upcomingEvents.map(
              (event: Event) => event.summary + (event.start.dateTime || event.start.date) + "\n",
            )}
            <br/>
          </div>)
          : "No upcoming events found."}

        {state.todaysEvents && state.todaysEvents.length > 0 ? (
          <Calendar events={state.todaysEvents}/>
        ) : (
          "hogehoge"
        )}
      </pre>
    </div>
  )
}
