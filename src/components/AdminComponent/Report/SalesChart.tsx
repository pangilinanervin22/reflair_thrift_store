'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from 'recharts';

interface thisProps {
    dataProps?: []
}

const defaultData = [
    { month: 'August', year: "2023", total_sales: 4300 },
    { month: 'September', year: "2023", total_sales: 4700 },
    { month: 'October', year: "2023", total_sales: 6200 },
    { month: 'November', year: "2023", total_sales: 2300 },
];

const SalesChart = ({ dataProps }: thisProps) => {
    const data = dataProps || defaultData;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={({ year, month }) => `${month} ${year}`} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total_sales" fill="#000" label={{ position: 'top' }}>
                    {data.map((entry: { month: any; }, index: number) => (
                        <text
                            x={index * 100 + 25}
                            y={280}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            key={`label-${index}`}
                        >
                            {`${entry.month}`}
                        </text>
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SalesChart;