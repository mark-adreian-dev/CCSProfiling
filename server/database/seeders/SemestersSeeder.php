<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Infrastructure\Models\Semester;

class SemestersSeeder extends Seeder
{
    public function run()
    {
        $semesters = [
            [
                'name' => '1st Semester',
                'start_date' => null,
                'end_date' => null
            ],
            [
                'name' => '2nd Semester',
                'start_date' => null,
                'end_date' => null
            ]
        ];

        foreach ($semesters as $sem) {
            Semester::updateOrCreate(
                ['name' => $sem['name']],
                [
                    'start_date' => $sem['start_date'],
                    'end_date' => $sem['end_date']
                ]
            );
        }
    }
}