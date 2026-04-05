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

        $richContent = '<h1 class="text-3xl font-bold tracking-tight mb-4 mt-2"><span style="white-space: pre-wrap;">OPSOLUTIONS PH INC.</span></h1><h2 class="text-2xl font-semibold tracking-tight mb-3 mt-2"><i><em class="italic" style="white-space: pre-wrap;">Software Engineer Associate Intern</em></i></h2><p class="mb-2 text-base leading-relaxed text-primary-foreground/70 word-r wrap-break-word"><br></p><h3 class="text-xl font-medium mb-2 mt-1"><b><strong class="font-bold" style="white-space: pre-wrap;">Description</strong></b></h3><p class="mb-2 text-base leading-relaxed text-primary-foreground/70 word-r wrap-break-word"><span style="white-space: pre-wrap;">As a Software Engineer Associate Intern at </span><b><strong class="font-bold" style="white-space: pre-wrap;">OPSOLUTIONS PH INC.</strong></b><span style="white-space: pre-wrap;">, I contributed to real-world software development projects, gained hands-on experience with modern technologies, and collaborated with a dynamic team to deliver high-quality solutions. My role allowed me to apply theoretical knowledge in practical scenarios while developing critical technical and professional skills.</span></p><p class="mb-2 text-base leading-relaxed text-primary-foreground/70 word-r wrap-break-word"><br></p><h3 class="text-xl font-medium mb-2 mt-1"><b><strong class="font-bold" style="white-space: pre-wrap;">Key Responsibilities</strong></b></h3><ul class="list-disc list-inside my-1"><li value="1" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70"><span style="white-space: pre-wrap;">Assisted in the design, development, and maintenance of web applications.</span></li><li value="2" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70"><span style="white-space: pre-wrap;">Collaborated with senior engineers to implement software solutions using best practices.</span></li><li value="3" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70"><span style="white-space: pre-wrap;"> Participated in code reviews and provided constructive feedback.</span></li><li value="4" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70"><span style="white-space: pre-wrap;">Troubleshot and debugged software issues to ensure optimal performance.</span></li><li value="5" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70"><span style="white-space: pre-wrap;"> Documented technical specifications and user guides for internal use.</span></li></ul><p class="mb-2 text-base leading-relaxed text-primary-foreground/70 word-r wrap-break-word"><br></p><h3 class="text-xl font-medium mb-2 mt-1"><b><strong class="font-bold" style="white-space: pre-wrap;">Achievements</strong></b></h3><ol class="list-decimal list-inside my-1"><li value="1" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70"><span style="white-space: pre-wrap;">Successfully contributed to the completion of X project/module (replace X with your achievement).</span></li><li value="2" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70"><span style="white-space: pre-wrap;">Improved code efficiency and performance in key areas of the application.</span></li><li value="3" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70"><span style="white-space: pre-wrap;">Learned and applied modern frameworks and tools such as React, Laravel, and MySQL.</span></li><li value="4" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70"><span style="white-space: pre-wrap;">Developed teamwork and communication skills through collaborative sprint cycles.</span></li></ol><p class="mb-2 text-base leading-relaxed text-primary-foreground/70 word-r wrap-break-word"><br></p><h3 class="text-xl font-medium mb-2 mt-1"><b><strong class="font-bold" style="white-space: pre-wrap;">Skills Gained</strong></b></h3><ul class="list-disc list-inside my-1" __lexicallisttype="check"><li role="checkbox" tabindex="-1" aria-checked="true" value="1" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70 editor__listItemChecked"><span style="white-space: pre-wrap;">Programming in PHP, JavaScript, and SQL</span></li><li role="checkbox" tabindex="-1" aria-checked="true" value="2" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70 editor__listItemChecked"><span style="white-space: pre-wrap;">Frontend development with React and Tailwind CSS</span></li><li role="checkbox" tabindex="-1" aria-checked="true" value="3" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70 editor__listItemChecked"><span style="white-space: pre-wrap;">Version control using Git and GitHub</span></li><li role="checkbox" tabindex="-1" aria-checked="true" value="4" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70 editor__listItemChecked"><span style="white-space: pre-wrap;">Agile methodology and project management</span></li><li role="checkbox" tabindex="-1" aria-checked="true" value="5" class="editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70 editor__listItemChecked"><span style="white-space: pre-wrap;">Problem-solving and debugging</span></li></ul>'; // truncated for readability

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