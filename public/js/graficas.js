/**
 * Lógica para las gráficas de RAM y ROM en la tabla de Servicios
 */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Buscamos el elemento colapsable del Servidor 1
    const collapseServidor1 = document.getElementById("collapseServidor1");

    // 2. Escuchamos el evento cuando termina de abrirse
    collapseServidor1.addEventListener("shown.bs.collapse", function () {
        generarGraficaRAM();
        generarGraficaROM();
    });
});

// Función para la gráfica de RAM (Estilo Dona - como tu dibujo)
function generarGraficaRAM() {
    const ctx = document.getElementById("graficaRAM1").getContext("2d");

    // Si ya existe una gráfica en este canvas, la destruimos para evitar duplicados al cerrar/abrir
    if (window.chartRAM1) {
        window.chartRAM1.destroy();
    }

    window.chartRAM1 = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Usado", "Disponible"],
            datasets: [
                {
                    data: [60, 40], // Datos de ejemplo (60% usado, 40% libre)
                    backgroundColor: ["#ff4d4d", "#2ecc71"], // Rojo y Verde
                    borderColor: "#1a222f",
                    borderWidth: 2,
                    hoverOffset: 4,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: "bottom",
                    labels: { color: "#ffffff", font: { size: 12 } },
                },
            },
            cutout: "70%", // Hace que el centro sea más grande, como un anillo
        },
    });
}

// Función para la gráfica de ROM (Estilo Tarta/Pie)
function generarGraficaROM() {
    const ctx = document.getElementById("graficaROM1").getContext("2d");

    if (window.chartROM1) {
        window.chartROM1.destroy();
    }

    window.chartROM1 = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Ocupado", "Libre"],
            datasets: [
                {
                    data: [75, 25], // Datos de ejemplo
                    backgroundColor: ["#3498db", "#f1c40f"], // Azul y Amarillo
                    borderColor: "#1a1a1a",
                    borderWidth: 2,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: "bottom",
                    labels: { color: "#ffffff", font: { size: 12 } },
                },
            },
        },
    });
}
