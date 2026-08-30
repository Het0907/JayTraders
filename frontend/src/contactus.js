import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Building2,
  User,
  CheckCircle,
  FileText,
  Clock
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import API_ENDPOINTS from './config/api';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const product = params.get('product');
    const subject = params.get('subject');

    if (product) {
      setFormData(prev => ({
        ...prev,
        subject: subject || 'quotation',
        message: `I would like to inquire about ${product}. Please share availability, test certificate compliance, and quotation details.`
      }));
    }
  }, [location.search]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(false);

    try {
      const response = await axios.post(`${API_ENDPOINTS.BASE_URL}/api/contact`, formData);
      
      if (response.status === 200) {
        setIsSubmitted(true);
        toast.success('Your quotation request has been submitted successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        });
        setTimeout(() => {
          setIsSubmitted(false);
        }, 6000);
      } else {
        console.error('Form submission failed with status:', response.status, response.data);
        toast.error('Failed to submit request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.response?.data?.message || 'Failed to submit request. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="jt-contact w-full bg-[#EEF0EC] min-h-screen">
      
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
              EST. 2008 · DIRECT QUOTATION & DISPATCH DESK
            </span>

            <h1 className="jt-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#14171A] leading-[0.95] mb-6">
              Request Quotation <span className="text-[#C8102E]">& Plant Supplies</span>
            </h1>

            <p className="text-[#4B5563] text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl">
              Submit your Bill of Quantities (BOQ), material specifications, or immediate plant maintenance requirements. Our Vadodara sales engineers quote within one working day.
            </p>
          </div>
        </div>
      </section>

      {/* ============ MAIN CONTENT AREA ============ */}
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
        
        {/* Success Alert Banner */}
        {isSubmitted && (
          <div className="mb-8 bg-[#14171A] border-l-4 border-[#C8102E] text-white p-5 sm:p-6 shadow-xl flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-[#E8A324] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="jt-display text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                Inquiry Logged Successfully
              </h3>
              <p className="text-slate-300 text-sm mt-1">
                Your material request has been received by our Vadodara dispatch team. We will review your specs and respond within 24 hours.
              </p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white border border-[#14171A]/15 p-6 sm:p-10 shadow-[0_20px_50px_-20px_rgba(20,23,26,0.2)] relative">
            <span className="jt-rivet" style={{ top: 8, left: 8 }} />
            <span className="jt-rivet" style={{ top: 8, right: 8 }} />
            <span className="jt-rivet" style={{ bottom: 8, left: 8 }} />
            <span className="jt-rivet" style={{ bottom: 8, right: 8 }} />

            <div className="flex items-center justify-between pb-4 mb-6 border-b border-dashed border-[#14171A]/20">
              <span className="jt-mono text-xs font-bold tracking-[0.2em] uppercase text-[#C8102E] flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Material Requisition Sheet
              </span>
              <span className="jt-mono text-[11px] text-[#4B5563]">FORM JT-REQ-01</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="jt-mono block text-[11px] font-bold tracking-wider uppercase text-[#14171A] mb-1.5">
                    Contact Person *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-3.5 py-3 text-sm bg-[#EEF0EC]/50 border border-[#14171A]/20 focus:bg-white focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-colors"
                      placeholder="e.g. Rajesh Patel"
                    />
                  </div>
                </div>

                <div>
                  <label className="jt-mono block text-[11px] font-bold tracking-wider uppercase text-[#14171A] mb-1.5">
                    Official Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-3.5 py-3 text-sm bg-[#EEF0EC]/50 border border-[#14171A]/20 focus:bg-white focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-colors"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="jt-mono block text-[11px] font-bold tracking-wider uppercase text-[#14171A] mb-1.5">
                    Direct Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-3.5 py-3 text-sm bg-[#EEF0EC]/50 border border-[#14171A]/20 focus:bg-white focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="jt-mono block text-[11px] font-bold tracking-wider uppercase text-[#14171A] mb-1.5">
                    Company / Site Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3.5 py-3 text-sm bg-[#EEF0EC]/50 border border-[#14171A]/20 focus:bg-white focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-colors"
                      placeholder="e.g. Gujarat Refineries Ltd."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="jt-mono block text-[11px] font-bold tracking-wider uppercase text-[#14171A] mb-1.5">
                  Inquiry Vertical *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-3 text-sm bg-[#EEF0EC]/50 border border-[#14171A]/20 focus:bg-white focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-colors"
                >
                  <option value="">Select Material Category</option>
                  <option value="industrial-pipes">Industrial Pipes & Boiler Tubes</option>
                  <option value="ibr-certified">IBR Pipe Fittings & Flanges</option>
                  <option value="industrial-valves">Industrial Valves (Gate, Globe, Ball)</option>
                  <option value="engineering-hardware">Engineering Hardware & Taparia Tools</option>
                  <option value="pharma-materials">Pharmaceutical Packaging Aluminium Bags</option>
                  <option value="quotation">Custom BOQ / Bulk Project Quotation</option>
                  <option value="other">Other Plant Requirements</option>
                </select>
              </div>

              <div>
                <label className="jt-mono block text-[11px] font-bold tracking-wider uppercase text-[#14171A] mb-1.5">
                  Specification Details / BOQ Quantities *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full p-3.5 text-sm bg-[#EEF0EC]/50 border border-[#14171A]/20 focus:bg-white focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-colors leading-relaxed"
                  placeholder="Specify pipe schedules, valve pressure ratings, sizes, quantities, and destination pin code..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-[#C8102E] hover:bg-[#a80d26] text-white font-bold text-sm sm:text-base tracking-wide uppercase transition-colors duration-200 shadow-[0_10px_25px_-8px_rgba(200,16,46,0.5)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Quotation Request...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Request for Quote
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Sidebar Info Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Specification Card */}
            <div className="jt-plate relative bg-[#14171A] text-white p-6 sm:p-8">
              <span className="jt-rivet" style={{ top: 8, left: 8 }} />
              <span className="jt-rivet" style={{ top: 8, right: 8 }} />
              <span className="jt-rivet" style={{ bottom: 8, left: 8 }} />
              <span className="jt-rivet" style={{ bottom: 8, right: 8 }} />

              <div className="flex items-center justify-between pb-3 mb-6 border-b border-white/10">
                <h3 className="jt-display text-2xl font-bold uppercase tracking-wide text-white">
                  Vadodara Facility
                </h3>
                <span className="jt-mono text-[10px] text-[#E8A324] uppercase tracking-wider">
                  DIRECT DESK
                </span>
              </div>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-sm bg-[#C8102E]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#C8102E]" />
                  </div>
                  <div>
                    <h4 className="jt-mono text-xs uppercase text-[#E8A324] tracking-wider mb-0.5">Warehouse Location</h4>
                    <p className="text-slate-300 leading-snug">
                      303/1/2 Makarpura GIDC,<br />
                      Near BSNL Telephone Exchange,<br />
                      Vadodara, Gujarat - 390010
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-sm bg-[#C8102E]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-[#E8A324]" />
                  </div>
                  <div>
                    <h4 className="jt-mono text-xs uppercase text-[#E8A324] tracking-wider mb-0.5">Direct Lines</h4>
                    <p className="text-slate-300">
                      <a href="tel:+919925031497" className="hover:text-white transition-colors">+91 9925031497</a><br />
                      <a href="tel:+919904301497" className="hover:text-white transition-colors">+91 9904301497</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-sm bg-[#C8102E]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 text-[#E8A324]" />
                  </div>
                  <div>
                    <h4 className="jt-mono text-xs uppercase text-[#E8A324] tracking-wider mb-0.5">Dispatch & Quotes Email</h4>
                    <p className="text-slate-300">
                      <a href="mailto:jaytraders2008@gmail.com" className="hover:text-white transition-colors">jaytraders2008@gmail.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-sm bg-[#C8102E]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-[#E8A324]" />
                  </div>
                  <div>
                    <h4 className="jt-mono text-xs uppercase text-[#E8A324] tracking-wider mb-0.5">Operating Hours</h4>
                    <p className="text-slate-300">
                      Monday – Saturday: 9:00 AM – 7:00 PM IST<br />
                      Sunday: Dispatch by appointment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map Frame */}
            <div className="bg-white border border-[#14171A]/15 shadow-md overflow-hidden relative">
              <div className="px-4 py-2.5 bg-[#14171A] text-white flex items-center justify-between border-b border-white/10">
                <span className="jt-mono text-[11px] uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C8102E]" />
                  Makarpura Industrial Zone Map
                </span>
                <span className="jt-mono text-[10px] text-[#E8A324]">LIVE LOCATION</span>
              </div>
              <div className="h-[280px] w-full">
                <iframe
                  title="Jay Traders Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29544.57294778869!2d73.14676148499771!3d22.237361305623025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5ba7c433639%3A0x5bafe9e02689852c!2sJAY%20TRADERS!5e0!3m2!1sen!2sin!4v1748092120258!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .jt-contact { font-family: 'IBM Plex Sans', sans-serif; }
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
      `}</style>
    </div>
  );
};

export default ContactUs;