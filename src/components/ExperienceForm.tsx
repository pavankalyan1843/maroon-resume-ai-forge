
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Briefcase, Calendar, Plus, Trash, ListPlus } from 'lucide-react';
import { useState } from 'react';

const ExperienceForm = () => {
  const { resume, addExperience, updateExperience, removeExperience } = useResume();
  const { experiences } = resume;
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Handle adding experience (Button onClick handler)
  const handleAddExperience = () => {
    addExperience();
  };

  const handleAddAchievement = (experienceId: string) => {
    const experience = experiences.find(exp => exp.id === experienceId);
    if (!experience) return;
    
    updateExperience(experienceId, {
      achievements: [...experience.achievements, '']
    });
  };

  const handleUpdateAchievement = (expId: string, index: number, value: string) => {
    const experience = experiences.find(exp => exp.id === expId);
    if (!experience) return;
    
    const newAchievements = [...experience.achievements];
    newAchievements[index] = value;
    
    updateExperience(expId, {
      achievements: newAchievements
    });
  };

  const handleRemoveAchievement = (expId: string, index: number) => {
    const experience = experiences.find(exp => exp.id === expId);
    if (!experience) return;
    
    const newAchievements = [...experience.achievements];
    newAchievements.splice(index, 1);
    
    updateExperience(expId, {
      achievements: newAchievements
    });
  };

  return (
    <Card className="resume-section animate-fade-in">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-maroon-800 flex items-center">
          <Briefcase className="h-5 w-5 mr-2" />
          Work Experience
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleAddExperience}
          className="text-maroon-700 border-maroon-700 hover:bg-maroon-50"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Experience
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {experiences.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <Briefcase className="h-12 w-12 mx-auto mb-2 opacity-30" />
            <p>No work experience added yet.</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddExperience}
              className="mt-3 text-maroon-700 border-maroon-700 hover:bg-maroon-50"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Experience
            </Button>
          </div>
        ) : (
          experiences.map((experience, index) => (
            <div key={experience.id} className="border rounded-md p-4 transition-all duration-300 hover:shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <div 
                  className="font-medium text-lg cursor-pointer flex items-center"
                  onClick={() => toggleExpanded(experience.id)}
                >
                  <span className="truncate max-w-[200px]">
                    {experience.position || 'Position'} at {experience.company || 'Company'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleExpanded(experience.id)}
                    className="text-xs"
                  >
                    {expandedId === experience.id ? 'Collapse' : 'Expand'} 
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeExperience(experience.id)}
                    className="text-xs"
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {expandedId === experience.id && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`company-${experience.id}`}>Company</Label>
                      <Input
                        id={`company-${experience.id}`}
                        value={experience.company}
                        onChange={(e) => updateExperience(experience.id, { company: e.target.value })}
                        className="maroon-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`position-${experience.id}`}>Position</Label>
                      <Input
                        id={`position-${experience.id}`}
                        value={experience.position}
                        onChange={(e) => updateExperience(experience.id, { position: e.target.value })}
                        className="maroon-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <Input
                          id={`startDate-${experience.id}`}
                          type="month"
                          value={experience.startDate}
                          onChange={(e) => updateExperience(experience.id, { startDate: e.target.value })}
                          className="maroon-input"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`current-${experience.id}`} className="text-sm">
                            Current
                          </Label>
                          <Switch
                            id={`current-${experience.id}`}
                            checked={experience.current}
                            onCheckedChange={(checked) => updateExperience(experience.id, { current: checked })}
                          />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <Input
                          id={`endDate-${experience.id}`}
                          type="month"
                          disabled={experience.current}
                          value={experience.current ? 'Present' : experience.endDate}
                          onChange={(e) => updateExperience(experience.id, { endDate: e.target.value })}
                          className="maroon-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${experience.id}`}>Job Description</Label>
                    <Textarea
                      id={`description-${experience.id}`}
                      value={experience.description}
                      onChange={(e) => updateExperience(experience.id, { description: e.target.value })}
                      className="maroon-input min-h-[100px]"
                      placeholder="Describe your responsibilities and role..."
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-1">
                      <Label>Key Achievements</Label>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleAddAchievement(experience.id)}
                        className="text-maroon-700 hover:text-maroon-800 hover:bg-maroon-50"
                      >
                        <ListPlus className="h-4 w-4 mr-1" /> Add Achievement
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {experience.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Input
                            value={achievement}
                            onChange={(e) => handleUpdateAchievement(experience.id, i, e.target.value)}
                            className="maroon-input"
                            placeholder={`Achievement ${i + 1}`}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveAchievement(experience.id, i)}
                            className="h-9 w-9 text-maroon-500 hover:text-maroon-700 hover:bg-maroon-50"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {experience.achievements.length === 0 && (
                        <div className="text-center py-2 text-gray-400 border border-dashed rounded-md">
                          <p className="text-sm">Add achievements to highlight your impact</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceForm;
