import './App.css';
import React from 'react';
import getICSP from './js/functions/schedule';

function App() {

  const [flights, setFlights] = React.useState([
    {'id' : 0, 'flightNumber' : 'KL1501', 'origin': 'AMS', 'destination': 'VLC'},
    {'id' : 1, 'flightNumber' : 'KL1503', 'origin': 'AMS', 'destination': 'VLC'}
  ]);


  function getFlights() {
    getICSP().then( results => {
      setFlights(results);
    });
  }

  function getFlightData(flight) {
    console.log(flight);
  }

  function logFlights(){
    console.log(flights);
    console.log(flights[0].id);
    console.log(flights[0].flightNumber);
    console.log(flights[1].id);
    console.log(flights[1].flightNumber);

  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Logboek</h1>

        <button type="button"
          title='vluchtdata ophalen'
          onClick={getFlights}
          value={flights}
        >Vluchtdata ophalen!
        </button>

        <p/>

        <button type="button"
          title='flights?'
          onClick={logFlights}
        >log flights
        </button>

        <p>Flight List: </p>

        <ul>
        {flights.map(item => (
        <li key={item.id}>
        <button type="button"
          title={item.flightNumber}
          onClick={getFlightData.bind(this, item.flightNumber)}>
          {item.flightNumber} {item.origin} - {item.destination}
        </button>
        </li>
        ))}
        </ul>


      </header>
    </div>

  );
}
/*
<ul>
{flights.map(item => (
  /*<button type="button"
  title='index'
  onClick={getFlightData(item)}
>{item}
</button>*//*
<li key={item}>{item}</li>
))}
</ul>*/
// {item.flightNumber} {item.origin} - {item.destination}

export default App;
