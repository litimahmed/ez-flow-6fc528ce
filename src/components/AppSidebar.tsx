import { useState } from "react";
import { LayoutDashboard, Users, Settings, BarChart3, Zap, FileText, ChevronDown, Info } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const mainItems = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Manage Queues", url: "/manage", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

const contentItems = [
  { title: "About Us", url: "/content/about-us", icon: Info },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  const isContentActive = contentItems.some(item => isActive(item.url));
  const [contentOpen, setContentOpen] = useState(isContentActive);

  return (
    <Sidebar className={`${open ? "w-72" : "w-20"} transition-all duration-300 border-r border-border/50`} collapsible="icon">
      <SidebarContent className="bg-card">
        {/* Logo Section */}
        <div className={`${open ? "p-6" : "p-4"} transition-all duration-300`}>
          <div className={`flex items-center ${open ? "gap-3" : "justify-center"}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="relative bg-gradient-to-br from-primary to-primary-glow p-1 rounded-xl shadow-lg">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
            {open && (
              <div className="flex flex-col animate-fade-in">
                <h1 className="text-xl font-bold text-foreground tracking-tight">Toorrii</h1>
                <span className="text-xs text-muted-foreground font-medium">Admin Portal</span>
              </div>
            )}
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Main Navigation Section */}
        <SidebarGroup className="px-3 py-4">
          {open && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
              Main Menu
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map(item => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={`
                          ${open ? "px-4 py-3" : "px-3 py-3 justify-center"}
                          rounded-xl transition-all duration-200
                          text-muted-foreground hover:text-foreground
                          hover:bg-muted/50
                          flex items-center gap-3
                          group relative
                        `}
                        activeClassName={`
                          bg-gradient-to-r from-primary/10 to-primary/5
                          text-primary font-semibold
                          shadow-sm
                          border border-primary/20
                        `}
                      >
                        <item.icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${active ? "text-primary" : ""}`} />
                        {open && <span className="text-sm font-medium">{item.title}</span>}
                        {active && open && <div className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="bg-border/50 mx-3" />

        {/* Content Management Section */}
        <SidebarGroup className="px-3 py-4">
          {open && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
              Content
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {open ? (
                <Collapsible open={contentOpen} onOpenChange={setContentOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        className={`
                          px-4 py-3 rounded-xl transition-all duration-200
                          text-muted-foreground hover:text-foreground
                          hover:bg-muted/50
                          flex items-center justify-between w-full
                          ${isContentActive ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-semibold border border-primary/20" : ""}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className={`h-5 w-5 ${isContentActive ? "text-primary" : ""}`} />
                          <span className="text-sm font-medium">Content Management</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${contentOpen ? "rotate-180" : ""}`} />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 mt-1 space-y-1">
                    {contentItems.map(item => {
                      const active = isActive(item.url);
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={item.url}
                              className={`
                                px-4 py-2.5 rounded-lg transition-all duration-200
                                text-muted-foreground hover:text-foreground
                                hover:bg-muted/50
                                flex items-center gap-3
                                text-sm
                              `}
                              activeClassName={`
                                bg-primary/10 text-primary font-medium
                              `}
                            >
                              <item.icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
                              <span>{item.title}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/content/about-us"
                      className={`
                        px-3 py-3 justify-center rounded-xl transition-all duration-200
                        text-muted-foreground hover:text-foreground
                        hover:bg-muted/50 flex items-center
                      `}
                      activeClassName={`
                        bg-gradient-to-r from-primary/10 to-primary/5
                        text-primary border border-primary/20
                      `}
                    >
                      <FileText className={`h-5 w-5 ${isContentActive ? "text-primary" : ""}`} />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t border-border/50 bg-muted/30">
        {open ? (
          <div className="space-y-2 animate-fade-in">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">System Status</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-success font-semibold">Online</span>
              </div>
            </div>
            <div className="text-[10px] text-muted-foreground/70">
              v2.4.1 • © 2024 Toorrii
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
