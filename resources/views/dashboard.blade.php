<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="{{ asset('js/app.js') }}"></script>
    <style>
        body {
            background-color: white;
            color: white;
        }

        .navbar {
            background-color: #2d3748;
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-dark shadow-sm p-3">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1"><img src="{{ asset('images/logoVIT.png') }}" alt="Logo VIT"
                    style="max-width: 100px; margin: 0 auto;"></span>
            <div class="d-flex">
                <span class="text-secondary me-3">Bienvenido, {{ Auth::user()->name }}</span>
                <a href="/login" class="btn btn-outline-danger btn-sm">Salir</a>
            </div>
        </div>
    </nav>
    <div class="container mt-5">
        <div class="card bg-dark text-white border-secondary">
            <div class="card-header">Datos de la API</div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-dark table-hover mb-0">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre del servicio</th>
                                <th scope="col">IP del servicio</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody id="tabla-cuerpo">
                            <tr>
                                <td colspan="3" class="text-center"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
