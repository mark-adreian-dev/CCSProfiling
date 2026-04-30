
import { useDownloadInterestReportMutation, useGetInterestChartDataQuery } from "@/core/hooks/interest.hooks";
import { Button } from "@/core/presentation/components/base/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/core/presentation/components/base/ui/card";

import { ChartContainer, ChartTooltip, ChartLegend, ChartLegendContent, type ChartConfig } from "@/core/presentation/components/base/ui/chart";

import { DownloadIcon } from "lucide-react";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, YAxis } from "recharts";

const chartConfig = {
  student: {
    label: "Student",
    color: "var(--chart-1)",
  },
  faculty: {
    label: "Faculty",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;


export function InterestChart() {
  const { data } = useGetInterestChartDataQuery();
  const { mutate: downloadReport, isPending } = useDownloadInterestReportMutation()

  // ✅ Limit to top 10 to avoid clutter
  const chartData = useMemo(() => {
    return (data?.data ?? []);
  }, [data]);

  console.log(chartData)

  // ✅ Interpretation logic
  const interpretation = useMemo(() => {
    if (!chartData.length) return null;

    const totalStudent = chartData.reduce((sum, i) => sum + i.student, 0);
    const totalFaculty = chartData.reduce((sum, i) => sum + i.faculty, 0);

    const totalAll = totalStudent + totalFaculty;

    const studentPercent = totalAll ? (totalStudent / totalAll) * 100 : 0;

    const facultyPercent = totalAll ? (totalFaculty / totalAll) * 100 : 0;

    const topInterest = [...chartData].sort((a, b) => b.total - a.total)[0];

    const topStudent = [...chartData].sort((a, b) => b.student - a.student)[0];

    const topFaculty = [...chartData].sort((a, b) => b.faculty - a.faculty)[0];

    const isBalanced = Math.abs(studentPercent - facultyPercent) < 10;

    return {
      topInterest,
      topStudent,
      topFaculty,
      studentPercent,
      facultyPercent,
      isBalanced,
    };
  }, [chartData]);

  const handleDownlaod = async () => {
    await downloadReport()
  }

  return (
    <Card>
      <CardHeader className="relative">
        <Button className="absolute right-3 top-0" onClick={handleDownlaod} disabled={isPending}>
          Download Report <DownloadIcon className="ml-2 h-4 w-4" />
        </Button>

        <CardTitle>Interest Distribution</CardTitle>
        <CardDescription>Student vs Faculty (Top 10 Interests)</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-96 w-full">
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} />

            <YAxis width={30} />

            <ChartTooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;

                const d = payload[0].payload;

                return (
                  <div className="rounded-md border bg-background p-2 text-sm shadow">
                    <p className="font-medium text-foreground">{d.interest_name}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-chart-1"></div>
                      <p>Student: {d.student}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-chart-2"></div>
                      <p>Faculty: {d.faculty}</p>
                    </div>
                  </div>
                );
              }}
            />

            <ChartLegend content={<ChartLegendContent />} />

            {/* ✅ REDUCED BAR WIDTH */}
            <Bar dataKey="student" stackId="a" fill="var(--color-student)" />

            <Bar dataKey="faculty" stackId="a" fill="var(--color-faculty)" />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        {interpretation && (
          <p className="text-muted-foreground leading-relaxed">
            {" "}
            Overall engagement across the top interests is{" "}
            <span className="font-medium text-foreground">
              {" "}
              {interpretation.studentPercent > interpretation.facultyPercent
                ? "predominantly driven by students"
                : "more influenced by faculty participation"}{" "}
            </span>{" "}
            , with students contributing {interpretation.studentPercent.toFixed(1)}% and faculty {interpretation.facultyPercent.toFixed(1)}%. The most
            popular interest is <span className="font-medium text-foreground"> {interpretation.topInterest.interest_name} </span> , reflecting the
            highest combined engagement. Students are most active in{" "}
            <span className="font-medium text-foreground"> {interpretation.topStudent.interest_name} </span> , while faculty engagement peaks in{" "}
            <span className="font-medium text-foreground"> {interpretation.topFaculty.interest_name} </span> .{" "}
            {interpretation.isBalanced && " Participation levels are relatively balanced, suggesting strong collaboration potential."}{" "}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
