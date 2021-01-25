var x = document.getElementById('get-address');
var lat;
var long;

x.addEventListener('click', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(commitPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
})

function commitPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat + "," + long);
}

// pk.eyJ1IjoiZ3JvdXAtNS1vbmxpbmUtYmFya2VlcCIsImEiOiJja2tjOHdydWYwNTZoMm9zMmozam80cDUxIn0.jYRAupKrfNZZpL49ghB0HQ


fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/San%20Francisco.json?access_token=pk.eyJ1IjoiZ3JvdXAtNS1vbmxpbmUtYmFya2VlcCIsImEiOiJja2tjOHdydWYwNTZoMm9zMmozam80cDUxIn0.jYRAupKrfNZZpL49ghB0HQ')
    .then(function (response) {
        // request was successful
        if (response.ok) {
        } else {
            displayModal("Error", "Contact the website administrator. " + response.statusText);
        }
    })