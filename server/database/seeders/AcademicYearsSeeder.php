<?php

namespace Database\Seeders;
use App\Infrastructure\Models\AcademicYear;
use Illuminate\Database\Seeder;

class AcademicYearsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
        foreach ($years as $year) {
            AcademicYear::create(['year_level' => $year]);
        }
    }
}
