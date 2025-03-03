
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  FileText,
  Settings,
  BookTemplate,
  History,
  BookOpen,
  Home,
  Menu,
} from "lucide-react";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleSidebar } = useSidebar();

  const menuItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/question-papers", icon: FileText, label: "Question Papers" },
    { path: "/templates", icon: BookTemplate, label: "Templates" },
    { path: "/recent-papers", icon: History, label: "Recent Papers" },
    { path: "/question-bank", icon: BookOpen, label: "Question Bank" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <Sidebar>
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-bold">Math Paper Pro</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuButton
                key={item.path}
                asChild
                data-active={location.pathname === item.path}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </SidebarMenuButton>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
