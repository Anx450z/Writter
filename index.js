var keystrokesHash = {};

function captureKeystrokes(event) {
  var key = event.key;
  var time = new Date().getTime();
  keystrokesHash[time] = key;
}

function displayHash() {
  var hashTextBox = document.getElementById('hashTextBox');
  hashTextBox.value = JSON.stringify(keystrokesHash);
}

function playbackKeystrokes() {
  var outputTextBox = document.getElementById('outputTextBox');
  outputTextBox.value = '';

  Object.keys(keystrokesHash).forEach(function (timestamp, index) {
    timeDelay = timestamp - Object.keys(keystrokesHash)[0]
    console.log(timeDelay, index, timestamp)
    setTimeout(function () {
      outputTextBox.value += keystrokesHash[timestamp];
    }, timeDelay);
  });
}

document.getElementById('inputTextBox').addEventListener('keyup', displayHash);
document.addEventListener('keydown', captureKeystrokes);
