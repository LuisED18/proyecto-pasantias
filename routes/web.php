<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/login', function () {
    return view('login');
})->name('login');

Route::post('/login', [AuthController::class, 'login'])->name('login.post');

Route::get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

Route::get('/specs', function () {
    return view('specs');
})->name('specs');

Route::get('/', function () {
    return redirect()->route('login');
});
