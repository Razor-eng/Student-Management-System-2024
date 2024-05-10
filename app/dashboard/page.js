"use client";
import { useEffect, useState } from "react"
import MonthSelection from "./attendance/_components/MonthSelection"
import AddGrade from "./students/_components/AddGrade"
import { TailSpin } from "react-loader-spinner";
import { db } from "../firebase";
import { Frown, GraduationCap, TrendingDown, TrendingUp } from "lucide-react";
import StudentCard from "./_components/StudentCard";
import moment from "moment";
import BarChartComponent from "./students/_components/BarChart";
import PieChartComponent from "./students/_components/PieChartComponent";

const Dashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [grade, setGrade] = useState('');
    const [loading, setLoading] = useState(false);
    const [requestedStudents, setRequestedStudents] = useState([])
    const [totalStudents, setTotalStudents] = useState([]);

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    useEffect(() => {
        setLoading(true);
        if (selectedMonth && grade) {
            let presentMonth = moment(selectedMonth).format('MM') + moment(selectedMonth).format('yyyy');
            const GetAllStudents = () => {
                setTotalStudents([]);
                setRequestedStudents([]);
                db.collection('students').where('grade', '==', grade).get().then(data => (
                    data.docs.map(item => {
                        setTotalStudents(prev => [...prev, item.data()]);
                        if (item.data().presentDays) {
                            if (item.data().presentDays.filter(data => { return data.includes(presentMonth) }).length !== 0) {
                                setRequestedStudents(prev => [...prev, item.data()])
                            }
                        } else {
                            setRequestedStudents([]);
                        }
                    })
                )).then(() => {
                    setLoading(false);
                })
            }
            GetAllStudents();
        } else {
            setLoading(false);
        }
    }, [grade, selectedMonth])

    return (
        <div className='p-7'>
            <h2 className="font-bold text-2xl flex items-center justify-between">
                Dashboard
                <div className="flex items-center gap-4">
                    <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
                    <div className="w-32">
                        <AddGrade grade={grade} placeholder="Grade" setGrade={setGrade} />
                    </div>
                </div>
            </h2>
            {grade &&
                <div className="flex gap-1 items-center justify-center text-lg text-zinc-600 font-semibold my-3">
                    Showing results for
                    <span className="text-blue-400">
                        {month[new Date(selectedMonth).getMonth()]} {new Date(selectedMonth).getFullYear()}
                    </span>
                    of
                    <span className="text-blue-400">
                        {grade}
                    </span>
                    Grade
                </div>
            }
            {loading ?
                <div className="flex justify-center mt-48 text-3xl">
                    <TailSpin
                        visible={true}
                        height="80"
                        width="80"
                        color="#477be5"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                    />
                </div>
                :
                <>
                    {grade ?
                        totalStudents.length !== 0 ?
                            (
                                <div className="mt-3 grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                    <StudentCard icon={<GraduationCap />} title={'Total Students'} value={totalStudents.length} />
                                    <StudentCard icon={<TrendingUp />} title={'Total Present'} value={requestedStudents?.length || 0} />
                                    <StudentCard icon={<TrendingDown />} title={'Total Absent'} value={totalStudents.length - (requestedStudents?.length || 0)} />
                                </div>
                            )
                            : (
                                <div className="flex items-center gap-2 justify-center mt-48 text-3xl text-zinc-500">
                                    No Records Found
                                    <Frown size={28} />
                                </div>
                            )
                        :
                        <div className="flex justify-center mt-48 text-3xl text-zinc-500">
                            Select a Grade to view Data.
                        </div>
                    }
                </>
            }
            {(grade && totalStudents.length !== 0) &&
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className='col-span-2'>
                        <BarChartComponent total={totalStudents.length} present={requestedStudents.length} month={month[(new Date(selectedMonth).getUTCMonth())]} />
                    </div>
                    <div>
                        <PieChartComponent total={totalStudents.length} present={requestedStudents.length} month={month[(new Date(selectedMonth).getUTCMonth())]} />
                    </div>
                </div>
            }
        </div>
    )
}

export default Dashboard