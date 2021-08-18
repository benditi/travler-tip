import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'



window.onload = onInit;
// window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSubmit = onSubmit;

function onInit() {

    mapService.initMap()
        .then((map) => {
            console.log('Map is ready');
            map.addListener('click', (ev) => {
                onAddMarker(ev.latLng)
            });
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

<<<<<<< HEAD
function onAddMarker(latlang) {
=======
function onAddMarker() {
>>>>>>> 75fc51757e317690fb4ed637729240aef1e295cb
    console.log('Adding a marker');
    mapService.addMarker({ lat: latlang.lat(), lng: latlang.lng() });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}


function onSubmit(ev) {
    ev.preventDefault();
    const val = document.querySelector('.search-input').value;
    console.log('val', val);

}


location.map(location => {
    return `<div data-id="${location.id}">
    <h2>${location.name} </h2>
    <button class="delete-btn">Delete</button>
    <button  class="go-btn">Go</button>
    <button  class="update-btn">Update</button>
    </div>`
})
document.querySelectorAll('.delte-btn').forEach(btn => {
    btn.addEventListener('click', onDeleteLoc)
})
document.querySelectorAll('.go-btn').forEach(btn => {
    btn.addEventListener('click', onGoLoc)
})
document.querySelectorAll('.go-btn').forEach(btn => {
    btn.addEventListener('click', onGoLoc)
})



function onGoLoc(ev){
    const locId = ev.target.parentElement.nodeName.data.id
}

function onDeleteLoc(ev) {
    const locId = ev.target.parentElement.nodeName.data.id
    deleteLoc(locId)
}
