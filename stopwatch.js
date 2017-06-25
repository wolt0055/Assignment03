//think about things you need and divide into little groups
//button controls
//looking for button that has classname start
const start = document.querySelector('button.start')
const stop = document.querySelector('button.stop')
const lap = document.querySelector('button.lap')
const reset = document.querySelector('button.reset')


//DOM elements that i need to update
const lapList = document.querySelector('#lapList')
const stopwatchTime = document.querySelector('#stopwatchTime')

//constants that shouldn't ever change
const laps = []
const intervalRate = 10 //update stopwatch every 10 ms


//values that will change pretty often
let intervalId = null //create variable that has no value right now..
let rawTime = 0

// turns the time into a human readable format
function formatTime (raw) {
  let seconds = Math.floor(raw / 1000)
  let fractionalSeconds = (raw % 1000) / 1000
  let minutes = Math.floor(seconds / 60)
  seconds = seconds - (60 * minutes) + fractionalSeconds

  return `${zeroPad(minutes)}:${zeroPad(seconds.toFixed(2))}`
}
//this will start stopwatch by creating a new interval
function stopwatchStart(event){
  event.preventDefault();
  console.log('started');

  //every 10ms, update the stopwatch
  intervalId = setInterval(stopwatchUpdate, intervalRate)
}

//adds the interval to stopwatch time since the last 'tick'
//then update the DOM with the new stopwatch time
function stopwatchUpdate(){

  rawTime += intervalRate
  stopwatchTime.innerHTML = formatTime(rawTime)
}

//function to stop the time, should clear the interval
function stopwatchStop (event) {
  event.preventDefault()
  console.log('stopped!');
  clearInterval(intervalId) //how this work?
}

function stopwatchLap(event){
  event.preventDefault();
  console.log("lap time!");
}
function stopwatchReset(event){
  event.preventDefault();
  console.log("time to reset");
}

// adds a leading zero because humans like them
function zeroPad (value) {
  let pad = value < 10 ? '0' : ''
  return `${pad}${value}`
}

//callback for our dom content loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log('ready!')

//attach callbacks to buttons
//start is a variable delcared. reference to button in dom.
// to that button we attach a listener, a js process waiting for specific event
// to happen, which in this case is a click on the start button
// when that happens, we execute the stopwatchStart function
// so stopwatchStart is a callback to the click on the startbutton

  start.addEventListener("click", stopwatchStart) //translate
  stop.addEventListener("click", stopwatchStop)
  lap.addEventListener("click", stopwatchLap)
  reset.addEventListener("click", stopwatchReset)
})

// domcontent loaded and window.onload
// domcontentloaded happens first, has been read by browser and translated
// onload fires later, means DOM exists AND you've downloaded all external assets
// so if you just need to mess with dom, domcontentloaded happens first
