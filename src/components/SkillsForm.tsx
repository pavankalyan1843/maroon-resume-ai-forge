
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Brain, Plus, Trash, Edit2, Check, X } from 'lucide-react';
import { useState } from 'react';

const SkillsForm = () => {
  const { 
    resume, 
    addSkillCategory, 
    updateSkillCategory, 
    removeSkillCategory, 
    addSkill, 
    updateSkill, 
    removeSkill 
  } = useResume();
  const { skillCategories } = resume;
  
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');
  
  // Handle adding skill category
  const handleAddSkillCategory = () => {
    addSkillCategory();
  };
  
  // Handle adding skill to a category
  const handleAddSkill = (categoryId: string) => {
    addSkill(categoryId);
  };
  
  const startEditCategory = (id: string, name: string) => {
    setEditingCategory(id);
    setEditingCategoryName(name);
  };
  
  const saveEditCategory = () => {
    if (editingCategory && editingCategoryName.trim()) {
      updateSkillCategory(editingCategory, editingCategoryName.trim());
      setEditingCategory(null);
      setEditingCategoryName('');
    }
  };
  
  const cancelEditCategory = () => {
    setEditingCategory(null);
    setEditingCategoryName('');
  };

  return (
    <Card className="resume-section animate-fade-in">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-maroon-800 flex items-center">
          <Brain className="h-5 w-5 mr-2" />
          Skills
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleAddSkillCategory}
          className="text-maroon-700 border-maroon-700 hover:bg-maroon-50"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Category
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {skillCategories.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <Brain className="h-12 w-12 mx-auto mb-2 opacity-30" />
            <p>No skill categories added yet.</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddSkillCategory}
              className="mt-3 text-maroon-700 border-maroon-700 hover:bg-maroon-50"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Category
            </Button>
          </div>
        ) : (
          skillCategories.map((category) => (
            <div key={category.id} className="border rounded-md p-4">
              <div className="flex justify-between items-center mb-3">
                {editingCategory === category.id ? (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      value={editingCategoryName}
                      onChange={(e) => setEditingCategoryName(e.target.value)}
                      className="maroon-input"
                      placeholder="Category name"
                      autoFocus
                    />
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={saveEditCategory}
                        className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={cancelEditCategory}
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <h3 className="font-medium text-lg">{category.name}</h3>
                )}
                
                <div className="flex items-center gap-1">
                  {editingCategory !== category.id && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEditCategory(category.id, category.name)}
                      className="h-8 w-8 text-maroon-600 hover:text-maroon-700 hover:bg-maroon-50"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSkillCategory(category.id)}
                    className="h-8 w-8 text-maroon-600 hover:text-maroon-700 hover:bg-maroon-50"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-2">
                    <div className="flex-1">
                      <Input
                        value={skill.name}
                        onChange={(e) => updateSkill(category.id, skill.id, { name: e.target.value })}
                        className="maroon-input"
                        placeholder="Skill name"
                      />
                    </div>
                    <div className="w-32 mr-2">
                      <Slider
                        defaultValue={[skill.level]}
                        min={1}
                        max={5}
                        step={1}
                        onValueChange={(value) => updateSkill(category.id, skill.id, { level: value[0] })}
                        className="w-full"
                      />
                    </div>
                    <div className="text-sm text-gray-500 w-6">
                      {skill.level}/5
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSkill(category.id, skill.id)}
                      className="h-8 w-8 text-maroon-600 hover:text-maroon-700 hover:bg-maroon-50"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleAddSkill(category.id)}
                  className="w-full mt-2 text-maroon-700 border-maroon-700 hover:bg-maroon-50"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Skill
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsForm;
