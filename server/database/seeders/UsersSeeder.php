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
            'email' => 'admin@system.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'department_id' => null,
            'name_prefix' => null,
            'first_name' => 'System',
            'middle_name' => null,
            'last_name' => 'Administrator',
            'name_suffix' => null,
            'date_of_birth' => '1990-01-01',
            'sex' => 'Male',
            'contact_number' => '09123456789',
            'address' => 'System Office',
            'profile_picture' => null,
        ]);

        // Dean
        User::create([
            'email' => 'dean1@example.com',
            'password' => Hash::make('password'),
            'role' => 'dean',
            'department_id' => 1,
            'name_prefix' => 'Dr.',
            'first_name' => 'Dean',
            'middle_name' => null,
            'last_name' => 'User',
            'name_suffix' => null,
            'date_of_birth' => '1980-05-15',
            'sex' => 'Male',
            'contact_number' => '09123456780',
            'address' => 'University Campus',
            'profile_picture' => null,
        ]);

        // Chair
        User::create([
            'email' => 'chair1@example.com',
            'password' => Hash::make('password'),
            'role' => 'chair',
            'department_id' => 1,
            'name_prefix' => null,
            'first_name' => 'Chair',
            'middle_name' => null,
            'last_name' => 'User',
            'name_suffix' => null,
            'date_of_birth' => '1985-03-20',
            'sex' => 'Female',
            'contact_number' => '09123456781',
            'address' => 'University Campus',
            'profile_picture' => null,
        ]);

        // Faculty
        User::create([
            'email' => 'faculty1@example.com',
            'password' => Hash::make('password'),
            'role' => 'faculty',
            'department_id' => 1,
            'name_prefix' => null,
            'first_name' => 'Faculty',
            'middle_name' => null,
            'last_name' => 'User',
            'name_suffix' => null,
            'date_of_birth' => '1990-07-10',
            'sex' => 'Male',
            'contact_number' => '09123456782',
            'address' => 'University Campus',
            'profile_picture' => null,
        ]);

        // Student
        User::create([
            'email' => 'student1@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
            'department_id' => 1,
            'name_prefix' => null,
            'first_name' => 'Student',
            'middle_name' => null,
            'last_name' => 'User',
            'name_suffix' => null,
            'date_of_birth' => '2002-09-12',
            'sex' => 'Male',
            'contact_number' => '09123456783',
            'address' => 'Student Dormitory',
            'profile_picture' => null,
        ]);
    }
}