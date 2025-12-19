// src/ImageViewer.jsx
import React, { useEffect, useState } from "react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      {/* Blurred Backdrop - Ito na ang bahala mag-close */}
      <div
        className={`absolute inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Card Container */}
      <div
        className={`
          relative w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl 
          flex flex-col md:flex-row transform transition-all duration-500 ease-out
          ${
            isVisible
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-95 opacity-0 translate-y-10"
          }
        `}
        style={{ maxHeight: "90vh" }}
      >
        {/* TINANGGAL KO NA ANG X BUTTON DITO */}

        {/* --- LEFT SIDE: IMAGE --- */}
        <div className="w-full md:w-3/5 h-[40vh] md:h-auto bg-stone-100 relative overflow-hidden group">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* --- RIGHT SIDE: DETAILS & CONTROLS --- */}
        <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-white relative">
          {/* Top colored bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-pink-300 via-purple-300 to-indigo-300" />

          {/* CONTENT AREA */}
          <div className="space-y-6 w-full">
            {isEditing ? (
              // --- EDIT MODE FORM ---
              <div className="space-y-4 w-full">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleChange}
                    className="w-full text-2xl font-serif border-b-2 border-pink-200 focus:border-pink-500 focus:outline-none py-1 bg-transparent"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">
                    Caption
                  </label>
                  <textarea
                    name="caption"
                    rows="4"
                    value={editData.caption}
                    onChange={handleChange}
                    className="w-full text-lg font-light text-gray-600 border rounded-xl p-3 focus:ring-2 focus:ring-pink-200 focus:outline-none bg-gray-50 resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">
                    Size (Height): {editData.height}px
                  </label>
                  <input
                    type="range"
                    name="height"
                    min="300"
                    max="800"
                    step="50"
                    value={editData.height}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-400 mt-2"
                  />
                </div>

                {/* Edit Actions Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-black text-white font-bold py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-100 text-gray-600 font-bold py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // --- VIEW MODE ---
              <>
                <h2 className="text-4xl font-serif text-gray-900 leading-tight wrap-break-word">
                  {item.title || "Untitled"}
                </h2>

                <div className="w-16 h-1 bg-gray-200 rounded-full" />

                <p className="text-gray-500 font-light text-lg leading-relaxed wrap-break-word whitespace-pre-wrap max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
                  {item.caption || "No caption provided."}
                </p>
              </>
            )}
          </div>

          {/* --- TINY ICONS (Bottom Right) --- */}
          {/* LOGIC: Tinanggal ko yung 'group-hover' sa parent div. 
              Nilagay ko ang hover effect DITO MISMO sa container na ito.
              Naglagay ako ng padding (p-6) para lumaki ang "Hit Area"
              Pero lalabas lang sila kapag nasa lower right ka na talaga. */}
          {!isEditing && (
            <div className="absolute bottom-0 right-0 p-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="flex gap-2 transform translate-y-2 hover:translate-y-0 transition-transform duration-300">
                {/* Edit Button */}
                <button
                  onClick={() => setIsEditing(true)}
                  title="Edit Details"
                  className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition-colors shadow-sm"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => onDelete(item.id)}
                  title="Delete Forever"
                  className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors shadow-sm"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
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
