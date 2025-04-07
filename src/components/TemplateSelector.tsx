
import { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Layout, Check, Palette } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { useResume } from '@/context/ResumeContext';

// Define template options
const templates = [
  { 
    id: 'classic', 
    name: 'Classic', 
    description: 'Clean and professional layout',
    previewColor: 'bg-maroon-700',
    headerClass: 'bg-maroon-700',
    accentClass: 'text-maroon-700 border-maroon-200',
    skillClass: 'bg-maroon-600'
  },
  { 
    id: 'modern', 
    name: 'Modern', 
    description: 'Contemporary design with bold sections',
    previewColor: 'bg-blue-600',
    headerClass: 'bg-blue-600',
    accentClass: 'text-blue-600 border-blue-200',
    skillClass: 'bg-blue-600'
  },
  { 
    id: 'creative', 
    name: 'Creative', 
    description: 'Unique layout for creative fields',
    previewColor: 'bg-emerald-600',
    headerClass: 'bg-emerald-600',
    accentClass: 'text-emerald-600 border-emerald-200',
    skillClass: 'bg-emerald-600'
  },
  { 
    id: 'minimalist', 
    name: 'Minimalist', 
    description: 'Simple and elegant design',
    previewColor: 'bg-gray-800',
    headerClass: 'bg-gray-800',
    accentClass: 'text-gray-800 border-gray-200',
    skillClass: 'bg-gray-700'
  },
  { 
    id: 'executive', 
    name: 'Executive', 
    description: 'Professional look for senior positions',
    previewColor: 'bg-purple-700',
    headerClass: 'bg-purple-700',
    accentClass: 'text-purple-700 border-purple-200',
    skillClass: 'bg-purple-600'
  },
];

const TemplateSelector = () => {
  const { resume, updateResumeTemplate } = useResume();
  const [selectedTemplate, setSelectedTemplate] = useState(resume.template || 'classic');
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    
    // Find the selected template
    const template = templates.find(t => t.id === templateId);
    
    if (template) {
      // Update the resume template in context
      updateResumeTemplate(templateId, {
        headerClass: template.headerClass,
        accentClass: template.accentClass,
        skillClass: template.skillClass
      });
      
      toast({
        title: "Template Selected",
        description: `You've selected the ${template.name} template.`,
        duration: 3000,
      });
    }
    
    // Close the dialog after selection
    setTimeout(() => setOpen(false), 500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-transparent border-white text-white hover:bg-maroon-600 transition-transform hover:scale-105">
          <Palette className="h-4 w-4 mr-2" />
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold">Choose a Resume Template</DialogTitle>
          <DialogDescription>
            Select a template that best showcases your professional background
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                className={`p-4 cursor-pointer border-2 transition-all ${
                  selectedTemplate === template.id 
                    ? 'border-maroon-600 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleSelectTemplate(template.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className={`w-full h-32 ${template.previewColor} rounded-md mb-3 flex items-center justify-center`}>
                    <Layout className="h-12 w-12 text-white opacity-70" />
                  </div>
                  
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-maroon-600 text-white p-1 rounded-full">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                
                <h3 className="font-semibold text-base">{template.name}</h3>
                <p className="text-sm text-gray-500">{template.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelector;
