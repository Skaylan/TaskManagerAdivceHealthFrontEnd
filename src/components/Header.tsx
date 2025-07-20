import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { logOut } from "@/actions/authActions";
export function Header() {

    return (
        <header className="w-full flex p-8 justify-between">
            <h1 className="text-3xl font-bold">Minhas Tarefas</h1>
            <Button onClick={logOut} variant={"outline"} className="ml-auto cursor-pointer"><LogOut/>Sair</Button>
        </header>
    )
}