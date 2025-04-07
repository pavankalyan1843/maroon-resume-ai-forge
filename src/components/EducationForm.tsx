
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { GraduationCap, Calendar, Plus, Trash } from 'lucide-react';
import { useState } from 'react';

const EducationForm = () => {
  const { resume, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resume;
  const [expandedId, setExpandedId] = useState<string | null>(education[0]?.id || null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Handle adding education (Button onClick handler)
  const handleAddEducation = () => {
    addEducation();
  };

  return (
    <Card className="resume-section animate-fade-in">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-maroon-800 flex items-center">
          <GraduationCap className="h-5 w-5 mr-2" />
          Education
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleAddEducation}
          className="text-maroon-700 border-maroon-700 hover:bg-maroon-50"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Education
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {education.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <GraduationCap className="h-12 w-12 mx-auto mb-2 opacity-30" />
            <p>No education added yet.</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddEducation}
              className="mt-3 text-maroon-700 border-maroon-700 hover:bg-maroon-50"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Education
            </Button>
          </div>
        ) : (
          education.map((edu) => (
            <div key={edu.id} className="border rounded-md p-4 transition-all duration-300 hover:shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <div 
                  className="font-medium text-lg cursor-pointer flex items-center"
                  onClick={() => toggleExpanded(edu.id)}
                >
                  <span className="truncate max-w-[200px]">
                    {edu.degree || 'Degree'} in {edu.field || 'Field'} at {edu.institution || 'Institution'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleExpanded(edu.id)}
                    className="text-xs"
                  >
                    {expandedId === edu.id ? 'Collapse' : 'Expand'} 
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeEducation(edu.id)}
                    className="text-xs"
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {expandedId === edu.id && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                    <Input
                      id={`institution-${edu.id}`}
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                      className="maroon-input"
                      placeholder="University or School Name"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                      <Input
                        id={`degree-${edu.id}`}
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                        className="maroon-input"
                        placeholder="Bachelor's, Master's, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                      <Input
                        id={`field-${edu.id}`}
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                        className="maroon-input"
                        placeholder="Computer Science, Business, etc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <Input
                          id={`startDate-${edu.id}`}
                          type="month"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                          className="maroon-input"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`current-${edu.id}`} className="text-sm">
                            Current
                          </Label>
                          <Switch
                            id={`current-${edu.id}`}
                            checked={edu.current}
                            onCheckedChange={(checked) => updateEducation(edu.id, { current: checked })}
                          />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <Input
                          id={`endDate-${edu.id}`}
                          type="month"
                          disabled={edu.current}
                          value={edu.current ? 'Present' : edu.endDate}
                          onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                          className="maroon-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${edu.id}`}>Description (Optional)</Label>
                    <Textarea
                      id={`description-${edu.id}`}
                      value={edu.description || ''}
                      onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                      className="maroon-input"
                      placeholder="Describe notable achievements, relevant coursework, etc."
                    />
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

export default EducationForm;
