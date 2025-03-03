
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import AppSidebar from "@/components/AppSidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, RefreshCw } from "lucide-react";

const Settings = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <AppSidebar />
      <div className="flex-1 overflow-y-auto px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
              <p className="text-lg text-gray-600">Customize your application preferences</p>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="p-8 bg-white/80 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">General Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Notifications</Label>
                    <p className="text-sm text-gray-600 mt-1">Receive paper generation updates</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white/80 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Paper Generation</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-base">Default Language</Label>
                  <Select defaultValue="english">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Default Difficulty</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Auto-Save Papers</Label>
                    <p className="text-sm text-gray-600 mt-1">Automatically save generated papers</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white/80 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Export Settings</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-base">Default Export Format</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="word">Word</SelectItem>
                      <SelectItem value="latex">LaTeX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Include Solutions</Label>
                    <p className="text-sm text-gray-600 mt-1">Export papers with solutions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline" className="px-6">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button className="px-6">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
