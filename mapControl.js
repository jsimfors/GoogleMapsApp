// INITIATE THE MAP
var map, infoWindow;
var marker;

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('hej igen')
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  
  });
});


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

    // MY POSITION:

    // Ruta som poppar upp när användarens position hittas:
    // Eller för att säga att Localtion-service inte funkar (tex. om användaren blockar GPS)
    infoWindow = new google.maps.InfoWindow;

    var hereButton = document.createElement('button');
    hereButton.id = "here";
    hereButton.innerText = 'Visa min position';
    controlDiv.appendChild(hereButton);

    google.maps.event.addDomListener(hereButton, 'click', function() {
      // Hit kommer vi när användaren försöker hitta sin plats!
        if (navigator.geolocation) { // OM användarens browser stödjer GPS:
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Här är du kompis!');
            infoWindow.open(map);
            map.setCenter(pos); // centrera kring ny location
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      });
    

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

    // JOE'S POSITION:
    var rotateButton = document.createElement('button');
    rotateButton.id = "joe";
    rotateButton.innerText = "Visa Joe's favoritplats";
    controlDiv.appendChild(rotateButton);

    // MOE'S POSITION:
    var rotateButton = document.createElement('button');
    rotateButton.id = "moe";
    rotateButton.innerText = "Visa Moe's favoritplats";
    controlDiv.appendChild(rotateButton);

}

