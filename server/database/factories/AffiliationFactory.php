<?php

namespace Database\Factories;

use App\Infrastructure\Models\Affiliation;
use App\Infrastructure\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AffiliationFactory extends Factory
{
    protected $model = Affiliation::class;

    public function definition(): array
    {
        $dateStart = $this->faker->dateTimeBetween('-5 years', 'now');

        // Optional end date
        $dateEnd = $this->faker->optional(0.7)->dateTimeBetween('now', '+3 years');

        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'role' => $this->faker->jobTitle,
            'affiliation_name' => $this->faker->company,
            'description' => $this->faker->sentence,
            'date_start' => $dateStart->format('Y-m-d'),
            'date_end' => $dateEnd ? $dateEnd->format('Y-m-d') : null,
        ];
    }
}