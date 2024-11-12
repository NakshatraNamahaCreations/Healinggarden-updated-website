// ToasterComponent.js
import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToasterComponent = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{

        duration: 5000,
        style: {
          // border: '1px solid #ddd',
          padding: '16px',
          color: '#333',
        },
        success: {
          style: {
            background: '#4caf50',
            color: '#fff',
          },
        },
        error: {
          style: {
            background: '#f44336',
            color: '#fff',
          },
        },
      }}
    />
  );
};

export default ToasterComponent;
