import { useIsMobile } from "@/core/presentation/hooks/use-mobile";
import {
  DrawerTrigger,
  DrawerHeader,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  Drawer,
  DrawerFooter,
} from "@/core/presentation/components/base/ui/drawer";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@/core/presentation/components/base/ui/select";
import { Button } from "@/core/presentation/components/base/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/core/presentation/components/base/ui/chart";
import { TrendingUpIcon } from "lucide-react";
import { Label } from "@/core/presentation/components/base/ui/label";
import { Input } from "@/core/presentation/components/base/ui/input";
import React from "react";
import { Separator } from "@/core/presentation/components/base/ui/separator";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

interface TableCellViewerProps<TData> {
  item: TData;
  chartData: Record<string, number>[];
  // titleKey ensures we know which property to show as the link/title
  titleKey: keyof TData;
  dataKeys: string[];
}

export function TableCellViewer<TData extends Record<string, string | number | readonly string[] | undefined>>({
  item,
  titleKey,
  chartData,
  dataKeys,
}: TableCellViewerProps<TData>) {
  const isMobile = useIsMobile();

  const chartConfig = React.useMemo(() => {
    return dataKeys.reduce((acc, key, index) => {
      acc[key] = {
        label: key.charAt(0).toUpperCase() + key.slice(1),
        // Cycles through --chart-1 to --chart-5
        color: `var(--chart-${index + 1})`,
      };
      return acc;
    }, {} as ChartConfig);
  }, [dataKeys]);

  // Helper to format labels (camelCase -> Title Case)
  const formatLabel = (key: string) => key.replace(/([A-Z])/g, " $1").trim();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-left text-foreground capitalize">
          {String(item[titleKey])}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle className="capitalize">{String(item[titleKey])}</DrawerTitle>
          <DrawerDescription>Showing total visitors for the last 6 months</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              {/* Keep your chart logic exactly as is */}
              <ChartContainer config={chartConfig}>
                <AreaChart accessibilityLayer data={chartData} margin={{ left: 0, right: 10 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" hide />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  {dataKeys.map((dataKey, index) => {
                    const opacity = Math.max(0.1, 0.5 - index * 0.2);
                    console.log(`var(--color-${dataKey})`);

                    return (
                      <Area
                        key={dataKey}
                        dataKey={dataKey}
                        type="natural"
                        // Change these two lines:
                        fill={`var(--color-${dataKey})`}
                        stroke={`var(--color-${dataKey})`}
                        fillOpacity={opacity}
                        stackId="a"
                      />
                    );
                  })}
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  Trending up by 5.2% this month <TrendingUpIcon className="size-4" />
                </div>
                <div className="text-muted-foreground">View full details and analytics for this entry below.</div>
              </div>
              <Separator />
            </>
          )}

          <form className="flex flex-col gap-4">
            {/* 1. SINGLE ROW FIELDS (e.g., Header/Email) */}
            <div className="flex flex-col gap-3">
              <Label htmlFor="main-info">{formatLabel(String(titleKey))}</Label>
              <Input id="main-info" defaultValue={item[titleKey]} />
            </div>

            {/* 2. GRID ROW (Dynamically picking 2 fields to put in a grid) */}
            <div className="grid grid-cols-2 gap-4">
              {/* We map specific keys to the grid structure */}
              {Object.keys(item)
                .filter((k) => k === "status" || k === "type")
                .map((key) => (
                  <div key={key} className="flex flex-col gap-3">
                    <Label htmlFor={key} className="capitalize">
                      {formatLabel(key)}
                    </Label>
                    <Select defaultValue={String(item[key])}>
                      <SelectTrigger id={key} className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {/* You can pass these options as a prop later to make it 100% dynamic */}
                        <SelectItem value={String(item[key])}>{String(item[key])}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
            </div>

            {/* 3. CATCH-ALL FOR OTHER FIELDS */}
            {Object.keys(item)
              .filter((k) => k !== "id" && k !== titleKey && k !== "status" && k !== "type")
              .map((key) => (
                <div key={key} className="flex flex-col gap-3">
                  <Label htmlFor={key} className="capitalize">
                    {formatLabel(key)}
                  </Label>
                  <Input id={key} defaultValue={item[key]} />
                </div>
              ))}
          </form>
        </div>

        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
