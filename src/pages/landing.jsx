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

const stats = [
  { label: "Jobs Posted", value: "12,000+", icon: Briefcase },
  { label: "Companies", value: "3,500+", icon: Users },
  { label: "Hires Made", value: "85,000+", icon: TrendingUp },
];

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-16 pb-16">

      {/* Hero Section */}
      <section className="text-center relative pt-12 pb-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#2FA084]/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#2FA084]/5 border border-[#2FA084]/20 text-[#2FA084] text-sm font-bold mb-8 shadow-sm"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#2FA084] animate-pulse" />
          AI-Powered Recruitment Evolution
        </motion.div>

        <motion.h1
          className="font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-slate-900 leading-tight"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Find Your{" "}
          <span className="gradient-title">Dream Career</span>
          <br />
          <span className="text-slate-600 text-4xl sm:text-5xl lg:text-6xl font-bold">
            faster than ever before
          </span>
        </motion.h1>

        <motion.p
          className="text-slate-500 mt-6 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          Explore thousands of hand-picked job listings or discover your next
          great hire — all in one powerful platform.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-5 justify-center mt-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link to="/jobs">
            <Button
              size="xl"
              className="w-full sm:w-auto flex items-center gap-2.5 shadow-xl shadow-[#2FA084]/20 hover:shadow-[#2FA084]/30 transition-all bg-[#2FA084] hover:bg-[#288a72]"
            >
              <Search size={20} />
              Explore Opportunities
            </Button>
          </Link>
          <Link to="/post-job">
            <Button
              variant="outline"
              size="xl"
              className="w-full sm:w-auto border-2 border-[#2FA084] text-[#2FA084] hover:bg-[#2FA084]/5 font-bold"
            >
              Post a Position
            </Button>
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="flex flex-wrap justify-center gap-10 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-4 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#2FA084]/10 flex items-center justify-center">
                <Icon size={24} className="text-[#2FA084]" />
              </div>
              <div className="text-left">
                <div className="font-black text-slate-900 text-2xl leading-none">{value}</div>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">{label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Company Logo Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="w-full py-8 bg-white border-y border-slate-200"
      >
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
          Trusted by teams at
        </p>
        <Carousel className="w-full max-w-5xl mx-auto px-4">
          <CarouselContent className="flex items-center gap-12 sm:gap-20">
            {companies.map(({ name, id, path }) => (
              <CarouselItem key={id} className="basis-auto flex justify-center">
                <img
                  src={path}
                  alt={name}
                  className="h-8 sm:h-10 object-contain grayscale opacity-50 hover:opacity-80 hover:grayscale-0 transition-all duration-300"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>

      {/* Value Proposition Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full hover:card-shadow-hover transition-all duration-300 border-l-4 border-l-[#2FA084] hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="w-14 h-14 rounded-2xl bg-[#2FA084]/10 flex items-center justify-center mb-4">
                <Search size={28} className="text-[#2FA084]" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">For Talent Seekers</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 text-base leading-relaxed">
              <ul className="space-y-3 mb-6">
                {[
                  "Access AI-curated job matches",
                  "Direct pipeline to top-tier companies",
                  "Real-time application tracking",
                  "Instant profile verification",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-[#2FA084] mt-1 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/jobs" className="block">
                <Button className="w-full sm:w-auto bg-[#2FA084] hover:bg-[#288a72] font-bold">
                  Discover Jobs →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full hover:card-shadow-hover transition-all duration-300 border-l-4 border-l-slate-800 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center mb-4 text-white">
                <Briefcase size={28} />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">For Hiring Teams</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 text-base leading-relaxed">
              <ul className="space-y-3 mb-6">
                {[
                  "Post vacancies in under 2 minutes",
                  "AI candidate screening & ranking",
                  "Detailed talent analytics",
                  "Collaborative hiring workflow",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-slate-900 mt-1 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/post-job" className="block">
                <Button variant="outline" className="w-full sm:w-auto border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold transition-all">
                  Get Started →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <motion.section
        className="max-w-3xl mx-auto w-full"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500">Everything you need to know about our platform.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <Accordion type="multiple" className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className={`px-6 ${index === 0 ? "" : ""}`}
              >
                <AccordionTrigger className="text-base font-semibold text-slate-800 py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-sm leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>
    </main>
  );
};

export default LandingPage;
