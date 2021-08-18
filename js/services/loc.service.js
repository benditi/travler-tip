export const locService = {
    getLocs,
    setLocation,
    updateLocation,
}

var gCurrPos;


const locs = [
    {
        id: 1,
        name: 'Greatplace',
        lat: 32.047104,
        lng: 34.832384,
        weather: '',
        createdAt: Date.now(),
        updateAt: Date.now()
    },
    { id: 2, name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]


function setLocation(id, name, lat, lng, weather = '') {
    locs.push({
        id,
        name,
        lat,
        lng,
        weather,
        createdAt: Date.now(),
        updateAt: Date.now()
    });
    console.log('set location successful');
}

function updateLocation(id, name, lat, lng, weather = '') {
    const loc = findLocById(id);
    loc.name = name;
    loc.lat = lat;
    loc.lng = lng;
    loc.weather = weather;
    loc.updateAt = Date.now();


}

// location.map(location => {
//     return `<div data-id="${location.id}">
//     <h2>${location.name} </h2>
//     <button class="delete-btn">Delete</button>
//     <button  class="go-btn">Go</button>
//     <button  class="update-btn">Update</button>
//     </div>`
// })
// document.querySelectorAll('.delte-btn').forEach(btn => {
//     btn.addEventListener('click', onDeleteLoc)
// })
// document.querySelectorAll('.go-btn').forEach(btn => {
//     btn.addEventListener('click', onGoLoc)
// })

// function onDeleteLoc(ev) {
//     const locId = ev.target.parentElement.nodeName.data.id
//     deleteLoc(locId)
// }

function findLocById(id) {
    return locs.find(loc => {
        return loc[id] === id;
    });
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


