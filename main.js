var contextId = -1;
var requestId = 0;
function sendEvent(key, isShift) {
  if (isShift === undefined) {
    isShift = false;
  }
  const keyData = {
    'type': 'keydown',
    'altKey': false,
    'ctrlKey': false,
    'shiftKey': isShift,
    'key': key,
    'code': key,
    'requestId': String(requestId)
  };
  try {
    chrome.input.ime.sendKeyEvents({ "contextID": contextId, "keyData": [keyData] });
  } catch (e) {

  }
}

chrome.input.ime.onFocus.addListener(function (context) {
  contextId = context.contextID;
});

chrome.commands.onCommand.addListener(function (c) {
  requestId += 1;
  if (c == "up") {
    sendEvent('ArrowUp');
  } else if (c == "down") {
    sendEvent('ArrowDown');
  } else if (c == "left") {
    sendEvent('ArrowLeft');
  } else if (c == "right") {
    sendEvent('ArrowRight');
  } else if (c == "home") {
    sendEvent('Home');
  } else if (c == "end") {
    sendEvent('End');
  } else if (c == "delete") {
    sendEvent('Delete');
  } else if (c == "backspace") {
    sendEvent('Backspace');
  } else if (c == "enter") {
    sendEvent('Enter');
  } else if (c == "killend") {
    sendEvent('End', true);
    sendEvent('Backspace');
  }
});
