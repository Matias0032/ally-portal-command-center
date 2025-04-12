
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AgentProfileCard } from "@/components/agent-designer/AgentProfileCard";
import { useToast } from "@/hooks/use-toast";
import { AgentProfile } from "@/types/agent";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for demonstration
const MOCK_AGENTS: AgentProfile[] = [
  {
    role: "Hotel Concierge",
    instructions: "You are an AI Agent specialized in acting as a digital concierge for a luxury hotel. Your purpose is to assist guests with check-ins, local recommendations, and special requests.",
    tools: [
      { name: "Maps", description: "For providing directions and location information" },
      { name: "Booking", description: "For managing reservations and special requests" },
      { name: "Weather", description: "For providing weather forecasts to guests" }
    ]
  },
  {
    role: "Customer Support Agent",
    instructions: "You are an AI Agent focused on providing customer support for an e-commerce platform. Help customers with order issues, returns, and product information.",
    tools: [
      { name: "OrderAPI", description: "For accessing and updating order information" },
      { name: "ProductCatalog", description: "For retrieving product details and availability" },
      { name: "ReturnProcess", description: "For initiating and tracking return requests" }
    ]
  },
  {
    role: "Technical Support Specialist",
    instructions: "You are an AI Agent specialized in technical support for a software company. Help users troubleshoot issues, provide step-by-step instructions, and escalate when necessary.",
    tools: [
      { name: "KnowledgeBase", description: "For accessing technical documentation" },
      { name: "TicketSystem", description: "For creating and updating support tickets" },
      { name: "DiagnosticTool", description: "For running diagnostic checks on user systems" }
    ]
  }
];

const AgentLibraryPage = () => {
  const [agents, setAgents] = useState<AgentProfile[]>(MOCK_AGENTS);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDeleteAgent = (index: number) => {
    const updatedAgents = [...agents];
    updatedAgents.splice(index, 1);
    setAgents(updatedAgents);
    
    toast({
      title: "Agent Deleted",
      description: "The agent profile has been removed from your library",
    });
  };

  const handleEditAgent = (index: number) => {
    // In a real implementation, this would navigate to the edit page with the agent ID
    // For now, we'll just simulate with a toast
    toast({
      title: "Edit Agent",
      description: "Navigating to edit agent profile...",
    });
    navigate("/agent-designer");
  };

  const handleDeployAgent = (index: number) => {
    toast({
      title: "Agent Deployed",
      description: "The agent has been successfully deployed",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Agent Library</h1>
          <p className="text-muted-foreground mt-2">
            Browse and manage your collection of AI agent profiles
          </p>
        </div>
        <Button onClick={() => navigate("/agent-designer")}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Agent
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent, index) => (
          <AgentProfileCard
            key={index}
            profile={agent}
            onEdit={() => handleEditAgent(index)}
            onDelete={() => handleDeleteAgent(index)}
            onDeploy={() => handleDeployAgent(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentLibraryPage;
