// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { 
//   ArrowRight, Shield, Truck, Award, Users, 
//   ChevronLeft, ChevronRight, CheckCircle2 
// } from "lucide-react";

// export default function IndustrialHomepage() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Featured slider items
//   const featuredProducts = [
//     {
//       id: 1,
//       name: "IBR Certified Valves & Fittings",
//       // category: "High Demand",
//       image: "/IBR.jpeg",
//       bullets: [
//         // "Full Inspection Documentation",
//         // "Batch Testing & Metallurgy Proof"
//       ],
//       slug: "ibr-materials"
//     },
//     {
//       id: 2,
//       name: "Industrial Welding Rods",
//       // category: "Engineering Grade",
//       image: "/Welding-consumables.png",
//       bullets: [
//         // "High-tensile stress applications",
//         // "ISO Certified Electrodes"
//       ],
//       slug: "engineering-hardware"  
//     },
//     {
//       id: 3,
//       name: "Abrasives",
//       // category: "Engineering Hardware",
//       mainCategorySlug: "engineering-hardware",
//       image: "/Abrasives-2.png",
//       bullets: [
//         // "Grinding wheels",
//         // "Cut-off wheels",
//         // "Flap discs",
//         // "Wire brushes"
//       ],
//       slug: "engineering-hardware"
//     },
//     {
//       id: 4,
//       name: "Pharma Aluminium Bags",
//       // category: "Sterile Packaging",
//       image: "/Aluminiumbags.png",
//       bullets: [
//         // "High-density moisture barrier",
//         // "Compliant for pharma storage"
//       ],
//       slug: "pharma-materials"
//     },

//     {
//       id: 5,
//       name: "Industrial Valves",
//       // category: "Industrial Valves",
//       mainCategorySlug: "industrial-valves",
//       image: "/valves.png",
//       bullets: [
//         // "IBR Certified",
//         // "High-quality materials"
//       ],
//       slug: "industrial-valves"
//     },
//   ];

//   // Auto-play timer for hero feature slider
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, [featuredProducts.length]);

//   const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
//   const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50 w-full">

//       {/* Hero Section */}
//       <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-800 overflow-hidden flex items-center justify-center w-full py-16">
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0">
//           <div className="absolute top-20 left-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

//           <div className="absolute inset-0 opacity-20" style={{
//             backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
//                              linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)`,
//             backgroundSize: '50px 50px'
//           }}></div>

//           <div className="absolute inset-0 opacity-10" style={{
//             backgroundImage: `repeating-linear-gradient(
//               45deg,
//               transparent,
//               transparent 35px,
//               rgba(239, 68, 68, 0.1) 35px,
//               rgba(239, 68, 68, 0.1) 36px
//             )`
//           }}></div>
//         </div>

//         <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
//           <div className="grid lg:grid-cols-12 gap-12 items-center">
            
//             {/* Left Column - Hero Copy with Transparent Branding */}
//             <div className="lg:col-span-7 text-center lg:text-left">
//               <div className="mb-6 flex items-center justify-center lg:justify-start space-x-3 bg-transparent">
//                 <span className="inline-flex items-center text-slate-200 text-sm font-semibold tracking-wide">
//                   <Award className="h-5 w-5 mr-2 text-amber-400" />
//                   Trusted Since 2008
//                 </span>
//               </div>

//               <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold text-white mb-6 leading-tight">
//                 One stop solution for <br />
//                 <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
//                   IBR Pipes, Fittings, Valves & Industrial Supplies
//                 </span>
//               </h1>
//               <br />

//               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <button
//                   onClick={() => window.dispatchEvent(new Event('openProductCategoriesDropdown'))}
//                   className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3.5 rounded-xl font-bold text-base hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center"
//                 >
//                   Browse Catalog
//                   <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//                 <Link
//                   to="/contact"
//                   className="border-2 border-white/80 text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-white hover:text-red-900 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
//                 >
//                   Request Quote
//                 </Link>
//               </div>
//             </div>

//             {/* Right Column - Hero Side Slider Card */}
//             <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
//               {/* <div className="bg-slate-950/90 border border-slate-800/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl relative"> */}
//               {/* <div className="bg-[rgba(237,223,202,0.8)] border border-[rgba(237,223,202,0.4)] backdrop-blur-md rounded-2xl p-6 shadow-2xl relative"> */}
//               <div className="bg-slate-900/60 border border-red-500/20 backdrop-blur-xl rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
//               {/* <div className="bg-red-950/40 border border-red-500/30 backdrop-blur-md rounded-2xl p-6 shadow-2xl relative"> */}
//               {/* <div className="bg-slate-950/80 border border-slate-800 backdrop-blur-md rounded-2xl p-6 shadow-2xl relative"> */}


