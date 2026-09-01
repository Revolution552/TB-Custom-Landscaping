import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Phone, 
  MessageSquare, 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Clock, 
  AlertCircle,
  FileCheck,
  ExternalLink,
  Code,
  X
} from 'lucide-react';
import { COMPANY_INFO, SERVICE_AREAS } from '../data/landscapingData';
import { LeadFormData } from '../types';

interface LeadCaptureJobberProps {
  prefillData?: {
    service?: string;
    sqFt?: string;
    budget?: string;
  };
}

export const LeadCaptureJobber: React.FC<LeadCaptureJobberProps> = ({ prefillData }) => {
  const [activeTab, setActiveTab] = useState<'form' | 'jobberEmbed'>('form');
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    cityOrArea: 'Gloucester County, VA',
    serviceType: 'Certified Vuba Stone Resin Surfacing',
    estimatedSqFt: '500 - 1,000 Sq.Ft.',
    projectTimeline: 'Within 2 - 4 Weeks',
    budgetRange: '$10,000 – $25,000',
    projectNotes: '',
    preferredContactMethod: 'phone',
    hasPhotos: false
  });

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  useEffect(() => {
    if (prefillData) {
      setFormData(prev => ({
        ...prev,
        serviceType: prefillData.service || prev.serviceType,
        estimatedSqFt: prefillData.sqFt || prev.estimatedSqFt,
        budgetRange: prefillData.budget || prev.budgetRange
      }));
    }
  }, [prefillData]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file: File) => file.name);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setFormData(prev => ({ ...prev, hasPhotos: true }));
    }
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(f => f !== fileName));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const randomId = 'TB-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmationCode(randomId);
    }, 1200);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#0d1210] text-[#f2f4f3] relative overflow-hidden border-b border-white/10">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-dark-slate-pattern opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#a3907c]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#a3907c]/10 text-[#a3907c] px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border border-[#a3907c]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Priority Scheduling Available</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
            Request Your Free <span className="italic font-serif text-[#a3907c]">On-Site Estimate</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 mt-3">
            Serving Gloucester County, Mathews, Yorktown, Williamsburg & the Middle Peninsula. Direct integration with our Jobber dispatch system guarantees a 24-hour response.
          </p>

          {/* Quick Rapid Response / SMS Action Trigger */}
          <div className="mt-5 inline-flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 p-2 bg-[#121816] rounded-sm border border-white/10 shadow-sm w-full sm:w-auto">
            <span className="text-xs text-white/60 px-2 font-medium text-center sm:text-left">Need immediate answers?</span>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                id="lead-text-rapid-btn"
                href={`sms:${COMPANY_INFO.phoneRaw}?body=Hi TB Custom Landscaping, I would like to request an estimate for a hardscaping/Vuba stone project.`}
                className="inline-flex items-center justify-center space-x-1.5 min-h-[48px] sm:min-h-[40px] px-4 py-2.5 rounded-sm bg-white/5 hover:bg-[#a3907c] hover:text-[#0d1210] text-white text-xs font-bold uppercase tracking-wider transition border border-white/10 active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4 text-[#a3907c]" />
                <span>Text Us Directly</span>
              </a>
              <a
                id="lead-call-rapid-btn"
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center space-x-1.5 min-h-[48px] sm:min-h-[40px] px-4 py-2.5 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] text-xs font-bold uppercase tracking-wider transition shadow-sm active:scale-[0.98]"
              >
                <Phone className="w-4 h-4" />
                <span>Call (804) 555-0192</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tab Selector: Native Smart Form vs. Jobber Direct Embed Preview */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-sm bg-white/5 border border-white/10 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex-1 sm:flex-none min-h-[48px] sm:min-h-[40px] px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition flex items-center justify-center space-x-2 ${
                activeTab === 'form'
                  ? 'bg-[#a3907c] text-[#0d1210] shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Estimate Request Form</span>
            </button>
            <button
              onClick={() => setActiveTab('jobberEmbed')}
              className={`flex-1 sm:flex-none min-h-[48px] sm:min-h-[40px] px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition flex items-center justify-center space-x-2 ${
                activeTab === 'jobberEmbed'
                  ? 'bg-[#a3907c] text-[#0d1210] shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Jobber Client Hub</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'form' ? (
            <div className="bg-[#121816] rounded-sm p-4 sm:p-6 lg:p-10 border border-white/10 shadow-2xl">
              
              {isSubmitted ? (
                <div className="text-center py-8 sm:py-10 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#a3907c]/10 text-[#a3907c] flex items-center justify-center mx-auto border border-[#a3907c]/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light text-white">
                    Estimate Request <span className="italic font-serif text-[#a3907c]">Received!</span>
                  </h3>
                  <p className="text-sm text-white/60 max-w-lg mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.fullName}</strong>. Your project details have been logged in our Jobber dispatch queue. One of our master hardscape estimators will contact you within 24 business hours.
                  </p>

                  <div className="p-4 rounded-sm bg-white/5 border border-white/10 max-w-md mx-auto text-left space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-white/50">Estimate Reference #:</span>
                      <strong className="text-white">{confirmationCode}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Service Selected:</span>
                      <strong className="text-white truncate max-w-[200px]">{formData.serviceType}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Target Region:</span>
                      <strong className="text-white">{formData.cityOrArea}</strong>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="w-full sm:w-auto min-h-[48px] px-5 py-3 rounded-sm bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition border border-white/10"
                    >
                      Submit Another Request
                    </button>
                    <a
                      href={`tel:${COMPANY_INFO.phoneRaw}`}
                      className="w-full sm:w-auto min-h-[48px] px-5 py-3 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] text-xs font-bold uppercase tracking-wider transition shadow flex items-center justify-center space-x-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Speak with Estimator Now</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  
                  {/* Row 1: Contact Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#a3907c] uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Robert Davis"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full min-h-[48px] px-4 py-3 rounded-sm border border-white/15 bg-white/5 text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#a3907c] focus:border-[#a3907c] transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#a3907c] uppercase tracking-wider mb-1.5">
                        Phone Number (For Text/Call) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(804) 555-0199"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full min-h-[48px] px-4 py-3 rounded-sm border border-white/15 bg-white/5 text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#a3907c] focus:border-[#a3907c] transition"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & City/Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#a3907c] uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full min-h-[48px] px-4 py-3 rounded-sm border border-white/15 bg-white/5 text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#a3907c] focus:border-[#a3907c] transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#a3907c] uppercase tracking-wider mb-1.5">
                        Service Area / Location *
                      </label>
                      <select
                        value={formData.cityOrArea}
                        onChange={(e) => setFormData({ ...formData, cityOrArea: e.target.value })}
                        className="w-full min-h-[48px] px-4 py-3 rounded-sm border border-white/15 bg-[#121816] text-base sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#a3907c] focus:border-[#a3907c] transition"
                      >
                        <option value="Gloucester County, VA">Gloucester Courthouse / Gloucester Point</option>
                        <option value="Ware Neck / Ordinary, VA">Ware Neck & Ordinary</option>
                        <option value="Hayes & Bena, VA">Hayes & Bena</option>
                        <option value="Mathews County, VA">Mathews County & Gwynn’s Island</option>
                        <option value="Yorktown, VA">Yorktown & York County</option>
                        <option value="Williamsburg, VA">Williamsburg & James City</option>
                        <option value="Newport News, VA">Newport News & Poquoson</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Street Address */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#a3907c] uppercase tracking-wider mb-1.5">
                      Property Street Address (For On-Site Evaluation)
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-4 w-4 h-4 text-[#a3907c]" />
                      <input
                        type="text"
                        placeholder="123 River Road, Gloucester, VA 23061"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full min-h-[48px] pl-10 pr-4 py-3 rounded-sm border border-white/15 bg-white/5 text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#a3907c] focus:border-[#a3907c] transition"
                      />
                    </div>
                  </div>

                  {/* Row 4: Service Interested In & Square Footage */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#a3907c] uppercase tracking-wider mb-1.5">
                        Primary Service Needed *
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full min-h-[48px] px-4 py-3 rounded-sm border border-white/15 bg-[#121816] text-base sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#a3907c] focus:border-[#a3907c] transition"
                      >
                        <option value="Certified Vuba Stone Resin Surfacing">Vuba Stone Resin Surfacing (Driveway / Patio / Pool)</option>
                        <option value="Custom Paver Patio & Outdoor Living">Custom Paver Patio & Outdoor Living</option>
                        <option value="Structural Retaining / Sitting Wall">Structural Retaining or Sitting Wall</option>
                        <option value="Permeable Paver Driveway / Walkway">Permeable Driveway or Walkway</option>
                        <option value="French Drain & Site Water Mitigation">Yard Drainage / French Drain / Laser Grading</option>
                        <option value="Routine Turf Care & Seasonal Maintenance">Lawn Maintenance & Seasonal Cleanup</option>
                        <option value="Complete Estate Landscape Redesign">Complete Multi-Feature Redesign</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#a3907c] uppercase tracking-wider mb-1.5">
                        Approximate Project Size
                      </label>
                      <select
                        value={formData.estimatedSqFt}
                        onChange={(e) => setFormData({ ...formData, estimatedSqFt: e.target.value })}
                        className="w-full min-h-[48px] px-4 py-3 rounded-sm border border-white/15 bg-[#121816] text-base sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#a3907c] focus:border-[#a3907c] transition"
                      >
                        <option value="Under 300 Sq.Ft.">Small Walkway / Step Landing (&lt; 300 sq ft)</option>
                        <option value="300 - 650 Sq.Ft.">Medium Patio / Pool Surround (300 – 650 sq ft)</option>
                        <option value="650 - 1,200 Sq.Ft.">Large Patio / Outdoor Living (650 – 1,200 sq ft)</option>
                        <option value="1,200 - 2,500 Sq.Ft.">Standard Driveway / Multi-Tier (1,200 – 2,500 sq ft)</option>
                        <option value="Over 2,500 Sq.Ft.">Large Estate / Commercial (&gt; 2,500 sq ft)</option>
                        <option value="Not Sure / Need Measurement">Not Sure — Need On-Site Measurement</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Timeline & Contact Preference */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#a3907c] uppercase tracking-wider mb-1.5">
                        Target Timeline
                      </label>
                      <select
                        value={formData.projectTimeline}
                        onChange={(e) => setFormData({ ...formData, projectTimeline: e.target.value })}
                        className="w-full min-h-[48px] px-4 py-3 rounded-sm border border-white/15 bg-[#121816] text-base sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#a3907c] focus:border-[#a3907c] transition"
                      >
                        <option value="Ready Immediately">Ready to Start Immediately (Next 1-2 Weeks)</option>
                        <option value="Within 1 Month">Within 1 Month</option>
                        <option value="Within 2-3 Months">Within 2 - 3 Months</option>
                        <option value="Planning for Next Season">Planning for Next Season</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#a3907c] uppercase tracking-wider mb-1.5">
                        Preferred Response Method
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'phone', label: 'Phone', icon: Phone },
                          { id: 'text', label: 'SMS', icon: MessageSquare },
                          { id: 'email', label: 'Email', icon: Send }
                        ].map((m) => {
                          const Icon = m.icon;
                          const isSelected = formData.preferredContactMethod === m.id;
                          return (
                            <button
                              type="button"
                              key={m.id}
                              onClick={() => setFormData({ ...formData, preferredContactMethod: m.id as any })}
                              className={`min-h-[48px] py-2.5 px-2 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 border transition active:scale-[0.98] ${
                                isSelected
                                  ? 'bg-[#a3907c] text-[#0d1210] border-[#a3907c]'
                                  : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                              <span>{m.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Project Notes Textarea */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#a3907c] uppercase tracking-wider mb-1.5">
                      Project Goals, Drainage Challenges, or Specific Color Blend Ideas
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your space. E.g., 'We have an old concrete patio that collects water near the back door and would love to explore Vuba Stone in Gloucester Slate.'"
                      value={formData.projectNotes}
                      onChange={(e) => setFormData({ ...formData, projectNotes: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-white/15 bg-white/5 text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#a3907c] focus:border-[#a3907c] transition"
                    ></textarea>
                  </div>

                  {/* File / Photo Upload Zone */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#a3907c] uppercase tracking-wider mb-1.5">
                      Upload Photos of Current Yard / Plans (Optional)
                    </label>
                    <div className="border-2 border-dashed border-white/15 hover:border-[#a3907c] rounded-sm p-5 text-center bg-white/5 transition cursor-pointer relative min-h-[96px] flex flex-col items-center justify-center">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Upload className="w-6 h-6 text-[#a3907c] mx-auto mb-1.5" />
                      <p className="text-xs font-bold uppercase tracking-wider text-white">
                        Click or drag photos of your yard or inspiration
                      </p>
                      <p className="text-[10px] text-white/50 mt-0.5">
                        PNG, JPG, HEIC up to 25MB
                      </p>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {uploadedFiles.map((file, i) => (
                          <div key={i} className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1.5 rounded-sm text-xs font-medium text-white border border-white/10">
                            <span className="truncate max-w-[160px]">{file}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(file)}
                              className="text-white/60 hover:text-red-400 p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button & Guarantees */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full min-h-[52px] py-4 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] text-sm font-bold uppercase tracking-wider transition shadow-lg flex items-center justify-center space-x-2 active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-[#0d1210] border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending to Jobber Dispatch...</span>
                        </div>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Request for Free On-Site Consultation</span>
                        </>
                      )}
                    </button>

                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/60 pt-1">
                      <span className="flex items-center">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#a3907c]" />
                        No Obligation / Free 3D Visual Quote
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-[#a3907c]" />
                        Fast 24-Hour Jobber Dispatch
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-[#a3907c]" />
                        Local Gloucester County Crew
                      </span>
                    </div>
                  </div>

                </form>
              )}

            </div>
          ) : (
            /* Jobber Client Hub Embed Container Preview */
            <div className="bg-[#121816] rounded-sm p-6 sm:p-10 border border-white/10 shadow-2xl space-y-6">
              <div className="p-4 rounded-sm bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#a3907c] animate-pulse"></span>
                    <strong className="text-sm font-bold text-white">Jobber Client Hub Integration Ready</strong>
                  </div>
                  <p className="text-xs text-white/60">
                    This embed container connects directly to TB Custom Landscaping's live Jobber booking engine.
                  </p>
                </div>
                <a
                  href={COMPANY_INFO.jobberUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] text-xs font-bold uppercase tracking-wider transition flex items-center space-x-1.5 shrink-0"
                >
                  <span>Open Jobber Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Simulated Jobber Form Wrapper */}
              <div className="border border-white/10 rounded-sm p-6 sm:p-8 bg-[#0d1210] text-center space-y-4">
                <div className="max-w-md mx-auto space-y-3">
                  <div className="w-12 h-12 rounded-sm bg-[#a3907c] text-[#0d1210] font-bold flex items-center justify-center mx-auto text-lg shadow">
                    TB
                  </div>
                  <h4 className="text-lg font-light text-white">
                    TB Custom Landscaping <span className="italic font-serif text-[#a3907c]">Client Request Portal</span>
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Powered by Jobber. Homeowners in Gloucester, Mathews, Yorktown, and Williamsburg can book on-site consultations, track active project milestones, and view digital 3D quotes directly.
                  </p>
                  
                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab('form')}
                      className="px-6 py-3 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] text-xs font-bold uppercase tracking-wider transition shadow"
                    >
                      Fill Online Estimate Form Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
