import React, { useState, useEffect } from 'react';
import Masonry from "../components/Masonry";
import ImageViewer from "../components/ImageViewer"; 
import AddImageModal from "../components/AddImageModal";
import { motion } from 'framer-motion';

const initialItems = [];

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState(() => {
    const savedData = localStorage.getItem('my_photo_gallery');
    return savedData ? JSON.parse(savedData) : initialItems;
  });
  
  const [selectedItem, setSelectedItem] = useState(null); 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 

  useEffect(() => {
    localStorage.setItem('my_photo_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  const itemsWithAddButton = [
    ...galleryItems, 
    { id: "add-button-unique-id", isAddButton: true, height: 400, img: null }
  ];

  const handleItemClick = (item) => {
    if (item.isAddButton) setIsAddModalOpen(true);
    else setSelectedItem(item);
  };

  const handleSaveNewImage = (newItemData) => {
    const newItem = {
      id: Date.now().toString(), 
      ...newItemData,
      height: parseInt(newItemData.height)
    };
    setGalleryItems(prev => [...prev, newItem]);
  };

  const handleDeleteImage = (id) => {
    if (window.confirm("Are you sure you want to delete this memory?")) {
      setGalleryItems(prev => prev.filter(item => item.id !== id));
      setSelectedItem(null);
    }
  };

  const handleUpdateImage = (updatedItem) => {
    setGalleryItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    setSelectedItem(updatedItem);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full h-full min-h-screen p-4 md:p-8"
    >
        <div className="mb-8">
            <h2 className="text-4xl font-serif text-gray-800">My Gallery</h2>
            <p className="text-pink-400 italic">Little moments captured in time...</p>
        </div>

        <div className="relative w-full h-full min-h-[80vh]">
            <Masonry
                items={itemsWithAddButton} 
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.95}
                blurToFocus={true}
                colorShiftOnHover={false}
                onItemClick={handleItemClick} 
            />
        </div>

      {selectedItem && (
        <ImageViewer 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onDelete={handleDeleteImage} 
          onUpdate={handleUpdateImage} 
        />
      )}

      {isAddModalOpen && (
        <AddImageModal
          onSave={handleSaveNewImage}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </motion.div>
  );
}

export default GalleryPage;