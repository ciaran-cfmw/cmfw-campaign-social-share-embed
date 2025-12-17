export interface ShareOption {
  id: string;
  title: string;
  imageUrl: string;
  defaultCaption: string;
  posterType: 'card' | 'text-only' | 'overlay';
  posterText: string;
  subText?: string;
  hashtag: string;
}

export type SocialPlatform = 'facebook' | 'twitter' | 'linkedin' | 'instagram';