
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AgentDesignerForm } from "@/components/agent-designer/AgentDesignerForm";
import { AgentProfilePreview } from "@/components/agent-designer/AgentProfilePreview";
import { AgentProfile } from "@/types/agent";

const initialProfile: AgentProfile = {
  role: "",
  instructions: "",
  tools: []
};

const AgentDesignerPage = () => {
  const { toast } = useToast();
  const [agentProfile, setAgentProfile] = useState<AgentProfile>(initialProfile);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateProfile = async (roleDescription: string) => {
    setIsGenerating(true);
    
    try {
      // In a real implementation, this would call an API
      // For demo purposes, we're simulating an API call with a timeout
      setTimeout(() => {
        const generatedProfile: AgentProfile = {
          role: roleDescription,
          instructions: `You are an AI Agent specialized in ${roleDescription}. Your purpose is to assist users with tasks related to ${roleDescription}. Maintain a professional and helpful tone. Always confirm key information before proceeding with requests. Protect user privacy and confidential information.`,
          tools: [
            {
              name: "Search",
              description: `For finding information related to ${roleDescription}`
            },
            {
              name: "Calendar",
              description: "For scheduling and managing appointments"
            }
          ]
        };
        
        setAgentProfile(generatedProfile);
        setIsGenerating(false);
        
        toast({
          title: "Agent Profile Generated",
          description: "Review and edit the profile before deployment",
        });
      }, 2000);
    } catch (error) {
      setIsGenerating(false);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating the agent profile.",
      });
    }
  };

  const handleSaveProfile = () => {
    // In a real implementation, this would save to a database
    toast({
      title: "Agent Profile Saved",
      description: "The agent profile has been saved successfully.",
    });
  };

  const handleDeployProfile = () => {
    // In a real implementation, this would deploy the agent
    toast({
      title: "Agent Deployed",
      description: "The agent has been deployed successfully.",
    });
  };

  const handleUpdateProfile = (updatedProfile: AgentProfile) => {
    setAgentProfile(updatedProfile);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Agent Designer</h1>
        <p className="text-muted-foreground mt-2">
          Create and configure AI agents for different roles and use cases
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AgentDesignerForm 
          onGenerate={handleGenerateProfile} 
          isGenerating={isGenerating}
        />
        
        <AgentProfilePreview 
          profile={agentProfile} 
          onUpdate={handleUpdateProfile}
          onSave={handleSaveProfile}
          onDeploy={handleDeployProfile}
        />
      </div>
    </div>
  );
};

export default AgentDesignerPage;
