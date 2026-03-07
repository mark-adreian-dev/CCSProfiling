<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Infrastructure\Models\FacultyProfile;
use App\Infrastructure\Models\User;

class FacultyProfilesSeeder extends Seeder
{
    public function run(): void
    {
        $facultyUsers = User::where('role', '!=', 'student')->get();

        foreach ($facultyUsers as $index => $user) {
            $employeeNumber = str_pad($index + 1, 7, '0', STR_PAD_LEFT);

            FacultyProfile::create([
                'user_id' => $user->id,
                'employee_no' => $employeeNumber,
                'expertise' => 'General Expertise',
            ]);
        }
    }
}