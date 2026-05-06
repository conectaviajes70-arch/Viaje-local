// js/pasajero.js
let viajeActualId = null;

async function solicitarViaje() {
    const destinoInput = document.getElementById("destino").value;
    if (!destinoInput) {
        alert("Por favor ingresa un destino");
        return;
    }

    obtenerUbicacionActual(async (lat, lng) => {
        actualizarPosicion(lat, lng);

        const data = {
            action: "solicitarViaje",
            pasajero_id: "USR_" + Math.random().toString(36).substring(2, 9), // Temporal
            origen_lat: lat,
            origen_lng: lng,
            destino_lat: lat + 0.01,   // Placeholder
            destino_lng: lng + 0.01,
            direccion_destino: destinoInput,
            distancia_km: 5
        };

        try {
            const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            });

            const result = await response.json();
            
            if (result.success) {
                viajeActualId = result.data.viaje_id;
                document.getElementById("viajeActivo").style.display = "block";
                alert(`¡Viaje solicitado!\nID: ${viajeActualId}\nPrecio aprox: $${result.data.precio}`);
            }
        } catch (error) {
            console.error(error);
            alert("Error al solicitar viaje");
        }
    });
}

function cancelarViaje() {
    if (confirm("¿Cancelar este viaje?")) {
        document.getElementById("viajeActivo").style.display = "none";
        viajeActualId = null;
    }
}

// Inicializar
window.onload = () => {
    obtenerUbicacionActual((lat, lng) => {
        initMap(lat, lng);
        actualizarPosicion(lat, lng);
    });
};
