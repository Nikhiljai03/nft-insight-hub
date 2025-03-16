import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useWallet } from '@/contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import UserProfileForm from '@/components/profile/UserProfileForm';
import UserProfileDisplay from '@/components/profile/UserProfileDisplay';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/types/user';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const ProfilePage: React.FC = () => {
  const { wallet } = useWallet();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile | null>(
    'user-profile',
    null
  );

  // Check if user is connected with wallet
  useEffect(() => {
    if (userProfile && !wallet) {
      // If user has a profile but wallet is disconnected, 
      // keep profile data but show reconnect message
    } else if (!userProfile && wallet) {
      // If wallet is connected but no profile, create basic profile
      setUserProfile({
        id: wallet.address,
        name: `User_${wallet.address.substring(2, 8)}`,
        bio: 'NFT enthusiast',
        imageUrl: null, // Default no image
        walletAddress: wallet.address,
        createdAt: new Date().toISOString(),
      });
    }
  }, [wallet, userProfile, setUserProfile]);

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setUserProfile({
      ...updatedProfile,
      id: userProfile?.id || wallet?.address || '',
      walletAddress: wallet?.address || userProfile?.walletAddress || '',
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  if (!wallet) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow py-16">
          <div className="container max-w-6xl mx-auto px-4">
            <SectionHeading 
              eyebrow="Account" 
              title="User Profile" 
              subtitle="Connect your wallet to create or view your profile"
              gradient
            />
            <GlassCard className="my-8">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Wallet Not Connected</AlertTitle>
                <AlertDescription className="space-y-4">
                  <p>You need to connect your wallet to view or edit your profile.</p>
                  <Button onClick={() => navigate('/wallet')}>
                    Connect Wallet
                  </Button>
                </AlertDescription>
              </Alert>
            </GlassCard>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeading 
            eyebrow="Account" 
            title="User Profile" 
            subtitle="Customize how you appear on NFT Insight Hub"
            gradient
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <GlassCard>
                {isEditing ? (
                  <UserProfileForm 
                    profile={userProfile!}
                    onSave={handleProfileUpdate}
                    onCancel={() => setIsEditing(false)}
                  />
                ) : (
                  <UserProfileDisplay 
                    profile={userProfile!}
                    onEdit={() => setIsEditing(true)}
                  />
                )}
              </GlassCard>
            </div>
            <div>
              <GlassCard className="h-full">
                <h3 className="text-lg font-bold mb-4">Profile Information</h3>
                <div className="space-y-4 text-sm">
                  <p>
                    Your profile is connected to your Ethereum wallet address. This helps us
                    provide you with a personalized experience while exploring NFTs.
                  </p>
                  <p>
                    <strong>Unique ID:</strong> Your wallet address serves as your unique identifier 
                    on our platform.
                  </p>
                  <p>
                    <strong>Username:</strong> Choose a unique name to identify yourself on 
                    the platform.
                  </p>
                  <p>
                    <strong>Profile Image:</strong> Upload an image or select an NFT you own to 
                    represent yourself.
                  </p>
                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      Profile created: {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleString() : 'N/A'}
                    </p>
                    {userProfile?.updatedAt && (
                      <p className="text-xs text-muted-foreground">
                        Last updated: {new Date(userProfile.updatedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
