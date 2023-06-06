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
    setTimeout(function () {
      var key = keystrokesHash[timestamp];
      if (key === 'Enter') {
        outputTextBox.value += '\n';
      } else if (key === 'Backspace') {
        outputTextBox.value = outputTextBox.value.slice(0, -1);
      } else if (key === 'Tab') {
        outputTextBox.value += '\t';
      } else if (key === 'Shift') {
      } 
      else {
        outputTextBox.value += key;
      }
    }, timeDelay);
  });
}

document.getElementById('inputTextBox').addEventListener('keyup', displayHash);
document.addEventListener('keydown', captureKeystrokes);
