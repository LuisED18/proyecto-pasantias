const N8N_URL = "TU_URL_DE_N8N_AQUI";
const API_KEY = "TU_KEY_LARGA_AQUI";

async function traerDatosDeN8n() {
    const cuerpoTabla = document.getElementById("tabla-cuerpo");

    try {
        console.log("Conectando a n8n...");

        const respuesta = await fetch(N8N_URL, {
            method: "GET", // Cambia a "POST" si tu amigo lo configuró así
            headers: {
                "x-api-key": API_KEY, // Nombre estándar para la key
                "Content-Type": "application/json",
            },
        });

        if (!respuesta.ok) {
            throw new Error(`Error en el servidor: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        console.log("Datos recibidos de n8n:", datos);

        cuerpoTabla.innerHTML = "";

        const listaFinal = Array.isArray(datos)
            ? datos
            : datos.data || datos.items || [datos];

        listaFinal.slice(0, 20).forEach((item) => {
            const fila = `
                <tr>
                    <td>${item.id || "N/A"}</td>
                    <td>${item.ip || item.service_ip || "0.0.0.0"}</td>
                    <td<
                        <span class="badge $item.status === 'active' ? 'bg-success' : 'bg-secondary'">
                            ${item.status || "desconocido"}
                        </span>
                    </td>
                </tr>
            `;
            cuerpoTabla.innerHTML += fila;
        });
    } catch (error) {
        console.error("Error al conectar con n8n:", error);
        if (cuerpoTabla) {
            cuerpoTabla.innerHTML = `<tr><td colspan="3" class="text-danger">Error: ${error.message}</td></tr>`;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    traerDatosDeN8n();
});
