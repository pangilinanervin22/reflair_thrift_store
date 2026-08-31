'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { ProductCategory } from '@/lib/constants';

const COLORS = ['#121110', '#6b6862', '#c6c3ba'];
const RADIAN = Math.PI / 180;

interface Props {
    counts: Record<ProductCategory, number>;
}

// The subset of recharts' PieLabelRenderProps this label uses (all optional in recharts 3).
interface LabelProps {
    cx?: number | string;
    cy?: number | string;
    midAngle?: number;
    outerRadius?: number | string;
    percent?: number;
    index?: number;
}

// Sold pieces by category — a donut of the products attached to live orders.
export default function GraphExample({ counts }: Props) {
    const data = [
        { name: 'Men', value: counts.men },
        { name: 'Shoes', value: counts.shoes },
        { name: 'Women', value: counts.women },
    ];
    const total = data.reduce((sum, entry) => sum + entry.value, 0);

    if (total === 0) return <p>No sold pieces yet.</p>;

    const renderLabel = ({ cx = 0, cy = 0, midAngle = 0, outerRadius = 0, percent = 0, index = 0 }: LabelProps) => {
        if (percent === 0) return null;
        const centerX = Number(cx);
        const centerY = Number(cy);
        const radius = Number(outerRadius);
        const x = centerX + radius * Math.cos(-midAngle * RADIAN);
        const y = centerY + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="#121110" fontSize="11px" letterSpacing="0.1em"
                textAnchor={x > centerX ? 'start' : 'end'} dominantBaseline="central">
                {(data[index]?.name ?? "").toUpperCase() + " " + (percent * 100).toFixed(0) + "%"}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderLabel}
                    innerRadius={52}
                    outerRadius={88}
                    paddingAngle={2}
                    fill="#121110"
                    stroke="#f6f5f1"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}
