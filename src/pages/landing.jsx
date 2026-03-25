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
      <section className="text-center relative pt-6 pb-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-100/60 blur-[90px] rounded-full -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Now with AI-powered job matching
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
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link to="/jobs">
            <Button
              size="xl"
              className="w-full sm:w-auto flex items-center gap-2 shadow-lg shadow-blue-200"
            >
              <Search size={20} />
              Browse Jobs
            </Button>
          </Link>
          <Link to="/post-job">
            <Button
              variant="outline"
              size="xl"
              className="w-full sm:w-auto border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-bold"
            >
              Post a Job
            </Button>
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Icon size={20} className="text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-extrabold text-slate-900 text-lg leading-none">{value}</div>
                <div className="text-slate-500 text-sm">{label}</div>
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
          <Card className="h-full hover:card-shadow-hover transition-all duration-300 border-l-4 border-l-blue-500 hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                <Search size={24} className="text-blue-600" />
              </div>
              <CardTitle className="text-xl text-slate-900">For Job Seekers</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-500 text-base leading-relaxed">
              <ul className="space-y-2">
                {[
                  "Search thousands of exclusive roles",
                  "Track applications in real-time",
                  "Get noticed by top companies",
                  "One-click apply with your profile",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-blue-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/jobs" className="block mt-5">
                <Button variant="default" className="w-full sm:w-auto">
                  Find Jobs →
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
          <Card className="h-full hover:card-shadow-hover transition-all duration-300 border-l-4 border-l-indigo-500 hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-3">
                <Briefcase size={24} className="text-indigo-600" />
              </div>
              <CardTitle className="text-xl text-slate-900">For Employers</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-500 text-base leading-relaxed">
              <ul className="space-y-2">
                {[
                  "Post jobs and reach top talent",
                  "Manage candidate pipelines",
                  "Review applications instantly",
                  "Build your dream team faster",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-indigo-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/post-job" className="block mt-5">
                <Button variant="outline" className="w-full sm:w-auto border-2 border-indigo-500 text-indigo-700 hover:bg-indigo-50">
                  Post a Job →
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
