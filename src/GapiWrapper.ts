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

    const eventIds = events
      .map(event => event.id)
      .filter((eventId): eventId is string => eventId !== undefined);

    const requests = eventIds.map(eventId => {
      return this.gapi.client.calendar.events.patch({
        calendarId: "",
        eventId: eventId
      });
    });

    return batch.add(requests)
      .then((a) => console.log(a))
      .catch(e => console.log(e));
  }
}