import { Button } from "@/components/ui/button"
import { Ghost } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <Ghost className="w-16 h-16 text-blue-500 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-gray-600 text-lg mb-6">Página não encontrada.</p>
      <Button onClick={() => navigate("/")} className="px-6">
        Voltar para o início
      </Button>
    </div>
  )
}
