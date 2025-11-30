import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { loginAdmin } from "@/services/api";
import { LoginPayload } from "@/types/auth";

export const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await loginAdmin(payload);
      // Store access and refresh tokens
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      
      toast({ title: "Success", description: "Welcome back!", variant: "success" });
      navigate("/");
    } catch (err) {
      let errorMessage = "Login failed. Please try again.";
      
      if (err instanceof Error) {
        const message = err.message.toLowerCase();
        if (message.includes("deactivated") || message.includes("disabled")) {
          errorMessage = "Your account has been deactivated. Please contact support.";
        } else if (message.includes("invalid") || message.includes("incorrect") || message.includes("wrong")) {
          errorMessage = "Invalid email or password. Please check your credentials.";
        } else if (message.includes("not found") || message.includes("no user") || message.includes("doesn't exist")) {
          errorMessage = "No account found with this email. Please sign up first.";
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};