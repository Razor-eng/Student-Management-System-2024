"use client";
import { collection, getDocs } from "firebase/firestore"
import AddNewStudent from "./_components/AddNewStudent"
import { db } from "@/app/firebase"
import { useEffect, useState } from "react"
import StudentList from "./_components/StudentList";

const Students = () => {
    const [allStudents, setAllStudents] = useState([])

    useEffect(() => {
        if (allStudents.length === 0) {
            GetAllStudents()
        }
    }, [])

    const GetAllStudents = async () => {
        await getDocs(collection(db, 'students')).then((data) => {
            setAllStudents([]);
            data.docs.sort((a, b) => (
                a.data().id - b.data().id)
            ).map((doc) => {
                setAllStudents(prev => [...prev, doc.data()]);
            })
        })
    }

    return (
        <div className='p-7'>
            <h2 className="font-bold text-2xl flex items-center justify-between">
                Students
                <AddNewStudent GetAllStudents={GetAllStudents} />
            </h2>
            <StudentList studentList={allStudents} GetAllStudents={GetAllStudents} />
        </div>
    )
}

export default Students