//                 {/* Header Info */}
//                 <div className="flex justify-between items-center mb-4">
//                   {/* <span className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">
//                     Featured Highlight
//                   </span> */}
//                   <div className="flex items-center space-x-2">
//                     <div className="flex space-x-1">
//                       <button 
//                         onClick={prevSlide}
//                         className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
//                         aria-label="Previous Slide"
//                       >
//                         <ChevronLeft className="w-4 h-4" />
//                       </button>
//                       <button 
//                         onClick={nextSlide}
//                         className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
//                         aria-label="Next Slide"
//                       >
//                         <ChevronRight className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Clickable Slider Image Window */}
//                 <Link 
//                   to={`/category/${featuredProducts[currentSlide].slug}`}
//                   className="group block relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-slate-800 cursor-pointer"
//                 >
//                   <img
//                     src={featuredProducts[currentSlide].image}
//                     alt={featuredProducts[currentSlide].name}
//                     className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent group-hover:opacity-90 transition-opacity" />
                  
//                   <div className="absolute bottom-3 left-3 right-3">
//                     <span className="inline-block text-[10px] font-bold text-amber-300 bg-amber-400/20 border border-amber-400/30 px-2 py-0.5 rounded mb-1">
//                       {featuredProducts[currentSlide].category}
//                     </span>
//                     <h3 className="text-white font-bold text-lg leading-snug group-hover:text-amber-300 transition-colors">
//                       {featuredProducts[currentSlide].name}
//                     </h3>
//                   </div>
//                 </Link>

//                 {/* Dynamic Bullet Points */}
//                 <div className="space-y-2 mb-4">
//                   {featuredProducts[currentSlide].bullets.map((bullet, idx) => (
//                     <div key={idx} className="flex items-center text-xs text-slate-300">
//                       <CheckCircle2 className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
//                       <span>{bullet}</span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Card Action Link & Dots */}
//                 <div className="pt-3 border-t border-slate-900 flex items-center justify-between">
//                   <Link
//                     to={`/category/${featuredProducts[currentSlide].slug}`}
//                     className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center group"
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
//                           currentSlide === idx ? "w-5 bg-red-500" : "w-1.5 bg-slate-700"
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

//       Features Section
//       <div className="py-20 bg-gray-50 w-full">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Industry Leaders Choose Us</h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">Excellence through innovation, quality, and unmatched service standards.</p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-red-100">
//               <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
//                 <Shield className="h-10 w-10 text-white" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
//             </div>

//             <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-orange-100">
//               <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
//                 <Truck className="h-10 w-10 text-white" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Swift Delivery</h3>
//             </div>

//             <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-purple-100">
//               <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
//                 <Award className="h-10 w-10 text-white" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Industry Expertise</h3>
//             </div>

//             <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-green-100">
//               <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
//                 <Users className="h-10 w-10 text-white" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Dedicated Support</h3>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  ShieldCheck,
  Truck,
  Award,
  UserCheck,
  Cylinder,
  Gauge,
  CircleDot,
  Cog,
  FlaskConical,
} from "lucide-react";

