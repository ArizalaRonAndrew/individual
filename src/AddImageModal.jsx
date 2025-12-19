// src/AddImageModal.jsx
import React, { useState, useRef } from 'react';

const AddImageModal = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    img: null, 
    height: 400,
  });

  const [previewUrl, setPreviewUrl] = useState(null); 
  const fileInputRef = useRef(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- UPDATED: Handle File Change using FileReader (Base64) ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      // When the file is read, run this function
      reader.onloadend = () => {
        // reader.result contains the Base64 string
        setFormData(prev => ({ ...prev, img: reader.result }));
        setPreviewUrl(reader.result);
      };

      // Start reading the file
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.img) {
      alert("Please select a photo first!");
      return;
    }
    
    // Safety check for Local Storage limit (approx 5MB)
    if (formData.img.length > 4000000) {
       alert("This image is too large for local storage. Please pick a smaller one.");
       return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-linear-to-r from-pink-300 to-purple-300 p-6 relative shrink-0">
           <h2 className="text-2xl font-serif text-white text-center">Add New Memory</h2>
           <button 
             onClick={onClose}
             className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl"
           >
             &times;
           </button>
        </div>

        {/* Scrollable Form Area */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* --- UPLOAD AREA --- */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Photo</label>
              
              <input 
                type="file" 
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden" 
              />

              <div 
                onClick={() => fileInputRef.current.click()}
                className={`
                  relative w-full h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group
                  ${previewUrl ? 'border-pink-300 bg-white' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-pink-300'}
                `}
              >
                {previewUrl ? (
                  <>
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-full">Change Photo</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                         <polyline points="17 8 12 3 7 8"></polyline>
                         <line x1="12" y1="3" x2="12" y2="15"></line>
                       </svg>
                    </div>
                    <span className="text-gray-400 font-medium text-sm group-hover:text-pink-500">Click to Upload</span>
                  </>
                )}
              </div>
            </div>

            {/* Title Input */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Title</label>
              <input 
                type="text" 
                name="title"
                placeholder="Enter title..."
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
              />
            </div>

            {/* Caption Input */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Caption</label>
              <textarea 
                name="caption"
                rows="3"
                placeholder="Write a cute caption..."
                value={formData.caption}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all resize-none"
              />
            </div>

            {/* Height Slider */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Size on Wall: {formData.height}px
              </label>
              <input 
                type="range" 
                name="height"
                min="300" 
                max="800" 
                step="50"
                value={formData.height}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-400"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 hover:scale-[1.02] transition-all duration-200"
            >
              Add to Gallery ✨
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddImageModal;