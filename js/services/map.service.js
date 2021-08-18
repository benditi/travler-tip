export const mapService = {
    initMap,
    addMarker,
    panTo,
    geocodeAddress,
    getMap
}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);
            return gMap
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: getLocTitle()
    });
    return marker;
}

function panTo(geocoder, map, address) {
    return geocodeAddress(geocoder, map, address);
}


function getLocTitle() {
    return prompt('please Enter title');
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCRqCkP28OFmsTzJGUZMRK45JeeC-3FRAQ'; //My API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function getMap() {
    return gMap;
}

function geocodeAddress(geocoder, resultsMap, address) {
    var prm = geocoder
        .geocode({ address: address })
        .then(({ results }) => {
            // TODO LOCAL SERVICE SAVE
            console.log('results[0].geometry.location', results[0].geometry.location.lat());
            resultsMap.setCenter(results[0].geometry.location);
            new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
            });
            console.log('results[0].geometry.location', results[0].geometry.location);
            return Promise.resolve(results);
        })
        .catch((e) =>
            alert("Geocode was not successful for the following reason: " + e)
        );
    prm.then(results => {

        console.log('results[0].geometry.location', results[0].geometry.location);
    })
    return prm;
}