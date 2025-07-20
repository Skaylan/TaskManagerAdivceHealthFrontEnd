import { callCreateUserApiRoute } from "@/actions/authActions"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerSchema } from "@/schemas/RegisterSchema"
import { useState } from "react"
import Cookies from "js-cookie"
import { ZodErrors } from "./zod/ZodErrors"
import { toast } from 'react-toastify';

export function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [zodErrors, setZodErrors] = useState<string[]>([])

  const handleRegisterFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(name, email, password, confirmPassword)
    const data = registerSchema.safeParse({ name, email, password, confirmPassword })
    if (!data.success) {
      setZodErrors(data.error.issues.map(issue => issue.message))
      return
    }

    const res = await callCreateUserApiRoute(name, email, password, confirmPassword)
    if (res.token) {
      Cookies.set('token', res.token)
      Cookies.set('session', JSON.stringify(res.user))
      toast.success('Conta criada com sucesso!')
      window.location.href = '/dashboard'
    }
  }


  return (
    <Dialog onOpenChange={() => setZodErrors([])}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="outline">Crie uma conta</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={(e) => { handleRegisterFormSubmit(e) }}>
          <DialogHeader>
            <DialogTitle>Crie uma conta</DialogTitle>
            <DialogDescription>
              Crie uma conte começe a utilizar todos os recursos do site
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input onChange={(e) => setName(e.target.value)} id="name" name="name" placeholder="seu nome" />
              <ZodErrors error={zodErrors.filter(err => err.includes('nome'))} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input onChange={(e) => setEmail(e.target.value)} id="email" name="email" placeholder="seu email" />
              <ZodErrors error={zodErrors.filter(err => err.includes('email'))} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Senha</Label>
              <Input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="escolha uma senha" />
              <ZodErrors error={zodErrors.filter(err => err.includes('senha'))} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="confirmPassword">Repetir senha</Label>
              <Input onChange={(e) => setConfirmPassword(e.target.value)} type="password" id="confirmPassword" name="confirmPassword" placeholder="repita sua senha" />
              {/* <ZodErrors error={zodErrors.filter(err => err.includes('senhas'))} /> */}
            </div>
          </div>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button className="cursor-pointer" type="submit">Criar Conta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
