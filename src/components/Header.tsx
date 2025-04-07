import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useResume } from '@/context/ResumeContext';
import { useToast } from '@/components/ui/use-toast';
import { FileText, Download, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import TemplateSelector from './TemplateSelector';

const Header = () => {
  const { resume, enhanceResume } = useResume();
  const { toast } = useToast();
  const [enhancing, setEnhancing] = useState(false);
  const [exporting, setExporting] = useState(false);

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

  const handleExport = async () => {
    setExporting(true);
    toast({
      title: "Preparing PDF",
      description: "Your resume is being prepared for download...",
      duration: 2000,
    });
    
    try {
      // Target the resume preview element
      const element = document.querySelector('.resume-preview-card') as HTMLElement;
      if (!element) throw new Error("Resume preview not found");
      
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // A4 dimensions in mm: 210 × 297
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate aspect ratio to fit the entire resume on the page
      const canvasRatio = canvas.height / canvas.width;
      const pageRatio = pdfHeight / pdfWidth;
      
      let finalWidth = pdfWidth;
      let finalHeight = pdfWidth * canvasRatio;
      
      // If the height exceeds the page height, scale down
      if (finalHeight > pdfHeight) {
        finalHeight = pdfHeight;
        finalWidth = pdfHeight / canvasRatio;
      }
      
      // Center the image
      const xOffset = (pdfWidth - finalWidth) / 2;
      const yOffset = (pdfHeight - finalHeight) / 2;
      
      pdf.addImage(imgData, 'JPEG', xOffset, yOffset, finalWidth, finalHeight);
      pdf.save(`${resume.personalInfo.fullName || 'Resume'}.pdf`);
      
      toast({
        title: "Resume Exported",
        description: "Your resume has been downloaded as PDF.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error exporting resume:", error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your resume. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setExporting(false);
    }
  };

  return (
    <header className="maroon-gradient text-white py-5 px-4 md:px-6 shadow-md animate-fade-in">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <FileText className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">Simple Resume.AI</h1>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center">
          <TemplateSelector />
          
          <Button 
            onClick={handleEnhance} 
            disabled={enhancing}
            className="bg-white text-maroon-700 hover:bg-gray-100 transition-transform hover:scale-105"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {enhancing ? 'Enhancing...' : 'Enhance with AI'}
          </Button>
          
          <Button 
            onClick={handleExport} 
            disabled={exporting}
            variant="outline" 
            className="border-white text-white hover:bg-maroon-600 transition-transform hover:scale-105"
          >
            <Download className="h-4 w-4 mr-2" />
            {exporting ? 'Exporting...' : 'Export PDF'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
