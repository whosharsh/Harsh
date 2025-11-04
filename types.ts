
export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface AnalysisResult {
  isHealthy: boolean;
  plantName: string;
  diseaseName: string | null;
  description: string;
  treatment: string | null;
  safetyWarning: string | null;
  confidenceScore?: number;
  sources?: GroundingChunk[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface HistoryItem {
    id: string;
    timestamp: string;
    result: AnalysisResult;
    imageSrc: string;
}

export interface User {
    name: string;
    email: string;
    mobile?: string;
}

export interface EducationalContent {
    name: string;
    scientificName: string;
    description: string;
    prevention: string;
    image: string;
}
