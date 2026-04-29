const N8N_URL =
    "http://10.0.0.237:5678/webhook/bd5e43f1-e819-4347-b9d1-acf5d5edcee7";
const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMDFlNTZmNi1jYzNlLTRlMjEtYjI4MS00YzMwNWEzOGY4ZjAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiMzUyNmIxY2MtYTlmZi00OTAxLWI1NTYtNjZmNDQ3MTQ1MWE4IiwiaWF0IjoxNzc3NDY3Njg4fQ.E5XvJwZWy1BgdOZ3hvfvdk43aG-ZsylF3qNCUBl6ETU";

/**
 * Control del Reloj en tiempo real
 */
function iniciarReloj() {
    const relojElemento = document.getElementById("reloj");
    if (!relojElemento) return;
    const actualizar = () => {
        relojElemento.innerText = new Date().toLocaleTimeString();
    };
    setInterval(actualizar, 1000);
    actualizar();
}

/**
 * Renderiza las gráficas de RAM y ROM usando Chart.js
 */
function generarGraficasDinámicas(id, ramVal, romVal) {
    const canvasRam = document.getElementById(`ram-${id}`);
    const canvasRom = document.getElementById(`rom-${id}`);
    if (!canvasRam || !canvasRom) return;

    const ctxRam = canvasRam.getContext("2d");
    const ctxRom = canvasRom.getContext("2d");

    // Limpiar instancias previas para evitar errores de renderizado
    if (window[`chartRam${id}`]) window[`chartRam${id}`].destroy();
    if (window[`chartRom${id}`]) window[`chartRom${id}`].destroy();

    window[`chartRam${id}`] = new Chart(ctxRam, {
        type: "doughnut",
        data: {
            labels: ["Usado", "Libre"],
            datasets: [
                {
                    data: [ramVal, 100 - ramVal],
                    backgroundColor: ["#ff4d4d", "#2ecc71"],
                    borderColor: "#1a222f",
                    borderWidth: 2,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: { legend: { display: false } },
        },
    });

    window[`chartRom${id}`] = new Chart(ctxRom, {
        type: "pie",
        data: {
            labels: ["Ocupado", "Libre"],
            datasets: [
                {
                    data: [romVal, 100 - romVal],
                    backgroundColor: ["#3498db", "#f1c40f"],
                    borderColor: "#1a222f",
                    borderWidth: 2,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
        },
    });
}

/**
 * Construye la tabla dinámicamente según los datos de n8n
 */
function renderizarTabla(datos) {
    const cuerpoTabla = document.getElementById("tabla-cuerpo");
    if (!cuerpoTabla) return;
    cuerpoTabla.innerHTML = "";

    datos.forEach((item) => {
        const id = item.ID || "N/A";
        const nombre = item.nombre || "Sin nombre";
        const ip = item.IP || "0.0.0.0";
        const estadoTexto = item.Estado || "Desconocido";

        // Filtro: Solo 'servidor' tiene gráficas
        const esServidor = item.tipo && item.tipo.toLowerCase() === "servidor";
        const esOnline = estadoTexto.toUpperCase().includes("ONLINE");
        const colorBadge = esOnline ? "bg-success" : "bg-danger";

        // Crear Fila Principal
        const filaPrincipal = document.createElement("tr");
        filaPrincipal.className = "align-middle";
        filaPrincipal.innerHTML = `
            <td>${id}</td>
            <td>${nombre}</td>
            <td><strong>${ip}</strong></td>
            <td><span class="badge ${colorBadge}">${estadoTexto}</span></td>
            <td class="text-end">
                ${
                    esServidor
                        ? `
                    <button class="btn btn-sm text-white" type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse-${id}"
                            aria-expanded="false">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                `
                        : ""
                }
            </td>
        `;
        cuerpoTabla.appendChild(filaPrincipal);

        // Crear Fila Desplegable (Solo servidores)
        if (esServidor) {
            const filaGrafica = document.createElement("tr");
            filaGrafica.innerHTML = `
                <td colspan="5" class="p-0 border-0 bg-graficas">
                    <div class="collapse" id="collapse-${id}" data-bs-parent="#tabla-cuerpo">
                        <div class="row m-0 py-4">
                            <div class="col-md-6 d-flex flex-column align-items-center">
                                <small class="text-secondary mb-2">RAM (${item.ram_uso || 0}%)</small>
                                <canvas id="ram-${id}" style="max-height: 150px;"></canvas>
                            </div>
                            <div class="col-md-6 d-flex flex-column align-items-center">
                                <small class="text-secondary mb-2">ROM (${item.rom_uso || 0}%)</small>
                                <canvas id="rom-${id}" style="max-height: 150px;"></canvas>
                            </div>
                        </div>
                    </div>
                </td>
            `;
            cuerpoTabla.appendChild(filaGrafica);

            // Evento para generar gráficas al abrir
            const collapseElement = document.getElementById(`collapse-${id}`);
            collapseElement.addEventListener("shown.bs.collapse", () => {
                generarGraficasDinámicas(
                    id,
                    item.ram_uso || 0,
                    item.rom_uso || 0,
                );
            });
        }
    });
}

/**
 * Obtiene los datos del Webhook de n8n
 */
async function traerDatosDeN8n() {
    const cuerpoTabla = document.getElementById("tabla-cuerpo");
    if (!cuerpoTabla) return;

    // Mensaje de carga inicial
    if (cuerpoTabla.innerHTML.trim() === "") {
        cuerpoTabla.innerHTML = `<tr><td colspan="5" class="text-center py-4 fw-bold text-white">Cargando datos</td></tr>`;
    }

    // Configuración de Timeout (5 segundos)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const respuesta = await fetch(N8N_URL, {
            method: "GET",
            headers: { "x-api-key": API_KEY },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        const datos = await respuesta.json();

        renderizarTabla(datos);
    } catch (error) {
        console.error("Error al obtener datos:", error);
        cuerpoTabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-4 text-danger fw-bold">
                   Error al cargar datos
                </td>
            </tr>`;
    }
}

/**
 * Inicialización al cargar la página
 */
document.addEventListener("DOMContentLoaded", () => {
    iniciarReloj();
    traerDatosDeN8n();
    // Actualización automática cada 60 segundos
    setInterval(traerDatosDeN8n, 60000);
});
