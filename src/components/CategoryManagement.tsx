import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogDescription } from "@radix-ui/react-dialog"
import Cookies from "js-cookie"
import { Edit, Plus, Save, Trash2, X } from "lucide-react"
import { useGetUserSession } from "@/actions/DashBoardActions"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import type { Category } from "@/types"


interface CategoryManagementProps {
    categories: Category[],
    refetchCategories: () => void,
    refetchTasks: () => void
}


export function CategoryManagement({ categories, refetchCategories, refetchTasks }: CategoryManagementProps) {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({ name: '', color: '#8B5CF6' });
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const colors = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#6366F1'];
    const session = useGetUserSession();

    const handleCreate = async () => {
        if (!formData.name.trim()) {
            return;
        }

        const response = await fetch(process.env.BACKEND_URL + "/create_category", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify({
                email: session?.email,
                name: formData.name,
                color: formData.color
            }),
        });

        if (response.ok) {
            refetchCategories();
        }

        setFormData({ name: '', color: '#8B5CF6' });
        setShowForm(false);
    }

    const handleUpdate = async () => {
        if (!editingCategory || !formData.name.trim()) {
            return;
        }

        const response = await fetch(process.env.BACKEND_URL + "/update_category", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify({
                category_id: editingCategory.id,
                name: formData.name,
                color: formData.color
            }),
        });

        if (response.ok) {
            refetchCategories();
            refetchTasks();
        }

        setEditingCategory(null);
        setFormData({ name: '', color: '#8B5CF6' });
        setShowForm(false);
    };

    const handleDelete = async (categoryId: string) => {
        const response = await fetch(process.env.BACKEND_URL + "/delete_category", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify({
                category_id: categoryId,
            }),

        });

        if (response.ok) {
            refetchCategories();
        }
    };

    const openEditForm = (category: Category) => {
        setEditingCategory(category);
        setFormData({ name: category.name, color: '#8B5CF6' });
        setShowForm(true);
    };

    const openCreateForm = () => {
        setEditingCategory(null);
        setFormData({ name: '', color: '#8B5CF6' });
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingCategory(null);
        setFormData({ name: '', color: '#8B5CF6' });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" variant="outline">Gerenciar categorias</Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Gerenciamento de Categorias</DialogTitle>
                </DialogHeader>
                <DialogDescription className="flex justify-between">
                    gerencie suas categorias
                    <Button onClick={openCreateForm} className="cursor-pointer" variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        Criar categoria
                    </Button>
                </DialogDescription>

                <div className="w-full grid gap-4">
                    {
                        categories?.map(category => (
                            <Card key={category.id} className="flex justify-center bg-card/50 backdrop-blur-sm max-h-[80px]">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                        <div
                                            className="w-4 h-4 rounded-full border-2 border-background"
                                            style={{ backgroundColor: category.color }}
                                        />
                                            <span className="font-medium">{category.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                            onClick={() => openEditForm(category)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Exclusão de categoria</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Tem certeza que deseja excluir a categoria "{category.name}"? Esta ação não pode ser desfeita.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(String(category.id))} >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    }
                    {showForm && (
                        <Card className="">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    {editingCategory ? 'Edite a Categoria' : 'Crie uma Nova Categoria'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="categoryName">Nome da Categoria</Label>
                                    <Input
                                        id="categoryName"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Digite o nome da categoria"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label>Color</Label>
                                    <div className="flex gap-2 mt-2">
                                        {colors.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                className={`w-8 h-8 rounded-full border-2 ${formData.color === color ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                                                    }`}
                                                style={{ backgroundColor: color }}
                                            onClick={() => setFormData({ ...formData, color })}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-4">
                                    <Button onClick={closeForm} variant="outline" className="gap-2">
                                        <X className="h-4 w-4" />
                                        Cancelar
                                    </Button>
                                    <Button
                                        onClick={editingCategory ? handleUpdate : handleCreate}
                                        className="gap-2"
                                    >
                                        <Save className="h-4 w-4" />
                                        {editingCategory ? 'Atualizar' : 'Criar'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

            </DialogContent>
        </Dialog>
    )
}