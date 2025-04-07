
// Type for template styles
export interface TemplateStyles {
  headerClass: string;
  accentClass: string;
  skillClass: string;
}

// Personal information section
export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  summary: string;
}

// Experience section
export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

// Education section
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

// Skills section
export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5 scale
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

// Full resume type
export interface Resume {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skillCategories: SkillCategory[];
  template: string;
  templateStyles?: TemplateStyles;
  enhancementScore: number | null;
}
