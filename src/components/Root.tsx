import React, { useState, useEffect } from "react"
import { useGapi } from "../gapi"
import { GapiWrapper } from "../GapiWrapper"
import Event = gapi.client.calendar.Event
import Events = gapi.client.calendar.Events
import Response = gapi.client.Response

interface RootState {
  upcomingEvents?: Event[]
}

const handleAdd30Minutes = (gapiWrapper: GapiWrapper, events?: Event[]) => {
  if (events === undefined) return

  gapiWrapper.add30Minutes(events)
}

export const Root = () => {
  const [state, setState] = useState<RootState>({
    upcomingEvents: [],
  })

  const { gapiWrapper } = useGapi()

  useEffect(() => {
    if (gapiWrapper && gapiWrapper.isSignedIn()) {
      gapiWrapper
        .eventsList()
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
  }, [gapiWrapper])

  return (
    <div>
      {gapiWrapper ? (
        gapiWrapper.isSignedIn() ? (
          <>
            <button onClick={() => handleAdd30Minutes(gapiWrapper, state.upcomingEvents)}>Add 30 minutes</button>
            <br />
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
          ? state.upcomingEvents.map(
              (event: Event) => event.summary + (event.start.dateTime || event.start.date) + "\n"
            )
          : "No upcoming events found."}
      </pre>
    </div>
  )
}
