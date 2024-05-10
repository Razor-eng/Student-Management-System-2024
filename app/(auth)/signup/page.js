"use client";
import { auth, db, provider } from "@/app/firebase";
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import Spinner from "@/components/Spinner";

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    const signupWithGoogle = async () => {
        const res = await signInWithPopup(auth, provider);
        const user = res.user;
        const q = query(collection(db, 'users'), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            })
        }
        toast.success('Signed up Successfully');
    }

    const createAccount = async (e) => {
        e.preventDefault();
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user, {
                displayName: name,
            })

            await addDoc(collection(db, "users"), {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL || null
            });
            toast.success('User Created Successfully');
            router.replace('/login');
        } catch (err) {
            toast.error('Email is already in use!');
        } finally {
            setEmail('');
            setName('');
            setPassword('');
        }
    }

    useEffect(() => {
        if (user) {
            router.push('/dashboard')
        }
    }, [user])

    return (
        <>
            {(loading || user) ?
                <Spinner />
                :
                <div className="w-screen h-screen bg-gradient-to-r from-red-200 to-orange-200 p-10">
                    <div className="flex w-full h-full justify-center items-center">
                        <div className="flex rounded-xl bg-gradient-to-r from-cyan-600 to-sky-500 min-w-96 min-h-96 px-6 pt-4 pb-10 flex-col gap-3">
                            <form onSubmit={createAccount} className='flex flex-col gap-3'>
                                <div className="flex flex-col items-center">
                                    <Image
                                        src='/logo.png'
                                        width={60}
                                        height={60}
                                        alt='logo'
                                        className='flex justify-center'
                                    />
                                    <h2 className="text-2xl text-white text-center pb-5 font-bold">Sign Up</h2>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className='font-semibold text-white text-lg ml-1'>Full Name</label>
                                    <Input placeholder="Enter Full Name" value={name} onChange={e => setName(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className='font-semibold text-white text-lg ml-1'>Email Address</label>
                                    <Input placeholder="Enter Email Address" type='email' value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className='font-semibold text-white text-lg ml-1'>Password</label>
                                    <Input placeholder="Enter Password" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                                </div>
                                <Button type='submit' className='mt-6 bg-green-500 transition-all ease-in duration-150 hover:bg-green-400 font-semibold text-md rounded-md py-6'>
                                    Sign Up
                                </Button>
                            </form>
                            <div className="flex items-center gap-4 w-full">
                                <div className="border w-full"></div>
                                <h2 className='text-white text-center text-sm font-bold'>OR</h2>
                                <div className="border w-full"></div>
                            </div>
                            <Button onClick={signupWithGoogle} className='bg-[#4285F4] transition-all ease-in duration-150 hover:bg-[#3d7bdf] font-semibold text-md rounded-md py-6'>
                                Sign up with Google
                            </Button>
                            <div className="text-white mt-4 text-center font-semibold">
                                Already have an account?
                                <Link href='/login' className="hover:underline cursor-pointer underline-offset-4 transition-all ease-in duration-150 hover:text-blue-300 text-zinc-200"> Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Signup