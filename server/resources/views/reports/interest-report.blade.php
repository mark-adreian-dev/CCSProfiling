<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Interest Report</title>
    <style>
        @font-face {
            font-family: 'Balthazar';
            src: url("{{ storage_path('typeface/Balthazar-Regular.ttf') }}");
        }

        @font-face {
            font-family: 'Calibri';
            src: url("{{ storage_path('typeface/Calibri-Regular.ttf') }}");
        }

        @font-face {
            font-family: 'CalibriBoldItalic';
            src: url("{{ storage_path('typeface/Calibri-Bold-Italic.ttf') }}");
            font-weight: bold;
            font-style: italic;
        }

        @font-face {
            font-family: 'OldEnglish';
            src: url("{{ storage_path('typeface/OldEnglishTextMT.ttf') }}");
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;

        }

        h1 {
            text-align: center;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #000;
            padding: 6px;
            text-align: left;
        }

        th {
            background: #f2f2f2;
        }

        .summary {
            margin-top: 20px;
        }
        .page-break {
            page-break-before: always;
        }
    </style>
</head>

<body>
    <table style="width: 100%; border-collapse: collapse; border: 0; margin-bottom: 20px;">
        <tr style="border: 0;">
            <td style="width: 25%; text-align: left; border: 0; padding-left: 50px;">
                <img src="{{ public_path('images/ccs-logo.png') }}" style="width: 90px;">
            </td>

            <td style="width: 50%; text-align: center; border: 0;">
                <div style="font-family: 'Calibri'; font-size: 14.67px; line-height: 14.67px;">
                    Republic of the Philippines
                </div>
                <div style="font-family: 'OldEnglish'; font-size: 26.67px;  line-height: 26.67px;">
                    Pamantasan ng Cabuyao
                </div>
                <div style="font-family: 'Balthazar'; font-size: 18.67px; line-height: 18.67px;">
                    (University of Cabuyao)
                </div>
                <div
                    style="font-family: 'CalibriBoldItalic'; font-family: 'Calibri'; font-size: 15px; line-height: 15px;">
                    College of Computing Studies
                </div>
                <div style="font-family: 'Calibri'; font-size: 12px; line-height: 12px;">
                    Katapatan Mutual Homes, Brgy. Banay-banay, City of Cabuyao, Laguna 4025
                </div>
            </td>

            <td style="width: 25%; text-align: right; border: 0; padding-right: 50px;">
                <img src="{{ public_path('images/pnc-logo.png') }}" style="width: 90px;">
            </td>
        </tr>
    </table>



    @php
        $totalStudent = collect($data)->sum('student');
        $totalFaculty = collect($data)->sum('faculty');
        $totalAll = $totalStudent + $totalFaculty;

        $studentPercent = $totalAll ? ($totalStudent / $totalAll) * 100 : 0;
        $facultyPercent = $totalAll ? ($totalFaculty / $totalAll) * 100 : 0;

        $topInterest = collect($data)->sortByDesc('total')->first();
        $topStudent = collect($data)->sortByDesc('student')->first();
        $topFaculty = collect($data)->sortByDesc('faculty')->first();

        $isBalanced = abs($studentPercent - $facultyPercent) < 10;
    @endphp
    <h1 style="text-align: center; font-weight: bold;">Interest Distribution</h1>
    <p style="text-align: center;">Student and Faculty </p>
    <div style="margin-top: 20px;">

        <p style="text-align: justify; line-height: 1.6;">
            This report presents a comprehensive analysis of interest distribution across students and faculty members
            based on the collected dataset. The overall engagement shows a total of
            <strong>{{ $totalStudent }}</strong> student selections and
            <strong>{{ $totalFaculty }}</strong> faculty selections, resulting in a combined activity distribution of
            <strong>{{ number_format($studentPercent, 1) }}%</strong> student participation and
            <strong>{{ number_format($facultyPercent, 1) }}%</strong> faculty participation.
            This indicates that the dataset is
            <strong>
                {{ $studentPercent > $facultyPercent ? 'primarily driven by student engagement' : 'more influenced by faculty participation' }}
            </strong>, reflecting the dominant contributor group in the recorded interest selections.
        </p>

        <p style="text-align: justify; line-height: 1.6;">
            Among all recorded interests, <strong>{{ $topInterest['interest_name'] ?? 'N/A' }}</strong> emerges as the
            most popular category, demonstrating the highest overall engagement across both groups.
            This suggests that this particular interest holds strong relevance and appeal within the community,
            potentially serving as a key area of shared academic or professional alignment.
        </p>

        <p style="text-align: justify; line-height: 1.6;">
            From the perspective of student engagement, the interest
            <strong>{{ $topStudent['interest_name'] ?? 'N/A' }}</strong> recorded the highest level of participation
            among students,
            indicating a strong tendency toward exploratory learning, skill development, and curiosity-driven engagement
            in this field.
            This pattern may reflect emerging trends in student preferences, highlighting areas where academic programs
            or extracurricular activities could be further strengthened.
        </p>

        <p style="text-align: justify; line-height: 1.6;">
            On the other hand, faculty participation peaks in
            <strong>{{ $topFaculty['interest_name'] ?? 'N/A' }}</strong>, suggesting a more focused and expertise-driven
            engagement pattern.
            This aligns with the expectation that faculty members tend to concentrate on specialized or professionally
            relevant domains, reinforcing their role in guiding and mentoring within these areas of interest.
        </p>

        <p style="text-align: justify; line-height: 1.6;">
            Overall, the distribution of interests across both groups provides valuable insights into the alignment
            between student curiosity and faculty expertise.
            {{ $isBalanced
    ? 'The dataset demonstrates a relatively balanced distribution of participation, indicating strong potential for collaboration, interdisciplinary engagement, and knowledge sharing between students and faculty members.'
    : 'However, the distribution shows a noticeable imbalance, suggesting that certain groups are more dominant in participation, which may require further initiatives to encourage broader engagement across all interests.' }}
            These insights can be utilized for curriculum development, program planning, and enhancing
            academic-community engagement strategies.
        </p>
    </div>
    <div class="page-break"></div>
    <h3 style="text-align: center; font-weight: bold;">Top 20 Interest Selection from students and faculty</h3>

    @if(isset($chartImages) && count($chartImages))
        @foreach ($chartImages as $chart)
            <div style="margin: 20px 0;">
                <img src="{{ $chart }}" style="width: 100%; max-height: 400px;">
            </div>
        @endforeach
    @endif

    <table>
        <thead>
            <tr>
                <th>Interest</th>
                <th>Student</th>
                <th>Faculty</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td>{{ $item['interest_name'] }}</td>
                    <td>{{ $item['student'] }}</td>
                    <td>{{ $item['faculty'] }}</td>
                    <td>{{ $item['total'] }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>

</html>
