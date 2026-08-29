// import { Link } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import {
//   ArrowRight, Shield, Truck, Award, Users,
//   ChevronLeft, ChevronRight, CheckCircle2, BadgeCheck
// } from "lucide-react";

// // ---- Trust strip content: the certifications that actually matter to a buyer ----
// const CERTIFICATIONS = [
//   "IBR CERTIFIED",
//   "ISO 9001:2015",
//   "BATCH TESTED",
//   "METALLURGY VERIFIED",
//   "PAN-INDIA DISPATCH",
//   "TRUSTED SINCE 2008",
// ];

// // ---- Small hook: reveals an element once it scrolls into view ----
// function useReveal(threshold = 0.2) {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const node = ref.current;
//     if (!node) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold }
//     );
//     observer.observe(node);
//     return () => observer.disconnect();
//   }, [threshold]);

//   return [ref, visible];
// }

// function FeaturePlate({ icon: Icon, title, desc, accent, index }) {
//   const [ref, visible] = useReveal(0.15);
//   return (
//     <div
//       ref={ref}
//       className="feature-plate"
//       style={{
//         transitionDelay: `${index * 90}ms`,
//         opacity: visible ? 1 : 0,
//         transform: visible ? "translateY(0)" : "translateY(28px)",
//       }}
//     >
//       {/* Rivet corners — the steel-plate signature */}
//       <span className="rivet rivet-tl" />
//       <span className="rivet rivet-tr" />
//       <span className="rivet rivet-bl" />
//       <span className="rivet rivet-br" />

//       <div className="feature-icon-well" style={{ "--accent": accent }}>
//         <Icon className="h-8 w-8" style={{ color: accent }} strokeWidth={1.75} />
//       </div>
//       <h3 className="feature-title">{title}</h3>
//       <p className="feature-desc">{desc}</p>
//     </div>
//   );
// }

// export default function IndustrialHomepage() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [scanKey, setScanKey] = useState(0);
//   const [heroLoaded, setHeroLoaded] = useState(false);

//   const featuredProducts = [
//     {
//       id: 1,
//       name: "IBR Certified Valves & Fittings",
//       category: "High Demand",
//       image: "/IBR.jpeg",
//       bullets: [
//         "Full Inspection Documentation",
//         "Batch Testing & Metallurgy Proof"
//       ],
//       slug: "ibr-materials"
//     },
//     {
//       id: 2,
//       name: "Industrial Welding Rods",
//       category: "Engineering Grade",
//       image: "/Welding-consumables.png",
//       bullets: [
//         "High-tensile stress applications",
//         "ISO Certified Electrodes"
//       ],
//       slug: "engineering-hardware"
//     },
//     {
//       id: 3,
//       name: "Taparia Hand Toolsets",
//       category: "Premium Supply",
//       image: "/taparia.jpeg",
//       bullets: [
//         "Ergonomic heavy-duty steel",
//         "Precision engineering guaranteed"
//       ],
//       slug: "engineering-hardware"
//     },
//     {
//       id: 4,
//       name: "Pharma Aluminium Bags",
//       category: "Sterile Packaging",
//       image: "/Aluminiumbags.png",
//       bullets: [
//         "High-density moisture barrier",
//         "Compliant for pharma storage"
//       ],
//       slug: "pharma-materials"
//     }
//   ];

//   const features = [
//     {
//       icon: Shield,
//       title: "Premium Quality",
//       desc: "Every batch checked against mill certificates before it leaves our warehouse.",
//       accent: "#E23428"
//     },
//     {
//       icon: Truck,
//       title: "Swift Delivery",
//       desc: "Pan-India dispatch with tracked logistics for time-critical site orders.",
//       accent: "#F2A93B"
//     },
//     {
//       icon: Award,
//       title: "Industry Expertise",
//       desc: "17 years sourcing IBR, pharma and engineering-grade materials at scale.",
//       accent: "#8B7CF6"
//     },
//     {
//       icon: Users,
//       title: "Dedicated Support",
//       desc: "A direct line to your account manager for bulk quotes and reorders.",
//       accent: "#34B37A"
//     }
//   ];

