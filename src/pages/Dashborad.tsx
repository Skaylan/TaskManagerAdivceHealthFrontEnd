// import { useGetUserInfo } from "@/actions/DashBoardActions";
import { getUserCategories, getUserTasks, useGetUserSession } from "@/actions/DashBoardActions";
import { CategoryManagement } from "@/components/CategoryManagement";
import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";
import { TaskForm } from "@/components/TaskForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Category, Task } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import {
    Plus,
    Search,
    Filter,
    ChevronRight,
    ChevronLeft,
    ChartColumnStacked,
} from 'lucide-react';
import { useEffect, useState } from "react";


export default function Dashboard() {
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [statusFilter, setStatusFilter] = useState<'all' | 'done' | 'not-done'>('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const userSession = useGetUserSession();
    let tasksPerPage = 6;

    const { data: tasks, refetch: refetchTasks } = useQuery({
        queryKey: ['tasks', userSession.email, currentPage, statusFilter, searchTerm, categoryFilter],
        queryFn: () => getUserTasks(userSession.email, currentPage, statusFilter, searchTerm, categoryFilter),
        enabled: !!userSession.email
    });

    const { data: categories, refetch: refetchCategories } = useQuery({
        queryKey: ['categories', userSession.email],
        queryFn: () => getUserCategories(userSession.email),
        enabled: !!userSession.email
    });

    useEffect(() => {
        let filtered = tasks?.tasks;
        if (searchTerm) {
            filtered = filtered?.filter((task: Task) =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered?.filter((task: Task) =>
                statusFilter === 'done' ? task.is_done : !task.is_done
            );
        }

        setFilteredTasks(filtered);
    }, [tasks, searchTerm, statusFilter]);


    const handleCreateTask = async (e: React.FormEvent, title: string, description: string, session: any, category: string) => {
        e.preventDefault();
        if (!title.trim()) return;

        if (category === 'all') {
            category = '';
        }

        try {
            const response = await fetch(process.env.BACKEND_URL + '/add_task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify({
                    user_id: session?.id,
                    title: title,
                    description: description,
                    category_id: category
                }),
            });

            if (response.ok) {
                refetchTasks();
                setIsTaskFormOpen(false);
                toast.success('Tarefa criada com sucesso!');
            }

        } catch (error) {
            toast.error('Erro ao criar tarefa');
            return;
        }

    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        setIsTaskFormOpen(true);
    };


    const handleUpdateTask = async (title: string, description: string, categoryId: string) => {
        if (!editingTask) return;

        if (categoryId === 'all') {
            categoryId = '';
        }

        try {
            const response = await fetch(process.env.BACKEND_URL + `/update_task_infos`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify({
                    task_id: editingTask.id,
                    title: title,
                    description: description,
                    category_id: categoryId
                }),
            })

            if (response.ok) {
                refetchTasks();
                setEditingTask(null);
                toast.success('Tarefa atualizada com sucesso!');
            }

        } catch (error) {
            toast.error('Erro ao atualizar tarefa');
        }

    };

    const currentTasks = filteredTasks;
    const totalPages = Math.ceil(tasks?.amount_of_tasks / tasksPerPage);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-2/3 flex flex-col">
                <div className="flex w-full">
                    <Header />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Pesquisar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div>
                        <Select value={statusFilter} onValueChange={(value: 'all' | 'done' | 'not-done') => setStatusFilter(value)}>
                            <SelectTrigger className="w-[180px] cursor-pointer">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Filtros" />
                            </SelectTrigger>
                            <SelectContent className="">
                                <SelectGroup className="">
                                    <SelectLabel>Filtros</SelectLabel>
                                    <SelectItem className="cursor-pointer" value="all">
                                        Status
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
                    <div>
                        <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
                            <SelectTrigger className="w-[180px] cursor-pointer">
                                <ChartColumnStacked  className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Filtros" />
                            </SelectTrigger>
                            <SelectContent className="">
                                <SelectGroup className="">
                                    <SelectLabel>Categoria</SelectLabel>
                                    <SelectItem className="cursor-pointer" value="all">
                                        Categoria
                                    </SelectItem>
                                    {
                                        categories?.map((category: Category) => (
                                            <SelectItem className="cursor-pointer" key={category.id} value={String(category.id)}>
                                                {category.name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="">
                        <CategoryManagement refetchTasks={refetchTasks}  categories={categories} refetchCategories={refetchCategories} />
                    </div>

                    <Button

                        onClick={() => setIsTaskFormOpen(true)}
                        className="cursor-pointer"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Tarefa
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {currentTasks?.map((task: Task) => (
                        <TaskCard handleEditTask={handleEditTask} key={task.id} task={task} refetchTasks={refetchTasks} />
                    ))}
                </div>
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                            mostrando {(currentPage - 1) * tasksPerPage + 1} até {(currentPage - 1) * tasksPerPage + currentTasks?.length} de {tasks?.amount_of_tasks} tarefas
                        </div>
                        <div className="flex gap-2">
                            <Button
                                className="cursor-pointer"
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <Button

                                        key={i + 1}
                                        variant={currentPage === i + 1 ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setCurrentPage(i + 1)}
                                        className="w-8 h-8 p-0 cursor-pointer"
                                    >
                                        {i + 1}
                                    </Button>
                                ))}
                            </div>
                            <Button
                                className="cursor-pointer"
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <TaskForm
                isOpen={isTaskFormOpen}
                onClose={() => { setIsTaskFormOpen(false), setEditingTask(null) }}
                createTaskSubmit={handleCreateTask}
                updateTaskSubmit={handleUpdateTask}
                editingTask={editingTask}
                categories={categories}
            />
        </div>
    );
}