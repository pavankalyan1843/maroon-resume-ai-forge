
import { useState } from 'react';
import Header from '@/components/Header';
import ResumeEditor from '@/components/ResumeEditor';
import ResumePreview from '@/components/ResumePreview';
import TemplateSelector from '@/components/TemplateSelector';
import { ResumeProvider } from '@/context/ResumeContext';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const Index = () => {
  const [showPreview, setShowPreview] = useState(false);
  const isMobile = useIsMobile();
  
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <ResumeProvider>
      <motion.div 
        className="min-h-screen flex flex-col bg-gray-50"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Header />
        
        <main className="flex-1 container mx-auto py-6 px-4">
          {isMobile ? (
            <div className="space-y-4">
              <motion.div variants={itemVariants}>
                <Button
                  onClick={togglePreview}
                  variant="outline"
                  className="w-full flex items-center justify-center text-maroon-700 border-maroon-700 transition-transform hover:scale-105"
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
              </motion.div>
              
              {showPreview ? (
                <motion.div className="mt-4 animate-fade-in" variants={itemVariants}>
                  <ResumePreview />
                </motion.div>
              ) : (
                <motion.div className="animate-fade-in" variants={itemVariants}>
                  <ResumeEditor />
                </motion.div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div variants={itemVariants} className="lg:overflow-y-auto lg:max-h-[calc(100vh-12rem)]">
                <ResumeEditor />
              </motion.div>
              <motion.div variants={itemVariants} className="hidden lg:block sticky top-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
                <ResumePreview />
              </motion.div>
            </div>
          )}
        </main>
        
        <motion.footer 
          className="py-4 bg-gray-100 border-t"
          variants={itemVariants}
        >
          <div className="container mx-auto text-center text-sm text-gray-600">
            <p>Simple Resume.AI — Create professional resumes with AI assistance</p>
          </div>
        </motion.footer>
      </motion.div>
    </ResumeProvider>
  );
};

export default Index;
