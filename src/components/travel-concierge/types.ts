
export interface TravelConciergeMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface TravelConcierge {
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

export interface TravelConciergeSelectorProps {
  onOpenChat?: () => void;
  isChatOpen?: boolean;
  setIsChatOpen?: (isOpen: boolean) => void;
}
