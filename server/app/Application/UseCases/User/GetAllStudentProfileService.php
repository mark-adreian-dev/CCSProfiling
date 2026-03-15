<?php

namespace App\Application\UseCases\User;

use App\Domain\Entities\StudentProfileEntity;
use App\Domain\Entities\UserEntity;
use App\Domain\Enums\OrderEnum;
use App\Domain\Enums\UserSortBy;
use App\Domain\Repositories\UserRepositoryInterface;
use App\Infrastructure\Models\User;
use Illuminate\Support\Facades\Auth;
use Exception;

class GetAllStudentProfileService
{
    public function __construct(
        protected UserRepositoryInterface $userRepository
    ) {
    }

    public function execute(
        ?string $search,
        int $page,
        int $pageSize,
        UserSortBy $sortBy,
        OrderEnum $order,
    ) {
        if (!Auth::check()) {
            throw new Exception("Unauthorized", 401);
        }

        // 1. Get the Builder from the repository
        $query = $this->userRepository->findAllStudentProfiles();


        // 2. Apply Search Filter
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // 3. Apply Sorting and Paginate
        $query->orderBy($sortBy->value, $order->value);

        // This executes the database query
        $paginated = $query->paginate(perPage: $pageSize, page: $page);

        // 4. Complete Mapping Logic
        return $paginated->through(function (User $user) {
            return new UserEntity(
                id: $user->id,
                email: $user->email,
                password: $user->password,
                role: $user->role,
                department_id: $user->department_id,
                name_prefix: $user->name_prefix,
                first_name: $user->first_name,
                middle_name: $user->middle_name,
                last_name: $user->last_name,
                name_suffix: $user->name_suffix,
                date_of_birth: $user->date_of_birth,
                sex: $user->sex,
                contact_number: $user->contact_number,
                address: $user->address,
                profile_picture: $user->profile_picture,
                created_at: $user->created_at,
                updated_at: $user->updated_at,
                deleted_at: $user->deleted_at,
                // Map the nested Student Profile Relation
                studentProfile: $user->studentProfile ? new StudentProfileEntity(
                    id: $user->studentProfile->id,
                    student_no: $user->studentProfile->student_no,
                    program_id: (int) $user->studentProfile->program_id,
                    academic_year: (int) $user->studentProfile->academic_year,
                    academic_status: $user->studentProfile->academic_status
                ) : null,
            );

        });
    }
}