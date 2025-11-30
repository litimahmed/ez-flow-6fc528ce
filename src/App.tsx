import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Manage from "./pages/Manage";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import AboutUs from "./pages/AboutUs";
import ContactList from "./pages/ContactList";
import ContactAll from "./pages/ContactAll";
import ContactCreate from "./pages/ContactCreate";
import ContactEdit from "./pages/ContactEdit";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/manage" element={<DashboardLayout><Manage /></DashboardLayout>} />
          <Route path="/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
          <Route path="/content/about-us" element={<DashboardLayout><AboutUs /></DashboardLayout>} />
          <Route path="/content/contact" element={<DashboardLayout><ContactList /></DashboardLayout>} />
          <Route path="/content/contact/all" element={<DashboardLayout><ContactAll /></DashboardLayout>} />
          <Route path="/content/contact/create" element={<DashboardLayout><ContactCreate /></DashboardLayout>} />
          <Route path="/content/contact/edit" element={<DashboardLayout><ContactEdit /></DashboardLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
