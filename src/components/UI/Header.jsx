import React from 'react';

function Header({ isAnimating, toggleAnimation }) {
  return (
    <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              3D Analytics Dashboard
            </h1>
            <p className="text-gray-300 text-sm mt-1">
              Interactive data visualization with React Three Fiber
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleAnimation}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <span>{isAnimating ? '⏸️' : '▶️'}</span>
              <span>{isAnimating ? 'Pause Rotation' : 'Start Rotation'}</span>
            </button>
            
            <div className="text-right">
              <div className="text-white text-sm font-medium">Live Data</div>
              <div className="text-green-400 text-xs">● Connected</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;