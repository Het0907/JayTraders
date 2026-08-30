import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="jt-footer bg-[#14171A] text-white border-t-2 border-[#E8A324] relative overflow-hidden">
            {/* Subtle blueprint grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.35]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-14 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
                    
                    {/* Brand & Identity Column */}
                    <div className="lg:col-span-4 space-y-4">
                        <Link to="/" className="flex items-center gap-3 group inline-flex">
                            <img
                                src="/logo.png"
                                alt="Jay Traders Logo"
                                className="h-12 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform duration-200"
                            />
                            <span className="jt-display text-3xl sm:text-4xl font-black uppercase tracking-wider text-[#C8102E] group-hover:text-[#a80d26] transition-colors">
                                Jay Traders
                            </span>
                        </Link>

                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            Authorised stockist & supplier of IBR-certified pipes, valves, pipe fittings, engineering hardware, and pharmaceutical sterile packaging materials.
                        </p>

                        <div className="pt-2 flex flex-wrap gap-2">
                            <span className="jt-mono inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] bg-white/5 border border-white/10 px-2.5 py-1 text-[#E8A324] rounded-sm">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                IBR CERTIFIED
                            </span>
                            <span className="jt-mono inline-flex items-center text-[10px] uppercase tracking-[0.15em] bg-white/5 border border-white/10 px-2.5 py-1 text-slate-300 rounded-sm">
                                EST. 2008
                            </span>
                            <span className="jt-mono inline-flex items-center text-[10px] uppercase tracking-[0.15em] bg-white/5 border border-white/10 px-2.5 py-1 text-slate-300 rounded-sm">
                                VADODARA, GUJARAT
                            </span>
                        </div>
                    </div>

                    {/* Quick Navigation */}
                    <div className="lg:col-span-2">
                        <span className="jt-mono block text-[11px] tracking-[0.2em] uppercase text-[#E8A324] mb-3 border-b border-white/10 pb-2">
                            Navigation
                        </span>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link to="/home" className="text-slate-300 hover:text-[#C8102E] transition-colors flex items-center gap-1.5 group">
                                    <span className="h-1 w-1 rounded-full bg-[#C8102E] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-slate-300 hover:text-[#C8102E] transition-colors flex items-center gap-1.5 group">
                                    <span className="h-1 w-1 rounded-full bg-[#C8102E] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-slate-300 hover:text-[#C8102E] transition-colors flex items-center gap-1.5 group">
                                    <span className="h-1 w-1 rounded-full bg-[#C8102E] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Contact & Quotations
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="/catalog/Catalogue-JayTraders.pdf"
                                    download="Catalogue-JayTraders.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-300 hover:text-[#C8102E] transition-colors flex items-center gap-1.5 group"
                                >
                                    <span className="h-1 w-1 rounded-full bg-[#C8102E] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Download Catalog
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Industrial Categories */}
                    <div className="lg:col-span-3">
                        <span className="jt-mono block text-[11px] tracking-[0.2em] uppercase text-[#E8A324] mb-3 border-b border-white/10 pb-2">
                            Product Lines
                        </span>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link to="/category/industrial-pipes" className="text-slate-300 hover:text-[#C8102E] transition-colors">
                                    Industrial Pipes & Boiler Tubes
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/ibr-materials" className="text-slate-300 hover:text-[#C8102E] transition-colors">
                                    IBR Pipe Fittings & Flanges
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/industrial-valves" className="text-slate-300 hover:text-[#C8102E] transition-colors">
                                    Industrial Valves (Gate, Globe, Ball)
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/engineering-hardware" className="text-slate-300 hover:text-[#C8102E] transition-colors">
                                    Engineering Hardware & Tools
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/pharma-materials" className="text-slate-300 hover:text-[#C8102E] transition-colors">
                                    Pharma Aluminium Packaging Bags
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Facility & Contact Details */}
                    <div className="lg:col-span-3">
                        <span className="jt-mono block text-[11px] tracking-[0.2em] uppercase text-[#E8A324] mb-3 border-b border-white/10 pb-2">
                            Facility & Dispatch
                        </span>
                        <ul className="space-y-3.5 text-sm">
                            <li className="flex items-start gap-2.5 text-slate-300">
                                <MapPin className="h-5 w-5 text-[#C8102E] shrink-0 mt-0.5" />
                                <span className="leading-snug">
                                    303/1/2 Makarpura GIDC,<br />
                                    Near Telephone Exchange,<br />
                                    Vadodara, Gujarat - 390010
                                </span>
                            </li>
                            <li className="flex items-center gap-2.5 text-slate-300">
                                <Phone className="h-4 w-4 text-[#E8A324] shrink-0" />
                                <div className="flex flex-col sm:flex-row sm:gap-2">
                                    <a href="tel:+919925031497" className="hover:text-[#C8102E] transition-colors">+91 9925031497</a>
                                    <span className="hidden sm:inline text-slate-600">/</span>
                                    <a href="tel:+919904301497" className="hover:text-[#C8102E] transition-colors">+91 9904301497</a>
                                </div>
                            </li>
                            <li className="flex items-center gap-2.5 text-slate-300">
                                <Mail className="h-4 w-4 text-[#E8A324] shrink-0" />
                                <a href="mailto:jaytraders2008@gmail.com" className="hover:text-[#C8102E] transition-colors">
                                    jaytraders2008@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Industrial Bottom Bar */}
                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                    <p className="jt-mono">
                        &copy; {new Date().getFullYear()} JAY TRADERS. ALL SPECIFICATIONS SUBJECT TO VERIFICATION.
                    </p>
                    <div className="flex items-center space-x-6">
                        <Link to="/contact" className="text-[#E8A324] hover:text-white transition-colors font-semibold">
                            Request Bulk Quote &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;