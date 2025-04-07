
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useResume } from '@/context/ResumeContext';
import { useToast } from '@/components/ui/use-toast';
import { FileText, Download, Sparkles } from 'lucide-react';

const Header = () => {
  const { resume, enhanceResume } = useResume();
  const { toast } = useToast();
  const [enhancing, setEnhancing] = useState(false);

  const handleEnhance = () => {
    setEnhancing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      enhanceResume();
      setEnhancing(false);
      
      toast({
        title: "Resume Enhanced!",
        description: `Your resume score is now ${resume.enhancementScore || 85}/100.`,
        duration: 3000,
      });
    }, 1500);
  };

  const handleExport = () => {
    toast({
      title: "Resume Exported",
      description: "Your resume has been exported as PDF.",
      duration: 3000,
    });
  };

  return (
    <header className="maroon-gradient text-white py-5 px-4 md:px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <FileText className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">Maroon Resume AI</h1>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={handleEnhance} 
            disabled={enhancing}
            className="bg-white text-maroon-700 hover:bg-gray-100"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {enhancing ? 'Enhancing...' : 'Enhance with AI'}
          </Button>
          
          <Button 
            onClick={handleExport} 
            variant="outline" 
            className="border-white text-white hover:bg-maroon-600"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
