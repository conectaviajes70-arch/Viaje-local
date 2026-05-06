// js/conductor.js
let estoyDisponible = false;
let userId = "COND_" + Math.random().toString(36).substring(2, 9);

function toggleDisponibilidad() {
    estoyDisponible = !estoyDisponible;
    const btn = document.getElementById("btnDisponibilidad");
    
    if (estoyDisponible) {
        btn.textContent = "✅ Disponible - En servicio";
        btn.style.background = "#00cc66";
        startLocationTracking();
    } else {
        btn.textContent = "Estoy Disponible";
        btn.style.background = "";
        stopLocationTracking();
    }
}

function startLocationTracking() {
    obtenerUbicacionActual((lat, lng) => {
        actualizarUbicacion(lat, lng);
        actualizarPosicion(lat, lng);
    });

    // Actualizar cada cierto tiempo
    setInterval(() => {
        if (estoyDisponible) {
            obtenerUbicacionActual((lat, lng) => {
                actualizarUbicacion(lat, lng);
                actualizarPosicion(lat, lng);
            });
        }
    }, CONFIG.UPDATE_INTERVAL);
}

async function actualizarUbicacion(lat, lng) {
    const data = {
        action: "actualizarUbicacion",
        user_id: userId,
        tipo: "conductor",
        lat: lat,
        lng: lng
    };

    try {
        await fetch(CONFIG.APPS_SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
    } catch (e) {
        console.error("Error actualizando ubicación", e);
    }
}

function stopLocationTracking() {
    // Se puede mejorar después
}

// Inicializar
window.onload = () => {
    initMap();
};
