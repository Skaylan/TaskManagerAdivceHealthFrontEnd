import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, ListTodo } from "lucide-react";
// import { Button } from "@/components/ui/button";

export default function Index() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-200 px-4">
            <section className="max-w-3xl text-center space-y-6">
                <div className="flex flex-col items-center gap-2">
                    <ListTodo className="w-12 h-12 text-blue-600" />
                    <h1 className="text-4xl font-bold tracking-tight text-gray-800">
                        Gerencie suas tarefas com eficiência
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Organize seu dia, mantenha o foco e alcance seus objetivos com nossa poderosa aplicação de tarefas.
                    </p>
                    <div className="flex gap-2 items-center justify-center">
                        <LoginForm />
                        <span className="text-gray-600">ou</span>
                        <RegisterForm />
                    </div>

                    {/* <Button className="mt-4 px-6 py-2 text-base" size="lg">
                        Comece agora
                    </Button> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                    <Card className="shadow-md">
                        <CardContent className="flex flex-col items-center p-6 text-center space-y-2">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                            <h2 className="font-semibold text-gray-800">Tarefas Concluídas</h2>
                            <p className="text-sm text-gray-600">Marque suas tarefas como concluídas e acompanhe seu progresso.</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md">
                        <CardContent className="flex flex-col items-center p-6 text-center space-y-2">
                            <Clock className="w-8 h-8 text-yellow-500" />
                            <h2 className="font-semibold text-gray-800">Organização por Categorias</h2>
                            <p className="text-sm text-gray-600">Classifique e priorize o que realmente importa.</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md">
                        <CardContent className="flex flex-col items-center p-6 text-center space-y-2">
                            <ListTodo className="w-8 h-8 text-blue-500" />
                            <h2 className="font-semibold text-gray-800">Simplicidade</h2>
                            <p className="text-sm text-gray-600">Interface limpa e intuitiva para você focar nas suas metas.</p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </main>
        // <div className="w-full h-[100vh] flex items-center justify-center">
        //     <LoginForm />
        //     <span>ou</span>
        //     <RegisterForm />
        // </div>
    );
}