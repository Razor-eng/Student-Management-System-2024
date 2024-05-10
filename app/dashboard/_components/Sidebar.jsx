"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, Hand, LayoutIcon, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";

const Sidebar = ({ user }) => {
    const pathname = usePathname();

    const menuList = [
        { name: 'Dashboard', icon: LayoutIcon, path: '/dashboard' },
        { name: 'Students', icon: GraduationCap, path: '/dashboard/students' },
        { name: 'Attendeance', icon: Hand, path: '/dashboard/attendance' },
        { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
    ]

    return (
        <div className='border shadow-md h-screen'>
            <div className="flex items-center pb-5 justify-center">
                <Link href={'/dashboard'}>
                    <Image
                        src='/logo.png'
                        width={100}
                        height={50}
                        alt='logo'
                        className='my-2 hover:scale-105 transition-all ease-in duration-150'
                    />
                </Link>
            </div>
            <div className="px-2">
                {menuList.map((menu, id) => (
                    <Link
                        key={id}
                        href={menu.path}
                        className={`flex items-center gap-3 p-4 transition-all ease-in duration-150 rounded-lg my-2 ${pathname.split('/').splice(-1)[0].includes(menu.path.split('/').splice(-1)[0]) ? 'text-black font-semibold bg-zinc-200 cursor-default' : 'text-zinc-500 hover:bg-zinc-100 hover:text-black'}`}
                    >
                        <menu.icon />
                        {menu.name}
                    </Link>
                ))}
            </div>
            <div className="flex px-6 gap-2 items-center bottom-5 fixed">
                <Avatar>
                    <AvatarImage src={user?.photoURL || '/user.jpg'} alt="user" />
                    {user?.displayName &&
                        <AvatarFallback>{user?.displayName[0]}</AvatarFallback>
                    }
                </Avatar>
                <div className="flex flex-col">
                    <h2 className='text-sm font-bold'>{user?.displayName}</h2>
                    <h2 className='text-xs text-zinc-500'>{user?.email}</h2>
                </div>
            </div>
        </div>
    )
}

export default Sidebar