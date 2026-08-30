import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Target,
  Award,
  ShieldCheck,
  Truck,
  UserCheck,
  ArrowRight,
  Cylinder,
  Gauge,
  CircleDot,
  Cog,
  FlaskConical,
  Phone
} from 'lucide-react';

const AboutUs = () => {
  const categories = [
    { title: "Industrial Pipes", slug: "industrial-pipes", icon: Cylinder, desc: "Seamless & ERW boiler pipes and pressure tubing." },
    { title: "IBR Pipe Fittings", slug: "ibr-materials", icon: Gauge, desc: "Certified thermal fittings, flanges & pressure plates." },
    { title: "Industrial Valves", slug: "industrial-valves", icon: CircleDot, desc: "Gate, globe, ball & pneumatic actuator valves." },
    { title: "Engineering Hardware", slug: "engineering-hardware", icon: Cog, desc: "Welding electrodes, Taparia tools & abrasives." },
    { title: "Pharma Materials", slug: "pharma-materials", icon: FlaskConical, desc: "Sterile moisture-barrier aluminium packaging bags." },
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      title: "IBR Certified Stock",
      desc: "Every valve, fitting, and pressure line product is delivered with authentic batch test reports, heat numbers, and IBR certificates."
    },
    {
      icon: Truck,
      title: "Pan-India Dispatch",
      desc: "Strategically located at Makarpura GIDC, Vadodara with 48–72 hour dispatch turnaround across industrial hubs throughout India."
    },
    {
      icon: Award,
      title: "17+ Years of Industry Trust",
      desc: "Supplying premier chemical, pharmaceutical, power, and manufacturing plants since 2008 with zero tolerance for rejected batches."
    },
    {
      icon: UserCheck,
      title: "Long-Term Partnerships",
      desc: "We focus on building lasting relationships with transparent bulk pricing, technical guidance, and dedicated account support."
    }
  ];

  return (
    <div className="jt-about w-full bg-[#EEF0EC] min-h-screen">
      
      {/* ============ HERO SECTION ============ */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 border-b border-[#14171A]/10">
        {/* Blueprint grid backdrop */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.55]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(31,58,95,0.20) 1px, transparent 1px), linear-gradient(90deg, rgba(31,58,95,0.20) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div className="relative max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl">
            <span className="jt-mono inline-flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#1F3A5F] border border-[#1F3A5F]/25 bg-white/50 px-3 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
              EST. 2008 · MAKARPURA GIDC, VADODARA
            </span>

            <h1 className="jt-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#14171A] leading-[0.95] mb-6">
              Engineering Reliability & Quality Materials <span className="text-[#C8102E]">For Over 17 Years</span>
            </h1>

            <p className="text-[#4B5563] text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl">
              Jay Traders is a premier stockist and trading enterprise supplying certified industrial pipes, IBR boiler fittings, valves, engineering hardware, and pharmaceutical sterile materials across India.
            </p>
          </div>
        </div>
      </section>

      {/* ============ COMPANY STORY SPEC SHEET ============ */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Story Card */}
            <div className="lg:col-span-7 bg-white border border-[#14171A]/15 p-6 sm:p-10 shadow-[0_20px_50px_-20px_rgba(20,23,26,0.2)] relative">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-dashed border-[#14171A]/20">
                <span className="jt-mono text-xs font-bold tracking-[0.2em] uppercase text-[#C8102E] flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Company Profile & Heritage
                </span>
                <span className="jt-mono text-[11px] text-[#4B5563]">REF. JT-CORP-2008</span>
              </div>

              <h2 className="jt-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-[#14171A] mb-4 tracking-tight">
                From Makarpura GIDC to Pan-India Industrial Partner
              </h2>

              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  Founded in <strong className="text-[#14171A] font-bold">2008</strong> in the industrial belt of <strong className="text-[#14171A] font-bold">Makarpura GIDC, Vadodara</strong>, Jay Traders was established with a clear mandate: to eliminate delays and quality rejections in industrial supply chains.
                </p>
                <p>
                  Over the past 17 years, we have scaled our warehouse stock and technical sourcing capabilities to become a dependable single-source vendor for power plants, chemical refineries, pharmaceutical manufacturing units, and engineering contractors.
                </p>
                <p>
                  Whether supplying heavy-gauge IBR certified pressure fittings or critical cleanroom pharmaceutical packaging materials, every consignment is inspected and verified before dispatch.
                </p>
              </div>

              {/* Specification stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 mt-8 border-t border-[#14171A]/10 text-center">
                <div className="p-3 bg-[#EEF0EC] border border-[#14171A]/10">
                  <span className="jt-display block text-3xl sm:text-4xl font-black text-[#C8102E]">2008</span>
                  <span className="jt-mono text-[10px] uppercase text-[#4B5563] tracking-wider">Trading Since</span>
                </div>
                <div className="p-3 bg-[#EEF0EC] border border-[#14171A]/10">
                  <span className="jt-display block text-3xl sm:text-4xl font-black text-[#14171A]">500+</span>
                  <span className="jt-mono text-[10px] uppercase text-[#4B5563] tracking-wider">Industrial Clients</span>
                </div>
                <div className="p-3 bg-[#EEF0EC] border border-[#14171A]/10">
                  <span className="jt-display block text-3xl sm:text-4xl font-black text-[#14171A]">5</span>
                  <span className="jt-mono text-[10px] uppercase text-[#4B5563] tracking-wider">Core Verticals</span>
                </div>
                <div className="p-3 bg-[#EEF0EC] border border-[#14171A]/10">
                  <span className="jt-display block text-3xl sm:text-4xl font-black text-[#C8102E]">100%</span>
                  <span className="jt-mono text-[10px] uppercase text-[#4B5563] tracking-wider">IBR Compliant</span>
                </div>
              </div>
            </div>

            {/* Mission & Vision Plates */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Mission Plate */}
              <div className="jt-plate relative bg-[#14171A] text-white p-6 sm:p-8">
                <span className="jt-rivet" style={{ top: 8, left: 8 }} />
                <span className="jt-rivet" style={{ top: 8, right: 8 }} />
                <span className="jt-rivet" style={{ bottom: 8, left: 8 }} />
                <span className="jt-rivet" style={{ bottom: 8, right: 8 }} />

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-sm bg-[#C8102E]/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-[#E8A324]" />
                  </div>
                  <h3 className="jt-display text-xl sm:text-2xl font-bold uppercase tracking-wide">
                    Our Mission
                  </h3>
                </div>
                <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed">
                  To supply fully certified, mill-tested engineering and pharmaceutical materials with precision timing, empowering plant operations and ensuring total safety compliance.
                </p>
              </div>

              {/* Journey Plate */}
              <div className="jt-plate relative bg-[#14171A] text-white p-6 sm:p-8">
                <span className="jt-rivet" style={{ top: 8, left: 8 }} />
                <span className="jt-rivet" style={{ top: 8, right: 8 }} />
                <span className="jt-rivet" style={{ bottom: 8, left: 8 }} />
                <span className="jt-rivet" style={{ bottom: 8, right: 8 }} />

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-sm bg-[#C8102E]/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#E8A324]" />
                  </div>
                  <h3 className="jt-display text-xl sm:text-2xl font-bold uppercase tracking-wide">
                    Our Quality Promise
                  </h3>
                </div>
                <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed">
                  No counterfeit stock, no mismatched metallurgy, and no dispatch without complete test documents. We stand behind every product delivered to your site.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ============ CORE CATEGORIES ============ */}
      <section className="relative overflow-hidden py-14 sm:py-20 bg-white border-y border-[#14171A]/10">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="mb-10 sm:mb-14">
            <span className="jt-mono block text-[11px] tracking-[0.25em] uppercase text-[#C8102E] mb-2">
              Product Portfolio
            </span>
            <h2 className="jt-display uppercase font-extrabold text-[#14171A] text-2xl sm:text-3xl lg:text-4xl tracking-tight">
              What We Supply & Distribute
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className="jt-plate group relative bg-[#14171A] p-6 flex flex-col justify-between"
                >
                  <span className="jt-rivet" style={{ top: 8, left: 8 }} />
                  <span className="jt-rivet" style={{ top: 8, right: 8 }} />
                  <span className="jt-rivet" style={{ bottom: 8, left: 8 }} />
                  <span className="jt-rivet" style={{ bottom: 8, right: 8 }} />

                  <div>
                    <div className="w-11 h-11 rounded-sm bg-[#C8102E]/15 flex items-center justify-center mb-4 group-hover:bg-[#C8102E]/25 transition-colors">
                      <Icon className="h-5 w-5 text-[#E8A324]" />
                    </div>
                    <h3 className="jt-display uppercase font-bold text-white text-base sm:text-lg tracking-wide mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                      {cat.desc}
                    </p>
                  </div>

                  <span className="block h-0.5 w-8 bg-[#C8102E] group-hover:w-full transition-all duration-300" />
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============ WHY CLIENTS TRUST US ============ */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="mb-10 sm:mb-14">
            <span className="jt-mono block text-[11px] tracking-[0.25em] uppercase text-[#C8102E] mb-2">
              Operational Standards
            </span>
            <h2 className="jt-display uppercase font-extrabold text-[#14171A] text-2xl sm:text-3xl lg:text-4xl tracking-tight">
              Why Industry Leaders Depend On Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#14171A]/12">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="jt-spec-row group relative flex gap-4 sm:gap-5 p-6 sm:p-8 border-r border-b border-[#14171A]/12 bg-white/70 hover:bg-white transition-colors"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-sm bg-[#EEF0EC] border border-[#14171A]/10 flex items-center justify-center group-hover:border-[#C8102E]/40 transition-colors">
                    <Icon className="h-6 w-6 text-[#1F3A5F]" />
                  </div>
                  <div>
                    <h3 className="jt-display uppercase font-bold text-[#14171A] text-lg sm:text-xl tracking-wide mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#4B5563] text-sm sm:text-[15px] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section className="relative overflow-hidden bg-[#14171A] py-16 sm:py-20">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.95]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="jt-display uppercase font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            Partner With A Certified Industrial Stockist
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Contact our Vadodara office today for material test certificates, technical sizing sheets, or custom bulk tender pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#C8102E] text-white px-8 py-3.5 rounded-md font-bold text-sm sm:text-base tracking-wide hover:bg-[#a80d26] transition-colors duration-200"
            >
              Contact Sales Team
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+919925031497"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/25 text-white px-8 py-3.5 rounded-md font-bold text-sm sm:text-base tracking-wide hover:bg-white hover:text-[#14171A] transition-colors duration-200"
            >
              <Phone className="h-4 w-4" />
              +91 9925031497
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .jt-about { font-family: 'IBM Plex Sans', sans-serif; }
        .jt-display { font-family: 'Big Shoulders Display', sans-serif; }
        .jt-mono { font-family: 'IBM Plex Mono', monospace; }

        .jt-rivet {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 9999px;
          background: radial-gradient(circle at 35% 30%, #6b7280, #23262b 70%);
          box-shadow: 0 1px 1px rgba(0,0,0,0.5);
        }

        .jt-spec-row:hover::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: #C8102E;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;