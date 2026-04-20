const N8N_URL =
    "http://10.0.0.237:5678/webhook/bd5e43f1-e819-4347-b9d1-acf5d5edcee7";
const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMDFlNTZmNi1jYzNlLTRlMjEtYjI4MS00YzMwNWEzOGY4ZjAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiMjZlZjIzNzAtMTFhYS00YjBlLThlNDMtY2E3M2RmMDA0Nzk4IiwiaWF0IjoxNzc2MTc1Mjk2LCJleHAiOjE3NzY3NDQwMDB9.vbn8vVzqJeOGr33Y4LYb_alSYfeUn8GhIEqMXkugF5A";

function iniciarReloj() {
    const relojElemento = document.getElementById("reloj");
    if (!relojElemento) return;

    const actualizar = () => {
        relojElemento.innerText = new Date().toLocaleTimeString();
    };

    setInterval(actualizar, 1000);
    actualizar();
}

async function traerDatosDeN8n() {
    const cuerpoTabla = document.getElementById("tabla-cuerpo");
    if (!cuerpoTabla) return;

    try {
        const respuesta = await fetch(N8N_URL, {
            method: "GET",
            headers: { "x-api-key": API_KEY },
        });

        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

        const datos = await respuesta.json();
        cuerpoTabla.innerHTML = "";

        datos.forEach((item) => {
            const fila = document.createElement("tr");

            const id = item.ID || "N/A";
            const nombre = item.nombre || "Sin nombre";
            const ip = item.IP || "0.0.0.0";
            const estadoTexto = item.Estado || "Desconocido";

            const esOnline = estadoTexto.toUpperCase().includes("ONLINE");
            const colorBadge = esOnline ? "bg-success" : "bg-danger";

            fila.innerHTML = `
                <td>${id}</td>
                <td>${nombre}</td>
                <td><strong>${ip}</strong></td>
                <td><span class="badge ${colorBadge}">${estadoTexto}</span></td>
            `;
            cuerpoTabla.appendChild(fila);
        });
    } catch (error) {
        console.error("Error:", error);
        cuerpoTabla.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-danger fw-bold">
                    Error cargando datos: ${error.message}
                </td>
            </tr>`;
    }
}
iniciarReloj();
traerDatosDeN8n();
setInterval(traerDatosDeN8n, 60000);
