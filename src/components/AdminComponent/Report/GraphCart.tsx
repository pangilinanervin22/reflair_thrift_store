'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface thisProps {
    dataProps?: []
}

interface ProductData {
    name: string;
    total_sales: number;
}

const defaultData: ProductData[] = [
    { name: 'Product A', total_sales: 200 },
    { name: 'Product C', total_sales: 300 },
    { name: 'Product D', total_sales: 180 },
    { name: 'Product E', total_sales: 250 },
];

const GraphCart = ({ dataProps }: thisProps) => {
    const data = dataProps || defaultData;

    const COLORS = ['#E8C3B8', '#C08878', '#9D7E22', '#5f483d', '#FF8042'];

    // Custom label for each pie slice
    const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, payload }: any) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius);
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <>
                <text x={x} y={y} fill="black" fontSize="10px" fontFamily='trocchi'
                    textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${payload.name} (${payload.total_sales})`}
                </text>
            </>

        );
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart >
                <Pie
                    data={data}
                    dataKey="total_sales"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    labelLine={false}
                    label={renderCustomLabel}
                    stroke='none'
                >
                    {data.map((entry: any, index: number) => (
                        // <Cell key={`cell - ${ index } `} fill={`#${ Math.floor(Math.random() * 16777215).toString(16) } `} />
                        <Cell key={`cell - ${index + entry}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default GraphCart;