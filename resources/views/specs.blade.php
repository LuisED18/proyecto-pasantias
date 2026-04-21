<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Especificaciones</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('app.css') }}">
</head>

<body>

    <nav class="border-dark border-bottom shadow-lg p-2 navbar navbar-dark">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">
                <img src="{{ asset('images/logoVIT.png') }}" alt="Logo VIT" style="max-width: 100px;">
            </span>
            <div class="d-flex align-items-center gap-3">
                <h2 id="reloj" class="fs-5 mb-0"></h2>
                <span id="spanUser" class="text-light">Bienvenido, {{ Auth::user()->name }}</span>
                <a id="btnSalir" href="/login" class="btn btn-danger btn-sm">Salir</a>
            </div>
        </div>
    </nav>

    <div class="d-flex">

        <nav id="sidebar">
            <div class="sidebar-title">Menú</div>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link {{ request()->is('dashboard') ? 'active' : '' }}" href="/dashboard">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                        </svg>
                        Servicios
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ request()->is('specs') ? 'active' : '' }}" href="/specs">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
                        </svg>
                        Especificaciones
                    </a>
                </li>
            </ul>
        </nav>

        <div id="main-content">
            <div class="card bg-dark text-white border-secondary border-3 shadow-lg rounded-3">
                <div class="card-header text-center border-white fs-4 fw-bold">Especificaciones</div>
                <div class="card-body p-0">
                    <table class="table table-dark table-striped mb-0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>SO</th>
                            </tr>
                        </thead>
                        <tbody id="tabla-specs">
                            <tr>
                                <td colspan="3" class="text-center"></td>
                            </tr>
                        </tbody>
                    </table>


                </div>
            </div>
        </div>

    </div>

    <script src="{{ asset('js/appSpecs.js') }}"></script>


</body>

</html>
