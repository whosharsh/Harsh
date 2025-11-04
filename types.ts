export interface AnalysisResult {
  isHealthy: boolean;
  plantName: string;
  diseaseName: string | null;
  description: string;
  treatment: string | null;
  safetyWarning: string | null;
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