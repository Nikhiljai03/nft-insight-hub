
import React, { useState } from 'react';
import { UserProfile } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface UserProfileFormProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onCancel: () => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ profile, onSave, onCancel }) => {
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio || '');
  const [imageUrl, setImageUrl] = useState<string | null>(profile.imageUrl);
  const [previewUrl, setPreviewUrl] = useState<string | null>(profile.imageUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Basic validation
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image too large. Please select an image under 5MB.');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file.');
        return;
      }
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setPreviewUrl(event.target.result as string);
          setImageUrl(event.target.result as string); // Store base64 for now
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim().length < 3) {
      toast.error('Name must be at least 3 characters long');
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app with backend, this is where you'd upload the image to a server
    // For now, we'll just use the base64 data
    
    setTimeout(() => {
      const updatedProfile: UserProfile = {
        ...profile,
        name: name.trim(),
        bio: bio.trim(),
        imageUrl: imageUrl,
      };
      
      onSave(updatedProfile);
      toast.success('Profile updated successfully');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center space-y-2">
          <Avatar className="w-24 h-24 border-4 border-primary/20">
            {previewUrl ? (
              <AvatarImage src={previewUrl} alt={name} />
            ) : (
              <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/50 to-secondary/50">
                {name.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          
          <div className="relative">
            <Input
              type="file"
              id="profile-image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <Label 
              htmlFor="profile-image" 
              className="flex items-center justify-center px-3 py-1.5 bg-primary/10 hover:bg-primary/20 cursor-pointer rounded-md text-sm text-primary"
            >
              <Camera className="h-3.5 w-3.5 mr-1.5" />
              Change Image
            </Label>
          </div>
        </div>
        
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your display name"
              required
              minLength={3}
              maxLength={50}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">About Me</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a short bio about yourself..."
              maxLength={500}
              rows={3}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          <X className="h-4 w-4 mr-2" /> Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          <Check className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </div>
    </form>
  );
};

export default UserProfileForm;
