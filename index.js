var keystrokesHash = {};
var minTime = Number.MAX_SAFE_INTEGER;
var maxTime = Number.MIN_SAFE_INTEGER;
var specialKeys = ['Alt', 'Control', 'CapsLock', 'Shift', 'Home', 'PageUp', 'ArrowUp', 'ArrowLeft', 'Clear', 'ArrowRight', 'End', 'ArrowDown', 'PageDown', 'Insert', '\x00', 'Enter', 'NumLock', 'Shift', 'LaunchWebCam', 'Escape']

function captureKeystrokes(event) {
  var key = event.key;
  var time = new Date().getTime();
  keystrokesHash[time] = key;

  // Update minTime and maxTime
  minTime = Math.min(minTime, time);
  maxTime = Math.max(maxTime, time);
}

function displayHash() {
  var hashTextBox = document.getElementById('hashTextBox');
  hashTextBox.value = JSON.stringify(keystrokesHash);
}

function showKeystrokes(timestamp) {
  var key = keystrokesHash[timestamp];
      if (key === 'Enter') {
      outputTextBox.value += '\n';
      } else if (key === 'Backspace') {
      outputTextBox.value = outputTextBox.value.slice(0, -1);
      } else if (key === 'Tab') {
      outputTextBox.value += '\t';
      }else if(specialKeys.includes(key)){
        // do nothing
        outputTextBox.value += '';
      } 
      else if (key === 'ArrowRight') {
        // Move cursor position to the right
        var currentPosition = outputTextBox.selectionStart;
        outputTextBox.setSelectionRange(currentPosition + 1, currentPosition + 1);
      } else if (key === 'ArrowLeft') {
        // Move cursor position to the left
        var currentPosition = outputTextBox.selectionStart;
        outputTextBox.setSelectionRange(currentPosition - 1, currentPosition - 1);
      } 
      else {
      outputTextBox.value += key;
      }

      currentKeystroke.value = key
}

function playbackKeystrokes() {
  var outputTextBox = document.getElementById('outputTextBox');
  var currentKeystroke =  document.getElementById('currentKeystroke');
  outputTextBox.value = '';

  var timestamps = Object.keys(keystrokesHash);
  var initialTime = timestamps[0];
  var totalTime = maxTime - minTime;

  timestamps.forEach(function(timestamp, index) {
    let timeDelay = timestamp - initialTime;
    var progress = (timeDelay / totalTime) * 100;
    setTimeout(function () {
      showKeystrokes(timestamp)
      // Update seek bar position
      document.getElementById('seekBar').value = progress;
      document.getElementById('seekTime').textContent = formatTime(timeDelay);
    }, timeDelay);
  });
}

function render() {
  var outputTextBox = document.getElementById('outputTextBox');
  outputTextBox.value = '';
  var timestamps = Object.keys(keystrokesHash);
  timestamps.forEach(function (timestamp, index) {
    showKeystrokes(timestamp)
  });
}

function seek() {
  var seekBar = document.getElementById('seekBar');
  var progress = seekBar.value;

  var totalTime = maxTime - minTime;
  var timeToSeek = (totalTime * progress) / 100;

  // Find the closest timestamp
  var closestTime = Object.keys(keystrokesHash).reduce(function (a, b) {
    return Math.abs(a - timeToSeek) < Math.abs(b - timeToSeek) ? a : b;
  });

  // Update output text box and seek time display
  var outputTextBox = document.getElementById('outputTextBox');
  outputTextBox.value = '';

  Object.keys(keystrokesHash).forEach(function (timestamp) {
    if (timestamp <= closestTime) {
      showKeystrokes()
    }
  });
  
  // Update seek time display
  document.getElementById('seekTime').textContent = formatTime(closestTime - minTime);
  }
  
  function formatTime(time) {
  var seconds = Math.floor(time / 1000);
  var milliseconds = time % 1000;
  return seconds + '.' + milliseconds + 's';
  }
  
  document.getElementById('inputTextBox').addEventListener('keyup', displayHash);
  document.addEventListener('keydown', captureKeystrokes);
