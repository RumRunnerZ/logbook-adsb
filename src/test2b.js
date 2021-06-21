/*
 * This requires: restler
 * To install, type 'npm install restler'
 * Tested with node.js v0.6.14
 */

var util = require('util');
var restclient = require('restler');
//const cors = require('cors');

//const express = require('express');
//var restclient = express();

var fxml_url = 'http://flightxml.flightaware.com/json/FlightXML2b/';
var username = 'mailstef';
var apiKey = '276cc9f2a31caf456f98c4a35692e2ceab507e1e';

/*
restclient.get(fxml_url + 'MetarEx', {
    username: username,
    password: apiKey,
    query: {airport: 'LEVC', howMany: 1}
}).on('success', function(result, response) {
    // util.puts(util.inspect(result, true, null));
    var entry = result.MetarExResult.metar[0];
    //util.puts('The temperature at ' + entry.airport + ' is ' + entry.temp_air + 'C');
    console.log('The temperature at ' + entry.airport + ' is ' + entry.temp_air + 'C');
});
*/
/*
restclient.get(fxml_url + 'Enroute', {
    username: username,
    password: apiKey,
    query: {airport: 'EHAM', howMany: 2, filter: '', offset: 0}
}).on('success', function(result, response) {
    //util.puts('Aircraft en route to EHAM:');
    console.log('Aircraft en route to EHAM:');
    //util.puts(util.inspect(result, true, null));
    var flights = result.EnrouteResult.enroute;
    for (i in flights) {
      var flight = flights[i];
      //util.puts(util.inspect(flight));
      console.log(flight.ident + ' (' + flight.aircrafttype + ')\t' +
          flight.originName + ' (' + flight.origin + ')');
    }
});
*/

restclient.get(fxml_url + 'FlightInfoStatus', {
    username: username,
    password: apiKey,
    query: {ident: 'KLM1994', howMany: 1, offset: 3}
}).on('success', function(result, response) {
    //util.puts('Aircraft en route to EHAM:');
    console.log('Flight KLM1994:');
    //util.puts(util.inspect(result, true, null));
    var flights = result.FlightInfoStatusResult.flights;
    for (i in flights) {
      var flight = flights[i];
      //util.puts(util.inspect(flight));
      console.log(flight.ident + " " + flight.origin + ' - ' + flight.destination + " " + flight.aircrafttype + " " + flight.tailnumber);
      console.log(flight.actual_blockout_time.date + " " + flight.actual_blockout_time.time + " - " + flight.actual_blockin_time.time);


      //let unix_timestamp = 1549312452
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var dateBO = new Date(flight.actual_blockout_time.epoch * 1000);
      var dateDep = new Date(flight.actual_departure_time.epoch * 1000);
      var dateArr = new Date(flight.actual_arrival_time.epoch * 1000);
      var dateBI = new Date(flight.actual_blockin_time.epoch * 1000);



      console.log('--------');
      console.log(dateBO);
      console.log(dateDep);
      console.log(dateArr);
      console.log(dateBI);
      console.log('--------');
      console.log('--------');
      console.log('--------');
      console.log('--------');
  }
});
