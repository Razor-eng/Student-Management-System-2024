import { Button } from "@/components/ui/button"
import { HomeIcon, InfoIcon, PhoneCallIcon } from "lucide-react"
import Link from "next/link"

const Header = () => {
    const HeaderItems = [
        { name: 'Home', icon: <HomeIcon /> },
        { name: 'About', icon: <InfoIcon /> },
        { name: 'Contact', icon: <PhoneCallIcon /> },
    ]

    return (
        <div className='h-24 border-b'>
            <div className="flex items-center justify-between h-full px-32">
                <div className="flex items-center gap-10 text-zinc-500 text-lg font-semibold">
                    {HeaderItems.map((item, id) => (
                        <div className="flex gap-2 cursor-pointer hover:bg-zinc-100 py-4 transition-all ease-in duration-150 px-3 rounded-lg">
                            {item.icon}
                            {item.name}
                        </div>
                    ))}
                </div>
                <div className="flex gap-6">
                    <Link href='/signup'>
                        <Button className='bg-blue-200 hover:bg-blue-300 transition-all ease-in duration-150 px-8 text-black font-semibold'>Sign Up</Button>
                    </Link>
                    <Link href='/login'>
                        <Button className='bg-sky-300 hover:bg-sky-400 transition-all ease-in duration-150 px-8 text-black font-semibold'>Login</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header