export interface Story {
    id?: number;
    title: string;
    content: string;
    latitude: number;
    longitude: number;
    location_name: string;
    theme: string;
    author: string;
    points: number;
    created_at?: string;
  }
  
  export interface User {
    id?: number;
    username: string;
    total_points: number;
    stories_count: number;
  }
  
  export interface GenerateRequest {
    theme: string;
    location: string;
    language: string;
  }