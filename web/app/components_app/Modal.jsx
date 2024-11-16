'use client';
import '../globals.css'; 
import React from 'react';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl p-6 relative">
        <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" onClick={onClose}>Close</button>
        {children}
        </div>
    </div>
  );
}

