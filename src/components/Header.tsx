import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import Cookies from "js-cookie";
export function Header() {

    const logOut = () => {
        Cookies.remove("token");
        Cookies.remove("session");
        window.location.href = "/";
    }

    return (
        <header className="w-full flex p-8 justify-between">
            <h1 className="text-3xl font-bold">Minhas Tarefas</h1>
            <Button onClick={logOut} variant={"outline"} className="ml-auto cursor-pointer"><LogOut/>Sair</Button>
        </header>
    )
}