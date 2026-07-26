"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { supabase } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  setLoading(true);
  setError("");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setError(error.message);
    setLoading(false);
    return;
  }

  router.push("/dashboard");
  router.refresh();
}
  return (
    <form onSubmit={handleLogin} className="space-y-5">

      <div>
        <Label>Email</Label>

        <Input
          type="email"
          placeholder="Enter your email"
	   value={email}
  onChange={(e) => setEmail(e.target.value)}

        />
      </div>

      <div>
        <Label>Password</Label>

        <Input
          type="password"
          placeholder="Enter your password"
	  value={password}
  onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && (
  <p className="text-sm text-red-600">
    {error}
  </p>
)}
      <Button
  type="submit"
  className="w-full"
  disabled={loading}
>
  {loading ? "Signing In..." : "Login"}
</Button>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign Up
        </Link>
      </p>

    </form>
  );
}
