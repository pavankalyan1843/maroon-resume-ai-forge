
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import AIEnhancer from './AIEnhancer';
import { useIsMobile } from '@/hooks/use-mobile';
import { User, Briefcase, GraduationCap, Brain, Sparkles } from 'lucide-react';

const ResumeEditor = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const isMobile = useIsMobile();
  
  const tabs = [
    { id: 'personal', label: 'Personal', icon: User, component: <PersonalInfoForm /> },
    { id: 'experience', label: 'Experience', icon: Briefcase, component: <ExperienceForm /> },
    { id: 'education', label: 'Education', icon: GraduationCap, component: <EducationForm /> },
    { id: 'skills', label: 'Skills', icon: Brain, component: <SkillsForm /> },
    { id: 'enhance', label: 'AI Enhance', icon: Sparkles, component: <AIEnhancer /> },
  ];

  return (
    <Tabs 
      defaultValue="personal" 
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="w-full flex justify-between mb-4 bg-gray-100 p-1 rounded-md">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          
          return (
            <TabsTrigger 
              key={tab.id}
              value={tab.id} 
              className={`flex items-center flex-1 
                ${activeTab === tab.id ? 'bg-white text-maroon-700 shadow' : 'text-gray-600'}
                transition-all duration-200 rounded-md data-[state=active]:text-maroon-700`
              }
            >
              <Icon className="h-4 w-4 mr-2" />
              {!isMobile && tab.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
      
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="space-y-4 animate-fade-in focus-visible:outline-none focus-visible:ring-0">
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ResumeEditor;
