const N8N_URL_SPECS =
    "http://10.0.0.237:5678/webhook/f3aad6c4-0fdb-4639-94ce-6689535a2107";
const API_KEY_SPECS =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMDFlNTZmNi1jYzNlLTRlMjEtYjI4MS00YzMwNWEzOGY4ZjAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiMzc5MzdhYWEtYjY3Ni00ODdlLTkyOGMtYjdiZDliYmI1M2ZjIiwiaWF0IjoxNzc2Nzc0MTg4LCJleHAiOjE3NzczNDg4MDB9.nQ6OP0oIV-G5BzUCfAZPypCxtiEXBA3sJUDTWDEOffk";

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
    const cuerpoTabla = document.getElementById("tabla-specs");
    if (!cuerpoTabla) return;
    const lista = Array.isArray(datos) ? datos : [datos];
    if (lista.length === 0 || !lista[0]) {
        cuerpoTabla.innerHTML =
            '<tr><td colspan="3" class="text-center">No hay datos disponibles</td></tr>';
        return;
    }
    cuerpoTabla.innerHTML = "";
    lista.forEach((item) => {
        if (!item) return;
        const fila = document.createElement("tr");
        const id = item.ID || item.id || "N/A";
        const nombre = item.Nombre || item.nombre || "Sin nombre";
        const so = item.S0 || item.SO || item.so || "Sin SO";
        fila.innerHTML = `<td>${id}</td><td>${nombre}</td><td>${so}</td>`;
        cuerpoTabla.appendChild(fila);
    });
}

async function traerDatosDeN8n() {
    const cuerpoTabla = document.getElementById("tabla-specs");
    if (!cuerpoTabla) return;

    if (cuerpoTabla.innerHTML.trim() === "") {
        cuerpoTabla.innerHTML = `<tr><td colspan="3" class="text-center py-4 text-muted">Cargando especificaciones...</td></tr>`;
    }

    try {
        const respuesta = await fetch(N8N_URL_SPECS, {
            method: "GET",
            headers: { "x-api-key": API_KEY_SPECS },
        });
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        const datos = await respuesta.json();
        renderizarTabla(datos);
    } catch (error) {
        console.error("Error:", error);
        // Borramos los datos viejos para mostrar el error en rojo
        cuerpoTabla.innerHTML = `
            <tr>
                <td colspan="3" class="text-center py-4 text-danger fw-bold">
                    Servidor Offline
                </td>
            </tr>`;
    }
}

iniciarReloj();
traerDatosDeN8n();
setInterval(traerDatosDeN8n, 30000);
