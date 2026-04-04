<?php

namespace App\Application\UseCases\User;

use App\Domain\Entities\UserEntity;
use App\Domain\Repositories\UserRepositoryInterface;
use Exception;

class GetStudentProfileService
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
        $student = $this->userRepository->findStudentByID((int) $id);

        if (!$student) {
            throw new Exception("Student not found", 404);
        }

        return $student;
    }
}