//   // Hero entrance
//   useEffect(() => {
//     const t = setTimeout(() => setHeroLoaded(true), 80);
//     return () => clearTimeout(t);
//   }, []);

//   // Auto-play timer for hero feature slider
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
//     }, 4500);
//     return () => clearInterval(timer);
//   }, [featuredProducts.length]);

//   // Trigger an inspection-scan flash on every slide change
//   useEffect(() => {
//     setScanKey((k) => k + 1);
//   }, [currentSlide]);

//   const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
//   const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);

//   return (
//     <div className="ind-home flex flex-col min-h-screen bg-[#F4F5F3] w-full">

//       {/* Hero Section */}
//       <div className="relative min-h-screen overflow-hidden flex items-center justify-center w-full py-16 hero-bg">
//         {/* Blueprint grid + ambient glow */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute top-20 left-10 w-64 h-64 bg-[#E23428]/10 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#F2A93B]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//           <div className="absolute inset-0 opacity-[0.15]" style={{
//             backgroundImage: `linear-gradient(rgba(138, 148, 163, 0.35) 1px, transparent 1px),
//                              linear-gradient(90deg, rgba(138, 148, 163, 0.35) 1px, transparent 1px)`,
//             backgroundSize: '48px 48px'
//           }}></div>
//           {/* corner crop marks — blueprint sheet framing */}
//           <div className="hero-cropmark hero-cropmark-tl" />
//           <div className="hero-cropmark hero-cropmark-br" />
//         </div>

//         <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
//           <div className="grid lg:grid-cols-12 gap-12 items-center">

//             {/* Left Column - Hero Copy */}
//             <div className="lg:col-span-7 text-center lg:text-left">
//               <div
//                 className={`mb-6 flex items-center justify-center lg:justify-start reveal-item ${heroLoaded ? "is-in" : ""}`}
//                 style={{ transitionDelay: "60ms" }}
//               >
//                 <span className="inline-flex items-center text-[#C7CDD8] text-xs font-semibold tracking-[0.2em] uppercase font-mono border border-[#3A4048] rounded-full px-3 py-1.5">
//                   <Award className="h-4 w-4 mr-2 text-[#F2A93B]" />
//                   Trusted Since 2008
//                 </span>
//               </div>

//               <h1
//                 className={`hero-headline reveal-item ${heroLoaded ? "is-in" : ""}`}
//                 style={{ transitionDelay: "150ms" }}
//               >
//                 One stop solution for
//                 <span className="block hero-headline-accent">
//                   IBR Pipes, Fittings, Valves
//                   <br className="hidden sm:block" /> &amp; Industrial Supplies
//                 </span>
//               </h1>

//               <p
//                 className={`mt-6 text-[#9AA3B0] text-base sm:text-lg max-w-xl mx-auto lg:mx-0 reveal-item ${heroLoaded ? "is-in" : ""}`}
//                 style={{ transitionDelay: "230ms" }}
//               >
//                 Certified materials, documented at every batch, delivered where your
//                 site needs them.
//               </p>

//               <div
//                 className={`mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start reveal-item ${heroLoaded ? "is-in" : ""}`}
//                 style={{ transitionDelay: "310ms" }}
//               >
//                 <button
//                   onClick={() => window.dispatchEvent(new Event('openProductCategoriesDropdown'))}
//                   className="group bg-gradient-to-r from-[#F2A93B] to-[#E23428] text-black px-8 py-3.5 rounded-xl font-bold text-base hover:brightness-105 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-[#E23428]/20 flex items-center justify-center"
//                 >
//                   Browse Catalog
//                   <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//                 <Link
//                   to="/contact"
//                   className="border-2 border-white/25 text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-white hover:text-[#1C1F23] transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
//                 >
//                   Request Bulk Quote
//                 </Link>
//               </div>
//             </div>

