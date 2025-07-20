import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Save, X } from 'lucide-react';
// import Cookies from 'js-cookie';
import { useGetUserSession, type Category } from '@/actions/DashBoardActions';
import type { Task } from '@/pages/Dashborad';
import { Select } from './ui/select';
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';



interface TaskFormProps {
    isOpen: boolean;
    onClose: () => void;
    createTaskSubmit: (e: React.FormEvent, title: string, description: string, session: any, category: string) => void;
    updateTaskSubmit: (title: string, description: string, session: any) => void
    editingTask: Task | null;
    categories: Category[]
}

export const TaskForm = ({
    isOpen,
    onClose,
    createTaskSubmit,
    updateTaskSubmit,
    editingTask,
    categories
}: TaskFormProps) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('all');
    const session = useGetUserSession();


    const handleClose = () => {
        setTitle('');
        setDescription('');
        // setCompleted(false);
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent, title: string, description: string, session: any) => {
        if (editingTask) {
            updateTaskSubmit(title, description, session);
            return
        }

        createTaskSubmit(e, title, description, session, category);
    }

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            //   setCompleted(initialData.completed);
        } else {
            setTitle('');
            setDescription('');
            //   setCompleted(false);
        }
    }, [editingTask, isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Criar nova tarefa
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={(e) => handleSubmit(e, title, description, session)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Task Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task title..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter task description..."
                            rows={3}
                        />
                    </div>

                    <div>
                        <Select value={category} onValueChange={(value) => setCategory(value)}>
                            <SelectTrigger className="w-[180px] cursor-pointer">
                                <SelectValue placeholder="Categoria" />
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

                    <div className="flex gap-3 justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            className='cursor-pointer hover:opacity-90'
                        >
                            <X className="h-4 w-4 mr-2" />
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="cursor-pointer hover:opacity-90"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Criar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};