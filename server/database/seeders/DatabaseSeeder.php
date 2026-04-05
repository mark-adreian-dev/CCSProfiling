<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\DepartmentsSeeder;
use Database\Seeders\ProgramsSeeder;
use Database\Seeders\UsersSeeder;
use Database\Seeders\StudentProfilesSeeder;
use Database\Seeders\FacultyProfilesSeeder;
use Database\Seeders\InterestsSeeder;
use Database\Seeders\UserInterestsSeeder;
use Database\Seeders\AcademicYearsSeeder;
use Database\Seeders\SemestersSeeder;
use Database\Seeders\SubjectsSeeder;
use Database\Seeders\GradingPeriodsSeeder;
use Database\Seeders\GradesSeeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            DepartmentsSeeder::class,          // first, because other tables depend on it
            ProgramsSeeder::class,             // programs need departments
            UsersSeeder::class,                // create 1 user per role
            StudentProfilesSeeder::class,      // create StudentProfile/FacultyProfile
            FacultyProfilesSeeder::class,      // create StudentProfile/FacultyProfile

            InterestsSeeder::class,
            UserInterestsSeeder::class,
            AffiliationSeeder::class,

            AcademicYearsSeeder::class,    // Step 1: Create academic years
            SemestersSeeder::class,        // Step 2: Create semesters
            SubjectsSeeder::class,         // Step 3: Create subjects per semester
            GradingPeriodsSeeder::class,   // Step 4: Create grading periods
            GradesSeeder::class,           // Step 5: Assign grades to students
        ]);
    }
}