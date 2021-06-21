//import convert from './IcsConverter';


export default function getICSP() {
  /*
  return fetch(
    //'https://klc-rooster.nl/79dff3d4d99e4c83fff5fc4d4bf114eb.ics'
    '../../json/rooster-15mei21.json'
  )
    .then(response => {
      return response.json();
    })

    //.then(response => response.json())

    .then(response => {
      console.log(response);
      var output = convert(response);
      console.log('we zijn hier aangekomen');
      console.log(output);

    })
    .catch(err => {
      console.log(err);
    });
    */


    // Replace ./data.json with your JSON feed
  return fetch('./rooster-15mei21.json').then(response => {
    //console.log(response);
    return response.json();
  }).then(response => {

    var DD = new Date().getDate();
    if (DD < 10) {
      DD = '0' + DD;
    }
    var MM = new Date().getMonth() + 1;
    if (MM < 10) {
      MM = '0' + MM;
    }
    var YY = new Date().getFullYear();
    //var date = '' + YY + MM + DD;
    var date = '20210607';
    //console.log(date);

    var events = [];
    var j = 0;
    Object.keys(response.vcalendar[0].vevent).forEach(function(data, i) {
      /*
      console.log(index);
      console.log(data);
      console.log(index.summary);
      console.log([index].summary);

      console.log('summary: ' + response.vcalendar[0].vevent[index].summary);
      console.log('dtstart: ' + response.vcalendar[0].vevent[index].dtstart.substr(0,8));
      */
      //check of var 'date' gelijk is aan datum uit het 'event' in de json file en of de summary 'KL' bevat, anders krijg je ook het 'Flight day' event mee.
      if(date === response.vcalendar[0].vevent[i].dtstart.substr(0,8) && response.vcalendar[0].vevent[i].summary.substr(0,2) === "KL"){
        /*
        console.log('summary: ' + response.vcalendar[0].vevent[i].summary);
        console.log('dtstart: ' + response.vcalendar[0].vevent[i].dtstart.substr(0,8));
        console.log('!VANDAAG!');
        */
        var flightNumber = response.vcalendar[0].vevent[i].summary.substr(0,6);
        var origin = response.vcalendar[0].vevent[i].summary.substr(7,3);
        var destination = response.vcalendar[0].vevent[i].summary.substr(11,3);

        events.push({
          "id" : j,
          "flightNumber" : flightNumber,
          "origin" : origin,
          "destination" : destination
        });
        j++;
      }

    })

    console.log(events);

    //props.onchange

    /*
    .then(function(response) {
        var names=[];
        Object.keys(response.data).forEach(function(data) {
             names.push(data.Name);
        })
        self.setState({
            jdata: names
        });
    })
    */
    return events;
  }).catch(err => {
    console.log(err);
  });
}
