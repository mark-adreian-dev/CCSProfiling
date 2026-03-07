<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Infrastructure\Models\StudentProfile;
use App\Infrastructure\Models\User;

class StudentProfilesSeeder extends Seeder
{
    public function run(): void
    {
        $students = User::where('role', 'student')->get();

        foreach ($students as $index => $student) {
            $studentNumber = str_pad($index + 1, 7, '0', STR_PAD_LEFT);

            StudentProfile::create([
                'user_id' => $student->id,
                'program_id' => 1,
                'academic_year' => 3,
                'academic_status' => 'Regular',
                'student_no' => $studentNumber,
            ]);
        }
    }
}