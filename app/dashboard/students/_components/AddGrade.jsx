import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const AddGrade = ({ grade, setGrade, placeholder = "Select a Grade" }) => {
    const Grades = [
        '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'
    ]

    return (
        <Select value={grade} onValueChange={grade => setGrade(grade)}>
            <SelectTrigger className="text-zinc-500">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Grades</SelectLabel>
                    {Grades.map((grade, id) => (
                        <SelectItem className='cursor-pointer font-semibold' value={grade} key={id}>{grade}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default AddGrade