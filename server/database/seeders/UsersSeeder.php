<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Infrastructure\Models\User;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create your specific "Fixed" accounts first
        $fixedUsers = [
            ['email' => 'admin@system.com', 'role' => 'admin', 'first_name' => 'System', 'last_name' => 'Administrator'],
            ['email' => 'dean1@example.com', 'role' => 'dean', 'first_name' => 'Dean', 'last_name' => 'User'],
            ['email' => 'chair1@example.com', 'role' => 'chair', 'first_name' => 'Chair', 'last_name' => 'User'],
            ['email' => 'faculty1@example.com', 'role' => 'faculty', 'first_name' => 'Faculty', 'last_name' => 'User'],
            ['email' => 'student1@example.com', 'role' => 'student', 'first_name' => 'Student', 'last_name' => 'User'],
        ];

        foreach ($fixedUsers as $userData) {
            User::create(array_merge([
                'password' => Hash::make('password'),
                'department_id' => 1,
                'sex' => 'Male',
                'contact_number' => '09123456789',
                'address' => 'University Campus',
                'date_of_birth' => '1990-01-01',
                'age' => 32
            ], $userData));
        }

        // 2. Generate 2,000 random accounts
        // This will take a few seconds but is way faster than manual entry
        User::factory()->count(100)->create();
    }
}