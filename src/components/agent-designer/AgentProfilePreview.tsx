
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AgentProfile, Tool } from "@/types/agent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Save, PlayCircle, X } from "lucide-react";

interface AgentProfilePreviewProps {
  profile: AgentProfile;
  onUpdate: (profile: AgentProfile) => void;
  onSave: () => void;
  onDeploy: () => void;
}

export const AgentProfilePreview = ({ 
  profile, 
  onUpdate,
  onSave,
  onDeploy
}: AgentProfilePreviewProps) => {
  const [newToolName, setNewToolName] = useState("");
  const [newToolDesc, setNewToolDesc] = useState("");
  
  const handleUpdateInstructions = (instructions: string) => {
    onUpdate({ ...profile, instructions });
  };

  const handleUpdateRole = (role: string) => {
    onUpdate({ ...profile, role });
  };

  const handleAddTool = () => {
    if (newToolName.trim() && newToolDesc.trim()) {
      const newTool: Tool = {
        name: newToolName,
        description: newToolDesc
      };
      
      onUpdate({
        ...profile,
        tools: [...profile.tools, newTool]
      });
      
      setNewToolName("");
      setNewToolDesc("");
    }
  };

  const handleRemoveTool = (index: number) => {
    const updatedTools = [...profile.tools];
    updatedTools.splice(index, 1);
    onUpdate({
      ...profile,
      tools: updatedTools
    });
  };

  if (!profile.role) {
    return (
      <Card className="h-full flex flex-col justify-center items-center p-6 text-center">
        <div className="text-muted-foreground">
          <p className="text-lg font-medium">No Agent Profile Generated</p>
          <p className="text-sm mt-2">
            Define a role and generate a profile to see preview here
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Agent Profile Preview</CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={onSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button size="sm" onClick={onDeploy}>
              <PlayCircle className="h-4 w-4 mr-2" />
              Deploy
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <Tabs defaultValue="preview" className="h-full flex flex-col">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-1">Role</h3>
                  <p className="text-lg font-medium">{profile.role}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold mb-1">Instructions</h3>
                  <div className="bg-muted p-3 rounded-md whitespace-pre-wrap">
                    {profile.instructions}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold mb-1">Tools ({profile.tools.length})</h3>
                  <div className="space-y-2">
                    {profile.tools.map((tool, index) => (
                      <div key={index} className="bg-muted p-3 rounded-md">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{tool.name}</Badge>
                        </div>
                        <p className="text-sm mt-1">{tool.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="edit" className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <Input 
                    value={profile.role} 
                    onChange={(e) => handleUpdateRole(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Instructions</label>
                  <Textarea 
                    value={profile.instructions} 
                    onChange={(e) => handleUpdateInstructions(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="tools" className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  {profile.tools.map((tool, index) => (
                    <div key={index} className="bg-muted p-3 rounded-md">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{tool.name}</Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveTool(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm mt-1">{tool.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="border rounded-md p-3 space-y-3">
                  <h3 className="text-sm font-medium">Add New Tool</h3>
                  <div>
                    <label className="text-xs">Tool Name</label>
                    <Input 
                      value={newToolName} 
                      onChange={(e) => setNewToolName(e.target.value)}
                      placeholder="e.g., Google Maps"
                    />
                  </div>
                  <div>
                    <label className="text-xs">Description</label>
                    <Textarea 
                      value={newToolDesc} 
                      onChange={(e) => setNewToolDesc(e.target.value)}
                      placeholder="e.g., For generating routes and locations"
                      className="min-h-[80px]"
                    />
                  </div>
                  <Button 
                    onClick={handleAddTool}
                    disabled={!newToolName.trim() || !newToolDesc.trim()}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tool
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
