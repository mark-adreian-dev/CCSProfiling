<?php

namespace App\Infrastructure\Providers;

use App\Domain\Repositories\AffiliationRepositoryInterface;
use App\Domain\Repositories\GradeRepositoryInterface;
use App\Domain\Repositories\ProgramRepositoryInterface;
use App\Infrastructure\Repositories\AffiliationRepository;
use App\Infrastructure\Repositories\GradeRepository;
use App\Infrastructure\Repositories\ProgramRepository;
use Illuminate\Support\ServiceProvider;
use App\Domain\Repositories\UserRepositoryInterface;
use App\Infrastructure\Repositories\UserRepository;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Domain\Repositories\InterestRepositoryInterface;
use App\Infrastructure\Repositories\InterestRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            UserRepositoryInterface::class,
            UserRepository::class,
        );

        $this->app->bind(
            ProgramRepositoryInterface::class,
            ProgramRepository::class
        );

        $this->app->bind(
            InterestRepositoryInterface::class,
            InterestRepository::class
        );

        $this->app->bind(
            AffiliationRepositoryInterface::class,
            AffiliationRepository::class
        );

        $this->app->bind(
            GradeRepositoryInterface::class,
            GradeRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();
    }
}
