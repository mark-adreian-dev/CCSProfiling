<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\DepartmentsSeeder;
use Database\Seeders\ProgramsSeeder;
use Database\Seeders\UsersSeeder;
use Database\Seeders\StudentProfilesSeeder;
use Database\Seeders\FacultyProfilesSeeder;

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
        ]);
    }
}