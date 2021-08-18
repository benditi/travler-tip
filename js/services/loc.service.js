export const locService = {
    getLocs,
    setLocation
}

const locs = [
    {
        id: 1,
        name: 'Greatplace',
        lat: 32.047104, lng: 34.832384,
        weather: '',
        createdAt: Date.now(),
        updateAt: Date.now()
    },
    { id: 2, name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]



function setLocation(id, name, lat, lng, weather = '') {
    if (findLocById(id) === -1) {
        console.log('Existing Location');
        return;
    }
    
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


