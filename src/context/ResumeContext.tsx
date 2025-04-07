import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Resume, Experience, Education, SkillCategory, Skill, TemplateStyles } from '@/types/resume';

// Default empty resume data
const defaultResume: Resume = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    summary: '',
  },
  experiences: [],
  education: [],
  skillCategories: [],
  template: 'classic',
  templateStyles: {
    headerClass: 'bg-maroon-700',
    accentClass: 'text-maroon-800 border-maroon-200',
    skillClass: 'bg-maroon-600'
  },
  enhancementScore: null,
};

// Create default empty objects for add functions
const emptyExperience: Omit<Experience, 'id'> = {
  company: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
  achievements: []
};

const emptyEducation: Omit<Education, 'id'> = {
  institution: '',
  degree: '',
  field: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: ''
};

const emptySkill: Omit<Skill, 'id'> = {
  name: '',
  level: 1
};

// Context interface
interface ResumeContextType {
  resume: Resume;
  updatePersonalInfo: (info: Partial<Resume['personalInfo']>) => void;
  addExperience: (exp?: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<Omit<Experience, 'id'>>) => void;
  removeExperience: (id: string) => void;
  addEducation: (edu?: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, edu: Partial<Omit<Education, 'id'>>) => void;
  removeEducation: (id: string) => void;
  addSkillCategory: (name?: string) => void;
  updateSkillCategory: (id: string, name: string) => void;
  removeSkillCategory: (id: string) => void;
  addSkill: (categoryId: string, skill?: Omit<Skill, 'id'>) => void;
  updateSkill: (categoryId: string, skillId: string, skill: Partial<Omit<Skill, 'id'>>) => void;
  removeSkill: (categoryId: string, skillId: string) => void;
  enhanceResume: () => void;
  updateResumeTemplate: (template: string, styles: TemplateStyles) => void;
}

// Create context with default value
const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Resume provider component
export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resume, setResume] = useState<Resume>(() => {
    // Try to load from localStorage if available
    const savedResume = localStorage.getItem('resume');
    return savedResume ? JSON.parse(savedResume) : defaultResume;
  });

  // Save to localStorage whenever resume changes
  React.useEffect(() => {
    localStorage.setItem('resume', JSON.stringify(resume));
  }, [resume]);

  // Update personal info
  const updatePersonalInfo = (info: Partial<Resume['personalInfo']>) => {
    setResume((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  // Experience methods
  const addExperience = (exp?: Omit<Experience, 'id'>) => {
    const newExp: Experience = { 
      ...emptyExperience, 
      ...(exp || {}), 
      id: uuidv4() 
    };
    
    setResume((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExp],
    }));
  };

  const updateExperience = (id: string, exp: Partial<Omit<Experience, 'id'>>) => {
    setResume((prev) => ({
      ...prev,
      experiences: prev.experiences.map((item) =>
        item.id === id ? { ...item, ...exp } : item
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResume((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((item) => item.id !== id),
    }));
  };

  // Education methods
  const addEducation = (edu?: Omit<Education, 'id'>) => {
    const newEdu: Education = { 
      ...emptyEducation, 
      ...(edu || {}), 
      id: uuidv4() 
    };
    
    setResume((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (id: string, edu: Partial<Omit<Education, 'id'>>) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((item) =>
        item.id === id ? { ...item, ...edu } : item
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  // Skills methods
  const addSkillCategory = (name?: string) => {
    const newCategory: SkillCategory = {
      id: uuidv4(),
      name: name || 'New Category',
      skills: [],
    };
    setResume((prev) => ({
      ...prev,
      skillCategories: [...prev.skillCategories, newCategory],
    }));
  };

  const updateSkillCategory = (id: string, name: string) => {
    setResume((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((category) =>
        category.id === id ? { ...category, name } : category
      ),
    }));
  };

  const removeSkillCategory = (id: string) => {
    setResume((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.filter((category) => category.id !== id),
    }));
  };

  const addSkill = (categoryId: string, skill?: Omit<Skill, 'id'>) => {
    const newSkill: Skill = { 
      ...emptySkill, 
      ...(skill || {}), 
      id: uuidv4() 
    };
    
    setResume((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((category) =>
        category.id === categoryId
          ? { ...category, skills: [...category.skills, newSkill] }
          : category
      ),
    }));
  };

  const updateSkill = (
    categoryId: string,
    skillId: string,
    skill: Partial<Omit<Skill, 'id'>>
  ) => {
    setResume((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              skills: category.skills.map((s) =>
                s.id === skillId ? { ...s, ...skill } : s
              ),
            }
          : category
      ),
    }));
  };

  const removeSkill = (categoryId: string, skillId: string) => {
    setResume((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              skills: category.skills.filter((s) => s.id !== skillId),
            }
          : category
      ),
    }));
  };

  // Update resume template and its styles
  const updateResumeTemplate = (template: string, styles: TemplateStyles) => {
    setResume((prev) => ({
      ...prev,
      template,
      templateStyles: styles,
    }));
  };

  // Enhance resume with AI (simulated)
  const enhanceResume = () => {
    setResume((prev) => {
      // Make a deep copy to avoid modifying state directly
      const newResume = JSON.parse(JSON.stringify(prev));
      
      // Enhance experiences
      newResume.experiences = newResume.experiences.map((exp: Experience) => {
        // Improve description if exists
        if (exp.description) {
          exp.description = improveText(exp.description);
        }
        
        // Improve achievements
        exp.achievements = exp.achievements.map((achievement: string) => 
          achievement ? improveAchievement(achievement) : achievement
        );
        
        return exp;
      });
      
      // Enhance summary if exists
      if (newResume.personalInfo.summary) {
        newResume.personalInfo.summary = improveText(newResume.personalInfo.summary);
      }
      
      // Set a random enhancement score between 80-95
      newResume.enhancementScore = Math.floor(Math.random() * 16) + 80;
      
      return newResume;
    });
  };
  
  // Helper function to improve text (simple simulation)
  const improveText = (text: string): string => {
    // Example of simple improvements
    const improvements: Record<string, string> = {
      'responsible for': 'led',
      'worked on': 'developed',
      'helped': 'contributed to',
      'did': 'executed',
      'made': 'created',
      'good': 'excellent',
      'improved': 'optimized',
      'managed': 'orchestrated',
    };
    
    let improvedText = text;
    Object.entries(improvements).forEach(([original, improved]) => {
      const regex = new RegExp(`\\b${original}\\b`, 'gi');
      improvedText = improvedText.replace(regex, improved);
    });
    
    return improvedText;
  };
  
  // Helper function to improve achievements
  const improveAchievement = (achievement: string): string => {
    // Add quantifiable results or action verbs if not present
    if (!achievement.match(/^[A-Z][a-z]+ed|^[A-Z][a-z]+d/)) {
      const actionVerbs = ['Implemented', 'Developed', 'Launched', 'Spearheaded', 'Achieved', 'Increased', 'Reduced'];
      const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
      achievement = `${randomVerb} ${achievement.charAt(0).toLowerCase() + achievement.slice(1)}`;
    }
    
    return achievement;
  };

  // Provide context value
  const value: ResumeContextType = {
    resume,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkillCategory,
    updateSkillCategory,
    removeSkillCategory,
    addSkill,
    updateSkill,
    removeSkill,
    enhanceResume,
    updateResumeTemplate,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};

// Custom hook to use the resume context
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
