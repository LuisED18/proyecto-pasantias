<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Redes VIT</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background-color: #1a202c; color: white; }
        .navbar { background-color: #2d3748; }
    </style>
</head>
<body>
    <nav class="navbar navbar-dark shadow-sm p-3">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1"><img src="{{ asset('images/logoVIT.png') }}" alt="Logo VIT" style="max-width: 100px; margin: 0 auto;"></span>
            <div class="d-flex">
                <span class="text-secondary me-3">Bienvenido, {{ Auth::user()->name }}</span>
                <a href="/login" class="btn btn-outline-danger btn-sm">Salir</a>
            </div>
        </div>
    </nav>
</body>
</html>
