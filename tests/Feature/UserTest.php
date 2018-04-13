<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;

class UserTest extends TestCase
{
    public function test_authenticated_user() {
        Passport::actingAs(
            factory(User::class)->create()
        );

        $response = $this->json('GET', route('users.show'));

        $response->assertStatus(201)->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'email',
                'created_at',
                'updated_at'
            ]
        ]);
    }

    public function test_registering_user()
    {
        $response = $this->json('POST', route('users.store'), [
            'name'     => 'Test User',
            'email'    => 'test@mail.com',
            'password' => 'secret'
        ]);

        $response->assertStatus(201)->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'email',
                'created_at',
                'updated_at'
            ]
        ]);
    }
}
