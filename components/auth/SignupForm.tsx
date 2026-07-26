"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { supabase } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupForm() {

  const router = useRouter();

 const [fullName, setFullName] = useState(""); 
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  setLoading(true);
  setError("");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  console.log("Signup data:", data);
console.log("Signup error:", error);
  if (error) {
     console.error(error);
    setError(error.message);
    setLoading(false);
    return;
  }

  setLoading(false);

alert("Account created successfully! Please login.");

router.push("/login");
}
 
  return (
    <form onSubmit={handleSignup} className="space-y-5">
      <div>
  <Label>Full Name</Label>

  <Input
    type="text"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    placeholder="Your full name"
  />
</div>
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
  {loading ? "Creating Account..." : "Create Account"}
</Button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>

    </form>
  );
}