//             {/* Right Column - Spec-plate slider card */}
//             <div
//               className={`lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none reveal-item ${heroLoaded ? "is-in" : ""}`}
//               style={{ transitionDelay: "380ms" }}
//             >
//               <div className="spec-plate">
//                 {/* Rivets on the outer plate */}
//                 <span className="rivet rivet-tl" />
//                 <span className="rivet rivet-tr" />
//                 <span className="rivet rivet-bl" />
//                 <span className="rivet rivet-br" />

//                 {/* Header Info */}
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="text-[10px] font-bold text-[#7A8393] tracking-[0.25em] uppercase font-mono">
//                     Featured Highlight
//                   </span>
//                   <div className="flex space-x-1">
//                     <button
//                       onClick={prevSlide}
//                       className="p-1.5 rounded bg-[#2A2F36] text-[#C7CDD8] hover:bg-[#3A4048] hover:text-white transition-colors"
//                       aria-label="Previous Slide"
//                     >
//                       <ChevronLeft className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={nextSlide}
//                       className="p-1.5 rounded bg-[#2A2F36] text-[#C7CDD8] hover:bg-[#3A4048] hover:text-white transition-colors"
//                       aria-label="Next Slide"
//                     >
//                       <ChevronRight className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Clickable Slider Image Window */}
//                 <Link
//                   to={`/category/${featuredProducts[currentSlide].slug}`}
//                   className="group block relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-[#2E333B] cursor-pointer"
//                 >
//                   <img
//                     key={currentSlide}
//                     src={featuredProducts[currentSlide].image}
//                     alt={featuredProducts[currentSlide].name}
//                     className="w-full h-full object-cover slide-image-in transition-transform duration-500 group-hover:scale-105"
//                   />
//                   {/* Inspection scan-line flash on slide change */}
//                   <span key={scanKey} className="scan-line" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#12141A] via-[#12141A]/25 to-transparent group-hover:opacity-90 transition-opacity" />

//                   <div className="absolute bottom-3 left-3 right-3">
//                     <span className="inline-block text-[10px] font-bold text-[#F2A93B] bg-[#F2A93B]/15 border border-[#F2A93B]/30 px-2 py-0.5 rounded mb-1.5 tracking-wide font-mono uppercase">
//                       {featuredProducts[currentSlide].category}
//                     </span>
//                     <h3 className="text-white font-bold text-lg leading-snug group-hover:text-[#F2A93B] transition-colors">
//                       {featuredProducts[currentSlide].name}
//                     </h3>
//                   </div>
//                 </Link>

//                 {/* Dynamic Bullet Points */}
//                 <div className="space-y-2 mb-4">
//                   {featuredProducts[currentSlide].bullets.map((bullet, idx) => (
//                     <div key={idx} className="flex items-center text-xs text-[#B8BFC9]">
//                       <CheckCircle2 className="w-4 h-4 text-[#E23428] mr-2 flex-shrink-0" />
//                       <span>{bullet}</span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Card Action Link & Dots */}
//                 <div className="pt-3 border-t border-[#262B32] flex items-center justify-between">
//                   <Link
//                     to={`/category/${featuredProducts[currentSlide].slug}`}
//                     className="text-xs font-semibold text-[#F0654F] hover:text-[#F2A93B] flex items-center group"
//                   >
//                     View Product Specs
//                     <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
//                   </Link>

//                   <div className="flex space-x-1">
//                     {featuredProducts.map((_, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => setCurrentSlide(idx)}
//                         className={`h-1.5 rounded-full transition-all duration-300 ${
//                           currentSlide === idx ? "w-5 bg-[#E23428]" : "w-1.5 bg-[#3A4048]"
//                         }`}
//                         aria-label={`Go to slide ${idx + 1}`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Certification Ticker — hazard-tape trust strip (signature element) */}
//       <div className="ticker-strip">
//         <div className="ticker-track">
//           {[...CERTIFICATIONS, ...CERTIFICATIONS].map((cert, idx) => (
//             <span className="ticker-item" key={idx}>
//               <BadgeCheck className="w-4 h-4 text-[#F2A93B] mr-2 flex-shrink-0" />
//               {cert}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="py-20 bg-[#F4F5F3] w-full">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//           <div className="text-center mb-16">
//             <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#E23428] font-mono">
//               Why Buyers Stay With Us
//             </span>
//             <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F23] mt-3 mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
//               Why Industry Leaders Choose Us
//             </h2>
//             <p className="text-lg text-[#5B6472] max-w-2xl mx-auto">
//               Excellence through documentation, quality, and unmatched service standards.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((f, idx) => (
//               <FeaturePlate key={f.title} {...f} index={idx} />
//             ))}
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap');

