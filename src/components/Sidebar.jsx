import React from 'react';
import { User, Image as ImageIcon, Heart } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'gallery', label: 'Memories', icon: ImageIcon },
    // You can add more tabs here
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-20 md:w-64 bg-white/80 backdrop-blur-xl border-r border-pink-100 flex flex-col items-center py-10 z-40 transition-all duration-300">
      
      {/* Brand / Logo */}
      <div className="mb-12 text-center">
        <div className="w-12 h-12 md:w-20 md:h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
          <Heart className="text-pink-400 fill-pink-200" size={28} />
        </div>
        <h1 className="hidden md:block text-2xl font-bold text-gray-800 tracking-wider">Jubi</h1>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col w-full px-4 gap-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                group flex items-center gap-4 p-3 rounded-2xl transition-all duration-300
                ${isActive ? 'bg-pink-50 text-pink-500 shadow-sm' : 'text-gray-400 hover:bg-white hover:text-pink-400'}
              `}
            >
              <Icon 
                size={24} 
                className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:rotate-12'}`} 
              />
              <span className={`hidden md:block font-medium text-sm tracking-wide ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
              
              {/* Bow/Dot Indicator */}
              {isActive && (
                <div className="hidden md:block ml-auto w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Decorative Bottom */}
      <div className="mt-auto opacity-50">
        <div className="text-[10px] text-center text-gray-400 hidden md:block">
          Made with 🎀 <br/> by You
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;