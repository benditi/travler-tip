export const locService = {
    getLocs,
    setLocation,
    updateLocation,
    findLocByName,
    findLocById,
    goLoc,
    onUpdate,
    deleteLoc
}

var gIds = 2;

var locs = [
    {
        id: 1,
        name: 'Greatplace',
        lat: 32.047104,
        lng: 34.832384,
        weather: '',
        createdAt: Date.now(),
        updateAt: Date.now()
    },
    {
        id: 2,
        name: 'Greatplace',
        lat: 32.047104,
        lng: 34.832384,
        weather: '',
        createdAt: Date.now(),
        updateAt: Date.now()
    },
]


function setLocation(name, lat, lng, weather = '') {
    locs.push({
        id: ++gIds,
        name,
        lat,
        lng,
        weather,
        createdAt: Date.now(),
        updateAt: Date.now()
    });
    console.log('locs', locs);
    console.log('set location successful');
}

function updateLocation(id, name, weather = '') {
    const loc = findLocById(id);
    loc.name = name;
    loc.lat = lat;
    loc.lng = lng;
    loc.weather = weather;
    loc.updateAt = Date.now();


}
function findLocByName(name) {
    return locs.find(loc => {
        return loc.name === name;
    });
}


function findLocById(id) {
    return locs.find(loc => {
        return loc.id === id;
    });
}

function getLocs() {
    return new Promise((resolve, reject) => {
        resolve(locs);
    });
}





function goLoc(locId) {

}
function onUpdate(locId) {
    const name = prompt('enter new name')
    updateLocation(locId, name)
}
function deleteLoc(locId) {
    console.log('locId',locId);
    locs = locs.filter(loc => {
        console.log('loc',loc);
        console.log('locId',locId);
        return loc.id != locId;
    });
    console.log('locs',locs);
}