
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2 } from "lucide-react";

interface AgentDesignerFormProps {
  onGenerate: (roleDescription: string) => void;
  isGenerating: boolean;
}

export const AgentDesignerForm = ({ onGenerate, isGenerating }: AgentDesignerFormProps) => {
  const [roleDescription, setRoleDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roleDescription.trim()) {
      onGenerate(roleDescription);
    }
  };

  const exampleRoles = [
    "Hotel Concierge",
    "Customer Support Representative",
    "Technical Support Specialist",
    "Travel Advisor",
    "Financial Consultant"
  ];

  const handleUseExample = (example: string) => {
    setRoleDescription(example);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Define Agent Role</CardTitle>
        <CardDescription>
          Describe the role and responsibilities of your AI agent
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="role-description" className="text-sm font-medium">
                Role Description
              </label>
              <Textarea
                id="role-description"
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
                placeholder="e.g., Hotel concierge who assists guests with check-in, local recommendations, and special requests"
                className="min-h-[120px]"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Example Roles</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {exampleRoles.map((role) => (
                  <Button
                    key={role}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleUseExample(role)}
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-4"
            disabled={!roleDescription.trim() || isGenerating}
          >
            {isGenerating ? (
              <>Generating...</>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Agent Profile
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
