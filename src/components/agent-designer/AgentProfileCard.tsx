
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AgentProfile } from "@/types/agent";
import { Edit, PlayCircle, Trash2 } from "lucide-react";

interface AgentProfileCardProps {
  profile: AgentProfile;
  onEdit: () => void;
  onDelete: () => void;
  onDeploy: () => void;
}

export const AgentProfileCard = ({ 
  profile, 
  onEdit, 
  onDelete, 
  onDeploy 
}: AgentProfileCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="truncate">{profile.role}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1">Instructions</p>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {profile.instructions}
          </p>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-1">Tools</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {profile.tools.slice(0, 3).map((tool, index) => (
              <Badge key={index} variant="outline">
                {tool.name}
              </Badge>
            ))}
            {profile.tools.length > 3 && (
              <Badge variant="outline">+{profile.tools.length - 3} more</Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <Button size="sm" onClick={onDeploy}>
          <PlayCircle className="h-4 w-4 mr-2" />
          Deploy
        </Button>
      </CardFooter>
    </Card>
  );
};
