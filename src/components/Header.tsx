import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
    return (
        <header className="w-full flex p-8 justify-between">
            <h1 className="text-3xl font-bold">Minhas Tarefas</h1>
            <Button variant={"outline"} className="ml-auto cursor-pointer"><LogOut/> Logout</Button>
        </header>
    )
}