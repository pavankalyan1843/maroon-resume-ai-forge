
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  linkedin?: string;
  website?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Resume {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skillCategories: SkillCategory[];
  enhancementScore?: number;
}
