// INITIATE THE MAP
var map;
var marker;

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
  console.log('hej igen')
});

new showInstallPromotion()

function showInstallPromotion(){
  
  var buttonInstall = document.createElement('button')

  buttonInstall.addEventListener('click', (e) => {
      
      //Do we need this?
      // Hide the app provided install promotion
      hideMyInstallPromotion();

      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          Console.log('User accepted the install prompt');
        } else {
          Console.log('User dismissed the install prompt');
        }
      })
    });
  
  buttonInstall.innerText = 'KNAPP';
  document.getElementById('map-controllers').appendChild(buttonInstall)

  console.log('hejhej')
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 59.3498092, lng: 18.0684758},
    zoom: 17,
    mapTypeId: 'roadmap',
    disableDefaultUI: true
  });

  // Add control-panel:
  new MapControl(document.getElementById('map-controllers'), map);

  // Animations:
  // Marker 1:  (Dragable)
  marker1 = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: {lat: 59.350666, lng: 18.068110}
  });
  marker1.addListener('click', toggleBounce);

    // Marker 2:  (Not dragable)
    marker2 = new google.maps.Marker({
      map: map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: {lat: 59.348094, lng: 18.071313}
    });
}

function toggleBounce() {
  if (marker1.getAnimation() !== null) {
    marker1.setAnimation(null);
  } else {
    marker1.setAnimation(google.maps.Animation.BOUNCE);
  }
}

// // ENTER FULLSCREEN: (for computer only :( ))
// var goFS = document.getElementById("goFS");
// goFS.addEventListener("click", function() {
//     document.body.requestFullscreen();
// }, false); (lägg till id="goFS" på button)


// THE CONTROLLERS
function MapControl(controlDiv, map) {

    // ZOOM:
    var zoomOutButton = document.createElement('button');
    zoomOutButton.className = 'zoom';
    zoomOutButton.innerText = '-';
    controlDiv.appendChild(zoomOutButton);

    var zoomInButton = document.createElement('button');
    zoomInButton.className = 'zoom';
    zoomInButton.innerText = '+';
    controlDiv.appendChild(zoomInButton);

    // Setup the click event listener - zoomIn
    google.maps.event.addDomListener(zoomInButton, 'click', function() {
    map.setZoom(map.getZoom() + 1);
    });

    // Setup the click event listener - zoomOut
    google.maps.event.addDomListener(zoomOutButton, 'click', function() {
    map.setZoom(map.getZoom() - 1);
    });


    // PANNING
    var panLeft = document.createElement('button');
    panLeft.id = 'panLeft';
    panLeft.innerText = '<';

    var panUp = document.createElement('button');
    panUp.id = 'panUp';
    panUp.innerText = '^';

    var panRight = document.createElement('button');
    panRight.id = 'panRight';
    panRight.innerText = '>';

    var panDown = document.createElement('button');
    panDown.id = 'panDown';
    panDown.innerText = 'v';

    //panning.id = "panning";
    controlDiv.appendChild(panLeft);
    controlDiv.appendChild(panUp);
    controlDiv.appendChild(panRight);
    controlDiv.appendChild(panDown);

    google.maps.event.addDomListener(panLeft, 'click', function() {
      map.panBy(-50, 0);
      });
    google.maps.event.addDomListener(panUp, 'click', function() {
      map.panBy(0, -50);
      });
    google.maps.event.addDomListener(panRight, 'click', function() {
      map.panBy(50, 0);
      });
    google.maps.event.addDomListener(panDown, 'click', function() {
      map.panBy(0, 50);
      });

    // ROTATE VIEW:
    var rotateButton = document.createElement('button');
    rotateButton.id = "rotate";
    rotateButton.innerText = 'ROTATE VIEW';
    controlDiv.appendChild(rotateButton);


}

