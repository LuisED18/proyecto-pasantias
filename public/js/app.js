const N8N_URL =
    "http://10.0.0.237:5678/webhook/bd5e43f1-e819-4347-b9d1-acf5d5edcee7";
const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMDFlNTZmNi1jYzNlLTRlMjEtYjI4MS00YzMwNWEzOGY4ZjAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiMjZlZjIzNzAtMTFhYS00YjBlLThlNDMtY2E3M2RmMDA0Nzk4IiwiaWF0IjoxNzc2MTc1Mjk2LCJleHAiOjE3NzczNDg4MDB9.vbn8vVzqJeOGr33Y4LYb_alSYfeUn8GhIEqMXkugF5A";

function iniciarReloj() {
    const relojElemento = document.getElementById("reloj");
    if (!relojElemento) return;
    const actualizar = () => {
        relojElemento.innerText = new Date().toLocaleTimeString();
    };
    setInterval(actualizar, 1000);
    actualizar();
}

function renderizarTabla(datos) {
    const cuerpoTabla = document.getElementById("tabla-cuerpo");
    if (!cuerpoTabla) return;
    cuerpoTabla.innerHTML = "";
    datos.forEach((item) => {
        const fila = document.createElement("tr");
        const id = item.ID || "N/A";
        const nombre = item.nombre || "Sin nombre";
        const ip = item.IP || "0.0.0.0";
        const estadoTexto = item.Estado || "Desconocido";
        const esOnline = estadoTexto.toUpperCase().includes("ONLINE");
        const colorBadge = esOnline ? "bg-success" : "bg-danger";
        fila.innerHTML = `<td>${id}</td><td>${nombre}</td><td><strong>${ip}</strong></td><td><span class="badge ${colorBadge}">${estadoTexto}</span></td>`;
        cuerpoTabla.appendChild(fila);
    });
}

async function traerDatosDeN8n() {
    const cuerpoTabla = document.getElementById("tabla-cuerpo");
    if (!cuerpoTabla) return;

    // Solo mostramos "Cargando" si la tabla está totalmente vacía (inicio)
    if (cuerpoTabla.innerHTML.trim() === "") {
        cuerpoTabla.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-muted">Cargando servicios...</td></tr>`;
    }

    try {
        const respuesta = await fetch(N8N_URL, {
            method: "GET",
            headers: { "x-api-key": API_KEY },
        });
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        const datos = await respuesta.json();
        renderizarTabla(datos);
    } catch (error) {
        console.error("Error:", error);
        // SIEMPRE limpia y muestra error si la conexión falla
        cuerpoTabla.innerHTML = `
            <tr>
                <td colspan="4" class="text-center py-4 text-danger fw-bold">
                    Servidor Offline
                </td>
            </tr>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    iniciarReloj();
    traerDatosDeN8n();
    setInterval(traerDatosDeN8n, 60000);
});
