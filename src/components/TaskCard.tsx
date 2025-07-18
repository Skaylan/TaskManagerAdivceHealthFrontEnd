import { CheckCircle, Circle, Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import type { Task } from "@/pages/Dashborad";


export interface TaskCardProps {
    task: Task;
}

export function TaskCard({ task }: TaskCardProps) {


    return (
        <Card key={task.id} className="hover:shadow-medium transition-all duration-200 animate-fade-in max-w-[357px]">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            // onClick={() => handleToggleComplete(task.id)}
                            className="p-1 h-6 w-6"
                        >
                            {task.is_done ? (
                                <CheckCircle className="h-4 w-4 text-primary" />
                            ) : (
                                <Circle className="h-4 w-4 text-muted-foreground" />
                            )}
                        </Button>
                        <Badge variant={task.is_done ? "default" : "secondary"}>
                            {task.is_done ? 'Concluído' : 'Pendente'}
                        </Badge>
                    </div>
                    <div className="flex gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            // onClick={() => handleEditTask(task)}
                            className="p-1 h-6 w-6"
                        >
                            <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            // onClick={() => handleDeleteTask(task.id)}
                            className="p-1 h-6 w-   6 text-destructive hover:text-destructive"
                        >
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <h3 className={`font-semibold mb-2 ${task.is_done ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                </h3>
                <p className={`text-sm text-muted-foreground mb-3 ${task.is_done ? 'line-through' : ''}`}>
                    {task.description}
                </p>
                <div className="flex flex-col text-xs text-muted-foreground">
                    <span className="font-semibold">
                        Criado em: {new Date(task.created_at).toLocaleString()}
                    </span>
                    <span className="font-semibold">
                        Atualizado em: {new Date(task.updated_at).toLocaleString()}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}