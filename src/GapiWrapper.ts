import { parseISO, addMinutes, format } from "date-fns/fp"
import flow from "lodash/fp/flow"
import Event = gapi.client.calendar.Event
import EventDateTime = gapi.client.calendar.EventDateTime

export class GapiWrapper {
  constructor(private gapi: any) {}

  isSignedIn(): boolean {
    return this.gapi.auth2.getAuthInstance().isSignedIn.get()
  }

  signIn(): void {
    this.gapi.auth2.getAuthInstance().signIn()
  }

  signOut(): void {
    this.gapi.auth2.getAuthInstance().signOut()
  }

  eventsList() {
    return this.gapi.client.calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime",
    })
  }

  add30Minutes(events: Event[]) {
    const add30MinutesAndFormatWithTimeZone: (dateTime: string) => string = flow(
      parseISO,
      addMinutes(30),
      format("yyyy-MM-dd'T'HH:mm:ssxxx")
    )
    const add30MinutesAndFormatWithoutTimeZone: (dateTime: string) => string = flow(
      parseISO,
      addMinutes(30),
      format("yyyy-MM-dd'T'HH:mm:ss")
    )

    const batch = this.gapi.client.newBatch()

    events
      .filter(event => event.start !== undefined)
      .map(event => {
        let start: EventDateTime | null
        if (event.start!.date !== undefined) {
          start = { date: event.start!.date }
        } else {
          if (event.start!.timeZone === undefined) {
            start = { dateTime: add30MinutesAndFormatWithTimeZone(event.start!.dateTime!) }
          } else {
            start = {
              dateTime: add30MinutesAndFormatWithoutTimeZone(event.start!.dateTime!),
              timeZone: event.start!.timeZone,
            }
          }
        }

        let end: EventDateTime | null
        if (event.end!.date !== undefined) {
          end = { date: event.end!.date }
        } else {
          if (event.end!.timeZone === undefined) {
            end = { dateTime: add30MinutesAndFormatWithTimeZone(event.end!.dateTime!) }
          } else {
            end = {
              dateTime: add30MinutesAndFormatWithoutTimeZone(event.end!.dateTime!),
              timeZone: event.end!.timeZone,
            }
          }
        }

        return this.gapi.client.calendar.events.patch({
          calendarId: "primary",
          eventId: event.id,
          start,
          end,
        })
      })
      .forEach(req => {
        batch.add(req)
      })

    return batch.then(a => console.log(a)).catch(e => console.log(e))
  }
}
