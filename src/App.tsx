import React, { useState } from 'react';
import { Topbar } from './components/Topbar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VubaStoneShowcase } from './components/VubaStoneShowcase';
import { HardscapingSection } from './components/HardscapingSection';
import { SecondaryServices } from './components/SecondaryServices';
import { InteractiveEstimator } from './components/InteractiveEstimator';
import { LeadCaptureJobber } from './components/LeadCaptureJobber';
import { GallerySection } from './components/GallerySection';
import { TrustAndReviews } from './components/TrustAndReviews';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { QuoteModal } from './components/QuoteModal';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [modalInitialService, setModalInitialService] = useState('Certified Vuba Stone Resin Surfacing');
  const [prefillFormData, setPrefillFormData] = useState<{
    service?: string;
    sqFt?: string;
    budget?: string;
  }>({});

  const handleOpenQuoteModal = (serviceName?: string) => {
    if (serviceName) {
      setModalInitialService(serviceName);
    }
    setIsQuoteModalOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTransferEstimatorToForm = (data: { service: string; sqFt: string; budget: string }) => {
    setPrefillFormData(data);
    handleScrollToSection('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1210] text-[#f2f4f3] w-full max-w-full overflow-x-hidden pb-20 sm:pb-0">
      {/* Top Announcement Bar (Desktop) */}
      <Topbar onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Main Navigation Bar */}
      <Navbar 
        onOpenQuoteModal={() => handleOpenQuoteModal()} 
        activeSection=""
      />

      {/* Main Content Sections */}
      <main className="flex-grow w-full max-w-full overflow-x-hidden">
        {/* 1. Hero Section */}
        <Hero
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onScrollToVuba={() => handleScrollToSection('vuba-stone')}
          onScrollToEstimator={() => handleScrollToSection('estimator')}
        />

        {/* 2. Flagship Vuba Stone / Resin Bound Surfacing Showcase */}
        <VubaStoneShowcase 
          onOpenQuoteModal={() => handleOpenQuoteModal('Certified Vuba Stone Resin Surfacing')} 
        />

        {/* 3. Premium Hardscaping & Craftsmanship Standards */}
        <HardscapingSection
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onSelectServiceForQuote={(title) => {
            setModalInitialService(title);
            handleOpenQuoteModal(title);
          }}
        />

        {/* 4. Interactive Project Cost & Material Estimator */}
        <InteractiveEstimator 
          onTransferToForm={handleTransferEstimatorToForm} 
        />

        {/* 5. Secondary Services Catalog (Mowing, Mulch, Pruning, Power Washing) */}
        <SecondaryServices
          onOpenQuoteModal={() => handleOpenQuoteModal('Routine Turf Care & Seasonal Maintenance')}
          onSelectServiceForQuote={(title) => {
            setModalInitialService(title);
            handleOpenQuoteModal(title);
          }}
        />

        {/* 6. Filterable Project Gallery */}
        <GallerySection 
          onOpenQuoteModal={() => handleOpenQuoteModal()} 
        />

        {/* 7. Social Proof, Google Reviews & Gloucester Service Area Map */}
        <TrustAndReviews 
          onOpenQuoteModal={() => handleOpenQuoteModal()} 
        />

        {/* 8. Jobber Integration & Direct Lead Capture Form */}
        <LeadCaptureJobber 
          prefillData={prefillFormData} 
        />

        {/* 9. Frequently Asked Questions */}
        <FAQSection 
          onOpenQuoteModal={() => handleOpenQuoteModal()} 
        />
      </main>

      {/* Footer with Gloucester Local Schema Data */}
      <Footer 
        onOpenQuoteModal={() => handleOpenQuoteModal()} 
      />

      {/* Mobile Sticky Conversion Action Bar */}
      <MobileStickyBar 
        onOpenQuoteModal={() => handleOpenQuoteModal()} 
      />

      {/* Global Quick Quote Modal Dialog */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialService={modalInitialService}
      />
    </div>
  );
}
