"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/ui/chart"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

const chartConfig = {
    count: {
        label: "Count",
    },
    no: {
        label: "No",
        color: "#737373",
    },
    low: {
        label: "Low",
        color: "#f0b100",
    },
    mid: {
        label: "Medium",
        color: "#00c950",
    },
    high: {
        label: "High",
        color: "#fb2c36",
    },
}

const updateChartData = (data) => {
    return [
        {
            todo: "no",
            count: data?.no ?? 0,
            fill: chartConfig.no.color
        },
        {
            todo: "low",
            count: data?.low ?? 0,
            fill: chartConfig.low.color
        },
        {
            todo: "mid",
            count: data?.mid ?? 0,
            fill: chartConfig.mid.color
        },
        {
            todo: "high",
            count: data?.high ?? 0,
            fill: chartConfig.high.color
        },
    ];
}


const PriorityChart = ({ data }) => {

    const chartData = updateChartData(data)

    return (
        <>
            <ChartContainer config={chartConfig} className="h-full">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="todo"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) =>
                            chartConfig[value]?.label
                        }
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar
                        dataKey="count"
                        strokeWidth={2}
                        radius={8}
                        activeIndex={2}
                        fillOpacity={1}
                        activeBar={({ ...props }) => (
                            <Rectangle
                                {...props}
                                fillOpacity={0.8}
                                stroke={props.payload.fill}
                                strokeDasharray={4}
                                strokeDashoffset={4}
                            />
                        )}
                    />

                </BarChart>
            </ChartContainer>
        </>
    )
}

export default PriorityChart
