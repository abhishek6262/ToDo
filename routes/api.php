<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/users', 'UserController@store')->name('users.store');

Route::group(['middleware' => 'auth:api'], function () {
    // Returns the authenticated user as a response.
    Route::get('/users/me', function (Request $request) {
        return new \App\Http\Resources\UserResource(
            $request->user()
        );
    })->name('users.show');

    // Helps to perform crud operation on List Items based on REST APIs
    // structure.
    Route::resource('items', 'ListItemController')->only([
        'destroy', 'index', 'store', 'update'
    ]);
});