//         .ind-home {
//           font-family: 'Inter', sans-serif;
//         }
//         .ind-home .font-mono {
//           font-family: 'JetBrains Mono', monospace;
//         }

//         .hero-bg {
//           background: linear-gradient(135deg, #1C1F23 0%, #24272C 45%, #1A1C20 100%);
//         }

//         .hero-headline {
//           font-family: 'Oswald', sans-serif;
//           font-weight: 600;
//           font-size: clamp(2.25rem, 5vw, 3.75rem);
//           line-height: 1.08;
//           letter-spacing: -0.01em;
//           color: #F4F5F3;
//           text-transform: uppercase;
//         }
//         .hero-headline-accent {
//           background: linear-gradient(90deg, #F2A93B 0%, #E23428 100%);
//           -webkit-background-clip: text;
//           background-clip: text;
//           color: transparent;
//           margin-top: 0.15em;
//         }

//         /* Staggered hero entrance */
//         .reveal-item {
//           opacity: 0;
//           transform: translateY(18px);
//           transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
//         }
//         .reveal-item.is-in {
//           opacity: 1;
//           transform: translateY(0);
//         }

//         /* Blueprint corner crop marks */
//         .hero-cropmark {
//           position: absolute;
//           width: 28px;
//           height: 28px;
//           border-color: rgba(242, 169, 59, 0.35);
//           border-style: solid;
//         }
//         .hero-cropmark-tl {
//           top: 24px; left: 24px;
//           border-width: 2px 0 0 2px;
//         }
//         .hero-cropmark-br {
//           bottom: 24px; right: 24px;
//           border-width: 0 2px 2px 0;
//         }

//         /* Spec plate (hero card) */
//         .spec-plate {
//           position: relative;
//           background: #16181C;
//           border: 1px solid #2E333B;
//           border-radius: 1rem;
//           padding: 1.5rem;
//           box-shadow: 0 25px 60px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03);
//         }

//         .rivet {
//           position: absolute;
//           width: 8px;
//           height: 8px;
//           border-radius: 9999px;
//           background: radial-gradient(circle at 35% 30%, #545B66, #23262B 70%);
//           box-shadow: 0 1px 1px rgba(0,0,0,0.5);
//         }
//         .rivet-tl { top: 10px; left: 10px; }
//         .rivet-tr { top: 10px; right: 10px; }
//         .rivet-bl { bottom: 10px; left: 10px; }
//         .rivet-br { bottom: 10px; right: 10px; }

//         /* Inspection scan-line flash on slide change */
//         .scan-line {
//           position: absolute;
//           left: 0; right: 0;
//           top: 0;
//           height: 2px;
//           background: linear-gradient(90deg, transparent, #F2A93B, transparent);
//           box-shadow: 0 0 12px 2px rgba(242, 169, 59, 0.7);
//           animation: scan-sweep 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
//           pointer-events: none;
//         }
//         @keyframes scan-sweep {
//           0% { top: 0%; opacity: 0.9; }
//           100% { top: 100%; opacity: 0; }
//         }

//         .slide-image-in {
//           animation: image-fade-in 0.5s ease both;
//         }
//         @keyframes image-fade-in {
//           from { opacity: 0; transform: scale(1.04); }
//           to { opacity: 1; transform: scale(1); }
//         }

