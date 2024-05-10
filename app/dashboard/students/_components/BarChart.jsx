"use client";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const BarChartComponent = ({ total, present, month }) => {
    const [graphData, setGraphData] = useState([]);
    let data = [];

    useEffect(() => {
        if (total) {
            data = [];
            const result = {
                month: month,
                total: total,
                present: present,
                absent: total - present
            };
            data.push(result);
            setGraphData(data)
        }
    }, [month])

    return (
        <div className="p-5 border rounded-lg shadow-sm">
            <h2 className="my-2 font-bold text-lg">Attendance</h2>
            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='total' name='Total' fill='#8884d8' />
                    <Bar dataKey='present' name='Present' fill='#51c07c' />
                    <Bar dataKey='absent' name='Absent' fill='#ca4651' />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarChartComponent