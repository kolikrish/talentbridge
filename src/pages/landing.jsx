import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Users, Briefcase, TrendingUp, CheckCircle } from "lucide-react";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="text-center relative pt-20 pb-20">
        {/* Extremely Subtle Background - for pure white theme */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.01)_0%,transparent_70%)] -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 bg-white/50 text-[10px] font-light uppercase tracking-[0.2em] text-slate-400 mb-12 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          AI-Powered Recruitment
        </motion.div>

        <motion.h1
          className="text-6xl sm:text-7xl lg:text-8xl tracking-tight text-slate-900 leading-[1.1] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-light">A thoughtful platform</span>
          <br />
          <span className="text-slate-300 italic font-extralight opacity-70">for global talent.</span>
        </motion.h1>

        <motion.p
          className="text-slate-400 mt-8 text-lg sm:text-xl font-medium max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span className="font-medium" style={{ fontFamily: 'Gilroy, Inter, sans-serif', fontWeight: 600 }}>
            Connect with top-tier companies or find your next great hire 
            through our intelligent, AI-driven matching engine.
          </span>
        </motion.p>   

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12 font-['Gilroy']"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link to="/jobs">
            <Button
              className="h-16 px-10 rounded-full bg-[#0f172a] hover:bg-[#1e293b] text-white text-base font-medium transition-all duration-300 shadow-xl shadow-slate-200"
            >
              Explore Opportunities
            </Button>
          </Link>
          <Link to="/post-job">
            <Button
              variant="outline"
              className="h-16 px-10 rounded-full border-slate-200 bg-white text-slate-600 text-base font-medium hover:bg-slate-50 transition-all duration-300"
            >
              Post a Position
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Feature Cards Section - based on reference design */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full px-4 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center p-12 bg-white rounded-[3rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 group"
        >
          <div className="w-14 h-14 rounded-[20px] bg-slate-50 flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 transition-transform duration-500">
            <Search size={24} className="text-slate-900" />
          </div>
          <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-slate-800 mb-6">AI Matching</h3>
          <p className="text-slate-400 text-base font-normal leading-relaxed font-['Gilroy']">
            Our intelligent engine analyzes your skills and aspirations to find roles 
            that truly align with your career path.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center text-center p-12 bg-white rounded-[3rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 group"
        >
          <div className="w-14 h-14 rounded-[20px] bg-slate-50 flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 transition-transform duration-500">
            <TrendingUp size={24} className="text-slate-900" />
          </div>
          <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-slate-800 mb-6">Direct Pipeline</h3>
          <p className="text-slate-400 text-base font-normal leading-relaxed font-['Gilroy']">
            Skip the noise and get noticed. We connect you directly with 
            decision-makers at world-class companies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center text-center p-12 bg-white rounded-[3rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 group"
        >
          <div className="w-14 h-14 rounded-[20px] bg-slate-50 flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 transition-transform duration-500">
            <Briefcase size={24} className="text-slate-900" />
          </div>
          <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-slate-800 mb-6">Real-time Tracking</h3>
          <p className="text-slate-400 text-base font-normal leading-relaxed font-['Gilroy']">
            Stay informed at every step. Track application status and 
            receive instant feedback from hiring teams.
          </p>
        </motion.div>
      </section>

      {/* How it Works Section - based on reference design */}
      <section className="max-w-4xl mx-auto w-full px-4 mb-32 relative">
        <div className="text-center mb-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Grounded in Innovation</p>
          <h2 className="text-4xl font-light text-slate-900 mb-6 font-['Gilroy']">How TalentBridge Works</h2>
          <p className="text-slate-400 text-base font-normal max-w-2xl mx-auto leading-relaxed">
            Our AI-driven platform streamlines your journey through three intentional phases—connecting 
            you with opportunities that match your unique profile.
          </p>
        </div>

        <div className="relative space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-[34px] top-4 bottom-4 w-[2px] bg-slate-100 hidden sm:block" />

          {/* Step 01 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative"
          >
            <div className="w-18 h-18 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-slate-200 shrink-0 z-10">
              01
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex-1 w-full">
              <h3 className="text-xl font-bold text-slate-800 mb-3 font-['Gilroy']">Profile Discovery <span className="text-slate-300 font-light italic ml-2">Who are you?</span></h3>
              <p className="text-slate-400 text-base font-['Gilroy'] leading-relaxed">
                Create your comprehensive profile. Our AI engine indexes your skills, 
                experiences, and career goals to build a dynamic digital identity that stands out.
              </p>
            </div>
          </motion.div>

          {/* Step 02 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative"
          >
            <div className="w-18 h-18 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-slate-200 shrink-0 z-10">
              02
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex-1 w-full">
              <h3 className="text-xl font-bold text-slate-800 mb-3 font-['Gilroy']">Intelligent Matching <span className="text-slate-300 font-light italic ml-2">Where do you fit?</span></h3>
              <p className="text-slate-400 text-base font-['Gilroy'] leading-relaxed">
                Get matched with perfection. We analyze thousands of roles to surface 
                the ones where you'll thrive, using advanced semantic search and fit scoring.
              </p>
            </div>
          </motion.div>

          {/* Step 03 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative"
          >
            <div className="w-18 h-18 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-slate-200 shrink-0 z-10">
              03
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex-1 w-full">
              <h3 className="text-xl font-bold text-slate-800 mb-3 font-['Gilroy']">Seamless Connection <span className="text-slate-300 font-light italic ml-2">What's next?</span></h3>
              <p className="text-slate-400 text-base font-['Gilroy'] leading-relaxed">
                Stay informed at every step. Track application status and 
                receive instant feedback from hiring teams through our integrated talent pipeline.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Final CTA Section - based on reference design */}
      <section className="py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-8 font-['Gilroy'] tracking-tight">
            Hire smarter.
            <br />
            Grow faster.
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-['Gilroy'] mb-12 max-w-lg mx-auto leading-relaxed">
            Connect with the world's best talent and companies today. 
            Start your journey with TalentBridge.
          </p>
          <Link to="/onboarding">
            <Button className="h-20 px-14 rounded-full bg-[#0f172a] hover:bg-[#1e293b] text-white text-lg font-bold transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] hover:-translate-y-1">
              Get Started Now
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
};

export default LandingPage;
