var express = require('express');
const { calendar } = require('googleapis/build/src/apis/calendar');
var router = express.Router();
const authorization = require("../models/authorization");
const calendarOptions = require("../models/calendarOptions");



router.get('/', function(req, res, next) {
    authorization().then( (client) => {
        calendarOptions.getCalendars(client).then( (calendars) => {
            console.log(calendars);
            res.send(calendars);
        })
    })
})

router.get('/display', function(req, res, next) {
    let calendarIds;
    try{
        calendarIds =  JSON.parse(req.query.calendarIds);
    } catch(err) {
        calendarIds = [];
    }
    
    console.log("Inside the router: ", calendarIds)
    if(!calendarIds) {
        authorization().then( (client) => {
            calendarOptions.listEvents(client).then( (events) => {
                res.send(events);
            })
          })
    } else {
        authorization().then( (client) => {
            calendarOptions.listEvents(client, calendarIds).then( (events) => {
                res.send(events);
            })
          })

    }
  
});

module.exports = router;
