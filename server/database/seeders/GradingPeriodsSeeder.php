<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Infrastructure\Models\GradingPeriod;

class GradingPeriodsSeeder extends Seeder
{
    public function run()
    {
        $periods = ['Prelim', 'Midterm', 'Finals'];
        foreach ($periods as $period) {
            GradingPeriod::create(['name' => $period]);
        }
    }
}
