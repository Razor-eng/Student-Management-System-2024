import { db } from "@/app/firebase";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { doc, updateDoc } from "firebase/firestore";
import { Search } from "lucide-react";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AttendanceTable = ({ studentList, selectedMonth }) => {
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [list, setList] = useState([]);
    let presentDays = [];

    function setDays(student) {
        presentDays = student.presentDays || [];
    }

    const setAttendance = async (day, student) => {
        let presentDay = (day < 10 ? '0' + day : day) + moment(selectedMonth).format('MM') + moment(selectedMonth).format('yyyy');
        presentDays = [];
        setDays(student);
        if (presentDays.includes(presentDay)) {
            const index = presentDays.indexOf(presentDay);
            presentDays.splice(index, 1);
        } else {
            presentDays.push(presentDay)
        }

        const docId = (await db.collection('students').where("id", "==", student.id).get()).docs[0].id
        try {
            await updateDoc(doc(db, 'students', docId), {
                presentDays: presentDays
            }).then(() => {
                toast.success("Attendance Updated");
            })
        } catch (err) {
            toast.error('Error updating Attendance!');
        }
    }

    const isChecked = (student, day) => {
        let presentDay = (day < 10 ? '0' + day : day) + moment(selectedMonth).format('MM') + moment(selectedMonth).format('yyyy');
        let days = student.presentDays;
        return days?.includes(presentDay);
    }

    function getData() {
        setList(studentList);
    }

    useEffect(() => {
        getData();
    }, [studentList])

    useEffect(() => {
        setList(
            studentList.filter((student) => (
                student.name.toLowerCase().includes(searchTerm.toLowerCase())
            ))
        )
        setPage(0);
    }, [searchTerm])

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
    const numberOfDays = daysInMonth(moment(selectedMonth).format('MM'), moment(selectedMonth).format('yyyy'))
    const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

    return (
        <div className="mt-2">
            <div className="flex">
                <div className="flex focus-within:border-blue-500 translate-x-0 ease-in duration-100 items-center mb-2 w-80 border py-1 px-3 rounded-md">
                    <Search size={17} className="text-zinc-500" />
                    <input className='w-full outline-none px-2' placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
            </div>
            <Table className='border'>
                <TableHeader className='hover:bg-transparent'>
                    <TableRow>
                        <TableHead className="min-w-[100px]">Id</TableHead>
                        <TableHead className='min-w-80'>Name</TableHead>
                        <TableHead className="min-w-[150px]">Grade</TableHead>
                        {daysArray.map((day, id) => (
                            <TableHead className="min-w-28" key={id}>{day}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {list.map((student, id) => (id >= page && id < page + 8) && (
                        <TableRow
                            key={id}
                            className='cursor-pointer'
                        >
                            <TableCell className="w-[100px]">{id + 1}</TableCell>
                            <TableCell className="font-medium w-[100px]" >{student.name}</TableCell>
                            <TableCell className="w-[100px]">{student.grade}</TableCell>
                            {daysArray.map((day, id) => (
                                <TableCell key={id}>
                                    <Checkbox type="checkbox" onClick={() => setAttendance(day, student)} defaultChecked={isChecked(student, day)} />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className='flex flex-col items-center justify-center w-full fixed bottom-2 -right-20'>
                {studentList.length > 8 &&
                    <div className="flex gap-6">
                        <Button variant='outline' disabled={page === 0} className='w-28 font-semibold' onClick={() => setPage(page - 8)}>Previous</Button>
                        <Button variant='outline' disabled={page + 8 >= list.length} className='w-28 font-semibold' onClick={() => setPage(page + 8)}>Next</Button>
                    </div>
                }
                <TableCaption>A list of all the enrolled students.</TableCaption>
            </div>
        </div>
    )
}

export default AttendanceTable