<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Infrastructure\Models\Interest;

class InterestsSeeder extends Seeder
{
    public function run(): void
    {
        $interests = [
            'Programming',
            'Web Development',
            'Mobile Development',
            'Cybersecurity',
            'Artificial Intelligence',
            'Data Science',
            'Gaming',
            'Music',
            'Sports',
            'Reading',
            'Writing',
            'Photography',
            'Graphic Design',
            'UI/UX Design',
            'Networking',
        ];

        foreach ($interests as $interest) {
            Interest::create([
                'name' => $interest,
            ]);
        }
    }
}