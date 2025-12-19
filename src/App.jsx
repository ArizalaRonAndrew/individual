// src/App.jsx
import React, { useState, useEffect } from 'react';
import Masonry from "./photogallery";
import ImageViewer from "./ImageViewer"; 
import AddImageModal from "./AddImageModal";

// Initial Data (Gagamitin lang kapag wala pang laman ang Local Storage)
const initialItems = [];

function App() {
  // 1. Initialize State from Local Storage
  const [galleryItems, setGalleryItems] = useState(() => {
    const savedData = localStorage.getItem('my_photo_gallery');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return initialItems;
  });
  
  const [selectedItem, setSelectedItem] = useState(null); 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 

  // 2. Save to Local Storage automatically kapag may nagbago
  useEffect(() => {
    localStorage.setItem('my_photo_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  // Logic para sa Add Button sa dulo
  const itemsWithAddButton = [
    ...galleryItems, 
    { 
      id: "add-button-unique-id", 
      isAddButton: true, 
      height: 400, 
      img: null 
    }
  ];

  const handleItemClick = (item) => {
    if (item.isAddButton) {
      setIsAddModalOpen(true);
    } else {
      setSelectedItem(item);
    }
  };

  const handleSaveNewImage = (newItemData) => {
    const newItem = {
      id: Date.now().toString(), 
      ...newItemData,
      height: parseInt(newItemData.height)
    };
    setGalleryItems(prev => [...prev, newItem]);
  };

  // --- NEW: Function to DELETE an image ---
  const handleDeleteImage = (id) => {
    // Confirmation prompt (Optional, pwede mong tanggalin kung ayaw mo ng warning)
    if (window.confirm("Are you sure you want to delete this memory forever?")) {
      setGalleryItems(prev => prev.filter(item => item.id !== id));
      setSelectedItem(null); // Isara ang modal pagtapos mag-delete
    }
  };

  // --- NEW: Function to UPDATE/EDIT an image ---
  const handleUpdateImage = (updatedItem) => {
    setGalleryItems(prev => 
      prev.map(item => item.id === updatedItem.id ? updatedItem : item)
    );
    setSelectedItem(updatedItem); // I-update ang naka-display sa modal
  };

  return (
    <>
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

      {/* View Image Modal - Ipinasa natin ang Delete at Update functions */}
      {selectedItem && (
        <ImageViewer 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onDelete={handleDeleteImage} 
          onUpdate={handleUpdateImage} 
        />
      )}

      {/* Add New Image Modal */}
      {isAddModalOpen && (
        <AddImageModal
          onSave={handleSaveNewImage}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </>
  )
}

export default App;