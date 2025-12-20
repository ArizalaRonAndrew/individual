import React, { useEffect, useState } from "react";
import { X, Heart, Sparkles, Edit2, Trash2 } from 'lucide-react'; 

const ImageViewer = ({ item, onClose, onDelete, onUpdate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    title: "",
    caption: "",
    height: 400,
  });

  useEffect(() => {
    if (item) {
      setIsVisible(true);
      setEditData({
        title: item.title,
        caption: item.caption,
        height: item.height || 400,
      });
    }
    return () => setIsVisible(false);
  }, [item]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate({
      ...item,
      title: editData.title,
      caption: editData.caption,
      height: parseInt(editData.height),
    });
    setIsEditing(false);
  };

  if (!item) return null;

  return (
    // --- CONTAINER POSITIONING ---
    // Naka-set sa 'left-20 md:left-64' para mag-center sa kanan ng Sidebar
    <div className="fixed top-0 right-0 bottom-0 left-20 md:left-64 z-50 flex items-center justify-center p-4 sm:p-8">
      
      {/* Blurred Backdrop */}
      <div
        className={`absolute inset-0 bg-pink-900/20 backdrop-blur-md transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Floating Sparkles (Backdrop Decor) */}
      <div className="absolute top-10 left-10 text-white/40 animate-pulse pointer-events-none"><Sparkles size={32}/></div>
      <div className="absolute bottom-10 right-10 text-white/40 animate-pulse delay-700 pointer-events-none"><Sparkles size={48}/></div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/80 hover:text-pink-200 z-[60] p-2 hover:rotate-90 transition-transform duration-300"
      >
        <div className="bg-black/20 rounded-full p-2 backdrop-blur-sm border border-white/30">
             <X size={24} />
        </div>
      </button>

      {/* Card Container */}
      <div
        className={`
          relative w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] 
          flex flex-col md:flex-row transform transition-all duration-500 ease-out z-[70] border-4 border-white
          ${
            isVisible
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-95 opacity-0 translate-y-10"
          }
        `}
        style={{ maxHeight: "85vh" }}
      >
        {/* Decorative Bow */}
        <div className="absolute top-0 left-0 z-20 text-3xl p-4 drop-shadow-md -rotate-12">🎀</div>

        {/* --- LEFT SIDE: IMAGE --- */}
        <div className="w-full md:w-3/5 h-[40vh] md:h-auto bg-stone-100 relative overflow-hidden group flex items-center justify-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-contain md:object-cover transition-transform duration-700 hover:scale-105 relative z-10"
          />
        </div>

        {/* --- RIGHT SIDE: DETAILS --- */}
        <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col bg-white relative">
          
          {/* Lace Top Decoration */}
          <div className="absolute top-0 left-0 w-full h-3 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDIwIDEwIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjUiIHI9IjQiIGZpbGw9IiNmZmViZWYiLz48L3N2Zz4=')] opacity-50"></div>
          <div className="absolute top-3 left-0 w-full h-1 bg-gradient-to-r from-pink-200 via-rose-300 to-pink-200"></div>

          {/* Scrollable Content */}
          <div className="space-y-6 w-full flex-1 overflow-y-auto custom-scrollbar pr-2 mt-4 pb-16">
            {isEditing ? (
              // --- EDIT MODE ---
              <div className="space-y-4 w-full animate-fadeIn">
                <div>
                  <label className="text-xs font-bold text-pink-400 uppercase tracking-widest">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleChange}
                    className="w-full text-2xl font-serif border-b-2 border-pink-200 focus:border-pink-500 focus:outline-none py-1 bg-transparent text-gray-800"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-pink-400 uppercase tracking-widest">Caption</label>
                  <textarea
                    name="caption"
                    rows="4"
                    value={editData.caption}
                    onChange={handleChange}
                    className="w-full text-lg font-light text-gray-600 border border-pink-100 rounded-xl p-3 focus:ring-2 focus:ring-pink-200 focus:outline-none bg-rose-50/30 resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-pink-400 uppercase tracking-widest">Size: {editData.height}px</label>
                  <input
                    type="range" name="height" min="300" max="800" step="50"
                    value={editData.height} onChange={handleChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-400 mt-2"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={handleSave} className="flex-1 bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-lg">Save</button>
                  <button onClick={() => setIsEditing(false)} className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
                </div>
              </div>
            ) : (
              // --- VIEW MODE ---
              <>
                <h2 className="text-4xl font-serif text-gray-900 leading-tight wrap-break-word drop-shadow-sm">
                  {item.title || "Untitled Memory"}
                </h2>
                <div className="w-16 h-1.5 bg-pink-100 rounded-full" />
                <p className="text-gray-500 font-light text-lg leading-relaxed wrap-break-word whitespace-pre-wrap">
                  {item.caption || "No caption provided for this moment."}
                </p>
              </>
            )}
          </div>

          {/* --- RESTORED HOVER LOGIC (Bottom Right) --- */}
          {/* Lilitaw lang ang mga ito kapag nag-hover ka sa lower-right area */}
          {!isEditing && (
            <div className="absolute bottom-0 right-0 p-8 opacity-0 hover:opacity-100 transition-opacity duration-300 z-50">
               {/* Container for buttons with slight slide-up animation on hover */}
               <div className="flex gap-3 transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
                  
                  {/* Edit Button */}
                  <button
                    onClick={() => setIsEditing(true)}
                    title="Edit Details"
                    className="w-12 h-12 rounded-full bg-white text-pink-400 shadow-lg border-2 border-pink-100 hover:bg-pink-50 hover:scale-110 transition-all flex items-center justify-center group"
                  >
                    <Edit2 size={20} />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => onDelete(item.id)}
                    title="Delete Memory"
                    className="w-12 h-12 rounded-full bg-white text-red-300 shadow-lg border-2 border-red-50 hover:bg-red-50 hover:scale-110 transition-all flex items-center justify-center group"
                  >
                    <Trash2 size={20} />
                  </button>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ImageViewer;