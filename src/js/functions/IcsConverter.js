const NEW_LINE = /\r\n|\n|\r/;

/**
 * Take ical string data and convert to JSON
 *
 * @param {string} source
 * @returns {Object}
 */
function convert(source) {

  let destinations = [],
    lines = source.split(NEW_LINE);
    /*
    ,
    splitAt,
    cutoffLine = 100;
    */
  //find line where afmelden (sign off) < current date.
  //This is the last done flight. All flights thereafter should be included in the app.
  for (let i = 0; i < 100; i++) {
    let line = lines[i];
    console.log(line);
    if (line.charAt(0) === ' ') {
      console.log('charAt 0 === [spatie] ');
    } else {
      if (line.includes('KL1253 AMS-NCE')) {
        console.log('KL1253 AMS-NCE found!');

      }
    }
  }

  return destinations;

}

export default convert;
