export const locService = {
    getLocs,
    setLocation,
    updateLocation,
}



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


function findLocById(id) {
    return locs.find(loc => {
        return loc[id] === id;
    });
}

function getLocs() {
    return new Promise((resolve, reject) => {
        resolve(locs);
    });
}


