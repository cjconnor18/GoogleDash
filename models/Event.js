/* 
{"kind":"calendar#event",
    "etag":"\"3327068099960000\"",
    "id":"qf92rnb002362nf7hrndajhncg",
    "status":"confirmed",
    "htmlLink":"https://www.google.com/calendar/event?eid=cWY5MnJuYjAwMjM2Mm5mN2hybmRhamhuY2cgY2phbGxlbjE5ODhAbQ",
    "created":"2022-09-18T20:47:29.000Z",
    "updated":"2022-09-18T20:47:29.980Z",
    "summary":"Fake Christmas",
    "creator":{"email":"connor1252@gmail.com"},
    "organizer":{"email":"cjallen1988@gmail.com","self":true},
    "start":{"dateTime":"2022-12-17T16:00:00-06:00","timeZone":"America/Chicago"},
    "end":{"dateTime":"2022-12-17T17:00:00-06:00","timeZone":"America/Chicago"},
    "iCalUID":"qf92rnb002362nf7hrndajhncg@google.com",
    "sequence":0,
    "reminders":{"useDefault":true},
    "eventType":"default"
}

*/




class Event {
    constructor(id, summary, creator, organizer, start, end) {
        this.id = id;
        this.summary = summary;
        this.creator = creator;
        this.organizer = organizer;
        this.start = start;
        this.end = end;
    }
}

module.exports = Event;