//         /* Certification ticker — hazard tape */
//         .ticker-strip {
//           position: relative;
//           width: 100%;
//           overflow: hidden;
//           background: #16181C;
//           border-top: 3px solid;
//           border-bottom: 3px solid;
//           border-image: repeating-linear-gradient(-45deg, #F2A93B 0 12px, #16181C 12px 24px) 3;
//           padding: 0.85rem 0;
//         }
//         .ticker-track {
//           display: flex;
//           width: max-content;
//           animation: ticker-scroll 32s linear infinite;
//         }
//         .ticker-item {
//           display: flex;
//           align-items: center;
//           white-space: nowrap;
//           color: #D6DAE1;
//           font-family: 'JetBrains Mono', monospace;
//           font-weight: 700;
//           font-size: 0.8rem;
//           letter-spacing: 0.15em;
//           padding: 0 2.25rem;
//           border-right: 1px solid #2E333B;
//         }
//         @keyframes ticker-scroll {
//           from { transform: translateX(0); }
//           to { transform: translateX(-50%); }
//         }
//         .ticker-strip:hover .ticker-track {
//           animation-play-state: paused;
//         }

//         /* Feature data-plates */
//         .feature-plate {
//           position: relative;
//           text-align: center;
//           padding: 2.5rem 1.75rem;
//           border-radius: 1rem;
//           background: #FFFFFF;
//           border: 1px solid #E4E6E9;
//           transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1),
//                       box-shadow 0.3s ease, border-color 0.3s ease;
//         }
//         .feature-plate:hover {
//           transform: translateY(-6px) !important;
//           box-shadow: 0 20px 40px -20px rgba(28,31,35,0.25);
//           border-color: #D8DBDF;
//         }
//         .feature-plate .rivet {
//           background: radial-gradient(circle at 35% 30%, #FFFFFF, #C7CCD3 70%);
//           border: 1px solid #D3D7DC;
//         }
//         .feature-icon-well {
//           width: 72px;
//           height: 72px;
//           margin: 0 auto 1.5rem;
//           border-radius: 9999px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: #F4F5F3;
//           border: 1px solid #E4E6E9;
//           box-shadow: inset 0 2px 4px rgba(28,31,35,0.06);
//           transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s ease;
//         }
//         .feature-plate:hover .feature-icon-well {
//           transform: scale(1.08) rotate(-4deg);
//           background: color-mix(in srgb, var(--accent) 10%, #F4F5F3);
//         }
//         .feature-title {
//           font-family: 'Oswald', sans-serif;
//           font-weight: 600;
//           font-size: 1.15rem;
//           letter-spacing: 0.01em;
//           color: #1C1F23;
//           margin-bottom: 0.6rem;
//           text-transform: uppercase;
//         }
//         .feature-desc {
//           font-size: 0.9rem;
//           line-height: 1.5;
//           color: #6B7280;
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .reveal-item, .feature-plate, .slide-image-in, .scan-line, .ticker-track {
//             animation: none !important;
//             transition: none !important;
//             opacity: 1 !important;
//             transform: none !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  ArrowRight, Shield, Truck, Award, Users, 
  ChevronLeft, ChevronRight, CheckCircle2 
} from "lucide-react";

