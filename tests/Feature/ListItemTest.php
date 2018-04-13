<?php

namespace Tests\Feature;

use App\ListItem;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;

class ListItemTest extends TestCase
{
    public function test_fetching_list_items_by_authenticated_user() {
        $user = factory(User::class)->create();
        $user->listItems()->saveMany(factory(ListItem::class, 5)->make());

        Passport::actingAs($user);

        $response = $this->json('GET', route('items.index'));

        $response->assertStatus(200)->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'data',
                    'status',
                    'created_at',
                    'updated_at'
                ]
            ]
        ]);
    }

    public function test_fetching_list_items_by_unauthenticated_user() {
        $response = $this->json('GET', route('items.index'));

        $response->assertStatus(401);
    }

    public function test_storing_list_item_by_authenticated_user()
    {
        Passport::actingAs(
            factory(User::class)->create()
        );

        $response = $this->json('POST', route('items.store'), [
            'data'   => 'This is a test data.',
            'status' => 'todo'
        ]);

        $response->assertStatus(201)->assertJsonStructure([
            'id',
            'data',
            'status',
            'created_at',
            'updated_at'
        ]);
    }

    public function test_storing_list_item_by_unauthenticated_user()
    {
        $response = $this->json('POST', route('items.store'), [
            'data'   => 'This is a test data.',
            'status' => 'todo'
        ]);

        $response->assertStatus(401);
    }

    public function test_deleting_test_item_by_authenticated_user()
    {
        $user = factory(User::class)->create();
        $user->listItems()->save(factory(ListItem::class)->make([
            'id' => 100
        ]));

        Passport::actingAs($user);

        $response = $this->json('DELETE', route('items.destroy', ['item' => 100]));

        $response->assertStatus(204);
    }

    public function test_deleting_test_item_by_unauthenticated_user()
    {
        $user = factory(User::class)->create();
        $user->listItems()->save(factory(ListItem::class)->make([
            'id' => 100
        ]));

        $response = $this->json('DELETE', route('items.destroy', ['item' => 100]));

        $response->assertStatus(401);
    }

    public function test_updating_test_item_by_authenticated_user()
    {
        $user = factory(User::class)->create();
        $user->listItems()->save(factory(ListItem::class)->make([
            'id' => 100
        ]));

        Passport::actingAs($user);

        $response = $this->json('PUT', route('items.update', ['item' => 100]), [
            'data'   => 'This is the new data.',
            'status' => 'completed'
        ]);

        $response->assertStatus(200)->assertJson([
            'data'   => 'This is the new data.',
            'status' => 'completed'
        ])
        ->assertJsonStructure([
            'id',
            'data',
            'status',
            'created_at',
            'updated_at'
        ]);
    }

    public function test_updating_test_item_by_unauthenticated_user()
    {
        $user = factory(User::class)->create();
        $user->listItems()->save(factory(ListItem::class)->make([
            'id' => 100
        ]));

        $response = $this->json('PUT', route('items.update', ['item' => 100]), [
            'data'   => 'This is the new data.',
            'status' => 'completed'
        ]);

        $response->assertStatus(401);
    }
}
