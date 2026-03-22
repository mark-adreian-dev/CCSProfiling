<?php

namespace App\Application\UseCases\User;

use App\Domain\Entities\FacultyProfileEntity;
use App\Domain\Entities\StudentProfileEntity;
use App\Domain\Entities\UserEntity;
use App\Domain\Enums\OrderEnum;
use App\Domain\Enums\UserSortBy;
use App\Domain\Repositories\UserRepositoryInterface;
use App\Infrastructure\Models\FacultyProfile;
use App\Infrastructure\Models\User;
use Illuminate\Support\Facades\Auth;
use Exception;

class GetAllFacultyProfileService
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

        // 1. Determine the base query
        if ($search) {
            // First, check if the search string is a valid Employee ID
            $idQuery = $this->userRepository->findAllFacultyProfilesById($search);

            if ($idQuery->exists()) {
                // If an ID match exists, use the ID-specific query
                $query = $idQuery;
            } else {
                // Otherwise, use the general list and apply name/email filters
                $query = $this->userRepository->findAllFacultyProfiles();
                $query->where(function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            }
        } else {
            // No search query provided, get all faculty profiles
            $query = $this->userRepository->findAllFacultyProfiles();
        }

        // 2. Apply Sorting and Paginate
        // Note: If sorting by a field that isn't in the users table,
        // you may need additional join logic here.
        $query->orderBy($sortBy->value, $order->value);

        $paginated = $query->paginate(perPage: $pageSize, page: $page);

        // 3. Map to Entities
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
                age: $user->age,
                date_of_birth: $user->date_of_birth,
                sex: $user->sex,
                contact_number: $user->contact_number,
                address: $user->address,
                profile_picture: $user->profile_picture,
                created_at: (string) $user->created_at,
                updated_at: (string) $user->updated_at,
                deleted_at: $user->deleted_at ? (string) $user->deleted_at : null,

                facultyProfile: $user->facultyProfile ? new FacultyProfileEntity(
                    id: $user->facultyProfile->id,
                    employee_no: $user->facultyProfile->employee_no,
                    expertise: $user->facultyProfile->expertise,
                ) : null,
            );
        });
    }
}