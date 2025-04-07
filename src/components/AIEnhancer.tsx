
import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Sparkles, Check, AlertCircle, Loader2 } from 'lucide-react';

const AIEnhancer = () => {
  const { resume, enhanceResume } = useResume();
  const { toast } = useToast();
  const [enhancing, setEnhancing] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  
  const score = resume.enhancementScore || 0;
  
  const handleEnhanceResume = () => {
    setEnhancing(true);
    
    // Simulate API call
    setTimeout(() => {
      enhanceResume();
      setEnhancing(false);
      
      toast({
        title: "Resume Enhanced!",
        description: "Your resume has been improved with AI suggestions.",
      });
    }, 2000);
  };
  
  const handleAnalyzeResume = () => {
    setAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 1500);
  };

  return (
    <Card className="resume-section bg-gradient-to-r from-maroon-50 to-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-maroon-800 flex items-center">
          <Sparkles className="h-5 w-5 mr-2" />
          AI Resume Enhancement
        </CardTitle>
        <CardDescription>
          Use AI to improve your resume and get a higher score
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Resume Score</div>
            <div className="text-sm font-medium">{score}%</div>
          </div>
          <Progress value={score} className="h-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4 bg-white">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
              Analysis
            </h3>
            
            {!analyzed ? (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Analyze your resume to find improvement opportunities.
                </p>
                
                <Button 
                  onClick={handleAnalyzeResume} 
                  disabled={analyzing}
                  className="w-full bg-amber-500 hover:bg-amber-600"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Resume'
                  )}
                </Button>
              </>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">Your experience section is well detailed</span>
                </div>
                <div className="flex items-start gap-2 text-amber-600">
                  <AlertCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">Add more action verbs to your job descriptions</span>
                </div>
                <div className="flex items-start gap-2 text-amber-600">
                  <AlertCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">Your summary could be more impactful</span>
                </div>
                <div className="flex items-start gap-2 text-amber-600">
                  <AlertCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">Quantify achievements with metrics</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="border rounded-md p-4 bg-white">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-maroon-600" />
              AI Enhancement
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Let AI improve your resume with professional wording and better formatting.
            </p>
            
            <Button 
              onClick={handleEnhanceResume} 
              disabled={enhancing}
              className="w-full bg-maroon-700 hover:bg-maroon-800"
            >
              {enhancing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Enhancing...
                </>
              ) : (
                'Enhance with AI'
              )}
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mt-2">
          Note: AI suggestions are for guidance only. Always review and personalize content.
        </div>
      </CardContent>
    </Card>
  );
};

export default AIEnhancer;
