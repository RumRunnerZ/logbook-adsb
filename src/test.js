/*
 * This requires: restler
 * To install, type 'npm install restler'
 * Tested with node.js v0.6.14
 */

var util = require('util');
var restclient = require('restler');

var fxml_url = 'http://flightxml.flightaware.com/json/FlightXML2/';
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

restclient.get(fxml_url + 'FlightInfo', {
    username: username,
    password: apiKey,
    query: {ident: 'KLM1474', howMany: 3, offset: 2}
}).on('success', function(result, response) {
    //util.puts('Aircraft en route to EHAM:');
    console.log('Flight KLM1474:');
    //util.puts(util.inspect(result, true, null));
    var flights = result.FlightInfoResult.flights;
    for (i in flights) {
      var flight = flights[i];
      //util.puts(util.inspect(flight));
      console.log(flight.ident + " " + flight.origin + ' - ' + flight.destination + " " + flight.aircrafttype + ' ' +
          flight.actualdeparturetime + " " + flight.actualarrivaltime + " " + flight.filed_departuretime);

      //let unix_timestamp = 1549312452
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var etd = new Date(flight.filed_departuretime * 1000);
      var dateDep = new Date(flight.actualdeparturetime * 1000);
      var dateArr = new Date(flight.actualarrivaltime * 1000);
      // Hours part from the timestamp
      var hoursDep = dateDep.getHours();
      var hoursArr = dateArr.getHours();
      // Minutes part from the timestamp
      var minutesDep = "0" + dateDep.getMinutes();
      var minutesArr = "0" + dateArr.getMinutes();
      // Seconds part from the timestamp
      var secondsDep = "0" + dateDep.getSeconds();
      var secondsArr = "0" + dateArr.getSeconds();

      // Will display time in 10:30:23 format
      var formattedTimeDep = hoursDep + ':' + minutesDep.substr(-2) + ':' + secondsDep.substr(-2);
      var formattedTimeArr = hoursArr + ':' + minutesArr.substr(-2) + ':' + secondsArr.substr(-2);

      console.log('etd: ');
      console.log(etd);
      console.log('--------');
      console.log(dateDep);
      console.log(formattedTimeDep);
      console.log(dateArr);
      console.log(formattedTimeArr);
      console.log('--------');
      console.log('--------');
      console.log('--------');
      console.log('--------');
  }
});
