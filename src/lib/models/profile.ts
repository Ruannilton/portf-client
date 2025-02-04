export interface ProfileProject {
  id: number;
  name: string;
  brief: string;
  startDate: Date;
  endDate: Date | null;
  keys: string[];
}

export interface Profile {
  name: string;
  bio: string;
  projects: ProfileProject[];
  linkedIn: string | null;
  github: string;
  email: string;
}
