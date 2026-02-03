import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Make sure to import your CSS

const BookConsultant: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Add inline styles for missing Tailwind classes
  const styles = `
    .min-h-screen { min-height: 100vh; }
    .bg-gray-50 { background-color: #f9fafb; }
    .font-sans { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    .container { width: 100%; margin-right: auto; margin-left: auto; padding-right: 1rem; padding-left: 1rem; }
    @media (min-width: 640px) { .container { max-width: 640px; } }
    @media (min-width: 768px) { .container { max-width: 768px; } }
    @media (min-width: 1024px) { .container { max-width: 1024px; } }
    @media (min-width: 1280px) { .container { max-width: 1280px; } }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .px-4 { padding-left: 1rem; padding-right: 1rem; }
    .md\\:px-6 { }
    @media (min-width: 768px) { .md\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; } }
    .pt-28 { padding-top: 7rem; }
    .pb-12 { padding-bottom: 3rem; }
    .max-w-7xl { max-width: 80rem; }
    .mb-8 { margin-bottom: 2rem; }
    .flex { display: flex; }
    .justify-center { justify-content: center; }
    .items-center { align-items: center; }
    .gap-4 { gap: 1rem; }
    .text-sm { font-size: 0.875rem; }
    .font-medium { font-weight: 500; }
    .text-gray-400 { color: #9ca3af; }
    .text-primary { color: var(--primary-color, #0066cc); }
    .w-8 { width: 2rem; }
    .h-8 { height: 2rem; }
    .rounded-full { border-radius: 9999px; }
    .border-2 { border-width: 2px; }
    .border-primary { border-color: var(--primary-color, #0066cc); }
    .bg-primary { background-color: var(--primary-color, #0066cc); }
    .text-white { color: white; }
    .hidden { display: none; }
    @media (min-width: 768px) { .md\\:inline { display: inline; } }
    .w-12 { width: 3rem; }
    .h-0\\.5 { height: 0.125rem; }
    .bg-gray-200 { background-color: #e5e7eb; }
    .border-gray-300 { border-color: #d1d5db; }
    .max-w-4xl { max-width: 56rem; }
    .opacity-100 { opacity: 1; }
    .transform-none { transform: none; }
    .justify-between { justify-content: space-between; }
    .text-gray-500 { color: #6b7280; }
    .hover\\:text-primary:hover { color: var(--primary-color, #0066cc); }
    .transition-colors { transition-property: color, background-color, border-color; transition-duration: 150ms; }
    .group { }
    .group:hover .group-hover\\:scale-110 { transform: scale(1.1); }
    .bg-white { background-color: white; }
    .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
    .mr-3 { margin-right: 0.75rem; }
    .transition-transform { transition-property: transform; transition-duration: 150ms; }
    .font-medium { font-weight: 500; }
    .text-center { text-align: center; }
    .text-5xl { font-size: 3rem; }
    @media (min-width: 640px) { .text-5xl { font-size: 3.75rem; } }
    .font-bold { font-weight: 700; }
    .mb-4 { margin-bottom: 1rem; }
    .text-xl { font-size: 1.25rem; }
    .max-w-2xl { max-width: 42rem; }
    .leading-relaxed { line-height: 1.625; }
    .flex-wrap { flex-wrap: wrap; }
    .justify-center { justify-content: center; }
    .px-8 { padding-left: 2rem; padding-right: 2rem; }
    .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
    .rounded-xl { border-radius: 0.75rem; }
    .shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
    .scale-105 { transform: scale(1.05); }
    .flex-col { flex-direction: column; }
    .gap-2 { gap: 0.5rem; }
    .border { border-width: 1px; }
    .border-gray-200 { border-color: #e5e7eb; }
    .hover\\:bg-gray-50:hover { background-color: #f9fafb; }
    .relative { position: relative; }
    .hover\\:bg-pink-50:hover { background-color: #fdf2f8; }
    .rounded-2xl { border-radius: 1rem; }
    .border-gray-100 { border-color: #f3f4f6; }
    .p-8 { padding: 2rem; }
    @media (min-width: 768px) { .md\\:p-10 { padding: 2.5rem; } }
    .overflow-hidden { overflow: hidden; }
    .absolute { position: absolute; }
    .top-0 { top: 0; }
    .left-0 { left: 0; }
    .w-full { width: 100%; }
    .h-2 { height: 0.5rem; }
    .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
    .from-primary { --tw-gradient-from: var(--primary-color, #0066cc); }
    .via-accent { --tw-gradient-via: var(--accent-color, #ffa600); }
    .to-primary-light { --tw-gradient-to: var(--primary-light, #004d99); }
    .space-y-3 > * + * { margin-top: 0.75rem; }
    .font-semibold { font-weight: 600; }
    .text-gray-700 { color: #374151; }
    .grid { display: grid; }
    .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
    @media (min-width: 640px) { .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (min-width: 1024px) { .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    .min-h-\\[140px\\] { min-height: 140px; }
    .hover\\:border-primary\\/30:hover { border-color: rgba(0, 102, 204, 0.3); }
    .hover\\:shadow-md:hover { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .mb-4 { margin-bottom: 1rem; }
    .line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
    .mt-10 { margin-top: 2.5rem; }
    .w-full { width: 100%; }
    .bg-accent { background-color: var(--accent-color, #ffa600); }
    .px-10 { padding-left: 2.5rem; padding-right: 2.5rem; }
    .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
    .text-lg { font-size: 1.125rem; }
    .hover\\:bg-orange-500:hover { background-color: #f97316; }
    .hover\\:shadow-xl:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
    .hover\\:shadow-orange-200\\/50:hover { box-shadow: 0 20px 25px -5px rgba(251, 191, 36, 0.5), 0 10px 10px -5px rgba(251, 191, 36, 0.5); }
    .disabled\\:opacity-50:disabled { opacity: 0.5; }
    .disabled\\:cursor-not-allowed:disabled { cursor: not-allowed; }
    .disabled\\:shadow-none:disabled { box-shadow: none; }
    .disabled\\:transform-none:disabled { transform: none; }
    .transform { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
    .hover\\:-translate-y-0\\.5:hover { --tw-translate-y: -0.125rem; }
    .fixed { position: fixed; }
    .bottom-6 { bottom: 1.5rem; }
    .right-6 { right: 1.5rem; }
    .z-50 { z-index: 50; }
    .w-14 { width: 3.5rem; }
    .h-14 { height: 3.5rem; }
    .transition-all { transition-property: all; transition-duration: 150ms; }
    .duration-300 { transition-duration: 300ms; }
    .hover\\:shadow-xl:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
    .hover\\:scale-105:hover { transform: scale(1.05); }
    
    /* Header styles */
    .bg-white\\/95 { background-color: rgba(255, 255, 255, 0.95); }
    .backdrop-blur-md { backdrop-filter: blur(12px); }
    .shadow-premium { box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); }
    .h-20 { height: 5rem; }
    .border-b { border-bottom-width: 1px; }
    .space-x-6 > * + * { margin-left: 1.5rem; }
    .p-2\\.5 { padding: 0.625rem; }
    .hover\\:bg-gray-50:hover { background-color: #f9fafb; }
    .hover\\:text-accent:hover { color: var(--accent-color, #ffa600); }
    .w-5 { width: 1.25rem; }
    .h-5 { height: 1.25rem; }
    .top-1\\.5 { top: 0.375rem; }
    .right-1\\.5 { right: 0.375rem; }
    .border-2 { border-width: 2px; }
    .animate-pulse-slow { animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .h-8 { height: 2rem; }
    .w-px { width: 1px; }
    .space-x-3 > * + * { margin-left: 0.75rem; }
    .text-right { text-align: right; }
    .text-xs { font-size: 0.75rem; }
    .uppercase { text-transform: uppercase; }
    .tracking-wider { letter-spacing: 0.05em; }
    .leading-tight { line-height: 1.25; }
    .bg-primary\\/5 { background-color: rgba(0, 102, 204, 0.05); }
    .border-primary\\/10 { border-color: rgba(0, 102, 204, 0.1); }
    .hover\\:bg-primary\\/10:hover { background-color: rgba(0, 102, 204, 0.1); }
    .ml-1 { margin-left: 0.25rem; }
    .hover\\:bg-red-50:hover { background-color: #fef2f2; }
    .hover\\:text-red-600:hover { color: #dc2626; }
    .w-4 { width: 1rem; }
    .h-4 { height: 1rem; }
    .w-6 { width: 1.5rem; }
    .h-6 { height: 1.5rem; }
    
    /* Custom colors for gradients */
    .from-primary { --tw-gradient-from: #0066cc; }
    .via-accent { --tw-gradient-via: #ffa600; }
    .to-primary-light { --tw-gradient-to: #004d99; }
    
    /* Add these custom properties */
    :root {
      --accent-color: #ffa600;
      --primary-light: #004d99;
    }
    
    /* Selected state */
    .border-primary { border-color: #0066cc !important; }
    .bg-primary\\/5 { background-color: rgba(0, 102, 204, 0.05) !important; }
  `;

  return (
    <>
      {/* Add the inline styles */}
      <style>{styles}</style>
      
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-md shadow-premium fixed top-0 left-0 right-0 z-50 h-20 border-b border-gray-100 font-sans">
          <div className="container mx-auto px-6 h-full flex items-center justify-between">
            <div className="flex items-center cursor-pointer group">
              <img 
                alt="SpecCon Holdings" 
                className="h-10 w-auto md:h-12 max-w-xs object-contain transition-transform duration-300 group-hover:scale-105"
                src="/assets/logo.png" 
                style={{ objectFit: 'contain' }}
                onClick={() => navigate('/client/home')}
              />
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <button className="p-2.5 hover:bg-gray-50 rounded-full transition-all duration-300 relative group text-gray-500 hover:text-accent" title="New Releases">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-5 h-5">
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                </button>
              </div>
              
              <button className="p-2.5 hover:bg-gray-50 rounded-full transition-all duration-300 relative text-gray-500 hover:text-primary group">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell w-5 h-5">
                  <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
                  <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border-2 border-white animate-pulse-slow"></span>
              </button>
              
              <div className="h-8 w-px bg-gray-200"></div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-xs font-bold text-primary uppercase tracking-wider leading-tight">client</p>
                </div>
                <div className="w-10 h-10 bg-primary/5 rounded-full border border-primary/10 flex items-center justify-center text-primary transition-all duration-300 hover:bg-primary/10 hover:scale-105">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user w-5 h-5">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <button className="p-2 hover:bg-red-50 hover:text-red-600 rounded-full transition-all duration-300 text-gray-400 ml-1 group" title="Sign Out">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out w-4 h-4 group-hover:scale-110 transition-transform">
                    <path d="m16 17 5-5-5-5"></path>
                    <path d="M21 12H9"></path>
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="md:hidden">
              <button className="p-2 text-gray-600 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu w-6 h-6">
                  <path d="M4 5h16"></path>
                  <path d="M4 12h16"></path>
                  <path d="M4 19h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 md:px-6 pt-28 pb-12 max-w-7xl">
          <div className="mb-8 flex justify-center items-center gap-4 text-sm font-medium text-gray-400">
            <div className="flex items-center gap-2 text-primary">
              <span className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-primary bg-primary text-white">1</span>
              <span className="hidden md:inline">Find</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-gray-300">2</span>
              <span className="hidden md:inline">Select</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-gray-300">3</span>
              <span className="hidden md:inline">Book</span>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto" style={{ opacity: 1, transform: 'none' }}>
            <div className="flex justify-between items-center mb-8">
              <button 
                onClick={() => navigate('/client/home')}
                className="flex items-center text-gray-500 hover:text-primary transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left w-4 h-4">
                    <path d="m12 19-7-7 7-7"></path>
                    <path d="M19 12H5"></path>
                  </svg>
                </div>
                <span className="font-medium">Back to Dashboard</span>
              </button>
            </div>
            
            <div className="text-center mb-10">
              <h1 className="text-5xl font-bold text-primary mb-4">Find Your Expert</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Connect with specialized consultants to drive your compliance and strategy forward.
              </p>
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-md bg-primary text-white shadow-lg scale-105">
                  <div className="flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar w-5 h-5">
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                    </svg>
                    <span>Book by availability</span>
                  </div>
                </button>
                
                <button className="px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-md bg-white text-gray-700 hover:bg-gray-50 border border-gray-200">
                  <div className="flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search w-5 h-5">
                      <path d="m21 21-4.34-4.34"></path>
                      <circle cx="11" cy="11" r="8"></circle>
                    </svg>
                    <span>Search for Consultants</span>
                  </div>
                </button>
                
                <button className="px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-md relative bg-white text-gray-700 hover:bg-pink-50 border border-gray-200">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart w-5 h-5">
                        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                      </svg>
                    </div>
                    <span>Favourite Consultants</span>
                  </div>
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary-light"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">What you need</h2>
                  <p className="text-gray-500 text-sm">Select your consultation area</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                <h3 className="text-sm font-semibold text-gray-700">Select a Category</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button 
                    onClick={() => handleCategorySelect('hr')}
                    className={`relative p-6 rounded-xl border-2 transition-all min-h-[140px] ${
                      selectedCategory === 'hr' 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-gray-200 bg-white hover:border-primary/30 hover:shadow-md'
                    }`}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase w-8 h-8 text-white">
                        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                      </svg>
                    </div>
                    <h3 className="font-bold text-center text-gray-900 mb-1">HR Consulting</h3>
                    <p className="text-xs text-gray-500 text-center line-clamp-2">Human Resources, Labour Relations, and Compliance.</p>
                  </button>
                  
                  <button 
                    onClick={() => handleCategorySelect('finance')}
                    className={`relative p-6 rounded-xl border-2 transition-all min-h-[140px] ${
                      selectedCategory === 'finance' 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-gray-200 bg-white hover:border-primary/30 hover:shadow-md'
                    }`}
                    style={{ transform: 'none' }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase w-8 h-8 text-white">
                        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                      </svg>
                    </div>
                    <h3 className="font-bold text-center text-gray-900 mb-1">Financial Consulting</h3>
                    <p className="text-xs text-gray-500 text-center line-clamp-2">Accounting, Tax, and Financial Planning.</p>
                  </button>
                  
                  <button 
                    onClick={() => handleCategorySelect('legal')}
                    className={`relative p-6 rounded-xl border-2 transition-all min-h-[140px] ${
                      selectedCategory === 'legal' 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-gray-200 bg-white hover:border-primary/30 hover:shadow-md'
                    }`}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase w-8 h-8 text-white">
                        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                      </svg>
                    </div>
                    <h3 className="font-bold text-center text-gray-900 mb-1">Legal Consulting</h3>
                    <p className="text-xs text-gray-500 text-center line-clamp-2">Corporate Law, Contracts, and Governance.</p>
                  </button>
                  
                  <button 
                    onClick={() => handleCategorySelect('strategy')}
                    className={`relative p-6 rounded-xl border-2 transition-all min-h-[140px] ${
                      selectedCategory === 'strategy' 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-gray-200 bg-white hover:border-primary/30 hover:shadow-md'
                    }`}
                    style={{ transform: 'none' }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up w-8 h-8 text-white">
                        <path d="M16 7h6v6"></path>
                        <path d="m22 7-8.5 8.5-5-5L2 17"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-center text-gray-900 mb-1">Business Strategy</h3>
                    <p className="text-xs text-gray-500 text-center line-clamp-2">Growth, Operations, and Management.</p>
                  </button>
                </div>
              </div>
              
              <div className="mt-10">
                <button 
                  disabled={!selectedCategory}
                  className="w-full bg-accent text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-500 transition-all shadow-lg hover:shadow-xl hover:shadow-orange-200/50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none transform hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search w-5 h-5 mr-3">
                    <path d="m21 21-4.34-4.34"></path>
                    <circle cx="11" cy="11" r="8"></circle>
                  </svg>
                  Find Consultants
                </button>
              </div>
            </div>
          </div>
        </main>

        <button 
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-105"
          aria-label="Help and Support"
          style={{ background: 'linear-gradient(135deg, rgb(255, 166, 0) 0%, rgb(255, 143, 0) 100%)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-question-mark w-6 h-6 text-white">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <path d="M12 17h.01"></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default BookConsultant;