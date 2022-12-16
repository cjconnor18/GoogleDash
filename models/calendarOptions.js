const {google} = require('googleapis');
const Event = require('./Event');
const Calendar = require("./Calendar");

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function getCalendars(auth) {
  const calendar = google.calendar({version: 'v3', auth});
    const res = await calendar.calendarList.list({
      maxResults: 12
    });
    let items = res.data.items;
    let calendars = []
    for(let i = 0; i < items.length; i++) {
      calendars.push(new Calendar(
        items[i].id,
        items[i].summary,
        items[i].accessRole
      ))
    }
    console.log(calendars); // while no page set up yet

    return calendars;
  
}



async function listEvents(auth, arrOfIds = []) {
    const calendar = google.calendar({version: 'v3', auth});
    console.log("arr of ids" , arrOfIds)
    let res = [];
    if(arrOfIds.length == 0) {
      res = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 100,
        singleEvents: true,
        orderBy: 'startTime',
      }).then( (response) => {
        for(let i = 0; i < response.data.items.length; i++) {
          res.push(response.data.items[i]);
        }
        return res;
      });

    } else {
      
      for(let i = 0; i < arrOfIds.length; i++) {
        await calendar.events.list({
          calendarId: arrOfIds[i],
          timeMin: new Date().toISOString(),
          maxResults: 100,
          singleEvents: true,
          orderBy: 'startTime',
        }).then( (response) => {
          let items = response.data.items;
          for(let i = 0; i < items.length; i++) {
            res.push(items[i]);
          }
        })

      }
      
    }

    let listOfEvents = [];

    for(let i = 0; i < res.length; i++ ) {

      listOfEvents.push(
        new Event(res[i].id, 
                  res[i].summary,
                  res[i].creator.email,
                  res[i].organizer.email,
                  res[i].start,
                  res[i].end ));
    
    }

    return listOfEvents;
  }

  module.exports = {
    listEvents : listEvents,
    getCalendars : getCalendars
  };