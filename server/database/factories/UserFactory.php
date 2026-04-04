<?php
namespace Database\Factories;

// CRITICAL: Point this to your actual User model path
use App\Domain\Enums\GenderEnum;
use App\Domain\Enums\RoleEnum;
use App\Infrastructure\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     * * @var string
     */
    protected $model = User::class; // This prevents it from looking for 'App\User'

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $dob = fake()->date('Y-m-d', '2005-01-01');

        return [
            'email' => fake()->unique()->safeEmail(),
            'password' => Hash::make('password'),
            'role' => fake()->randomElement([RoleEnum::ADMIN, RoleEnum::CHAIR, RoleEnum::DEAN, RoleEnum::FACULTY, RoleEnum::STUDENT]),
            'department_id' => 1,
            'name_prefix' => null,
            'first_name' => fake()->firstName(),
            'middle_name' => null,
            'last_name' => fake()->lastName(),
            'name_suffix' => null,
            'date_of_birth' => $dob,
            'age' => fake()->numberBetween(18, 65),
            'sex' => fake()->randomElement([GenderEnum::FEMALE, GenderEnum::MALE]),
            'contact_number' => '09' . fake()->numerify('#########'),
            'address' => fake()->address(),
            'profile_picture' => null,
        ];
    }
}
