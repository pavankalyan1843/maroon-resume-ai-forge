
import { useResume } from '@/context/ResumeContext';
import { Card } from '@/components/ui/card';
import { 
  FileText, Mail, Phone, MapPin, 
  Globe, Linkedin, Calendar, Award, 
  BookOpen, Briefcase 
} from 'lucide-react';
import { motion } from 'framer-motion';

const ResumePreview = () => {
  const { resume } = useResume();
  const { personalInfo, experiences, education, skillCategories, templateStyles } = resume;
  
  // Format date to display in more readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  // Get display of date range
  const getDateRange = (startDate: string, endDate: string, current: boolean) => {
    const start = formatDate(startDate);
    const end = current ? 'Present' : formatDate(endDate);
    
    if (!start) return '';
    if (!end && !current) return start;
    
    return `${start} - ${end}`;
  };

  // Determine template styles to use (default to classic if none set)
  const headerClass = templateStyles?.headerClass || 'bg-maroon-700';
  const accentClass = templateStyles?.accentClass || 'text-maroon-800 border-maroon-200';
  const skillClass = templateStyles?.skillClass || 'bg-maroon-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="resume-preview-card shadow-lg w-full max-w-[800px] mx-auto bg-white overflow-hidden">
        <div className={`p-8 ${headerClass} text-white`}>
          <h1 className="text-3xl font-bold mb-1">{personalInfo.fullName}</h1>
          <h2 className="text-xl opacity-90 mb-4">{personalInfo.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm opacity-85">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{personalInfo.website}</span>
              </div>
            )}
            
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-8">
          {personalInfo.summary && (
            <div className="mb-6">
              <h3 className={`text-lg font-bold border-b pb-1 mb-3 flex items-center ${accentClass}`}>
                <FileText className="h-5 w-5 mr-2" />
                Professional Summary
              </h3>
              <p className="text-gray-700">{personalInfo.summary}</p>
            </div>
          )}
          
          {experiences.length > 0 && (
            <div className="mb-6">
              <h3 className={`text-lg font-bold border-b pb-1 mb-3 flex items-center ${accentClass}`}>
                <Briefcase className="h-5 w-5 mr-2" />
                Work Experience
              </h3>
              
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <motion.div 
                    key={exp.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                      <div>
                        <h4 className="font-bold text-gray-800">{exp.position}</h4>
                        <div className={accentClass.split(' ')[0]}>{exp.company}</div>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {getDateRange(exp.startDate, exp.endDate, exp.current)}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">{exp.description}</p>
                    
                    {exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-sm text-gray-700 pl-1">
                        {exp.achievements.filter(a => a.trim()).map((achievement, i) => (
                          <li key={i} className="mb-1">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {education.length > 0 && (
            <div className="mb-6">
              <h3 className={`text-lg font-bold border-b pb-1 mb-3 flex items-center ${accentClass}`}>
                <BookOpen className="h-5 w-5 mr-2" />
                Education
              </h3>
              
              <div className="space-y-4">
                {education.map((edu) => (
                  <motion.div 
                    key={edu.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                      <div>
                        <h4 className="font-bold text-gray-800">{edu.degree} in {edu.field}</h4>
                        <div className={accentClass.split(' ')[0]}>{edu.institution}</div>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {getDateRange(edu.startDate, edu.endDate, edu.current)}
                      </div>
                    </div>
                    
                    {edu.description && (
                      <p className="text-sm text-gray-700">{edu.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {skillCategories.length > 0 && (
            <div>
              <h3 className={`text-lg font-bold border-b pb-1 mb-3 flex items-center ${accentClass}`}>
                <Award className="h-5 w-5 mr-2" />
                Skills
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillCategories.map((category) => (
                  <motion.div 
                    key={category.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="mb-2"
                  >
                    <h4 className="font-bold text-gray-800 mb-2">{category.name}</h4>
                    
                    <div className="space-y-2">
                      {category.skills.map((skill) => (
                        <div key={skill.id} className="flex items-center">
                          <div className="flex-1 text-gray-700">{skill.name}</div>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div 
                                key={i} 
                                className={`h-2 w-2 rounded-full ${
                                  i < skill.level 
                                    ? skillClass
                                    : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ResumePreview;
