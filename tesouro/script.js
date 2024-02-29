window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: '01',
            location: {
                lat: -19.815615,
                lng: -43.154278,
                //elev: 715.4,
            },
        },
        {
            name: '02',
            location: {
                lat: -22.419336,
                lng: -45.469415,
                //elev: 715.4,
            },
        },
        {
            name: '03',
            location: {
                lat: -19.98770155010817,
                lng: -43.964001435893145,
                //elev: 715.4,
            },
        },
        {
            name: '04',
            location: {
                lat: -20.07188369083826, 
                lng: -43.41430990192027,
                //elev: 715.4,
            },
        },
        {
            name: '05',
            location: {
                lat: -20.07170376925541, 
                lng: -43.41438285759934, 
                //elev: 715.4,
            },
        },
        {
            name: '06',
            location: {
                lat: -20.07158544343602,  
                lng: -43.413926820386145,
                //elev: 715.4,
            },
        },
    ];
}

var models = [
    {
        url: './assets/treasure/scene.gltf',
        scale: '0.1 0.1 0.1',
        info: 'Você encontrou uma pista!',
        rotation: '0 180 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}