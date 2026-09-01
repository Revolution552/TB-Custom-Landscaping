import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Sparkles,
  Clock
} from 'lucide-react';
import { COMPANY_INFO } from '../data/landscapingData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ 
  isOpen, 
  onClose,
  initialService = 'Certified Vuba Stone Resin Surfacing'
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState(initialService);
  const [sqFt, setSqFt] = useState('500 - 1,000 Sq.Ft.');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refCode, setRefCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setRefCode('TB-' + Math.floor(100000 + Math.random() * 900000));
    }, 1000);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#121816] rounded-sm max-w-xl w-full p-5 sm:p-8 text-[#f2f4f3] relative border border-white/15 shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-10 h-10 rounded-sm bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10 flex items-center justify-center transition active:scale-95"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#a3907c]/20 text-[#a3907c] flex items-center justify-center mx-auto border border-[#a3907c]/40">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-light text-white">
              Estimate Request <span className="italic font-serif text-[#a3907c]">Sent</span>
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Thank you, <strong className="text-white">{fullName}</strong>. Your project has been registered with our Gloucester Jobber dispatch team. Reference ID: <strong className="text-[#a3907c]">{refCode}</strong>.
            </p>
            <div className="p-3 bg-white/5 rounded-sm border border-white/10 text-xs text-white/70">
              We will contact you via {phone} within 24 business hours to confirm your free on-site measurement and sample review.
            </div>
            <button
              onClick={handleReset}
              className="w-full min-h-[48px] py-3 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] text-xs font-bold uppercase tracking-wider transition active:scale-[0.98]"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4 pr-8">
              <div className="inline-flex items-center space-x-1 text-[10px] font-bold uppercase tracking-widest text-[#a3907c] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Free On-Site Estimate</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-white">
                Request Project <span className="italic font-serif text-[#a3907c]">Consultation</span>
              </h3>
              <p className="text-xs text-white/60 mt-1">
                Serving Gloucester County, Mathews, Yorktown & Williamsburg.
              </p>
            </div>

            {/* Direct Rapid Triggers */}
            <div className="flex flex-wrap items-center gap-2 mb-4 p-2 bg-white/5 rounded-sm border border-white/10 text-xs">
              <span className="text-white/60 font-medium pl-1 text-[11px] w-full sm:w-auto">Need fast help?</span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`sms:${COMPANY_INFO.phoneRaw}?body=Hi TB Custom Landscaping, I would like to request an estimate.`}
                  className="flex-1 sm:flex-none min-h-[40px] px-3 py-2 rounded-sm bg-white/10 text-[#a3907c] font-bold text-[11px] uppercase tracking-wider hover:bg-white hover:text-[#0d1210] transition flex items-center justify-center space-x-1.5 border border-white/10 active:scale-[0.98]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Text Us</span>
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="flex-1 sm:flex-none min-h-[40px] px-3 py-2 rounded-sm bg-[#a3907c] text-[#0d1210] font-bold text-[11px] uppercase tracking-wider hover:bg-white transition flex items-center justify-center space-x-1.5 active:scale-[0.98]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full min-h-[48px] px-3.5 py-3 rounded-sm border border-white/15 bg-[#0d1210] text-white text-base sm:text-xs focus:border-[#a3907c] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(804) 555-0199"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full min-h-[48px] px-3.5 py-3 rounded-sm border border-white/15 bg-[#0d1210] text-white text-base sm:text-xs focus:border-[#a3907c] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full min-h-[48px] px-3.5 py-3 rounded-sm border border-white/15 bg-[#0d1210] text-white text-base sm:text-xs focus:border-[#a3907c] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                    City / County *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gloucester, Ware Neck"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full min-h-[48px] px-3.5 py-3 rounded-sm border border-white/15 bg-[#0d1210] text-white text-base sm:text-xs focus:border-[#a3907c] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                  Service Interested In *
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full min-h-[48px] px-3.5 py-3 rounded-sm border border-white/15 bg-[#0d1210] text-white text-base sm:text-xs focus:border-[#a3907c] focus:outline-none"
                >
                  <option value="Certified Vuba Stone Resin Surfacing">Vuba Stone Resin Surfacing</option>
                  <option value="Custom Paver Patio & Outdoor Living">Custom Paver Patio & Fire Pit</option>
                  <option value="Structural Retaining / Sitting Wall">Structural Retaining / Sitting Wall</option>
                  <option value="Permeable Paver Driveway">Permeable Driveway / Walkway</option>
                  <option value="French Drain & Site Water Mitigation">French Drainage / Grading</option>
                  <option value="Routine Turf Care & Seasonal Maintenance">Lawn Maintenance / Cleanup</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                  Project Notes / Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe your current surface (old concrete, asphalt, dirt lawn) or desired style."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-white/15 bg-[#0d1210] text-white text-base sm:text-xs focus:border-[#a3907c] focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[50px] py-3.5 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center space-x-2 active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit For Free On-Site Consultation</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-center text-white/40">
                *Zero obligation. Class A Licensed & Insured Virginia Contractor.
              </p>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
