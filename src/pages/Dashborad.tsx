// import { useGetUserInfo } from "@/actions/DashBoardActions";
import { getUserTasks, useGetUserSession } from "@/actions/DashBoardActions";
import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";
import { TaskForm } from "@/components/TaskForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
// import Cookies from "js-cookie";
import {
    Plus,
    Search,
    Filter,
  } from 'lucide-react';
import { useState } from "react";



export interface Task {
    id: number;
    title: string;
    description: string;
    is_done: boolean;
    created_at: string;
    updated_at: string
}
export default function Dashboard() {
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

    const { data: tasks, refetch: refetchTasks } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => getUserTasks(useGetUserSession().email)
    });

    // console.log(tasks)

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-1/2 flex flex-col">
                <div className="flex w-full">
                    <Header />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search tasks..."
                            // value={searchTerm}
                            // onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div>
                        <Select>
                            <SelectTrigger className="w-[180px] cursor-pointer">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Filtros" />
                            </SelectTrigger>
                            <SelectContent className="">
                                <SelectGroup className="">
                                    <SelectLabel>Filtros</SelectLabel>
                                    <SelectItem className="cursor-pointer" value="Todos">
                                        Todos
                                    </SelectItem>
                                    <SelectItem className="cursor-pointer" value="done">
                                        Concluídos
                                    </SelectItem>
                                    <SelectItem className="cursor-pointer" value="not-done">
                                        Pendentes
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>


                    <Button

                        onClick={() => setIsTaskFormOpen(true)}
                        className="cursor-pointer"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Task
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {tasks?.map((task: Task) => (
                        <TaskCard key={task.id} task={task} refetchTasks={refetchTasks}/>
                    ))}
                </div>
            </div>
            <TaskForm
                isOpen={isTaskFormOpen}
                onClose={() => setIsTaskFormOpen(false)}
                refetchTasks={refetchTasks}
            />
        </div>
    );
}