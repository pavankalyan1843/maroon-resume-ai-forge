
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Download, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  
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
  
  const handleGetStarted = () => {
    navigate('/editor');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <header className="maroon-gradient text-white py-5 px-4 md:px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <FileText className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">Simple Resume.AI</h1>
          </div>
          
          <Button 
            onClick={handleGetStarted}
            className="bg-white text-maroon-700 hover:bg-gray-100 transition-transform hover:scale-105"
          >
            Create Resume
          </Button>
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <motion.section 
          className="py-16 md:py-24 px-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="container mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              Create Professional Resumes <span className="text-maroon-700">in Minutes</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
              variants={itemVariants}
            >
              Simple Resume.AI helps you build stunning, ATS-friendly resumes with AI enhancement to maximize your chances of landing interviews.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="bg-maroon-700 hover:bg-maroon-800 text-white px-8 py-6 text-lg rounded-md shadow-lg transition-transform hover:scale-105"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Simple Resume.AI</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-maroon-100 p-3 rounded-full w-fit mb-4">
                  <Sparkles className="h-6 w-6 text-maroon-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">AI Enhancement</h3>
                <p className="text-gray-600">Our AI tool enhances your resume content to highlight your achievements and stand out to employers.</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <div className="bg-maroon-100 p-3 rounded-full w-fit mb-4">
                  <FileText className="h-6 w-6 text-maroon-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Multiple Templates</h3>
                <p className="text-gray-600">Choose from professionally designed templates that suit your industry and career level.</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <div className="bg-maroon-100 p-3 rounded-full w-fit mb-4">
                  <Download className="h-6 w-6 text-maroon-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">One-Click Export</h3>
                <p className="text-gray-600">Easily export your resume as a PDF ready to submit to potential employers.</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-maroon-700 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Enter Your Details</h3>
                <p className="text-gray-600">Fill in your personal information, work experience, education, and skills.</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="bg-maroon-700 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Choose a Template</h3>
                <p className="text-gray-600">Select from our professionally designed templates that match your style.</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="bg-maroon-700 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Download Your Resume</h3>
                <p className="text-gray-600">Export your polished resume as a PDF ready for applications.</p>
              </motion.div>
            </div>
            
            <div className="text-center mt-12">
              <Button 
                onClick={handleGetStarted}
                className="bg-maroon-700 hover:bg-maroon-800 text-white px-6 py-2 rounded-md shadow-md transition-transform hover:scale-105"
              >
                Create Your Resume Now
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials/Features */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">What Makes Us Different</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div 
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="h-6 w-6 text-maroon-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-800">ATS-Friendly Designs</h3>
                  <p className="text-gray-600">All our templates are designed to pass through Applicant Tracking Systems.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <CheckCircle className="h-6 w-6 text-maroon-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-800">Real-time Preview</h3>
                  <p className="text-gray-600">See changes to your resume as you type with our live preview feature.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <CheckCircle className="h-6 w-6 text-maroon-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-800">AI Content Enhancement</h3>
                  <p className="text-gray-600">Our AI helps improve your job descriptions and highlight achievements.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <CheckCircle className="h-6 w-6 text-maroon-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-800">Industry-Specific Templates</h3>
                  <p className="text-gray-600">Templates designed for different industries and experience levels.</p>
                </div>
              </motion.div>
            </div>
            
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 maroon-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Your Professional Resume?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of job seekers who have successfully landed interviews with resumes created using Simple Resume.AI</p>
            
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-white text-maroon-700 hover:bg-gray-100 px-8 py-6 text-lg rounded-md shadow-lg transition-transform hover:scale-105"
            >
              Get Started for Free
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <FileText className="h-6 w-6 mr-2" />
                <h2 className="text-xl font-bold">Simple Resume.AI</h2>
              </div>
              <p className="text-gray-400 mt-2">Create professional resumes with AI assistance</p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400">© {new Date().getFullYear()} Simple Resume.AI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
