<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Infrastructure\Models\User;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'username' => 'admin',
            'email' => 'admin@system.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'first_name' => 'System',
            'last_name' => 'Administrator',
        ]);

        // Dean
        User::create([
            'username' => 'dean1',
            'email' => 'dean1@example.com',
            'password' => Hash::make('password'),
            'role' => 'dean',
            'department_id' => 1,
            'first_name' => 'Dean',
            'last_name' => 'User',
        ]);

        // Chair
        User::create([
            'username' => 'chair1',
            'email' => 'chair1@example.com',
            'password' => Hash::make('password'),
            'role' => 'chair',
            'department_id' => 1,
            'first_name' => 'Chair',
            'last_name' => 'User',
        ]);

        // Faculty
        User::create([
            'username' => 'faculty1',
            'email' => 'faculty1@example.com',
            'password' => Hash::make('password'),
            'role' => 'faculty',
            'department_id' => 1,
            'first_name' => 'Faculty',
            'last_name' => 'User',
        ]);

        // Student
        User::create([
            'username' => 'student1',
            'email' => 'student1@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
            'department_id' => 1,
            'first_name' => 'Student',
            'last_name' => 'User',
        ]);
    }
}