export default function getFlightData(flight) {

  var restclient = require('restler');





  var fxml_url = 'http://flightxml.flightaware.com/json/FlightXML2b/';
  var username = 'mailstef';
  var apiKey = '276cc9f2a31caf456f98c4a35692e2ceab507e1e';

  var results = [];
  var i = 0;



    restclient.get(fxml_url + 'FlightInfoStatus', {
        username: username,
        password: apiKey,
        query: {ident: flight, howMany: 1, offset: 2}
    }).on('success', function(result, response) {
        var flights = result.FlightInfoStatusResult.flights;
        console.log('Flight ' + flight + ' :');
        for (i in flights) {
          var flight = flights[i];
          console.log(flight.ident + " " + flight.origin + ' - ' + flight.destination + " " + flight.aircrafttype + " " + flight.tailnumber);
          console.log(flight.actual_blockout_time.date + " " + flight.actual_blockout_time.time + " - " + flight.actual_blockin_time.time);


          //let unix_timestamp = 1549312452
          // Create a new JavaScript Date object based on the timestamp
          // multiplied by 1000 so that the argument is in milliseconds, not seconds.
          var dateBO = new Date(flight.actual_blockout_time.epoch * 1000);
          var dateDep = new Date(flight.actual_departure_time.epoch * 1000);
          var dateArr = new Date(flight.actual_arrival_time.epoch * 1000);
          var dateBI = new Date(flight.actual_blockin_time.epoch * 1000);

          results.push({
            'flightNumber' : flight.ident,
            'origin' : flight.origin,
            'destination' : flight.destination,
            'registration' : flight.tailnumber,
            'type' : flight.aircrafttype,
            'offBlock' : dateBO,
            'takeOff' : dateDep,
            'landing' : dateArr,
            'onBlock' : dateBI,
          });


          console.log('--------');
          console.log(dateBO);
          console.log(dateDep);
          console.log(dateArr);
          console.log(dateBI);
          console.log('--------');
          console.log('--------');
          console.log('--------');
          console.log('--------');

          return results;
      }
    });


}
