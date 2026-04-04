<?php

namespace Database\Seeders;

use App\Infrastructure\Models\User;
use App\Infrastructure\Models\Affiliation;
use Illuminate\Database\Seeder;

class AffiliationSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        $richContent = '<h1 class="text-3xl font-bold tracking-tight mb-4 mt-2" style="text-align: left;"><span style="white-space: pre-wrap;">OPSOLUTIONS PH INC.</span></h1><h2 class="text-2xl font-semibold tracking-tight mb-3 mt-2"><i><em class="italic" style="white-space: pre-wrap;">Software Engineer Associate</em></i></h2><p class="mb-2 text-base leading-relaxed text-primary-foreground/70"><br></p><h3 class="text-xl font-medium mb-2 mt-1"><b><strong class="font-bold" style="white-space: pre-wrap;">Overview</strong></b></h3><p class="mb-2 text-base leading-relaxed text-primary-foreground/70"><span style="white-space: pre-wrap;">Contributed to the development and maintenance of web-based applications, focusing on building scalable and user-friendly features while collaborating with a cross-functional development team.</span></p><p class="mb-2 text-base leading-relaxed text-primary-foreground/70"><br></p><h3 class="text-xl font-medium mb-2 mt-1"><b><strong class="font-bold" style="white-space: pre-wrap;">Key Responsibilities</strong></b></h3><ul class="list-disc list-inside my-1"><li value="1" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70"><span style="white-space: pre-wrap;">Developed and maintained frontend components using modern frameworks</span></li><li value="2" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70"><span style="white-space: pre-wrap;">Integrated RESTful APIs for dynamic data handling</span></li><li value="3" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70"><span style="white-space: pre-wrap;">Assisted in debugging, testing, and optimizing application performance</span></li><li value="4" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70"><span style="white-space: pre-wrap;">Collaborated with designers and backend developers to deliver features</span></li><li value="5" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70"><span style="white-space: pre-wrap;">Followed best practices in clean code and version control</span></li></ul>...'; // truncated for readability

        if ($user = User::find(5)) {
            Affiliation::factory()->create([
                'user_id' => $user->id,
                'role' => 'Software Engineer Associate',
                'affiliation_name' => 'OPSOLUTIONS PH INC.',
                'description' => $richContent,
            ]);
        }

        $otherUsers = $users->where('id', '!=', 5)
            ->random(rand(2, $users->count() - 1));

        foreach ($otherUsers as $user) {
            Affiliation::factory(3)->create([
                'user_id' => $user->id,
            ]);
        }
    }
}