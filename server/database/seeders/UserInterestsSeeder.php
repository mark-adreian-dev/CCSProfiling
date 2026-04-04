<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Infrastructure\Models\User;
use App\Infrastructure\Models\Interest;

class UserInterestsSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $interests = Interest::all();

        foreach ($users as $user) {

            // Get 1–5 random interests
            $randomInterests = $interests->random(rand(1, 5));

            // ✅ PUT IT HERE (inside the loop, replacing insert)
            $ids = $randomInterests->pluck('id')->toArray();

            $user->interests()->syncWithoutDetaching(
                collect($ids)->mapWithKeys(fn($id) => [
                    $id => [
                        'started_at' => now()->subDays(rand(0, 365)),
                    ]
                ])->toArray()
            );
        }
    }
}