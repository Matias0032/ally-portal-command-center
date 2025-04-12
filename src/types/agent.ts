
export interface Tool {
  name: string;
  description: string;
}

export interface AgentProfile {
  role: string;
  instructions: string;
  tools: Tool[];
}
