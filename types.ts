
export interface AnalysisResult {
  isHealthy: boolean;
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
}

export interface ExampleImage {
  id: string;
  url: string;
  alt: string;
}
