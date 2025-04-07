
import { useState } from 'react';
import Header from '@/components/Header';
import ResumeEditor from '@/components/ResumeEditor';
import ResumePreview from '@/components/ResumePreview';
import { ResumeProvider } from '@/context/ResumeContext';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [showPreview, setShowPreview] = useState(false);
  const isMobile = useIsMobile();
  
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <ResumeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        
        <main className="flex-1 container mx-auto py-6 px-4">
          {isMobile ? (
            <div className="space-y-4">
              <Button
                onClick={togglePreview}
                variant="outline"
                className="w-full flex items-center justify-center text-maroon-700 border-maroon-700"
              >
                {showPreview ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide Preview
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Show Preview
                  </>
                )}
              </Button>
              
              {showPreview ? (
                <div className="mt-4 animate-fade-in">
                  <ResumePreview />
                </div>
              ) : (
                <div className="animate-fade-in">
                  <ResumeEditor />
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:overflow-y-auto lg:max-h-[calc(100vh-12rem)]">
                <ResumeEditor />
              </div>
              <div className="hidden lg:block sticky top-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
                <ResumePreview />
              </div>
            </div>
          )}
        </main>
        
        <footer className="py-4 bg-gray-100 border-t">
          <div className="container mx-auto text-center text-sm text-gray-600">
            <p>Maroon Resume AI — Create professional resumes with AI assistance</p>
          </div>
        </footer>
      </div>
    </ResumeProvider>
  );
};

export default Index;
