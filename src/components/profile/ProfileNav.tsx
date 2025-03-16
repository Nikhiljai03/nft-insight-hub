
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useWallet } from '@/contexts/WalletContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { UserProfile } from '@/types/user';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ProfileNav: React.FC = () => {
  const { wallet, disconnectWallet } = useWallet();
  const [userProfile] = useLocalStorage<UserProfile | null>('user-profile', null);

  if (!wallet) {
    return (
      <Button variant="outline" size="sm" asChild>
        <Link to="/wallet">
          <User className="h-4 w-4 mr-2" />
          Connect Wallet
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {userProfile?.imageUrl ? (
              <AvatarImage src={userProfile.imageUrl} alt={userProfile.name} />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-primary/50 to-secondary/50">
                {userProfile?.name?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userProfile?.name || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile">
            <User className="mr-2 h-4 w-4" />
            <span>My Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/wallet">
            <Settings className="mr-2 h-4 w-4" />
            <span>Wallet Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => disconnectWallet()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileNav;
