// js/map.js
let map;
let userMarker;
let watchId = null;

function initMap(lat = 19.4326, lng = -99.1332) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: lng },
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }]
    });
}

function actualizarPosicion(lat, lng) {
    if (userMarker) userMarker.setMap(null);
    
    userMarker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            scaledSize: new google.maps.Size(50, 50)
        }
    });
    
    map.setCenter({ lat: lat, lng: lng });
}

// Obtener ubicación actual
function obtenerUbicacionActual(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                callback(lat, lng);
            },
            () => alert("No se pudo obtener tu ubicación. Activa los permisos."),
            { enableHighAccuracy: true }
        );
    } else {
        alert("Tu navegador no soporta geolocalización");
    }
}
