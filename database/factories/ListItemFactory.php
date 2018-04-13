<?php

use Faker\Generator as Faker;

$factory->define(\App\ListItem::class, function (Faker $faker) {
    return [
        'data'   => $faker->sentence,
        'status' => $faker->randomElement(['todo', 'onprogress', 'completed'])
    ];
});
