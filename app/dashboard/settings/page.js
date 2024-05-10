import { Button } from "@/components/ui/button"

const Settings = () => {
    return (
        <div className='text-5xl text-zinc-600 p-7 flex flex-col gap-4 items-center justify-center my-44'>
            No settings are available
            <span className='text-xl mt-6 text-zinc-400'>Upgrade to premium to use this feature</span>
            <Button>Try Premium</Button>
        </div>
    )
}

export default Settings