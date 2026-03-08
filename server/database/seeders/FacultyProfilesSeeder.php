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
        $facultyUsers = User::where('role', '!=', 'student')->get();

        foreach ($facultyUsers as $index => $user) {

            $maxStudentNo = StudentProfile::max('student_no') ?: 0;

            foreach ($facultyUsers as $index => $user) {

                // Start numbering faculty after the last student number
                $employeeNumber = str_pad($maxStudentNo + $index + 1, 7, '0', STR_PAD_LEFT);

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
}