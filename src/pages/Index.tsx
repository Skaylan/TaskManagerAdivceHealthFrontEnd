import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
// import { Button } from "@/components/ui/button";

export default function Index() {
    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <LoginForm />
            <span>ou</span>
            <RegisterForm />
        </div>
    );
}