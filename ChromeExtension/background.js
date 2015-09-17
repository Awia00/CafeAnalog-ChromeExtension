var openString = "";

function getIsAnalogOpen(callback, errorCallback) {
  var x = new XMLHttpRequest();
  x.open('GET', "http://cafeanalog.dk/REST/");
  // The Google image search API responds with JSON, so let Chrome parse it.
  x.responseType = 'json';
  x.onload = function() {
    var response = x.response;
    if (!response ) {
        errorCallback('No response from CafeAnalog.dk!');
        return;
    }
    var isOpen = response.open;
    
    callback(isOpen);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

function updateOpenString() {
  getIsAnalogOpen(function (boolValue){
    if (boolValue)
    {
      openString = "Open";
    }
    else{
      openString = "";
    }
  },function(error){
    openString = "";
  })
}

function updateIcon() {
	chrome.browserAction.setIcon({path:"Assets/icon" + openString + "38.png"});
}

function updateAll() 
{
  updateOpenString();
  updateIcon();
}

setInterval(function () {
  updateAll();
}, 30*1000*60) // every 30 minutes

updateAll();