import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useLogin } from "@/hooks/useLogin";
import loginGradient from "@/assets/login-gradient-teal.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "ar", label: "العربية" },
];

const Login = () => {
  const { toast } = useToast();
  const { login, isLoading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    await login({ email, password });
  };

  const currentLanguage = languages.find(l => l.code === selectedLanguage);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4 md:p-8" style={{ background: 'var(--gradient-background)' }}>
      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80">
              <Globe className="w-4 h-4" />
              <span className="text-sm">{currentLanguage?.label}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[140px]">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={selectedLanguage === lang.code ? "bg-primary/10 text-primary" : ""}
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
      </div>
      
      <div className="w-full max-w-6xl bg-card/80 backdrop-blur-xl rounded-3xl overflow-hidden relative z-10 animate-scale-in" style={{ boxShadow: 'var(--shadow-strong)' }}>
        <div className="grid md:grid-cols-2 min-h-[600px]">
          {/* Left Column - Form */}
          <div className="flex items-center justify-center p-10 md:p-14 relative">
            <div className="w-full max-w-md">
              {/* Decorative corner accent */}
              <div className="absolute top-8 left-8 w-20 h-20 border-t-4 border-l-4 border-primary/30 rounded-tl-2xl"></div>
              
              {/* Header */}
              <div className="mb-12 animate-fade-in">
                <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Admin Portal
                </div>
                <h1 className="text-5xl text-primary mb-4 font-extrabold tracking-tight">
                  Toorrii
                </h1>
                <p className="text-base text-muted-foreground">
                  Queue & Reservation Hub
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-2 transition-colors group-focus-within:text-primary">
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="admin@toorrii.com" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="h-14 bg-muted/30 border-2 border-border/50 rounded-xl text-base placeholder:text-muted-foreground/50 transition-all duration-300 focus:border-primary focus:bg-background focus-visible:ring-0 focus-visible:ring-offset-0" 
                    disabled={isLoading} 
                  />
                </div>

                <div className="group">
                  <label htmlFor="password" className="block text-sm font-medium text-foreground/70 mb-2 transition-colors group-focus-within:text-primary">
                    Password
                  </label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      className="h-14 bg-muted/30 border-2 border-border/50 rounded-xl text-base placeholder:text-muted-foreground/50 transition-all duration-300 focus:border-primary focus:bg-background pr-12 focus-visible:ring-0 focus-visible:ring-offset-0" 
                      disabled={isLoading} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end pt-2">
                  <button 
                    type="button" 
                    className="text-sm text-primary hover:text-primary-hover transition-all duration-200 font-medium relative after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full" 
                    disabled={isLoading}
                  >
                    Forgot Password?
                  </button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-14 rounded-xl text-base font-semibold shadow-lg transition-all duration-300 mt-8 relative overflow-hidden group" 
                  style={{ background: 'var(--gradient-primary)' }}
                  disabled={isLoading}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Signing in...
                      </> : "Sign In to Dashboard"}
                  </span>
                  <div className="absolute inset-0 bg-primary-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </form>

              {/* Signature Section */}
              <div className="mt-12 pt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Separator className="mb-8 bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="font-medium">Secured with 256-bit encryption</span>
                  </div>
                  <p className="text-xs text-muted-foreground/60">
                    © 2024 Toorrii. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Gradient Image */}
          <div className="hidden md:block relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary"></div>
            <img 
              src={loginGradient} 
              alt="Abstract gradient background" 
              className="absolute inset-0 w-full h-full object-cover scale-110 opacity-120"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/50 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
