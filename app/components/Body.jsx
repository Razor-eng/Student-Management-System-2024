import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const Body = () => {
    return (
        <div className="px-32 py-20 flex flex-col gap-10 items-center justify-center">
            <Image
                src={'/logo.png'}
                width={150}
                height={150}
                alt="logo"
            />
            <h2 className="text-4xl font-semibold">Student Attendance System</h2>
            <p className="text-2xl text-zinc-500 max-w-3xl">A site designed using NextJS , TailwindCSS, Firebase and Shadcn-UI to basically add student data and their attendance</p>
            <div className="flex justify-between gap-16 max-w-3xl">
                <Link href={'/login'}>
                    <Button variant='outline' className='transition-all ease-in duration-150 py-6 px-12 font-semibold text-zinc-600 text-lg'>Login</Button>
                </Link>
                <Link href={'/signup'}>
                    <Button className='bg-green-400 hover:bg-green-500 transition-all ease-in duration-150 py-6 font-semibold text-lg'>Create account</Button>
                </Link>
            </div>
        </div>
    )
}

export default Body