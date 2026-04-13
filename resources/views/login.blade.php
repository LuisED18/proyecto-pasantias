<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: white;
        }

        .card {
            background-color: #2d3748;
            border: none;
            border-radius: 15px;
        }

        .btn-primary {
            background-color: #38508C;
            border: none;
            border-radius: 15px;
        }

        .form-control {
            border-radius: 15px
        }
    </style>
</head>

<body class="d-flex align-items-center vh-100">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card shadow-lg p-4">
                    <img src="{{ asset('images/logoVIT.png') }}" alt="Logo VIT" class="img-fluid mb-3"
                        style="max-width: 150px; margin: 0 auto;">
                    @if ($errors->any())
                        <div class="alert alert-danger py-2">
                            <ul class="mb-0" style="font-size: 0.85rem;">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form action="{{ route('login') }}" method="POST">
                        @csrf
                        <div class="mb-3">
                            <label class="form-label text-white" font-weight-bold>Correo o Usuario</label>
                            <input type="text" name="login" placeholder="ejemplo@gmail.com o usuario" class="form-control"
                                required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-white" font-weight-bold>Contraseña</label>
                            <input type="password" name="password" placeholder="********" class="form-control" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
