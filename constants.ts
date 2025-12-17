import { ShareOption } from './types';

export const CAMPAIGN_URL = "https://www.childmarriagefree.world/100daysofaction/overview"; // Updated campaign URL

export const SHARE_OPTIONS: ShareOption[] = [
  {
    id: 'opt_1',
    title: 'Pledge Card',
    imageUrl: "https://static.wixstatic.com/media/27613d_7486c78cd7974b5c95a7e8f6f973ce41~mv2.jpg",
    defaultCaption: "I have taken the pledge to end child marriage. Every child deserves a future. Join me and take action today! #WePledge #EndChildMarriage",
    posterType: 'card',
    posterText: "I have taken the pledge",
    subText: "to End Child Marriage",
    hashtag: "#WePledge"
  },
  {
    id: 'opt_2',
    title: 'Movement',
    imageUrl: "https://static.wixstatic.com/media/27613d_372a725bab0946fdb5ae712b7aa4b323~mv2.jpg",
    defaultCaption: "I have joined the movement to protect children's rights. Together we can make a difference in millions of lives. #WePledge #100DaysOfAction",
    posterType: 'text-only',
    posterText: "I have joined the movement",
    hashtag: "#WePledge"
  },
  {
    id: 'opt_3',
    title: 'Question',
    imageUrl: "https://static.wixstatic.com/media/27613d_54265883c62348deb1de084393f064cc~mv2.jpg",
    defaultCaption: "I have taken the pledge to stop child marriage. Have you? It takes all of us to create change. #100DaysOfAction #WePledge",
    posterType: 'overlay',
    posterText: "I have taken the pledge. Have you?",
    subText: "Join us in #100DaysOfAction",
    hashtag: "Child Marriage Free World"
  }
];