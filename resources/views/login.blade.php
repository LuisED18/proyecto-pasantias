<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('app.css') }}">
    <style>
        body {
            background-color: #2d3748;
        }

        .login-card {
            background-color: #2d3748;
            border: none;
            border-radius: 15px;
        }

        .login-card .form-label {
            font-weight: bold;
        }

        .btn-primary {
            background-color: #38508C;
            border: none;
            border-radius: 15px;
        }

        .form-control {
            border-radius: 15px;
        }
    </style>
</head>

<body class="d-flex align-items-center vh-100">
    <div class="w-100 d-flex justify-content-center px-3">
        <div class="border border-dark border-2 shadow-lg p-1" style="max-width: 460px; width: 100%; border-radius: 15px;">
            <div class="card shadow-lg p-4 login-card">
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
                        <label class="form-label text-white fw-bold">Correo o Usuario</label>
                        <input type="text" name="login" placeholder="ejemplo@gmail.com o usuario"
                            class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label text-white fw-bold">Contraseña</label>
                        <input type="password" name="password" placeholder="********" class="form-control" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Entrar</button>
                </form>
            </div>
        </div>
    </div>
</body>

</html>
