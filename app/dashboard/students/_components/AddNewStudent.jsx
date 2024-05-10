"use client";
import { db } from "@/app/firebase";
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { addDoc, collection } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AddGrade from "./AddGrade";

const AddNewStudent = ({ GetAllStudents }) => {
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setloading] = useState(false);

    const submitData = async (e) => {
        e.preventDefault();
        setloading(true);
        if (name && grade && contact && address) {
            try {
                await addDoc(collection(db, "students"), {
                    id: Date.now(),
                    name: name,
                    grade: grade,
                    address: address,
                    contact: contact
                });
                toast.success('Student Added...!');
            } catch (err) {
                toast.error('Server is not responding...!');
            } finally {
                GetAllStudents();
                setName('');
                setGrade('');
                setAddress('');
                setContact('');
                setloading(false);
            }
        } else {
            setloading(false);
            toast.error('All fields are needed to be filled!');
        }
    }

    return (
        <div>
            <Dialog >
                <DialogTrigger asChild>
                    <Button>New +</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={submitData} className='my-3 flex flex-col gap-3'>
                        <div className="flex flex-col gap-1">
                            <label className='font-semibold ml-1'>Full Name</label>
                            <Input placeholder="Enter the full name" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className='font-semibold ml-1'>Grade</label>
                            <AddGrade grade={grade} setGrade={setGrade} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className='font-semibold ml-1'>Contact Number</label>
                            <Input placeholder="Enter Contact Number" value={contact} onChange={e => setContact(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className='font-semibold ml-1'>Address</label>
                            <Input placeholder="Enter Adress Details" value={address} onChange={e => setAddress(e.target.value)} />
                        </div>
                        <DialogFooter>
                            <div className="flex items-center gap-3 mt-4 justify-end">
                                <DialogClose asChild>
                                    <Button variant='secondary' className='text-white'>
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type='submit' disabled={loading} className='bg-[#318CE7] hover:bg-[#7CB9E8] w-24 text-white'>
                                    {loading &&
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    }
                                    Save
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewStudent