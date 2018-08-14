var contextId = -1;
var requestId = 0;

function sendEvent(key, isShift, isCtrl) {
  if (isShift === undefined) {
    isShift = false;
  }
  if (isCtrl == undefined) {
    isCtrl = false;
  }
  const keyData = {
    'type': 'keydown',
    'altKey': false,
    'ctrlKey': isCtrl,
    'shiftKey': isShift,
    'key': key,
    'code': key,
    'requestId': String(requestId)
  };

  chrome.input.ime.sendKeyEvents({ "contextID": contextId, "keyData": [keyData] });
}

chrome.input.ime.onFocus.addListener(function (context) {
  contextId = context.contextID;
});

chrome.input.ime.onBlur.addListener(function (context) {
  contextId = -1;
});

chrome.commands.onCommand.addListener(function (c) {
  if (contextId == -1) {
    return;
  }
  requestId += 1;
  switch (c) {
    case "00-up":
      sendEvent('ArrowUp');
      break;
    case "01-down":
      sendEvent('ArrowDown');
      break;
    case "02-left":
      sendEvent('ArrowLeft');
      break;
    case "03-right":
      sendEvent('ArrowRight');
      break;
    case "10-home":
      sendEvent('Home');
      break;
    case "11-end":
      sendEvent('End');
      break;
    case "20-delete":
      sendEvent('Delete');
      break;
    case "30-backspace":
      sendEvent('Backspace');
      break;
    case "40-enter":
      sendEvent('Enter');
      break;
    case "50-killend":
      sendEvent('End', true);
      sendEvent('KeyX', false, true);
      break;
    case "60-cut":
      sendEvent('KeyX', false, true);
      break;
    case "61-paste":
      sendEvent('KeyV', false, true);
      break;
    case "90-original-ctrl-f":
      sendEvent('KeyF', false, true);
      break;
    case "91-original-ctrl-a":
      sendEvent('KeyA', false, true);
      break;      
    case "92-original-ctrl-p":
      sendEvent('KeyP', false, true);
      break;            
    default:
      console.error("%s is not supported", c);
      break;
  }
});
