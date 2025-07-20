export interface User {
    id: number;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

export interface Category {
    id: number;
    name: string;
    color: string;
    created_at: Date;
    updated_at: Date;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    is_done: boolean;
    category: Category;
    created_at: string;
    updated_at: string
}