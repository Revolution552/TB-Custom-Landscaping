import React, { useState, useMemo } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  ChevronRight, 
  AlertCircle, 
  RefreshCw, 
  Maximize2, 
  X, 
  ChevronLeft, 
  Thermometer, 
  Droplets, 
  Layers, 
  Share2, 
  Check, 
  Compass, 
  Hammer,
  HelpCircle,
  HardHat,
  ArrowRight
} from 'lucide-react';
import { SAMPLE_PROJECTS, ClientProject, ProjectPhoto } from '../data/projectStatusData';
import { COMPANY_INFO } from '../data/landscapingData';

interface ProjectStatusDashboardProps {
  onOpenQuoteModal?: (serviceType?: string) => void;
}

export const ProjectStatusDashboard: React.FC<ProjectStatusDashboardProps> = ({ 
  onOpenQuoteModal 
}) => {
  const [searchInput, setSearchInput] = useState('TB-8421');
  const [activeProjectKey, setActiveProjectKey] = useState<string>('TB-8421');
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'photos' | 'milestones' | 'logs' | 'specs'>('photos');
  const [photoFilter, setPhotoFilter] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<ProjectPhoto | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showBeforeAfterComparison, setShowBeforeAfterComparison] = useState(false);

  // Current project
  const project: ClientProject | undefined = SAMPLE_PROJECTS[activeProjectKey];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = searchInput.trim().toUpperCase();
    if (!cleanQuery) {
      setErrorMessage('Please enter your project reference number (e.g., TB-8421).');
      return;
    }

    setIsSearching(true);
    setErrorMessage(null);

    // Simulate real-time retrieval from Jobber/Field server
    setTimeout(() => {
      setIsSearching(false);
      if (SAMPLE_PROJECTS[cleanQuery]) {
        setActiveProjectKey(cleanQuery);
        setErrorMessage(null);
      } else {
        setErrorMessage(`No active project found matching reference "${cleanQuery}". Please check your proposal paperwork or select a sample reference below.`);
      }
    }, 400);
  };

  const handleSelectSample = (refKey: string) => {
    setSearchInput(refKey);
    setIsSearching(true);
    setErrorMessage(null);
    setTimeout(() => {
      setIsSearching(false);
      setActiveProjectKey(refKey);
    }, 300);
  };

  const handleCopyProjectLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#project-status?ref=${project?.referenceNumber || 'TB-8421'}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  // Filtered photos
  const filteredPhotos = useMemo(() => {
    if (!project) return [];
    if (photoFilter === 'all') return project.photos;
    return project.photos.filter(p => p.phase === photoFilter);
  }, [project, photoFilter]);

  // Find before and latest photo for side-by-side
  const beforePhoto = project?.photos.find(p => p.phase === 'Before Site Prep') || project?.photos[project.photos.length - 1];
  const latestPhoto = project?.photos.find(p => p.phase !== 'Before Site Prep') || project?.photos[0];

  // Navigate lightbox
  const handleNextPhoto = () => {
    if (!selectedPhoto || !project) return;
    const currentIndex = project.photos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % project.photos.length;
    setSelectedPhoto(project.photos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!selectedPhoto || !project) return;
    const currentIndex = project.photos.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + project.photos.length) % project.photos.length;
    setSelectedPhoto(project.photos[prevIndex]);
  };

  return (
    <section 
      id="project-status" 
      aria-label="Client Project Status Dashboard"
      className="py-16 sm:py-24 bg-[#0a0e0c] relative overflow-hidden text-white border-t border-white/10"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#a3907c]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#a3907c 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#16201c] border border-[#a3907c]/30 text-[#a3907c] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <HardHat className="w-3.5 h-3.5 text-[#a3907c]" />
            <span>Client Field Portal & Live Updates</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
            Project Status <span className="text-[#a3907c]">Dashboard</span>
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Track daily site progress, view high-resolution field photos from our crew, review weather curing readings, and stay informed on active job milestones in real time.
          </p>

          {/* Reference Lookup Form */}
          <div className="mt-8 max-w-xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#a3907c]" />
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
                  placeholder="Enter Job Ref # (e.g. TB-8421)"
                  className="w-full pl-11 pr-28 py-3.5 bg-[#121915] border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#a3907c] focus:ring-1 focus:ring-[#a3907c] transition-all text-sm sm:text-base font-mono tracking-wider shadow-inner"
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#a3907c] hover:bg-[#b5a38f] text-[#0d1210] font-bold rounded-lg text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center space-x-1.5 shadow-md disabled:opacity-75"
                >
                  {isSearching ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <span>Look Up</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Demo Reference Pills */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-white/50 text-[11px] uppercase tracking-wider font-semibold">
                Quick Demo Jobs:
              </span>
              <button
                type="button"
                onClick={() => handleSelectSample('TB-8421')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all ${
                  activeProjectKey === 'TB-8421'
                    ? 'bg-[#a3907c] text-[#0d1210] border-[#a3907c] font-bold'
                    : 'bg-[#16201c] text-white/70 border-white/10 hover:border-[#a3907c]/50 hover:text-white'
                }`}
              >
                TB-8421 (Pool Deck 78%)
              </button>
              <button
                type="button"
                onClick={() => handleSelectSample('TB-9104')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all ${
                  activeProjectKey === 'TB-9104'
                    ? 'bg-[#a3907c] text-[#0d1210] border-[#a3907c] font-bold'
                    : 'bg-[#16201c] text-white/70 border-white/10 hover:border-[#a3907c]/50 hover:text-white'
                }`}
              >
                TB-9104 (Paver Patio 94%)
              </button>
              <button
                type="button"
                onClick={() => handleSelectSample('TB-7732')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all ${
                  activeProjectKey === 'TB-7732'
                    ? 'bg-[#a3907c] text-[#0d1210] border-[#a3907c] font-bold'
                    : 'bg-[#16201c] text-white/70 border-white/10 hover:border-[#a3907c]/50 hover:text-white'
                }`}
              >
                TB-7732 (Retaining Wall 38%)
              </button>
              <button
                type="button"
                onClick={() => handleSelectSample('TB-6519')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all ${
                  activeProjectKey === 'TB-6519'
                    ? 'bg-[#a3907c] text-[#0d1210] border-[#a3907c] font-bold'
                    : 'bg-[#16201c] text-white/70 border-white/10 hover:border-[#a3907c]/50 hover:text-white'
                }`}
              >
                TB-6519 (Driveway 100%)
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mt-3 p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-xs text-red-300 flex items-start space-x-2 text-left">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span>{errorMessage}</span>
                  <div className="mt-1 flex items-center space-x-3 text-[11px]">
                    <a 
                      href={`tel:${COMPANY_INFO.phoneRaw}`} 
                      className="underline text-white hover:text-[#a3907c] font-semibold"
                    >
                      Call Travis at {COMPANY_INFO.phone}
                    </a>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => handleSelectSample('TB-8421')}
                      className="underline text-[#a3907c] hover:text-white font-semibold"
                    >
                      Load Sample Project TB-8421
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Active Project Dashboard View */}
        {project && (
          <div className="bg-[#121915]/95 border border-white/15 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
            
            {/* Project Header Bar */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-[#16201c] via-[#1a2521] to-[#16201c] border-b border-white/10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Left: Project Identity & Reference */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="font-mono text-xs sm:text-sm font-bold bg-[#a3907c] text-[#0d1210] px-2.5 py-0.5 rounded shadow-sm">
                      REF: {project.referenceNumber}
                    </span>

                    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                      project.statusCode === 'completed'
                        ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                        : project.statusCode === 'final-walkthrough'
                        ? 'bg-blue-950/60 text-blue-300 border-blue-500/30'
                        : 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse"></span>
                      {project.status}
                    </span>

                    <span className="text-xs text-white/50 flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-[#a3907c]" />
                      Est. Completion: <strong className="text-white/80 ml-1">{project.estimatedCompletion}</strong>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                    {project.projectTitle}
                  </h3>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-white/70">
                    <span className="font-semibold text-white/90">
                      {project.clientName}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="flex items-center text-white/70">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-[#a3907c]" />
                      {project.propertyAddress}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/70">
                      Scope: <strong className="text-white">{project.squareFootage.toLocaleString()} sq. ft.</strong>
                    </span>
                  </div>
                </div>

                {/* Right: Progress Meter & Quick Contact */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                  
                  {/* Progress Gauge */}
                  <div className="w-full sm:w-60 lg:w-64">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-white/60 font-medium">Overall Site Completion</span>
                      <span className="font-bold text-[#a3907c] text-sm font-mono">{project.progressPercent}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#0a0e0c] rounded-full overflow-hidden border border-white/10 p-0.5">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          project.progressPercent === 100 
                            ? 'bg-emerald-500' 
                            : 'bg-gradient-to-r from-[#a3907c] via-amber-400 to-[#c8b39b]'
                        }`}
                        style={{ width: `${project.progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Foreman Quick Connect */}
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-white/50">Lead:</span>
                    <span className="font-bold text-white flex items-center">
                      <HardHat className="w-3.5 h-3.5 mr-1 text-[#a3907c]" />
                      {project.foreman.name}
                    </span>
                    <div className="flex items-center space-x-1.5 ml-2">
                      <a
                        href={`tel:${project.foreman.phone.replace(/[^0-9]/g, '')}`}
                        className="px-2.5 py-1 bg-white/10 hover:bg-[#a3907c] hover:text-[#0d1210] rounded text-[11px] font-semibold transition-all flex items-center space-x-1"
                        title="Call Project Supervisor"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call</span>
                      </a>
                      <a
                        href={`sms:${project.foreman.phone.replace(/[^0-9]/g, '')}?body=Hi Travis, inquiry regarding project ${project.referenceNumber}:`}
                        className="px-2.5 py-1 bg-white/10 hover:bg-[#a3907c] hover:text-[#0d1210] rounded text-[11px] font-semibold transition-all flex items-center space-x-1"
                        title="Text Project Supervisor"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>SMS</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyProjectLink}
                        className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded text-[11px] font-semibold transition-all flex items-center space-x-1 text-white/80"
                        title="Copy Shareable Job Link"
                      >
                        {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3" />}
                        <span>{copiedLink ? 'Copied' : 'Share'}</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Weather & Curing Advisory Bar */}
            <div className="px-6 py-3.5 bg-[#0f1613] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2 text-white/80">
                <span className="px-2 py-0.5 rounded bg-[#1f2c25] border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-wider text-[10px] flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse"></span>
                  {project.weatherCuringAdvisory.status}
                </span>
                <span className="font-semibold text-white/90">Gloucester On-Site Sensor Telemetry:</span>
                <span className="text-white/60">
                  {project.weatherCuringAdvisory.foremanAdvisory}
                </span>
              </div>

              <div className="flex items-center space-x-4 text-white/70 text-[11px]">
                <span className="flex items-center">
                  <Thermometer className="w-3.5 h-3.5 mr-1 text-[#a3907c]" />
                  Ambient: <strong className="ml-1 text-white">{project.weatherCuringAdvisory.ambientTemp}</strong>
                </span>
                <span className="flex items-center">
                  <Droplets className="w-3.5 h-3.5 mr-1 text-sky-400" />
                  Humidity: <strong className="ml-1 text-white">{project.weatherCuringAdvisory.relativeHumidity}</strong>
                </span>
                <span className="hidden sm:inline-block text-[#a3907c] font-medium">
                  {project.weatherCuringAdvisory.dewPointSpread}
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-[#141d18] border-b border-white/10 px-4 sm:px-6 flex items-center overflow-x-auto scrollbar-none">
              <div className="flex space-x-1 sm:space-x-2 py-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('photos')}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap flex items-center space-x-2 ${
                    activeTab === 'photos'
                      ? 'bg-[#a3907c] text-[#0d1210] shadow-md'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Progress Photos ({project.photos.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('milestones')}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap flex items-center space-x-2 ${
                    activeTab === 'milestones'
                      ? 'bg-[#a3907c] text-[#0d1210] shadow-md'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Milestone Pipeline ({project.stages.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('logs')}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap flex items-center space-x-2 ${
                    activeTab === 'logs'
                      ? 'bg-[#a3907c] text-[#0d1210] shadow-md'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Daily Crew Logs ({project.fieldLogs.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('specs')}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap flex items-center space-x-2 ${
                    activeTab === 'specs'
                      ? 'bg-[#a3907c] text-[#0d1210] shadow-md'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Materials & Documents ({project.documents.length})</span>
                </button>
              </div>
            </div>

            {/* TAB CONTENT PANELS */}
            <div className="p-6 sm:p-8">

              {/* TAB 1: PROGRESS PHOTOS */}
              {activeTab === 'photos' && (
                <div className="space-y-6">
                  
                  {/* Photo Filter Pills and Before/After Toggle */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs text-white/50 mr-2 font-semibold uppercase tracking-wider">
                        Phase Filter:
                      </span>
                      {[
                        { label: 'All Photos', value: 'all' },
                        { label: 'Active Work', value: 'Active Installation' },
                        { label: 'Excavation & Base', value: 'Excavation & Sub-Base' },
                        { label: 'Before Condition', value: 'Before Site Prep' },
                        { label: 'Finishing / Complete', value: 'Finishing & Curing' },
                      ].map((tab) => (
                        <button
                          key={tab.value}
                          type="button"
                          onClick={() => setPhotoFilter(tab.value)}
                          className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                            photoFilter === tab.value
                              ? 'bg-white/20 text-white font-bold'
                              : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Before vs Current Comparison Switch */}
                    {beforePhoto && latestPhoto && (
                      <button
                        type="button"
                        onClick={() => setShowBeforeAfterComparison(!showBeforeAfterComparison)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 border ${
                          showBeforeAfterComparison
                            ? 'bg-[#a3907c] text-[#0d1210] border-[#a3907c]'
                            : 'bg-[#16201c] text-white/80 border-white/20 hover:border-[#a3907c]'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>{showBeforeAfterComparison ? 'Grid View' : 'Side-by-Side Comparison'}</span>
                      </button>
                    )}
                  </div>

                  {/* Side-by-Side Before & Current Mode */}
                  {showBeforeAfterComparison && beforePhoto && latestPhoto ? (
                    <div className="bg-[#0e1411] border border-white/15 rounded-xl p-4 sm:p-6 mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-white flex items-center">
                            <Layers className="w-4 h-4 mr-2 text-[#a3907c]" />
                            Site Transformation: Before Groundwork vs. Current Stage
                          </h4>
                          <p className="text-xs text-white/60">
                            Direct visual reference of {project.clientName}'s property transition.
                          </p>
                        </div>
                        <span className="text-xs text-[#a3907c] font-mono font-bold bg-[#16201c] px-3 py-1 rounded border border-[#a3907c]/30">
                          {project.referenceNumber}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {/* Before */}
                        <div className="relative rounded-xl overflow-hidden border border-red-500/20 group">
                          <img
                            src={beforePhoto.imageUrl}
                            alt="Site condition before work"
                            className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-red-950/80 backdrop-blur-md text-red-200 border border-red-500/40 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider">
                            Before Groundwork
                          </div>
                          <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                            <p className="text-xs sm:text-sm font-semibold text-white">{beforePhoto.title}</p>
                            <p className="text-[11px] text-white/70 line-clamp-2 mt-0.5">{beforePhoto.caption}</p>
                          </div>
                        </div>

                        {/* Current / After */}
                        <div className="relative rounded-xl overflow-hidden border border-emerald-500/30 group">
                          <img
                            src={latestPhoto.imageUrl}
                            alt="Current site condition"
                            className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>Current Stage ({project.progressPercent}%)</span>
                          </div>
                          <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                            <p className="text-xs sm:text-sm font-semibold text-white">{latestPhoto.title}</p>
                            <p className="text-[11px] text-white/70 line-clamp-2 mt-0.5">{latestPhoto.caption}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Standard Photo Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPhotos.map((photo) => (
                      <div
                        key={photo.id}
                        className="bg-[#0e1411] border border-white/10 rounded-xl overflow-hidden shadow-lg group hover:border-[#a3907c]/50 transition-all flex flex-col cursor-pointer"
                        onClick={() => setSelectedPhoto(photo)}
                      >
                        {/* Photo Container */}
                        <div className="relative aspect-video sm:aspect-[4/3] overflow-hidden bg-black/40">
                          <img
                            src={photo.imageUrl}
                            alt={photo.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          
                          {/* Phase Badge */}
                          <div className="absolute top-3 left-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md border border-white/20 text-white">
                              {photo.phase}
                            </span>
                          </div>

                          {/* Hover Zoom Icon */}
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-black/60 text-white hover:bg-[#a3907c] hover:text-[#0d1210]">
                            <Maximize2 className="w-4 h-4" />
                          </div>

                          {/* Timestamp Pill */}
                          <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-white/80 font-mono">
                            {photo.timestamp}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-white group-hover:text-[#a3907c] transition-colors">
                              {photo.title}
                            </h4>
                            <p className="mt-1 text-xs text-white/70 leading-relaxed line-clamp-2">
                              {photo.caption}
                            </p>
                          </div>

                          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {photo.tags.map((tag) => (
                                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/60">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <span className="text-[11px] text-[#a3907c] font-semibold flex items-center group-hover:translate-x-0.5 transition-transform">
                              Inspect <ChevronRight className="w-3 h-3 ml-0.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredPhotos.length === 0 && (
                    <div className="text-center py-12 bg-[#0e1411] rounded-xl border border-white/5">
                      <Sparkles className="w-8 h-8 text-white/30 mx-auto mb-2" />
                      <p className="text-sm text-white/60">No photos in this category yet.</p>
                      <button
                        type="button"
                        onClick={() => setPhotoFilter('all')}
                        className="mt-3 text-xs text-[#a3907c] underline font-semibold"
                      >
                        View all project photos
                      </button>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 2: MILESTONE PIPELINE */}
              {activeTab === 'milestones' && (
                <div className="max-w-4xl mx-auto space-y-8">
                  <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-bold text-white">Project Engineering Milestones</h4>
                      <p className="text-xs text-white/60">
                        Class A contractor procedural checkpoints and sign-off validations.
                      </p>
                    </div>
                    <span className="text-xs text-white/60">
                      Current Milestone: <strong className="text-amber-400 font-bold">{project.status}</strong>
                    </span>
                  </div>

                  <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/15">
                    {project.stages.map((stage) => {
                      const isComplete = stage.status === 'completed';
                      const isCurrent = stage.status === 'current';

                      return (
                        <div key={stage.stageNumber} className="relative group">
                          {/* Timeline node */}
                          <div className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                            isComplete
                              ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20'
                              : isCurrent
                              ? 'bg-amber-400 border-amber-300 text-[#0d1210] animate-pulse ring-4 ring-amber-400/20'
                              : 'bg-[#16201c] border-white/30 text-white/40'
                          }`}>
                            {isComplete ? (
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            ) : (
                              <span className="text-[11px] font-bold font-mono">{stage.stageNumber}</span>
                            )}
                          </div>

                          {/* Card */}
                          <div className={`p-4 sm:p-5 rounded-xl border transition-all ${
                            isCurrent
                              ? 'bg-[#16221c] border-amber-500/40 shadow-xl'
                              : isComplete
                              ? 'bg-[#0e1411] border-white/10'
                              : 'bg-[#0a0e0c]/50 border-white/5 opacity-60'
                          }`}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                              <div className="flex items-center space-x-2">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                  isComplete
                                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                                    : isCurrent
                                    ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                                    : 'bg-white/5 text-white/40'
                                }`}>
                                  Phase {stage.stageNumber}: {stage.status}
                                </span>
                                <h5 className="text-sm sm:text-base font-bold text-white">
                                  {stage.name}
                                </h5>
                              </div>

                              <span className="text-xs font-mono text-white/50">
                                {stage.dateCompleted ? `Signed off: ${stage.dateCompleted}` : stage.targetDate ? `Target: ${stage.targetDate}` : ''}
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-3">
                              {stage.description}
                            </p>

                            {/* Signoff notes */}
                            {stage.signoffNotes && (
                              <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-white/80 flex items-start space-x-2">
                                <ShieldCheck className="w-4 h-4 text-[#a3907c] shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-bold text-[#a3907c] uppercase tracking-wider text-[10px] block">
                                    Quality Assurance Inspector Log
                                  </span>
                                  <p className="mt-0.5 text-white/80">{stage.signoffNotes}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: DAILY CREW LOGS & FIELD NOTES */}
              {activeTab === 'logs' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-bold text-white">Daily Field Dispatch Notes</h4>
                      <p className="text-xs text-white/60">
                        Live updates logged directly from the job site by our lead hardscape installers.
                      </p>
                    </div>
                    <span className="text-xs text-white/50">
                      Showing {project.fieldLogs.length} recent field entries
                    </span>
                  </div>

                  <div className="space-y-4">
                    {project.fieldLogs.map((log) => (
                      <div 
                        key={log.id} 
                        className="bg-[#0e1411] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-[#16201c] border border-[#a3907c]/40 flex items-center justify-center text-[#a3907c] font-bold text-xs">
                              {log.author.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-bold text-white">{log.author}</span>
                                <span className="text-[10px] uppercase font-bold text-[#a3907c] px-1.5 py-0.5 rounded bg-white/5">
                                  {log.role}
                                </span>
                              </div>
                              <span className="text-[11px] text-white/40">{log.timestamp}</span>
                            </div>
                          </div>

                          {/* Weather snapshot if logged */}
                          {log.weatherSnapshot && (
                            <div className="flex items-center space-x-3 text-[11px] px-2.5 py-1 rounded bg-[#16201c] border border-white/10 text-white/70">
                              <span className="flex items-center">
                                <Thermometer className="w-3 h-3 text-[#a3907c] mr-1" />
                                {log.weatherSnapshot.temp}
                              </span>
                              <span>•</span>
                              <span className="flex items-center">
                                <Droplets className="w-3 h-3 text-sky-400 mr-1" />
                                {log.weatherSnapshot.humidity}
                              </span>
                              {log.weatherSnapshot.substrateMoisture && (
                                <>
                                  <span>•</span>
                                  <span className="text-emerald-400 font-semibold">
                                    Substrate: {log.weatherSnapshot.substrateMoisture}
                                  </span>
                                </>
                              )}
                            </div>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-white/80 leading-relaxed pl-11">
                          {log.message}
                        </p>

                        {/* Optional photo attached to log */}
                        {log.photoUrl && (
                          <div className="mt-3 ml-11 flex flex-col sm:flex-row items-start gap-3 p-3 bg-black/30 rounded-lg border border-white/5">
                            <img
                              src={log.photoUrl}
                              alt="Log thumbnail"
                              className="w-full sm:w-32 h-20 object-cover rounded-md border border-white/10 cursor-pointer hover:opacity-90"
                              onClick={() => setSelectedPhoto({
                                id: log.id,
                                phase: 'Active Installation',
                                title: `Field Note Attachment - ${log.author}`,
                                timestamp: log.timestamp,
                                caption: log.photoCaption || log.message,
                                imageUrl: log.photoUrl!,
                                tags: ['Field Update']
                              })}
                            />
                            <div className="flex-1 text-xs text-white/70">
                              <span className="text-[10px] text-[#a3907c] uppercase font-bold block">
                                Field Attachment
                              </span>
                              <p className="text-xs text-white/90 mt-0.5">{log.photoCaption}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: MATERIALS & DOCUMENTS */}
              {activeTab === 'specs' && (
                <div className="max-w-4xl mx-auto space-y-8">
                  {/* Materials Specification Breakdown */}
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-[#a3907c]" />
                      Engineered Materials & Specifications
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-[#0e1411] border border-white/10">
                        <span className="text-[10px] uppercase font-bold text-[#a3907c] tracking-wider block">
                          Primary Surfacing Blend
                        </span>
                        <p className="text-sm font-bold text-white mt-1">
                          {project.materialsSummary.primaryBlend}
                        </p>
                        <p className="text-xs text-white/60 mt-0.5 font-mono">
                          {project.materialsSummary.grainOrSize}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0e1411] border border-white/10">
                        <span className="text-[10px] uppercase font-bold text-[#a3907c] tracking-wider block">
                          Sub-Base Engineering
                        </span>
                        <p className="text-sm font-bold text-white mt-1">
                          {project.materialsSummary.baseFoundation}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0e1411] border border-white/10">
                        <span className="text-[10px] uppercase font-bold text-[#a3907c] tracking-wider block">
                          Edging & Mechanical Trims
                        </span>
                        <p className="text-sm font-bold text-white mt-1">
                          {project.materialsSummary.edgingDetail}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0e1411] border border-white/10">
                        <span className="text-[10px] uppercase font-bold text-[#a3907c] tracking-wider block">
                          Total Permeable Footprint
                        </span>
                        <p className="text-sm font-bold text-white mt-1">
                          {project.squareFootage.toLocaleString()} Square Feet
                        </p>
                        <p className="text-xs text-emerald-400 mt-0.5">
                          100% SUDS Compliant / Chesapeake Bay Friendly
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Documents & Warranty Packets */}
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-[#a3907c]" />
                      Project Documents & Warranty Records
                    </h4>

                    <div className="space-y-3">
                      {project.documents.map((doc, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-[#0e1411] border border-white/10 flex items-center justify-between hover:border-white/20 transition-all"
                        >
                          <div className="flex items-center space-x-3.5">
                            <div className="w-9 h-9 rounded-lg bg-[#16201c] border border-white/10 flex items-center justify-center text-[#a3907c]">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-bold text-white">{doc.title}</p>
                              <div className="flex items-center space-x-2 text-[11px] text-white/50">
                                <span>{doc.type}</span>
                                <span>•</span>
                                <span>{doc.date}</span>
                                <span>•</span>
                                <span>{doc.size}</span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => alert(`Accessing "${doc.title}". In production, this generates or downloads the authenticated Jobber document.`)}
                            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#a3907c] hover:text-[#0d1210] text-xs font-semibold text-white transition-all"
                          >
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Bottom Actions Bar */}
            <div className="p-4 sm:p-6 bg-[#0e1411] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs text-white/60">
                <ShieldCheck className="w-4 h-4 text-[#a3907c]" />
                <span>Need to add an extension or have a question about this project?</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`sms:${project.foreman.phone.replace(/[^0-9]/g, '')}?body=Hi Travis, inquiry regarding project ${project.referenceNumber}:`}
                  className="px-4 py-2 rounded-lg bg-[#1a2521] hover:bg-[#23332d] text-white text-xs font-bold transition flex items-center space-x-1.5 border border-white/10"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#a3907c]" />
                  <span>Text Job Foreman</span>
                </a>

                {onOpenQuoteModal && (
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal(`Change Order / Add-on for ${project.referenceNumber}`)}
                    className="px-4 py-2 rounded-lg bg-[#a3907c] hover:bg-[#b5a38f] text-[#0d1210] text-xs font-bold transition shadow-md flex items-center space-x-1.5"
                  >
                    <span>Request Change Order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

        {/* Informational Callout: How to find reference number */}
        <div className="mt-8 text-center text-xs text-white/50 max-w-xl mx-auto flex items-center justify-center space-x-2">
          <HelpCircle className="w-4 h-4 text-[#a3907c] shrink-0" />
          <span>
            Your Project Reference Number (e.g. <strong>TB-8421</strong>) is printed at the top-right of your Jobber estimate or dispatch SMS. Lost your code? Call us at{' '}
            <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-white hover:underline font-semibold">
              {COMPANY_INFO.phone}
            </a>.
          </span>
        </div>

      </div>

      {/* FULLSCREEN PHOTO LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#121915] border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-[#16201c] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/60 border border-white/20 text-[#a3907c]">
                  {selectedPhoto.phase}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                  {selectedPhoto.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo View with Next/Prev Controls */}
            <div className="relative aspect-video max-h-[65vh] bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />

              {/* Prev / Next buttons */}
              <button
                type="button"
                onClick={handlePrevPhoto}
                className="absolute left-3 p-2 rounded-full bg-black/60 hover:bg-[#a3907c] hover:text-[#0d1210] text-white transition-all backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextPhoto}
                className="absolute right-3 p-2 rounded-full bg-black/60 hover:bg-[#a3907c] hover:text-[#0d1210] text-white transition-all backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Caption & Metadata Footer */}
            <div className="p-4 sm:p-5 bg-[#121915] border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-white/60 mb-2">
                <span className="font-mono text-[#a3907c] font-semibold">
                  Timestamp: {selectedPhoto.timestamp}
                </span>
                <div className="flex gap-1.5">
                  {selectedPhoto.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-white/70">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
