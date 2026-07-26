import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <Card className="w-full max-w-md shadow-xl border-0">
      <CardContent className="p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            PulseOS
          </h1>

          <p className="text-muted-foreground mt-2">
            AI Restaurant Operating System
          </p>
        </div>

        {children}
      </CardContent>
    </Card>
  );
}

