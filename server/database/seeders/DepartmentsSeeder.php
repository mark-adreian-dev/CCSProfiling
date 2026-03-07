<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Infrastructure\Models\Department;

class DepartmentsSeeder extends Seeder
{
    public function run(): void
    {
        Department::create([
            'name' => 'College of Computer Studies',
            'code' => 'CCS',
            'contact_number' => '09123456789',
            'email' => 'ccs@example.edu'
        ]);
    }
}