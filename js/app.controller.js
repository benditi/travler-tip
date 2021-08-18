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
    renderTable();
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker(latlang) {
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

function onPanTo(ev) {
    ev.preventDefault();
    const address = document.querySelector('.search-input').value;
    const geocoder = new google.maps.Geocoder();
    let map = mapService.getMap();
    console.log('map', map);
    var prm = mapService.panTo(geocoder, map, address)

    prm.then(res => {
        console.log('res', res);
        let lat = res[0].geometry.location.lat();
        let lng = res[0].geometry.location.lng();
        locService.setLocation(address, lat, lng);
        renderTable();
    });
}


function onSubmit(ev) {
    ev.preventDefault();
    const val = document.querySelector('.search-input').value;
    console.log('val', val);

}

function renderTable() {
    let strHTML = `<th>ID</th>
                <th>Name</th>
                <th>Lat</th>
                <th>Lng</th>
                <th>CreateAt</th>
                <th>UpdateAt</th>`
    locService.getLocs().then(locs => {
        locs.forEach(location => {
            console.log('location', location);
            strHTML +=
                `<tr>
              <td>${location.id}</td>
              <td>${location.name}</td>
              <td>${location.lat}</td>
              <td>${location.lng}</td>
              <td>${location.createdAt}</td>
              <td>${location.updateAt}</td>
              <td><button data-id='${location.id}' class="delete-btn">Delete</button></td>
              <td><button data-id='${location.id}' class="go-btn">Go</button></td>
              <td><button data-id='${location.id}' class="update-btn">Update</button></td>
          </tr>`
        });
        document.querySelector('.location-table').innerHTML = strHTML;
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', onDeleteLoc)
        })
        document.querySelectorAll('.go-btn').forEach(btn => {
            btn.addEventListener('click', onGoLoc)
        })
        document.querySelectorAll('.update-btn').forEach(btn => {
            btn.addEventListener('click', onUpdate)
        })
    });


}

function onGoLoc(ev) {
    const locId = ev.target.dataset.id
    console.log('locId', locId);
    locService.goLoc(locId)
}

function onUpdate(ev) {
    const locId = ev.target.parentElement.nodeName.data.id
    locService.onUpdate(locId)
}

function onDeleteLoc(ev) {
    var locId = ev.target.dataset.id
    // locId=parseInt(locId)
    console.log('locId', locId);
    locService.deleteLoc(locId)
    renderTable()
}