
export interface TravelBuddyMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface TravelBuddy {
  id: string;
  name: string;
  avatar: string;
  description: string;
  model: string;
  systemPrompt: string;
}

export interface RecommendationRequest {
  dayNumber: number;
  city: string;
  type: "dining" | "attractions" | "events" | "adaptation";
  context: string;
}

export interface TravelBuddySelectorProps {
  onOpenChat?: () => void;
  isChatOpen?: boolean;
  setIsChatOpen?: (isOpen: boolean) => void;
}
