'use client'
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from 'recharts'
interface OverviewProps {
    data: any[]
}
export function RevenueGraph({data}: OverviewProps) {

  return (
    <ResponsiveContainer width='100%' height={350}> 
        <BarChart data={data}>
            <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
            />
            <YAxis
                dataKey="total"
                stroke="#888888"
                fontSize={12}
                tickLine={true}
                axisLine={false}
                tickFormatter={(value) => `KES${value}`}
            />
            <Bar dataKey="total" fill="#3498db" radius={[2,2,0,0]}/>
        </BarChart>
    </ResponsiveContainer>
  )
}

