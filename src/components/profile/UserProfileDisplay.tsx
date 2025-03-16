
import React from 'react';
import { UserProfile } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, User } from 'lucide-react';
import blockchainUtils from '@/utils/blockchainUtils';

interface UserProfileDisplayProps {
  profile: UserProfile;
  onEdit: () => void;
}

const UserProfileDisplay: React.FC<UserProfileDisplayProps> = ({ profile, onEdit }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <Avatar className="w-24 h-24 border-4 border-primary/20">
          {profile.imageUrl ? (
            <AvatarImage src={profile.imageUrl} alt={profile.name} />
          ) : (
            <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/50 to-secondary/50">
              {profile.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          {profile.bio && <p className="text-muted-foreground mt-1">{profile.bio}</p>}
          <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            <span>{blockchainUtils.formatAddress(profile.walletAddress)}</span>
          </div>
        </div>
        
        <Button onClick={onEdit} className="shrink-0">
          <Edit className="h-4 w-4 mr-2" /> Edit Profile
        </Button>
      </div>
      
      <Card className="p-6 bg-background/50 border-dashed">
        <h3 className="text-lg font-semibold mb-2">About Me</h3>
        <p className="text-muted-foreground">
          {profile.bio || "No bio yet. Click Edit Profile to add some information about yourself."}
        </p>
      </Card>
      
      <div className="bg-secondary/10 p-4 rounded-lg text-sm">
        <p className="font-medium mb-1">Unique Identifier</p>
        <p className="text-muted-foreground break-all font-mono">{profile.id}</p>
      </div>
    </div>
  );
};

export default UserProfileDisplay;
