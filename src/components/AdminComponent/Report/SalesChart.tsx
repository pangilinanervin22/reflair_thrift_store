'use client'

import { SalesData } from '@/app/admin/page';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from 'recharts';

interface thisProps {
    dataProps?: SalesData[]
}

const defaultData = [
    { month: 'August', year: "2023", total_sales: 4300 },
    { month: 'September', year: "2023", total_sales: 4700 },
    { month: 'October', year: "2023", total_sales: 6200 },
    { month: 'November', year: "2023", total_sales: 2300 },
];

const INK = '#121110';
const GRAY = '#76736c';
const HAIRLINE = '#e4e2db';

export default function SalesChart({ dataProps }: thisProps) {
    const data = dataProps || defaultData;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 24, right: 16, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={HAIRLINE} vertical={false} />
                <XAxis
                    dataKey={({ year, month }) => `${month} ${year}`}
                    tick={{ fontSize: 11, fill: GRAY, letterSpacing: '0.06em' }}
                    axisLine={{ stroke: HAIRLINE }}
                    tickLine={false}
                />
                <YAxis
                    tick={{ fontSize: 11, fill: GRAY }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip
                    cursor={{ fill: 'rgba(18, 17, 16, 0.04)' }}
                    contentStyle={{
                        background: INK,
                        border: 'none',
                        borderRadius: 0,
                        color: '#f6f5f1',
                        fontSize: 12,
                        letterSpacing: '0.06em',
                    }}
                    labelStyle={{ color: '#f6f5f1' }}
                    itemStyle={{ color: '#f6f5f1' }}
                />
                <Bar
                    dataKey="total_sales"
                    fill={INK}
                    maxBarSize={48}
                    label={{ position: 'top', fontSize: 11, fill: GRAY }}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};
