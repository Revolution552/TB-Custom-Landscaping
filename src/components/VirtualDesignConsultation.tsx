import React, { useState } from 'react';
import { 
  Video, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Camera, 
  HelpCircle,
  Laptop,
  Check,
  CalendarCheck,
  MessageSquare
} from 'lucide-react';
import { COMPANY_INFO } from '../data/landscapingData';

interface VirtualDesignConsultationProps {
  onOpenQuoteModal?: (service?: string) => void;
}

interface TimeSlot {
  time: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
}

const AVAILABLE_SLOTS: TimeSlot[] = [
  { time: '9:00 AM', period: 'Morning' },
  { time: '10:30 AM', period: 'Morning' },
  { time: '11:45 AM', period: 'Morning' },
  { time: '1:15 PM', period: 'Afternoon' },
  { time: '2:30 PM', period: 'Afternoon' },
  { time: '4:00 PM', period: 'Afternoon' },
  { time: '5:15 PM', period: 'Evening' },
  { time: '6:00 PM', period: 'Evening' }
];

export const VirtualDesignConsultation: React.FC<VirtualDesignConsultationProps> = ({ onOpenQuoteModal }) => {
  // Generate the next 7 business dates (skipping Sundays)
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    let current = new Date(today);
    current.setDate(current.getDate() + 1); // Start tomorrow

    while (dates.length < 6) {
      if (current.getDay() !== 0) { // Skip Sunday
        const dayName = current.toLocaleDateString('en-US', { weekday: 'short' });
        const monthName = current.toLocaleDateString('en-US', { month: 'short' });
        const dayNumber = current.getDate();
        const fullDateStr = current.toISOString().split('T')[0];
        dates.push({
          fullDateStr,
          dayName,
          monthName,
          dayNumber,
          label: `${dayName}, ${monthName} ${dayNumber}`
        });
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0]?.fullDateStr || '');
  const [selectedTime, setSelectedTime] = useState<string>('1:15 PM');
  const [projectFocus, setProjectFocus] = useState<string>('Certified Vuba Stone Resin Surfacing');
  const [videoPlatform, setVideoPlatform] = useState<string>('Google Meet');
  
  // Contact details
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [cityOrArea, setCityOrArea] = useState<string>('Gloucester County');
  const [projectNotes, setProjectNotes] = useState<string>('');
  
  // Submission state
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please enter your full name, email, and mobile phone number.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setErrorMsg('');
    setIsBooked(true);
  };

  const selectedDateObj = availableDates.find(d => d.fullDateStr === selectedDate) || availableDates[0];

  return (
    <section 
      id="virtual-consultation" 
      className="py-16 sm:py-24 bg-[#0a0e0c] text-[#f2f4f3] border-b border-white/10 relative overflow-hidden"
    >
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#a3907c]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-[#a3907c]/10 text-[#a3907c] px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border border-[#a3907c]/30">
            <Video className="w-3.5 h-3.5 text-[#a3907c]" />
            <span>Virtual Design Studio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-light text-white leading-tight">
            Book a 15-Minute <br className="hidden sm:inline" />
            <span className="italic font-serif text-[#a3907c]">Virtual Design Consultation</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/65 mt-3 max-w-2xl mx-auto leading-relaxed">
            Short on time or in early planning? Connect directly with our lead hardscaping designer on video. Review your property layout, explore 3D material swatches, and get ballpark feasibility numbers before scheduling an on-site crew visit.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: What to Expect & Value Props (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Value Card */}
            <div className="bg-[#121816] p-6 sm:p-7 rounded-sm border border-white/10 shadow-xl space-y-6 text-left">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#a3907c] block">
                  Zero Obligation • 100% Free
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  What We Cover in 15 Minutes
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-sm bg-[#a3907c]/15 text-[#a3907c] flex items-center justify-center shrink-0 border border-[#a3907c]/30">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Live Satellite & Yard Review</h4>
                    <p className="text-white/65 mt-0.5 leading-relaxed">
                      We pull up your property on high-resolution GIS satellite mapping to analyze slopes, drainage paths, and layout boundaries together.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-sm bg-cyan-400/15 text-cyan-300 flex items-center justify-center shrink-0 border border-cyan-400/30">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Material & Texture Recommendations</h4>
                    <p className="text-white/65 mt-0.5 leading-relaxed">
                      Compare Vuba Stone resin colors vs architectural paver styles against your home’s siding, brick, and sun exposure.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-sm bg-emerald-400/15 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/30">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Transparent Cost & Feasibility</h4>
                    <p className="text-white/65 mt-0.5 leading-relaxed">
                      Get realistic price ranges based on current 2024 square-footage rates and Tidewater excavation requirements without any sales pressure.
                    </p>
                  </div>
                </div>
              </div>

              {/* Designer Bio */}
              <div className="pt-4 border-t border-white/10 flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-full bg-[#1e2a25] border border-[#a3907c]/40 flex items-center justify-center text-[#a3907c] font-bold text-base shrink-0">
                  TB
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Hosted by TB Custom Lead Estimator</div>
                  <div className="text-[11px] text-[#a3907c]">Certified ICPI & Vuba Resin Installation Specialist</div>
                  <div className="text-[10px] text-white/40 mt-0.5">Gloucester County, VA Native</div>
                </div>
              </div>
            </div>

            {/* Quick Phone Alternative */}
            <div className="p-4 bg-white/5 rounded-sm border border-white/10 flex items-center justify-between text-xs">
              <div className="text-left">
                <span className="font-bold text-white block">Prefer an instant phone call?</span>
                <span className="text-white/50 text-[11px]">We answer direct calls Mon–Sat 7AM–6PM</span>
              </div>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="min-h-[44px] px-3.5 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-[#a3907c] hover:text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition flex items-center space-x-1.5 shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Booking Widget (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#121816] p-6 sm:p-8 rounded-sm border border-white/10 shadow-2xl">
              
              {isBooked ? (
                /* Success Confirmation State */
                <div className="text-center py-6 sm:py-10 space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CalendarCheck className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                      Confirmed & Scheduled
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                      Your Virtual Consultation Is Set!
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto mt-2 leading-relaxed">
                      We've reserved your 15-minute video call on <strong className="text-white">{selectedDateObj.label} at {selectedTime}</strong> via <strong className="text-white">{videoPlatform}</strong>.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 bg-[#0d1210] rounded-sm border border-white/10 max-w-md mx-auto text-left text-xs space-y-2">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-white/50">Client:</span>
                      <span className="text-white font-bold">{fullName}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-white/50">Project Focus:</span>
                      <span className="text-[#a3907c] font-medium">{projectFocus}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-white/50">Meeting Link & Calendar:</span>
                      <span className="text-emerald-400 font-medium">Sent to {email}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-white/50">SMS Reminder:</span>
                      <span className="text-white font-medium">{phone}</span>
                    </div>
                  </div>

                  {/* Preparation Hint */}
                  <div className="p-3 bg-white/5 rounded-sm border border-white/10 max-w-md mx-auto text-[11px] text-white/60 text-left">
                    💡 <strong>Quick Prep Tip:</strong> If you have 2–3 photos of your current yard, patio, or driveway on your phone, have them ready to show on screen!
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setIsBooked(false);
                        setFullName('');
                        setEmail('');
                        setPhone('');
                      }}
                      className="min-h-[44px] px-5 py-2.5 rounded-sm bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition"
                    >
                      Book Another Time
                    </button>
                    {onOpenQuoteModal && (
                      <button
                        onClick={() => onOpenQuoteModal(projectFocus)}
                        className="min-h-[44px] px-5 py-2.5 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] font-bold text-xs uppercase tracking-wider transition shadow"
                      >
                        Also Request Detailed Quote
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Interactive Form State */
                <form onSubmit={handleBookingSubmit} className="space-y-6 text-left">
                  
                  {/* Step 1: Date Selection */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-white flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#a3907c]" />
                        <span>Step 1: Choose Day</span>
                      </label>
                      <span className="text-[10px] text-white/40">Upcoming availability</span>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {availableDates.map((date) => {
                        const isSelected = selectedDate === date.fullDateStr;
                        return (
                          <button
                            key={date.fullDateStr}
                            type="button"
                            onClick={() => setSelectedDate(date.fullDateStr)}
                            className={`min-h-[56px] p-2 rounded-sm border text-center transition active:scale-95 flex flex-col justify-center ${
                              isSelected
                                ? 'bg-[#a3907c] text-[#0d1210] border-[#a3907c] shadow-md font-bold'
                                : 'bg-[#0d1210] text-white/80 border-white/10 hover:border-white/30'
                            }`}
                          >
                            <span className="text-[10px] uppercase">{date.dayName}</span>
                            <span className="text-base font-bold leading-none mt-0.5">{date.dayNumber}</span>
                            <span className="text-[9px] opacity-75">{date.monthName}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Time Slot Selection */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-white flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1.5 text-[#a3907c]" />
                        <span>Step 2: Choose 15-Minute Time Slot</span>
                      </label>
                      <span className="text-[10px] text-[#a3907c] font-semibold">{selectedTime}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {AVAILABLE_SLOTS.map((slot) => {
                        const isSelected = selectedTime === slot.time;
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setSelectedTime(slot.time)}
                            className={`min-h-[44px] px-3 py-2 rounded-sm border text-xs font-semibold transition active:scale-95 flex items-center justify-center space-x-1.5 ${
                              isSelected
                                ? 'bg-[#a3907c] text-[#0d1210] border-[#a3907c] shadow font-bold'
                                : 'bg-[#0d1210] text-white/70 border-white/10 hover:border-white/30 hover:text-white'
                            }`}
                          >
                            <span>{slot.time}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Project Type & Video Platform */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                        Project Focus
                      </label>
                      <select
                        value={projectFocus}
                        onChange={(e) => setProjectFocus(e.target.value)}
                        className="w-full min-h-[48px] px-3 py-2.5 rounded-sm bg-[#0d1210] border border-white/15 text-white text-xs focus:outline-none focus:border-[#a3907c] transition"
                      >
                        <option value="Certified Vuba Stone Resin Surfacing">Vuba Stone Resin Surfacing</option>
                        <option value="Custom Paver Patio & Entertaining">Custom Paver Patio & Fire Pit</option>
                        <option value="Permeable Driveway Transformation">Permeable Driveway Transformation</option>
                        <option value="Retaining Walls & French Drainage">Retaining Wall & Drainage System</option>
                        <option value="Complete Estate Landscape Overhaul">Complete Property / Estate Overhaul</option>
                        <option value="General Hardscaping Advice">General Advice & Ballpark Estimates</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                        Preferred Video App
                      </label>
                      <select
                        value={videoPlatform}
                        onChange={(e) => setVideoPlatform(e.target.value)}
                        className="w-full min-h-[48px] px-3 py-2.5 rounded-sm bg-[#0d1210] border border-white/15 text-white text-xs focus:outline-none focus:border-[#a3907c] transition"
                      >
                        <option value="Google Meet">Google Meet (Browser link - no install)</option>
                        <option value="Zoom">Zoom Video Call</option>
                        <option value="FaceTime">Apple FaceTime (iPhone / iPad)</option>
                        <option value="Direct Phone Call">Direct Phone Call (Audio Only)</option>
                      </select>
                    </div>
                  </div>

                  {/* Step 4: Contact Information */}
                  <div className="space-y-3 pt-2 border-t border-white/10">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-white block">
                      Step 3: Your Contact Details
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your Full Name *"
                          className="w-full min-h-[48px] px-3.5 py-3 rounded-sm bg-[#0d1210] border border-white/15 text-white placeholder-white/40 text-base sm:text-xs focus:outline-none focus:border-[#a3907c] transition"
                        />
                      </div>

                      <div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address (for calendar invite) *"
                          className="w-full min-h-[48px] px-3.5 py-3 rounded-sm bg-[#0d1210] border border-white/15 text-white placeholder-white/40 text-base sm:text-xs focus:outline-none focus:border-[#a3907c] transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Mobile Phone (for SMS reminder) *"
                          className="w-full min-h-[48px] px-3.5 py-3 rounded-sm bg-[#0d1210] border border-white/15 text-white placeholder-white/40 text-base sm:text-xs focus:outline-none focus:border-[#a3907c] transition"
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          value={cityOrArea}
                          onChange={(e) => setCityOrArea(e.target.value)}
                          placeholder="Gloucester, Mathews, Yorktown, etc."
                          className="w-full min-h-[48px] px-3.5 py-3 rounded-sm bg-[#0d1210] border border-white/15 text-white placeholder-white/40 text-base sm:text-xs focus:outline-none focus:border-[#a3907c] transition"
                        />
                      </div>
                    </div>

                    <div>
                      <textarea
                        rows={2}
                        value={projectNotes}
                        onChange={(e) => setProjectNotes(e.target.value)}
                        placeholder="Tell us briefly what you'd like to discuss (optional: e.g., '1,200 sq.ft driveway', 'muddy backyard pool area')..."
                        className="w-full p-3 rounded-sm bg-[#0d1210] border border-white/15 text-white placeholder-white/40 text-base sm:text-xs focus:outline-none focus:border-[#a3907c] transition resize-none"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-amber-400 font-semibold">{errorMsg}</p>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full min-h-[52px] px-6 py-3.5 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] font-bold text-xs uppercase tracking-widest transition shadow-lg flex items-center justify-center space-x-2 active:scale-[0.99]"
                    >
                      <Video className="w-4 h-4" />
                      <span>Confirm 15-Minute Video Consultation</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>

                    <p className="text-[10px] text-white/40 text-center mt-2.5">
                      No sales pressure • Free link sent immediately to your email • Instant Google Calendar / Apple invite
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
