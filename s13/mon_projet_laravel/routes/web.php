<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TasksController;

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/tasks', [App\Http\Controllers\TasksController::class, 'index'])->name('tasks');
// Route::get('/tasks/create', [App\Http\Controllers\TasksController::class, 'create'])->name('tasks.create');
// Route::post('/tasks/create', [App\Http\Controllers\TasksController::class, 'store']);

Route::resource('tasks', TasksController::class);