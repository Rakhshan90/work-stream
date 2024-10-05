import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Ellipsis } from 'lucide-react'


const TaskStatus = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-slate-900 h-6 w-6 px-1 rounded-lg'>
                    <Ellipsis className='text-slate-300 w-8 h-8' />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-slate-900 border-none text-slate-300">
                <DialogHeader>
                    <DialogTitle>Task title</DialogTitle>
                    <DialogDescription>
                        Task description...
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Mark task as
                        </Label>
                        <Select>
                            <SelectTrigger className="w-[180px] border-none bg-slate-800">
                                <SelectValue placeholder="pending" />
                            </SelectTrigger>
                            <SelectContent className='bg-slate-900 text-slate-300'>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="ongoing">On-going</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className='bg-blue-600 hover:bg-slate-800'>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TaskStatus