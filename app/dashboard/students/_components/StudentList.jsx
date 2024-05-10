import { db } from "@/app/firebase";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteDoc, doc, } from "firebase/firestore";
import { Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const StudentList = ({ studentList, GetAllStudents }) => {
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [list, setList] = useState([]);

    function getData() {
        setList(studentList);
    }

    useEffect(() => {
        getData();
    }, [studentList])

    useEffect(() => {
        setList(
            studentList.filter((student) => (
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.contact.toLowerCase().includes(searchTerm.toLowerCase())
            ))
        )
        setPage(0);
    }, [searchTerm])

    const deleteStudent = async (student) => {
        const docId = (await db.collection('students').where("id", "==", student.id).get()).docs[0].id
        try {
            await deleteDoc(doc(db, 'students', docId)).then(() => {
                toast.success("Student Deleted Successfully!");
            })
        } catch (err) {
            toast.error('Error deleting data...!');
        } finally {
            GetAllStudents();
        }
    }

    return (
        <div className="mt-2">
            <div className="flex focus-within:border-blue-500 translate-x-0 ease-in duration-100 items-center mb-2 w-80 border py-1 px-3 rounded-md">
                <Search size={17} className="text-zinc-500" />
                <input className='w-full outline-none px-2' placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <Table className='border'>
                <TableHeader className='hover:bg-transparent'>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {list.map((student, id) => (id >= page && id < page + 8) && (
                        <TableRow
                            key={id}
                            className='cursor-pointer'
                        >
                            <TableCell className="w-[100px]" onClick={() => router.push(`/${student?.name}`)}>{id + 1}</TableCell>
                            <TableCell className="font-medium" onClick={() => router.push(`/${student?.name}`)}>{student.name}</TableCell>
                            <TableCell onClick={() => router.push(`/${student?.name}`)}>{student.address}</TableCell>
                            <TableCell onClick={() => router.push(`/${student?.name}`)}>{student.contact}</TableCell>
                            <TableCell className='w-12'>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button className='text-red-500 hover:text-red-400 flex items-center justify-center transition-all ease-in duration-150 rounded-md'>
                                            <Trash2 />
                                        </button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete student {student.name}?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your
                                                account and remove your data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction className='bg-red-500 hover:bg-red-600 transition-all ease-in duration-150' onClick={() => deleteStudent(student)}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
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

export default StudentList