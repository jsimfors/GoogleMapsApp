// INITIATE THE MAP
var map;
var marker;

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
  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: {lat: 59.350666, lng: 18.068110}
  });
  marker.addListener('click', toggleBounce);
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }


}



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

