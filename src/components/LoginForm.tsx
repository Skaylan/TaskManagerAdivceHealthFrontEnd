import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogDescription } from "@radix-ui/react-dialog"
import { LoginSchema } from "@/schemas/LoginSchema"
import { ZodErrors } from "./zod/ZodErrors"
import { callAuthenticationApiRoute } from "@/actions/LoginAction"
import Cookies from "js-cookie"

export function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [zodErrors, setZodErrors] = useState<string[]>([])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = LoginSchema.safeParse({ email, password })
        if (!data.success) {
            setZodErrors(data.error.issues.map(issue => issue.message))
            return
        }

        const res = await callAuthenticationApiRoute(email, password)
        if (res.token) {
            Cookies.set('token', res.token)
            // window.location.href = '/'
        }
    }

    return (
        <Dialog onOpenChange={() => setZodErrors([])}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" variant="outline">Acesse sua conta</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form className="grid gap-4" onSubmit={(e) => {handleSubmit(e)}}>
                    <DialogHeader>
                        <DialogTitle>Acesse sua conta</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Crie uma conte começe a utilizar todos os recursos do site
                    </DialogDescription>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input required onChange={(e) => setEmail(e.target.value)} id="email" name="email" placeholder="seu email" />
                            <ZodErrors error={zodErrors.filter(err => err.includes('Email'))} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password">Senha</Label>
                            <Input required onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="sua senha" />
                            <ZodErrors error={zodErrors.filter(err => err.includes('Senha'))} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="cursor-pointer" variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button className="cursor-pointer" type="submit">Acessar conta</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
