"use client";
import { useState, useEffect } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts"

const PieChartComponent = ({ total, present, month }) => {
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        if (total) {
            const result = [
                { name: 'Present', value: present },
                { name: 'Absent', value: total - present },
            ];
            setGraphData(result)
        }
    }, [month])

    return (
        <div className="p-5 border rounded-lg shadow-sm">
            <h2 className="my-2 font-bold text-lg">Pie Chart</h2>
            <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                    <Pie data={graphData} dataKey="value" nameKey="Attendance" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label name="name" >
                        <Cell fill="#51c07c" />
                        <Cell fill="#ca4651" />
                    </Pie>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PieChartComponent