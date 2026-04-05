<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Repositories\GradeRepositoryInterface;
use App\Infrastructure\Models\AcademicYear;
use App\Infrastructure\Models\Grade;
use App\Infrastructure\Models\Semester;
use App\Infrastructure\Models\Subject;

class GradeRepository implements GradeRepositoryInterface
{
    public function getGradesByStudentId(int $studentId): array
    {
        $grades = Grade::with([
            'subject.curricula',
            'subject',
            'semester',
            'academicYear' // ✅ load correct relationship
        ])
            ->where('student_id', $studentId)
            ->get();

        // Pick the first curriculum (assuming all subjects belong to the same curriculum)
        $firstGrade = $grades->first();

        $curriculum = $firstGrade?->subject?->curricula
                ?->firstWhere(fn($c) => $c->year_started <= now() && now() <= $c->year_ended);

        $data = [
            'curriculum_id' => $curriculum?->id,
            'curriculum_date_start' => $curriculum?->year_started,
            'curriculum_date_end' => $curriculum?->year_ended,
            'grades' => []
        ];

        foreach ($grades as $grade) {
            $data['grades'][] = [
                'id' => $grade->id,
                'grade_value' => $grade->grade_value,

                'subject' => $grade->subject ? [
                    'id' => $grade->subject->id,
                    'name' => $grade->subject->name,
                    'course_code' => $grade->subject->course_code,
                    'units' => $grade->subject->units
                ] : null,

                'semester' => $grade->semester ? [
                    'id' => $grade->semester->id,
                    'name' => $grade->semester->name
                ] : null,

                // ✅ FIXED: use grade->academicYear instead of semester
                'academic_year' => $grade->academicYear ? [
                    'id' => $grade->academicYear->id,
                    'year_level' => $grade->academicYear->year_level
                ] : null,
            ];
        }

        return $data;
    }

    public function getStructuredCurriculum(): array
    {
        $result = [];

        // Get all academic years (1st–4th)
        $academicYears = AcademicYear::all();

        // Get all semesters (global references)
        $semesters = Semester::all();

        foreach ($academicYears as $year) {

            $yearData = [
                'academic_year' => $year->year_level,
                'id' => $year->id,
                'semesters' => []
            ];

            foreach ($semesters as $semester) {

                // Get subjects that match this academic year and semester
                $subjects = Subject::where('academic_year_id', $year->id)
                    ->where('semester_id', $semester->id)
                    ->get();

                // Only include the semester if it has subjects
                if ($subjects->isEmpty()) {
                    continue;
                }

                $yearData['semesters'][] = [
                    'id' => $semester->id,
                    'name' => $semester->name,
                    'subjects' => $subjects->map(function ($subject) {
                        return [
                            'id' => $subject->id,
                            'name' => $subject->name,
                            'units' => $subject->units,
                            'course_code' => $subject->course_code,
                        ];
                    })->values()->toArray()
                ];
            }

            // Only include the year if it has semesters with subjects
            if (!empty($yearData['semesters'])) {
                $result[] = $yearData;
            }
        }

        return $result;
    }
}