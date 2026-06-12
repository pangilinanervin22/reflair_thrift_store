'use client'

import { Product } from '@prisma/client';
import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const defaultData = [
    { name: 'Men', value: 400 },
    { name: 'Shoes', value: 300 },
    { name: 'Women', value: 300 },
];

const COLORS = ['#121110', '#76736c', '#c6c3ba',];

const RADIAN = Math.PI / 180;


interface Props {
    product: Product[]
}

const GraphExample = ({ product }: Props) => {


    let productWithOrder = product.filter((item) => item.order_id !== null);
    let womenValue = 0;
    let menValue = 0;
    let shoesValue = 0;


    // iterate through productWithOrder and count the number of each category
    productWithOrder.forEach((item) => {
        switch (item.category) {
            case 'women':
                womenValue++;
                break;
            case 'men':
                menValue++;
                break;
            case 'shoes':
                shoesValue++;
                break;
            default:
                break;
        }
    });



    const data = [
        { name: 'Men', value: menValue },
        { name: 'Shoes', value: shoesValue },
        { name: 'Women', value: womenValue },
    ]



    // recharts 3.x passes PieLabelRenderProps (all fields optional); typed loosely
    // to match recharts' label render-prop signature.
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 1;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="#121110" fontSize="11px" letterSpacing="0.1em"
                textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${data[index].name.toUpperCase()} ${(percent * 100).toFixed(0)}%`}
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
                    label={renderCustomizedLabel}
                    innerRadius={52}
                    outerRadius={88}
                    paddingAngle={2}
                    fill="#121110"
                    stroke="#f6f5f1"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}

export default GraphExample;
