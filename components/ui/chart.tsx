"use client"

import type * as React from "react"
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { cn } from "@/lib/utils"

const chartConfig = {
  colors: {
    primary: "hsl(var(--primary))",
    secondary: "hsl(var(--secondary))",
    yellow: "hsl(var(--yellow))",
    green: "hsl(var(--green))",
    red: "hsl(var(--red))",
    blue: "hsl(var(--blue))",
    orange: "hsl(var(--orange))",
    purple: "hsl(var(--purple))",
    gray: "hsl(var(--muted-foreground))",
  },
}

interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  showGridLines?: boolean
  showTooltip?: boolean
  showGradient?: boolean
  startEndOnly?: boolean
}

function AreaChart({
  data,
  index,
  categories,
  colors = ["primary"],
  valueFormatter = (value: number) => value.toString(),
  yAxisWidth = 40,
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  showGridLines = true,
  showTooltip = true,
  showGradient = true,
  startEndOnly = true,
  className,
  ...props
}: AreaChartProps) {
  const mappedColors = colors.map((color) => chartConfig.colors[color as keyof typeof chartConfig.colors] || color)

  return (
    <div className={cn("w-full h-80", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            left: 0,
            bottom: 0,
          }}
        >
          {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />}
          {showXAxis && (
            <XAxis
              dataKey={index}
              stroke="hsl(var(--muted-foreground))"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                if (typeof value === "string") {
                  return value
                }
                return value.toString()
              }}
              tick={{ fontSize: 12 }}
              ticks={startEndOnly ? [data[0][index], data[data.length - 1][index]] : undefined}
            />
          )}
          {showYAxis && (
            <YAxis
              width={yAxisWidth}
              stroke="hsl(var(--muted-foreground))"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => valueFormatter(value)}
              tick={{ fontSize: 12 }}
            />
          )}
          {showTooltip && (
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">{label}</span>
                          {payload.map((entry, index) => (
                            <span key={`item-${index}`} className="text-sm font-medium">
                              {valueFormatter(entry.value as number)}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-col">
                          {payload.map((entry, index) => (
                            <span
                              key={`item-${index}`}
                              className="flex items-center text-xs"
                              style={{ color: entry.color }}
                            >
                              <span className="mr-1 size-2 rounded-full" style={{ backgroundColor: entry.color }} />
                              {entry.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
          )}
          {showLegend && (
            <Legend
              content={({ payload }) => {
                if (payload && payload.length) {
                  return (
                    <div className="flex flex-wrap items-center justify-end gap-4">
                      {payload.map((entry, index) => (
                        <div key={`item-${index}`} className="flex items-center gap-1">
                          <div className="size-3 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-xs text-muted-foreground">{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  )
                }
                return null
              }}
            />
          )}
          {categories.map((category, index) => (
            <defs key={`gradient-${index}`}>
              {showGradient && (
                <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={mappedColors[index % mappedColors.length]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={mappedColors[index % mappedColors.length]} stopOpacity={0} />
                </linearGradient>
              )}
            </defs>
          ))}
          {categories.map((category, index) => (
            <Area
              key={`area-${index}`}
              type="monotone"
              dataKey={category}
              stroke={mappedColors[index % mappedColors.length]}
              strokeWidth={2}
              fill={showGradient ? `url(#gradient-${index})` : "transparent"}
              activeDot={{ r: 6, style: { fill: mappedColors[index % mappedColors.length], opacity: 0.8 } }}
              name={category}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}

interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  showGridLines?: boolean
  showTooltip?: boolean
  stack?: boolean
  horizontal?: boolean
}

function BarChart({
  data,
  index,
  categories,
  colors = ["primary"],
  valueFormatter = (value: number) => value.toString(),
  yAxisWidth = 40,
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  showGridLines = true,
  showTooltip = true,
  stack = false,
  horizontal = false,
  className,
  ...props
}: BarChartProps) {
  const mappedColors = colors.map((color) => chartConfig.colors[color as keyof typeof chartConfig.colors] || color)

  return (
    <div className={cn("w-full h-80", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout={horizontal ? "vertical" : "horizontal"}
          margin={{
            top: 16,
            right: 16,
            left: 0,
            bottom: 0,
          }}
        >
          {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />}
          {showXAxis &&
            (horizontal ? (
              <YAxis
                dataKey={index}
                type="category"
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12 }}
                width={yAxisWidth}
              />
            ) : (
              <XAxis
                dataKey={index}
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12 }}
              />
            ))}
          {showYAxis &&
            (horizontal ? (
              <XAxis
                type="number"
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => valueFormatter(value)}
                tick={{ fontSize: 12 }}
              />
            ) : (
              <YAxis
                width={yAxisWidth}
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => valueFormatter(value)}
                tick={{ fontSize: 12 }}
              />
            ))}
          {showTooltip && (
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">{label}</span>
                          {payload.map((entry, index) => (
                            <span key={`item-${index}`} className="text-sm font-medium">
                              {valueFormatter(entry.value as number)}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-col">
                          {payload.map((entry, index) => (
                            <span
                              key={`item-${index}`}
                              className="flex items-center text-xs"
                              style={{ color: entry.color }}
                            >
                              <span className="mr-1 size-2 rounded-full" style={{ backgroundColor: entry.color }} />
                              {entry.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
          )}
          {showLegend && (
            <Legend
              content={({ payload }) => {
                if (payload && payload.length) {
                  return (
                    <div className="flex flex-wrap items-center justify-end gap-4">
                      {payload.map((entry, index) => (
                        <div key={`item-${index}`} className="flex items-center gap-1">
                          <div className="size-3 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-xs text-muted-foreground">{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  )
                }
                return null
              }}
            />
          )}
          {categories.map((category, index) => (
            <Bar
              key={`bar-${index}`}
              dataKey={category}
              fill={mappedColors[index % mappedColors.length]}
              stackId={stack ? "stack" : undefined}
              name={category}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

interface DonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  index: string
  category: string
  colors?: string[]
  valueFormatter?: (value: number) => string
  showLabel?: boolean
  showLegend?: boolean
  showTooltip?: boolean
}

function DonutChart({
  data,
  index,
  category,
  colors = ["primary", "secondary", "yellow", "green", "blue", "orange", "purple", "gray"],
  valueFormatter = (value: number) => value.toString(),
  showLabel = true,
  showLegend = true,
  showTooltip = true,
  className,
  ...props
}: DonutChartProps) {
  const mappedColors = colors.map((color) => chartConfig.colors[color as keyof typeof chartConfig.colors] || color)

  return (
    <div className={cn("w-full h-80", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          {showTooltip && (
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">{data[index]}</span>
                        <span className="text-sm font-medium">{valueFormatter(data[category])}</span>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
          )}
          {showLegend && (
            <Legend
              content={({ payload }) => {
                if (payload && payload.length) {
                  return (
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      {payload.map((entry, index) => (
                        <div key={`item-${index}`} className="flex items-center gap-1">
                          <div className="size-3 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-xs text-muted-foreground">{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  )
                }
                return null
              }}
            />
          )}
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={4}
            dataKey={category}
            nameKey={index}
            label={showLabel ? (entry) => entry[index] : undefined}
            labelLine={showLabel}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={mappedColors[index % mappedColors.length]} />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

export { AreaChart, BarChart, DonutChart }
