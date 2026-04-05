<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Curriculum;
use App\Infrastructure\Models\Semester;
use App\Infrastructure\Models\Subject;
use App\Infrastructure\Models\AcademicYear;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class SubjectsSeeder extends Seeder
{
    public function run()
    {
        $subjectsPool = [
            // Year 1
            'Mathematics',
            'Physics',
            'Chemistry',
            'Biology',
            'Programming',
            'Data Structures',
            'Algorithms',
            'Introduction to Computing',
            'English Communication',
            'Physical Education',
            'Philosophy',
            'Ethics',
            'History',
            'Economics',
            'Statistics',
            'Logic',
            'Environmental Science',
            'Art Appreciation',
            'Sociology',

            // Year 2
            'Database Systems',
            'Software Engineering',
            'Computer Networks',
            'Web Development',
            'Mobile Development',
            'Discrete Mathematics',
            'Operating Systems',
            'Cloud Computing',
            'Cybersecurity',
            'Human-Computer Interaction',
            'Probability and Statistics',
            'Linear Algebra',
            'Psychology',
            'Communication Skills',
            'Digital Logic',

            // Year 3
            'Artificial Intelligence',
            'Machine Learning',
            'Compiler Design',
            'Data Mining',
            'Information Security',
            'Embedded Systems',
            'Game Development',
            'Project Management',
            'Network Security',
            'Software Testing',
            'Computer Graphics',
            'E-commerce Systems',
            'Research Methods',
            'Entrepreneurship',
            'Philosophy of Science',

            // Year 4
            'Advanced Programming',
            'Big Data Analytics',
            'Data Science',
            'Cloud Applications',
            'Advanced Web Development',
            'Robotics',
            'Mobile Applications',
            'Capstone Project',
            'Advanced Algorithms',
            'Ethics in Technology',
            'Innovation and Technology',
            'Operations Research',
            'Digital Marketing',
            'Blockchain Technology',
            'Human Resource Management',
            'Leadership and Governance',
            'Strategic Management',
            'Social Psychology',
        ];

        $academicYears = AcademicYear::all();
        $semesters = Semester::all();

        foreach ($academicYears as $year) {
            foreach ($semesters as $semester) {

                $totalUnits = 0;

                while ($totalUnits < 20 && count($subjectsPool) > 0) {
                    $subjectIndex = array_rand($subjectsPool);
                    $subjectName = $subjectsPool[$subjectIndex];

                    // Assign 2 or 3 units
                    $units = rand(2, 3);

                    // Adjust units if adding exceeds 21
                    if ($totalUnits + $units > 21) {
                        $units = 21 - $totalUnits;
                    }

                    // Create subject for this semester
                    $subject = Subject::create([
                        'academic_year_id' => $year->id,
                        'semester_id' => $semester->id,
                        'course_code' => strtoupper(substr($subjectName, 0, 3)) . rand(100, 499),
                        'name' => $subjectName,
                        'units' => $units
                    ]);

                    // Create curriculum record
                    Curriculum::create([
                        'subject_id' => $subject->id,
                        'year_started' => Carbon::now()->toDateString(),
                        'year_ended' => Carbon::now()->addYears(4)->toDateString()
                    ]);

                    unset($subjectsPool[$subjectIndex]);
                    $totalUnits += $units;

                    if ($totalUnits >= 20) {
                        break;
                    }
                }
            }
        }
    }
}