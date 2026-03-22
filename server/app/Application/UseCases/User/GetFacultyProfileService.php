<?php

namespace App\Application\UseCases\User;

use App\Domain\Entities\UserEntity;
use App\Domain\Repositories\UserRepositoryInterface;
use Exception;

class GetFacultyProfileService
{
    /**
     * @var UserRepositoryInterface
     */
    private UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function execute($id): UserEntity
    {
        // Use the repository method we just created
        $faculty = $this->userRepository->findFacultyByID((int) $id);

        if (!$faculty) {
            throw new Exception("Faculty member not found", 404);
        }

        return $faculty;
    }
}