<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Infrastructure\Models\FacultyProfile;
use App\Infrastructure\Models\User;
use App\Infrastructure\Models\StudentProfile;

class FacultyProfilesSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Get the starting point ONCE outside the loop
        $lastStudentNo = (int) StudentProfile::max('student_no') ?: 0;

        // 2. Fetch only users who actually need a faculty profile
        // Excluding 'admin' and 'student'
        $facultyUsers = User::whereIn('role', ['faculty', 'chair', 'dean'])->get();

        foreach ($facultyUsers as $index => $user) {
            // Calculate employee number dynamically based on index
            $employeeNumber = str_pad($lastStudentNo + $index + 1, 7, '0', STR_PAD_LEFT);

            FacultyProfile::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'employee_no' => $employeeNumber,
                    'expertise' => 'General Expertise',
                ]
            );
        }
    }
}