<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * We'll redirect the user on the Index page of the application to let
 * Angular JS framework take over it from there so it can show the actual
 * content of the route.
 */
Route::get('/{capture?}', function () {
    return view('index');
})->where('capture', '[\/\w\.-]*');
