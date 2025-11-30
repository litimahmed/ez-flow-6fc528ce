import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { logoutAdmin } from "@/services/api";

export const useLogout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await logoutAdmin(refreshToken || undefined);
      
      // Clear stored tokens
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      
      toast({ title: "Logged out", description: "You have been logged out successfully.", variant: "default" });
      navigate("/login");
    } catch (err) {
      // Even if API fails, clear local tokens and redirect
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
};
