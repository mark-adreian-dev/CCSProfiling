<?php

namespace Database\Seeders;

use App\Infrastructure\Models\AcademicYear;
use App\Infrastructure\Models\GradingPeriod;
use App\Infrastructure\Models\StudentProfile;
use App\Infrastructure\Models\Semester;
use App\Infrastructure\Models\Subject;
use App\Infrastructure\Models\Grade;
use Illuminate\Database\Seeder;

class GradesSeeder extends Seeder
{
    public function run()
    {
        // Get all grading periods
        $gradingPeriods = GradingPeriod::all();

        // Get all semesters (1st and 2nd semester references)
        $semesters = Semester::all();

        // Get all students
        $students = StudentProfile::with('user')->get();

        // Get all academic years
        $academicYears = AcademicYear::all();

        foreach ($students as $studentProfile) {
            foreach ($academicYears as $academicYear) {

                // Skip future academic years
                if ($academicYear->id > $studentProfile->academic_year) {
                    continue;
                }

                foreach ($semesters as $semester) {

                    // Only subjects for this semester AND this academic year
                    $subjects = Subject::where('semester_id', $semester->id)
                        ->where('academic_year_id', $academicYear->id)
                        ->get();

                    foreach ($subjects as $subject) {
                        foreach ($gradingPeriods as $period) {
                            Grade::create([
                                'student_id' => $studentProfile->user_id,
                                'semester_id' => $semester->id,
                                'subject_id' => $subject->id,
                                'grading_period_id' => $period->id,
                                'academic_year_id' => $academicYear->id,
                                'grade_value' => round(mt_rand(10, 30) / 10, 1),
                            ]);
                        }
                    }
                }
            }
        }
    }
}