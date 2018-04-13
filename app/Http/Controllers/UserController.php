<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

/**
 * Class UserController
 * @package App\Http\Controllers
 */
class UserController extends Controller
{
    /**
     * Registers the user with the supplied details into the application
     * over APIs.
     *
     * @param Request $request
     *
     * @return UserResource
     */
    public function store(Request $request)
    {
        // Validate the supplied data by the client.
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        // Next, we're good to go and register the user with the supplied
        // details into the application and return the detail of the newly
        // created user to the client.
        $user = User::create([
            'name'     => $request->input('name'),
            'email'    => $request->input('email'),
            'password' => Hash::make($request->input('password'))
        ]);

        return new UserResource($user);
    }
}
