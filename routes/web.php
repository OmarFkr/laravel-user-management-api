<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('app');
});

    
Route::get('/createuser', function () {
    return Inertia::render('CreateUser');
})->name('createuser');;

Route::get('/register', [RegisterController::class, 'show'])->name('register');
Route::post('/register', [RegisterController::class, 'handle'])->name('register');


Route::get('/login', [LoginController::class, 'show'])->name('login');

Route::post('/login', [LoginController::class, 'handle'])->name('login');

Route::middleware(['web', 'auth'])->group(function () {
    // Other routes that require web and auth middleware

    // Add the logout route
    Route::post('/logout', 'Auth\LogoutController@logout')->name('logout');
});

