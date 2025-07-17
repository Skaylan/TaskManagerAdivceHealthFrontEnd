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

export function RegisterForm() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="cursor-pointer" variant="outline">Crie uma conta</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crie uma conta</DialogTitle>
            <DialogDescription>
              Crie uma conte começe a utilizar todos os recursos do site
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="seu nome" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="seu email"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Senha</Label>
              <Input type="password" id="password" name="password" placeholder="escolha uma senha"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="re-password">Repetir senha</Label>
              <Input type="password" id="re-password" name="re-password" placeholder="repita sua senha"/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button className="cursor-pointer" type="submit">Criar Conta</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
