"use client";
import { useEffect } from "react"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";


import Header from "./_components/Header"
import Sidebar from "./_components/Sidebar"

function page({ children }) {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.replace('/');
            }
        }
    }, [loading, user])

    return (
        <>
            {loading || !user ?
                <Spinner />
                :
                <div className='w-screen h-screen overflow-x-hidden'>
                    <div className="md:w-64 fixed hidden md:block">
                        <Sidebar user={user} />
                    </div>
                    <div className="ml-64">
                        <Header user={user} />
                        {children}
                    </div>
                </div>
            }
        </>
    )
}

export default page
