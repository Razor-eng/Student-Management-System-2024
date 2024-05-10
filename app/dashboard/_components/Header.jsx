import { auth } from "@/app/firebase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "firebase/auth"
import { LogOutIcon } from "lucide-react"
import toast from "react-hot-toast"

const Header = ({ user }) => {
    const logout = () => {
        signOut(auth);
        toast.success('Signed out Successfully')
    }

    return (
        <div className='px-4 py-2 shadow-sm border-b flex justify-between items-center'>
            <div
                className='hover:bg-zinc-200/70 rounded-xl flex items-center gap-2 text-zinc-700 hover:text-black cursor-pointer p-3 transition-all ease-in duration-150'
                onClick={logout}
            >
                <LogOutIcon className="rotate-180" />
                <p className="font-semibold">Logout</p>
            </div>
            <Avatar>
                <AvatarImage src={user?.photoURL || '/user.jpg'} alt="user" />
                {user?.displayName &&
                    <AvatarFallback>{user?.displayName[0]}</AvatarFallback>
                }
            </Avatar>
        </div>
    )
}

export default Header