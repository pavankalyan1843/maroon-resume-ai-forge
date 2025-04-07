
import { createContext, useContext, useState, ReactNode } from 'react';
import { Resume, Experience, Education, Skill, SkillCategory } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

interface ResumeContextType {
  resume: Resume;
  updatePersonalInfo: (info: Partial<Resume['personalInfo']>) => void;
  addExperience: () => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkillCategory: () => void;
  updateSkillCategory: (id: string, name: string) => void;
  removeSkillCategory: (id: string) => void;
  addSkill: (categoryId: string) => void;
  updateSkill: (categoryId: string, skillId: string, skill: Partial<Skill>) => void;
  removeSkill: (categoryId: string, skillId: string) => void;
  enhanceResume: () => void;
}

const initialResume: Resume = {
  personalInfo: {
    fullName: 'Your Name',
    email: 'email@example.com',
    phone: '(123) 456-7890',
    location: 'City, State',
    title: 'Professional Title',
    summary: 'Professional summary highlighting your experience and expertise.',
    linkedin: '',
    website: '',
  },
  experiences: [
    {
      id: uuidv4(),
      company: 'Company Name',
      position: 'Job Title',
      startDate: '2020-01',
      endDate: '',
      current: true,
      description: 'Description of your responsibilities and achievements.',
      achievements: ['Achievement 1', 'Achievement 2'],
    },
  ],
  education: [
    {
      id: uuidv4(),
      institution: 'University Name',
      degree: 'Degree',
      field: 'Field of Study',
      startDate: '2016-09',
      endDate: '2020-05',
      current: false,
      description: '',
    },
  ],
  skillCategories: [
    {
      id: uuidv4(),
      name: 'Technical Skills',
      skills: [
        { id: uuidv4(), name: 'Skill 1', level: 4 },
        { id: uuidv4(), name: 'Skill 2', level: 3 },
      ],
    },
  ],
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resume, setResume] = useState<Resume>(initialResume);

  const updatePersonalInfo = (info: Partial<Resume['personalInfo']>) => {
    setResume((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: uuidv4(),
      company: 'New Company',
      position: 'Position',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [''],
    };

    setResume((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
    }));
  };

  const updateExperience = (id: string, experience: Partial<Experience>) => {
    setResume((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...experience } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResume((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: uuidv4(),
      institution: 'New Institution',
      degree: 'Degree',
      field: 'Field of Study',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };

    setResume((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const updateEducation = (id: string, education: Partial<Education>) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, ...education } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addSkillCategory = () => {
    const newCategory: SkillCategory = {
      id: uuidv4(),
      name: 'New Category',
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
      skillCategories: prev.skillCategories.map((cat) =>
        cat.id === id ? { ...cat, name } : cat
      ),
    }));
  };

  const removeSkillCategory = (id: string) => {
    setResume((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.filter((cat) => cat.id !== id),
    }));
  };

  const addSkill = (categoryId: string) => {
    const newSkill: Skill = {
      id: uuidv4(),
      name: 'New Skill',
      level: 3,
    };

    setResume((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, skills: [...cat.skills, newSkill] }
          : cat
      ),
    }));
  };

  const updateSkill = (categoryId: string, skillId: string, skill: Partial<Skill>) => {
    setResume((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              skills: cat.skills.map((s) =>
                s.id === skillId ? { ...s, ...skill } : s
              ),
            }
          : cat
      ),
    }));
  };

  const removeSkill = (categoryId: string, skillId: string) => {
    setResume((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              skills: cat.skills.filter((s) => s.id !== skillId),
            }
          : cat
      ),
    }));
  };

  // Simulate AI enhancement
  const enhanceResume = () => {
    // In a real app, this would call the Python backend
    // For now, we'll just simulate with some improvements
    const enhancedResume = { ...resume };
    
    // Enhance summary
    if (enhancedResume.personalInfo.summary) {
      enhancedResume.personalInfo.summary = enhancedResume.personalInfo.summary
        .replace(/experienced/i, 'seasoned')
        .replace(/good/i, 'excellent')
        .replace(/worked on/i, 'successfully delivered')
        .replace(/help/i, 'drive impact and contribute to');
    }
    
    // Add random score
    enhancedResume.enhancementScore = Math.floor(Math.random() * 30) + 70;
    
    // Enhance experience descriptions
    enhancedResume.experiences = enhancedResume.experiences.map(exp => {
      const description = exp.description
        .replace(/led/i, 'spearheaded')
        .replace(/created/i, 'designed and implemented')
        .replace(/improved/i, 'optimized')
        .replace(/managed/i, 'orchestrated');
      
      return {
        ...exp,
        description
      };
    });
    
    setResume(enhancedResume);
  };

  return (
    <ResumeContext.Provider
      value={{
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
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