export default function IndustrialHomepage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Featured slider items
  const featuredProducts = [
    {
      id: 1,
      name: "IBR Certified Valves & Fittings",
      // category: "High Demand",
      image: "/IBR.jpeg",
      bullets: [
        // "Full Inspection Documentation",
        // "Batch Testing & Metallurgy Proof"
      ],
      slug: "ibr-materials"
    },
    {
      id: 2,
      name: "Industrial Welding Rods",
      // category: "Engineering Grade",
      image: "/Welding-consumables.png",
      bullets: [
        // "High-tensile stress applications",
        // "ISO Certified Electrodes"
      ],
      slug: "engineering-hardware"  
    },
    {
      id: 3,
      name: "Abrasives",
      // category: "Engineering Hardware",
      mainCategorySlug: "engineering-hardware",
      image: "/Abrasives-2.png",
      bullets: [
        // "Grinding wheels",
        // "Cut-off wheels",
        // "Flap discs",
        // "Wire brushes"
      ],
      slug: "engineering-hardware"
    },
    {
      id: 4,
      name: "Pharma Aluminium Bags",
      // category: "Sterile Packaging",
      image: "/Aluminiumbags.png",
      bullets: [
        // "High-density moisture barrier",
        // "Compliant for pharma storage"
      ],
      slug: "pharma-materials"
    },

    {
      id: 5,
      name: "Industrial Valves",
      // category: "Industrial Valves",
      mainCategorySlug: "industrial-valves",
      image: "/valves.png",
      bullets: [
        // "IBR Certified",
        // "High-quality materials"
      ],
      slug: "industrial-valves"
    },
  ];

  // Auto-play timer for hero feature slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full">

      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-800 overflow-hidden flex items-center justify-center w-full py-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>

          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(239, 68, 68, 0.1) 35px,
              rgba(239, 68, 68, 0.1) 36px
            )`
          }}></div>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column - Hero Copy with Transparent Branding */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="mb-6 flex items-center justify-center lg:justify-start space-x-3 bg-transparent">
                <span className="inline-flex items-center text-slate-200 text-sm font-semibold tracking-wide">
                  <Award className="h-5 w-5 mr-2 text-amber-400" />
                  Trusted Since 2008
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                One stop solution for <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  IBR Pipes, Fittings, Valves & Industrial Supplies
                </span>
              </h1>
              <br />

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => window.dispatchEvent(new Event('openProductCategoriesDropdown'))}
                  className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3.5 rounded-xl font-bold text-base hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center"
                >
                  Browse Catalog
                  <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  to="/contact"
                  className="border-2 border-white/80 text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-white hover:text-red-900 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  Request Quote
                </Link>
              </div>
            </div>

            {/* Right Column - Hero Side Slider Card */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
              {/* <div className="bg-slate-950/90 border border-slate-800/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl relative"> */}
              {/* <div className="bg-[rgba(237,223,202,0.8)] border border-[rgba(237,223,202,0.4)] backdrop-blur-md rounded-2xl p-6 shadow-2xl relative"> */}
              <div className="bg-slate-900/60 border border-red-500/20 backdrop-blur-xl rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
              {/* <div className="bg-red-950/40 border border-red-500/30 backdrop-blur-md rounded-2xl p-6 shadow-2xl relative"> */}
              {/* <div className="bg-slate-950/80 border border-slate-800 backdrop-blur-md rounded-2xl p-6 shadow-2xl relative"> */}


                {/* Header Info */}
                <div className="flex justify-between items-center mb-4">
                  {/* <span className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">
                    Featured Highlight
                  </span> */}
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <button 
                        onClick={prevSlide}
                        className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                        aria-label="Previous Slide"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={nextSlide}
                        className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                        aria-label="Next Slide"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Clickable Slider Image Window */}
                <Link 
                  to={`/category/${featuredProducts[currentSlide].slug}`}
                  className="group block relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-slate-800 cursor-pointer"
                >
                  <img
                    src={featuredProducts[currentSlide].image}
                    alt={featuredProducts[currentSlide].name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block text-[10px] font-bold text-amber-300 bg-amber-400/20 border border-amber-400/30 px-2 py-0.5 rounded mb-1">
                      {featuredProducts[currentSlide].category}
                    </span>
                    <h3 className="text-white font-bold text-lg leading-snug group-hover:text-amber-300 transition-colors">
                      {featuredProducts[currentSlide].name}
                    </h3>
                  </div>
                </Link>

                {/* Dynamic Bullet Points */}
                <div className="space-y-2 mb-4">
                  {featuredProducts[currentSlide].bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Card Action Link & Dots */}
                <div className="pt-3 border-t border-slate-900 flex items-center justify-between">
                  <Link
                    to={`/category/${featuredProducts[currentSlide].slug}`}
                    className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center group"
                  >
                    View Product Specs
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="flex space-x-1">
                    {featuredProducts.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          currentSlide === idx ? "w-5 bg-red-500" : "w-1.5 bg-slate-700"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      Features Section
      <div className="py-20 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Industry Leaders Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Excellence through innovation, quality, and unmatched service standards.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-red-100">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-orange-100">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Truck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Swift Delivery</h3>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-purple-100">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Industry Expertise</h3>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-green-100">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dedicated Support</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
