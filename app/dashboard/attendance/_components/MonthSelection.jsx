"use client";
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarDays } from "lucide-react"
import moment from "moment/moment"
import { addMonths } from "date-fns"
import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar";

const MonthSelection = ({ selectedMonth }) => {
    const nextMonths = addMonths(new Date, 0);
    const [month, setMonth] = useState(nextMonths);
    useEffect(() => {
        selectedMonth(month);
    }, [])


    return (
        <Popover>
            <PopoverTrigger>
                <Button variant='outline' className='flex items-center gap-2 text-zinc-500 py-6'>
                    <CalendarDays className="h-5 w-5" />
                    {moment(month).format('MMM yyyy')}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='mr-5'>
                <Calendar
                    mode='single'
                    month={month}
                    onMonthChange={value => { selectedMonth(value); setMonth(value) }}
                    className='flex flex-1 justify-center'
                />
            </PopoverContent>
        </Popover>
    )
}

export default MonthSelection