export default function IndustrialHomepage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero "inspection tag" slider — same products as before, restyled as
  // spec-sheet data rather than a generic product-photo card.
  const featuredProducts = [
    { id: 1, name: "IBR Certified Valves & Fittings", image: "/IBR.jpeg", slug: "ibr-materials", category: "IBR Fittings" },
    { id: 2, name: "Industrial Welding Rods", image: "/Welding-consumables.png", slug: "engineering-hardware", category: "Engineering Hardware" },
    { id: 3, name: "Abrasives", image: "/Abrasives-2.png", slug: "engineering-hardware", category: "Engineering Hardware" },
    { id: 4, name: "Pharma Aluminium Bags", image: "/Aluminiumbags.png", slug: "pharma-materials", category: "Pharma Materials" },
    { id: 5, name: "Industrial Valves", image: "/valves.png", slug: "industrial-valves", category: "Industrial Valves" },
  ];

  const categories = [
    { title: "Industrial Pipes", slug: "industrial-pipes", icon: Cylinder, desc: "Seamless & ERW pipes for process lines." },
    { title: "IBR Pipe Fittings", slug: "ibr-materials", icon: Gauge, desc: "Certified pressure plates & thermal fittings." },
    { title: "Industrial Valves", slug: "industrial-valves", icon: CircleDot, desc: "Gate, globe & pneumatic actuator valves." },
    { title: "Engineering Hardware", slug: "engineering-hardware", icon: Cog, desc: "Welding rods, Taparia tools, abrasives." },
    { title: "Pharma Materials", slug: "pharma-materials", icon: FlaskConical, desc: "Aluminium bags for sterile storage." },
  ];

  const specs = [
    { icon: ShieldCheck, title: "IBR-Certified Stock", desc: "Every valve, pipe and fitting ships with batch test reports and IBR certificates ready when your site inspector asks." },
    { icon: Truck, title: "48–72 Hour Dispatch", desc: "Orders leave our Vadodara warehouse within three working days, tracked door-to-door across India." },
    { icon: Award, title: "17 Years On The Floor", desc: "Sourcing IBR, pharma-grade and engineering hardware since 2008 — we know what a rejected batch costs you." },
    { icon: UserCheck, title: "Long term business relationship", desc: "We believe in building long term business relationship with our clients." },
  ];

  const certifications = [
    "IBR CERTIFIED", "ISO 9001:2015", "BATCH TESTED",
    "METALLURGY VERIFIED", "PAN-INDIA DISPATCH", "TRUSTED SINCE 2008",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  const active = featuredProducts[currentSlide];

  return (
    <div className="jt-home w-full bg-[#EEF0EC]">

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pt-10 pb-14 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24">
        {/* Blueprint grid backdrop */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.55]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(31,58,95,0.20) 1px, transparent 1px), linear-gradient(90deg, rgba(31,58,95,0.20) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div className="relative max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center">

            {/* Copy column */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <span className="jt-mono inline-flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#1F3A5F] border border-[#1F3A5F]/25 rounded-sm px-3 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
                Vadodara, India · Trading Since 2008
              </span>

              <h1 className="jt-display text-[#C8102E] uppercase font-extrabold leading-[0.95] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-6xl 2xl:text-7xl mb-6">
                ONE STOP SOLUTION<br></br>
                {/* <br />
                NDUSTRIAL PIPES, IBR PIPE & fITTINGS, VALVES, HARDWARE & PHARMA MATERIALS.
                <br /> */}
                <span className="text-[#14171A]">FOR INDUSTRIAL PIPES, IBR PIPES, FITTINGS, VALVES, ENGINEERING HARDWARE & PHARMA MATERIALS...</span>
              </h1>

              {/* <p className="text-[#4B5563] text-base sm:text-lg 2xl:text-xl max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                IBR-certified pipes, valves, fittings and engineering hardware —
                sourced, tested and dispatched pan-India, with the paperwork to
                prove it.
              </p> */}

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => window.dispatchEvent(new Event("openProductCategoriesDropdown"))}
                  className="group inline-flex items-center justify-center gap-2 bg-[#C8102E] text-white px-7 sm:px-8 2xl:px-10 py-3 sm:py-3.5 2xl:py-4 rounded-md font-bold text-sm sm:text-base 2xl:text-lg tracking-wide hover:bg-[#a80d26] transition-colors duration-200 shadow-[0_10px_25px_-8px_rgba(200,16,46,0.5)]"
                >
                  Browse Catalog
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#14171A]/80 text-[#14171A] px-7 sm:px-8 2xl:px-10 py-3 sm:py-3.5 2xl:py-4 rounded-md font-bold text-sm sm:text-base 2xl:text-lg tracking-wide hover:bg-[#14171A] hover:text-white transition-colors duration-200"
                >
                  Request Quote
                </Link>
              </div>
            </div>

            {/* Material Inspection Tag — signature hero element */}
            <div className="lg:col-span-5 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0 lg:justify-self-end">
              <div className="jt-tag relative bg-white border border-[#14171A]/15 shadow-[0_25px_60px_-20px_rgba(20,23,26,0.35)] p-5 sm:p-6 -rotate-0 hover:rotate-1 transition-transform duration-500">
                <span className="jt-grommet" />

                {/* Tag header */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-dashed border-[#14171A]/20">
                  {/* <span className="jt-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#4B5563]">
                    Material Inspection Tag
                  </span> */}
                  {/* <span className="jt-mono text-[10px] sm:text-[11px] font-bold text-[#C8102E]">
                    REF. JT-000{active.id}
                  </span> */}
                </div>

                {/* Slider controls */}
                <div className="flex justify-end gap-1.5 mb-2">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous item"
                    className="w-7 h-7 flex items-center justify-center border border-[#14171A]/20 text-[#14171A] hover:bg-[#14171A] hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next item"
                    className="w-7 h-7 flex items-center justify-center border border-[#14171A]/20 text-[#14171A] hover:bg-[#14171A] hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Image window + stamp */}
                <div className="relative mb-4">
                  <Link
                    to={`/category/${active.slug}`}
                    className="group block relative aspect-[4/3] overflow-hidden border border-[#14171A]/10"
                  >
                    <img
                      src={active.image}
                      alt={active.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14171A]/70 via-transparent to-transparent" />
                    <h3 className="absolute bottom-2.5 left-3 right-3 text-white font-bold text-sm sm:text-base leading-snug">
                      {active.name}
                    </h3>
                  </Link>

                  {/* <div className="jt-stamp absolute -bottom-4 -right-4">
                    <div className="jt-stamp-inner">
                      <BadgeCheck className="w-3.5 h-3.5 mb-0.5" />
                      <span>MATERIAL</span>
                      <span>VERIFIED</span>
                    </div>
                  </div> */}
                </div>

                {/* Spec data rows */}
                {/* <dl className="jt-mono text-[11px] sm:text-xs mb-4 space-y-1.5">
                  <div className="flex items-center justify-between py-1 border-b border-dotted border-[#14171A]/15">
                    <dt className="text-[#4B5563] tracking-wide">CATEGORY</dt>
                    <dd className="font-semibold text-[#14171A]">{active.category}</dd>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-dotted border-[#14171A]/15">
                    <dt className="text-[#4B5563] tracking-wide">CERTIFICATION</dt>
                    <dd className="font-semibold text-[#14171A]">IBR / ISO 9001</dd>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-dotted border-[#14171A]/15">
                    <dt className="text-[#4B5563] tracking-wide">DISPATCH</dt>
                    <dd className="font-semibold text-[#14171A]">PAN-INDIA · 48–72 HRS</dd>
                  </div>
                </dl> */}

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <Link
                    to={`/category/${active.slug}`}
                    className="text-xs font-semibold text-[#C8102E] hover:text-[#a80d26] flex items-center gap-1 group"
                  >
                    View Product Specs
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <div className="flex gap-1">
                    {featuredProducts.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Go to item ${idx + 1}`}
                        className={`h-1.5 transition-all duration-300 ${
                          currentSlide === idx ? "w-5 bg-[#C8102E]" : "w-1.5 bg-[#14171A]/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ CERTIFICATION TICKER (hazard-tape divider) ============ */}
      <div className="jt-ticker-strip">
        <div className="jt-ticker-track">
          {[...certifications, ...certifications].map((cert, idx) => (
            <span className="jt-ticker-item" key={idx}>
              <BadgeCheck className="w-4 h-4 text-[#E8A324] mr-2 flex-shrink-0" />
              {cert}
            </span>
          ))}
        </div>
      </div>

      {/* ============ CATEGORY RAIL (riveted steel plates) ============ */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        {/* Blueprint grid backdrop */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.95]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(31,58,95,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(31,58,95,0.18) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        <div className="relative max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="mb-10 sm:mb-14">
            <span className="jt-mono block text-[11px] tracking-[0.25em] uppercase text-[#C8102E] mb-2">
              Product Lines
            </span>
            {/* <h2 className="jt-display uppercase font-extrabold text-[#14171A] text-2xl sm:text-3xl lg:text-4xl tracking-tight">
              Five Categories. One Supplier.
            </h2> */}
          </div>

          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className="jt-plate group relative flex-shrink-0 w-[72%] xs:w-[60%] sm:w-[42%] lg:w-full bg-[#14171A] p-5 sm:p-6 snap-start"
                >
                  <span className="jt-rivet" style={{ top: 8, left: 8 }} />
                  <span className="jt-rivet" style={{ top: 8, right: 8 }} />
                  <span className="jt-rivet" style={{ bottom: 8, left: 8 }} />
                  <span className="jt-rivet" style={{ bottom: 8, right: 8 }} />

                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-sm bg-[#C8102E]/15 flex items-center justify-center mb-4 group-hover:bg-[#C8102E]/25 transition-colors">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#E8A324]" />
                  </div>
                  <h3 className="jt-display uppercase font-bold text-white text-base sm:text-lg tracking-wide mb-1.5">
                    {cat.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                    {cat.desc}
                  </p>
                  <span className="block h-0.5 w-8 bg-[#C8102E] group-hover:w-full transition-all duration-300" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ SPEC SHEET (why buyers stay) ============ */}
      <section className="bg-white py-14 sm:py-20 border-t border-[#14171A]/10">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="mb-10 sm:mb-14 text-center lg:text-left">
            <div className="inline-flex lg:flex items-center gap-1 mb-3">
              <span className="w-6 h-1.5 bg-[#C8102E]" />
              <span className="w-6 h-1.5 bg-[#E8A324]" />
              <span className="w-6 h-1.5 bg-[#1F3A5F]" />
            </div>
            <span className="jt-mono block text-[11px] tracking-[0.25em] uppercase text-[#C8102E] mb-2">
              Why Buyers Stay
            </span>
            <h2 className="jt-display uppercase font-extrabold text-[#14171A] text-2xl sm:text-3xl lg:text-4xl tracking-tight">
              What You're Actually Buying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#14171A]/12">
            {specs.map((spec) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.title}
                  className="jt-spec-row group relative flex gap-4 sm:gap-5 p-6 sm:p-8 border-r border-b border-[#14171A]/12"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 rounded-sm bg-[#EEF0EC] border border-[#14171A]/10 flex items-center justify-center group-hover:border-[#C8102E]/40 transition-colors">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#1F3A5F]" />
                  </div>
                  <div>
                    <h3 className="jt-display uppercase font-bold text-[#14171A] text-base sm:text-lg tracking-wide mb-1.5">
                      {spec.title}
                    </h3>
                    <p className="text-[#4B5563] text-sm sm:text-[15px] leading-relaxed">
                      {spec.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ BOTTOM CTA BAND ============ */}
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
          <h2 className="jt-display uppercase font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-4">
            Need Pricing On A Bulk Order?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Send your site's BOQ or drawing and we'll quote within one working day.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#C8102E] text-white px-8 py-3.5 rounded-md font-bold text-sm sm:text-base tracking-wide hover:bg-[#a80d26] transition-colors duration-200"
          >
            Request Bulk Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600;700&display=swap');

        .jt-home { font-family: 'IBM Plex Sans', sans-serif; }
        .jt-display { font-family: 'Big Shoulders Display', sans-serif; }
        .jt-mono { font-family: 'IBM Plex Mono', monospace; }

        /* Hang-tag corner clip + grommet hole */
        .jt-tag {
          clip-path: polygon(26px 0, 100% 0, 100% 100%, 0 100%, 0 26px);
        }
        .jt-grommet {
          position: absolute;
          top: 9px;
          left: 9px;
          width: 13px;
          height: 13px;
          border-radius: 9999px;
          background: #EEF0EC;
          box-shadow: 0 0 0 2px rgba(20,23,26,0.28);
        }

        /* Verification stamp */
        .jt-stamp {
          width: 62px;
          height: 62px;
          border-radius: 9999px;
          background: #fff;
          border: 2px solid #C8102E;
          transform: rotate(-11deg);
          box-shadow: 0 6px 14px rgba(20,23,26,0.2);
        }
        .jt-stamp-inner {
          position: absolute;
          inset: 5px;
          border-radius: 9999px;
          border: 1px dashed #C8102E;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #C8102E;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 6.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          line-height: 1.3;
        }

        /* Riveted plate corners */
        .jt-rivet {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 9999px;
          background: radial-gradient(circle at 35% 30%, #6b7280, #23262b 70%);
          box-shadow: 0 1px 1px rgba(0,0,0,0.5);
        }

        /* Hazard-tape certification ticker */
        .jt-ticker-strip {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #14171A;
          border-top: 3px solid;
          border-bottom: 3px solid;
          border-image: repeating-linear-gradient(-45deg, #E8A324 0 12px, #14171A 12px 24px) 3;
          padding: 0.75rem 0;
        }
        .jt-ticker-track {
          display: flex;
          width: max-content;
          animation: jt-ticker-scroll 30s linear infinite;
        }
        .jt-ticker-item {
          display: flex;
          align-items: center;
          white-space: nowrap;
          color: #D6DAE1;
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 600;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          padding: 0 2rem;
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        @keyframes jt-ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .jt-ticker-strip:hover .jt-ticker-track {
          animation-play-state: paused;
        }

        .jt-spec-row:hover {
          background: #EEF0EC;
        }
        .jt-spec-row::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 0;
          background: #C8102E;
          transition: width 0.25s ease;
        }
        .jt-spec-row:hover::before {
          width: 3px;
        }

        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { scrollbar-width: none; }

        @media (prefers-reduced-motion: reduce) {
          .jt-ticker-track { animation: none !important; }
          .jt-tag { transition: none !important; }
        }
      `}</style>
    </div>
  );
}