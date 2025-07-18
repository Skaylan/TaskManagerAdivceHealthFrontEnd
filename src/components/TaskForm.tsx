import { use, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Save, X } from 'lucide-react';
import Cookies from 'js-cookie';
import { useGetUserSession } from '@/actions/DashBoardActions';

interface TaskFormProps {
    isOpen: boolean;
    onClose: () => void;
    refetchTasks: () => void;
}

export const TaskForm = ({ isOpen, onClose, refetchTasks }: TaskFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const session = useGetUserSession();

    const handleSubmit = async (e: React.FormEvent) => {
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
                title,
                description
            }),
        });

        if (response.ok) {
            console.log('Task created successfully');
            refetchTasks();
        } else {
            console.error('Failed to create task');
        }

        // Reset form
        setTitle('');
        setDescription('');
        setCompleted(false);
        onClose();
    };

    const handleClose = () => {
        setTitle('');
        setDescription('');
        setCompleted(false);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Criar nova tarefa
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
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