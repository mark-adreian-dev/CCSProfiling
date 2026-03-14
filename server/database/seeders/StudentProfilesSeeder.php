<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Infrastructure\Models\StudentProfile;
use App\Infrastructure\Models\User;

class StudentProfilesSeeder extends Seeder
{
    public function run(): void
    {
        // Get the starting point from the DB so you don't overwrite/duplicate
        $lastStudentNo = (int) StudentProfile::max('student_no') ?: 0;

        // Get students who don't have a profile yet
        $students = User::where('role', 'student')
            ->whereDoesntHave('studentProfile') // Avoid duplicate profiles
            ->get();

        foreach ($students as $index => $student) {
            // Increment based on the last known number in the DB
            $studentNumber = str_pad($lastStudentNo + $index + 1, 7, '0', STR_PAD_LEFT);

            StudentProfile::firstOrCreate(
                ['user_id' => $student->id],
                [
                    'program_id' => 1,
                    'academic_year' => 3,
                    'academic_status' => 'Regular',
                    'student_no' => $studentNumber,
                ]
            );
        }
    }
}