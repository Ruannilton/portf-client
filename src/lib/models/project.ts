export interface Project {
  id: number;
  name: string;
  brief: string;
  userId: string;
  description: string | null;
  repository_link: string | null;
  startDate: Date | null;
  endDate: Date | null;
  keys: string[];
}
