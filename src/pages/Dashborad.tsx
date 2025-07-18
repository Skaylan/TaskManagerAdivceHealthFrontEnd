// import { useGetUserInfo } from "@/actions/DashBoardActions";
import { getUserTasks, useGetUserSession } from "@/actions/DashBoardActions";
import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";
import { TaskForm } from "@/components/TaskForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
    Plus,
    Search,
    Filter,
} from 'lucide-react';
import { useEffect, useState } from "react";



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
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [statusFilter, setStatusFilter] = useState<'all' | 'done' | 'not-done'>('all');
    const [tasksPerPage, setTasksPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);


    const { data: tasks, refetch: refetchTasks } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => getUserTasks(useGetUserSession().email)
    });

    useEffect(() => {
        let filtered = tasks;

        if (searchTerm) {
            filtered = filtered.filter((task: Task) =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter((task: Task) =>
                statusFilter === 'done' ? task.is_done : !task.is_done
            );
        }

        setFilteredTasks(filtered);
        setCurrentPage(1);
    }, [tasks, searchTerm, statusFilter]);


    const handleCreateTask = async (e: React.FormEvent, title: string, description: string, session: any) => {
        e.preventDefault();
        if (!title.trim()) return;

        const response = await fetch('http://localhost:8000/api/v1/add_task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify({
                user_id: session?.id,
                title: title,
                description: description
            }),
        });

        if (response.ok) {
            console.log('Task created successfully');
            refetchTasks();
            setIsTaskFormOpen(false);
        } else {
            console.error('Failed to create task');
        }

        // Reset form
    };
    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        setIsTaskFormOpen(true);
    };


    const handleUpdateTask = async (title: string, description: string) => {
        if (!editingTask) return;

        try {
            const response = await fetch(`http://localhost:8000/api/v1/update_task_infos`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify({
                    task_id: editingTask.id,
                    title: title,
                    description: description
                }),
            })

            if (response.ok) {
                console.log('Task updated successfully');
                refetchTasks();
                setEditingTask(null);
            }

        } catch (error) {
            console.error('Error updating task:', error);
        }

    };
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks?.slice(indexOfFirstTask, indexOfLastTask);
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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div>
                        <Select  value={statusFilter} onValueChange={(value: 'all' | 'done' | 'not-done') => setStatusFilter(value)}>
                            <SelectTrigger className="w-[180px] cursor-pointer">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Filtros" />
                            </SelectTrigger>
                            <SelectContent className="">
                                <SelectGroup className="">
                                    <SelectLabel>Filtros</SelectLabel>
                                    <SelectItem className="cursor-pointer" value="all">
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
                    {currentTasks?.map((task: Task) => (
                        <TaskCard handleEditTask={handleEditTask} key={task.id} task={task} refetchTasks={refetchTasks} />
                    ))}
                </div>
            </div>
            <TaskForm
                isOpen={isTaskFormOpen}
                onClose={() => { setIsTaskFormOpen(false), setEditingTask(null) }}
                createTaskSubmit={handleCreateTask}
                updateTaskSubmit={handleUpdateTask}
                editingTask={editingTask}
            />
        </div>
    );
}