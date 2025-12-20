import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import ProfilePage from './pages/ProfilePage';
import GalleryPage from './pages/GalleryPage';

function App() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex min-h-screen bg-rose-50/50">
      {/* 1. Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main Content Area */}
      <main className="flex-1 ml-20 md:ml-64 relative overflow-hidden">
        
        {/* Decorative Background Elements */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
           <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-pink-200/20 rounded-full blur-[100px]" />
           <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] bg-purple-200/20 rounded-full blur-[80px]" />
        </div>

        {/* Content Render with Animation */}
        <div className="relative z-10 w-full h-full">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
               <ProfilePage key="profile" />
            )}
            
            {activeTab === 'gallery' && (
               <GalleryPage key="gallery" />
            )}
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}

export default App;