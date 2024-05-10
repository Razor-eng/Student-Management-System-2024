"use client";
import { Button } from "@/components/ui/button"
import MonthSelection from "./_components/MonthSelection"
import AddGrade from "../students/_components/AddGrade"
import { useState, useEffect } from "react"
import AttendanceTable from "./_components/AttendanceTable";
import { db } from "@/app/firebase";
import { TailSpin } from "react-loader-spinner";

const Attendance = () => {
    const [grade, setGrade] = useState('');
    const [search, setSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [displayMonth, setDisplayMonth] = useState('');
    const [allStudents, setAllStudents] = useState([])
    const [displayGrade, setDisplayGrade] = useState('');
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const GetAllStudents = () => {
        setAllStudents([]);
        db.collection('students').where('grade', '==', grade).get().then(data => (
            data.docs.map(item =>
                setAllStudents(prev => [...prev, item.data()])
            )
        )).then(() => {
            setDisplayGrade(grade);
            setDisplayMonth(selectedMonth);
            setLoading(false);
        })
    }

    const searchHandler = () => {
        setLoading(true);
        setSearch(true);
        GetAllStudents()
    }

    return (
        <div className='p-7'>
            <h2 className="font-bold text-2xl flex items-center justify-between">
                Attendance
            </h2>
            <div className="flex my-5 items-center p-3 shadow-md gap-6 border rounded-lg w-full">
                <div className="flex gap-2 items-center">
                    <label className="font-semibold">Select Month</label>
                    <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
                </div>
                <div className="flex gap-2 items-center w-64">
                    <label className="font-semibold w-48">Select Grade</label>
                    <AddGrade placeholder="Grade" grade={grade} setGrade={setGrade} />
                </div>
                <Button onClick={searchHandler}>Search</Button>
            </div>
            {(displayMonth && displayGrade) &&
                <div className="flex gap-1 items-center justify-center text-lg text-zinc-600 font-semibold my-3">
                    Showing results for
                    <span className="text-blue-400">
                        {month[new Date(displayMonth).getMonth()]} {new Date(selectedMonth).getFullYear()}
                    </span>
                    of
                    <span className="text-blue-400">
                        {displayGrade}
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
                    {(search && allStudents.length !== 0) &&
                        <div className="mt-3">
                            <AttendanceTable studentList={allStudents} selectedMonth={selectedMonth} />
                        </div>
                    }
                    {search && allStudents.length === 0 &&
                        <div className="flex justify-center mt-48 text-3xl text-zinc-500">
                            No Records Found
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default Attendance