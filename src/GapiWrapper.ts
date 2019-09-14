import Event = gapi.client.calendar.Event;

export class GapiWrapper {
  constructor(private gapi: any) {
  }

  isSignedIn(): boolean {
    return this.gapi.auth2.getAuthInstance().isSignedIn.get();
  }

  signIn(): void {
    this.gapi.auth2.getAuthInstance().signIn();
  }

  signOut(): void {
    this.gapi.auth2.getAuthInstance().signOut();
  }

  eventsList() {
    return this.gapi.client.calendar.events.list({
      "calendarId": "primary",
      "timeMin": (new Date()).toISOString(),
      "showDeleted": false,
      "singleEvents": true,
      "maxResults": 10,
      "orderBy": "startTime"
    });
  }

  add30Minutes(events: Event[]) {
    const batch = this.gapi.client.newBatch();

    events
      .filter(event => event.start !== undefined)
      .map(event => {

        const start = event.start.date ? {
          date: event.start.date
        } : {};

        return this.gapi.client.request({
          path: `calendar/v3/calendars/primary/events/${event.id}`
          // body: {
          //   start,
          // }
        });
      })
      .forEach(req => {
        batch.add(req);
      });


    return batch
      .then((a) => console.log(a))
      .catch(e => console.log(e));
  }
}