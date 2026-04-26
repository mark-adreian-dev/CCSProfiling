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
            ['age' => 32, 'date_of_birth' => '1990-01-01', 'address' => 'University Campus', 'contact_number' => '09123456789', 'sex' => 'Male', 'department_id' => 1, 'password' => Hash::make('password'), 'email' => 'admin@system.com', 'role' => 'admin', 'first_name' => 'System', 'last_name' => 'Administrator'],
            ['age' => 32, 'date_of_birth' => '1990-01-01', 'address' => 'University Campus', 'contact_number' => '09123456789', 'sex' => 'Male', 'department_id' => 1, 'password' => Hash::make('password'), 'email' => 'dean1@example.com', 'role' => 'dean', 'first_name' => 'Dean', 'last_name' => 'User'],
            ['age' => 32, 'date_of_birth' => '1990-01-01', 'address' => 'University Campus', 'contact_number' => '09123456789', 'sex' => 'Male', 'department_id' => 1, 'password' => Hash::make('password'), 'email' => 'chair1@example.com', 'role' => 'chair', 'first_name' => 'Chair', 'last_name' => 'User'],
            ['age' => 32, 'date_of_birth' => '1990-01-01', 'address' => 'University Campus', 'contact_number' => '09123456789', 'sex' => 'Male', 'department_id' => 1, 'password' => Hash::make('password'), 'email' => 'faculty1@example.com', 'role' => 'faculty', 'first_name' => 'Faculty', 'last_name' => 'User'],

            // Student Entries
            ['age' => 23, 'date_of_birth' => '2003-04-01', 'address' => 'Ph1 Blk4 Lt22 Lakesidenest Subdivision Banay-Banay Cabuyao Laguna', 'contact_number' => '09765765361', 'sex' => 'Male', 'department_id' => 1, 'password' => Hash::make('password'), 'email' => 'markadreianramos@gmail.com', 'role' => 'student', 'first_name' => 'Mark Adreian', 'last_name' => 'Ramos', 'profile_picture' => 'http://127.0.0.1:8000/storage/uploads/student/bwQZiYbTL3vqlSj4bhXTS0A4KZnMgnqUNInSKrCe.png'],
            ['age' => 32, 'date_of_birth' => '1990-01-01', 'address' => 'University Campus', 'contact_number' => '09123456789', 'sex' => 'Male', 'department_id' => 1, 'password' => Hash::make('password'), 'email' => 'student2@example.com', 'role' => 'student', 'first_name' => 'Alice', 'last_name' => 'Smith'],
            ['age' => 32, 'date_of_birth' => '1990-01-01', 'address' => 'University Campus', 'contact_number' => '09123456789', 'sex' => 'Male', 'department_id' => 1, 'password' => Hash::make('password'), 'email' => 'student3@example.com', 'role' => 'student', 'first_name' => 'Bob', 'last_name' => 'Johnson'],
            ['age' => 32, 'date_of_birth' => '1990-01-01', 'address' => 'University Campus', 'contact_number' => '09123456789', 'sex' => 'Male', 'department_id' => 1, 'password' => Hash::make('password'), 'email' => 'student4@example.com', 'role' => 'student', 'first_name' => 'Charlie', 'last_name' => 'Davis'],
        ];

        foreach ($fixedUsers as $userData) {
            User::create($userData);
        }

        // 2. Generate 2,000 random accounts
        // This will take a few seconds but is way faster than manual entry
        User::factory()->count(500)->create();
    }
}
