import AuthCard from "@/components/auth/AuthCard";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <AuthCard>
        <SignupForm />
      </AuthCard>
    </main>
  );
}
