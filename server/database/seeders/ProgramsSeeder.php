<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Infrastructure\Models\Program;

class ProgramsSeeder extends Seeder
{
    public function run(): void
    {
        Program::create([
            'name' => 'Bachelor of Science in Information Technology',
            'code' => 'BSIT',
            'department_id' => 1,
            'description' => 'Information Technology program'
        ]);

        Program::create([
            'name' => 'Bachelor of Science in Computer Science',
            'code' => 'BSCS',
            'department_id' => 1
        ]);
    }
}