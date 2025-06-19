import React from 'react';
import CollapsibleSection from '../UI/CollapsibleSection';
import ChartGrid from '../common/ChartGrid';
import { dashboardSections } from '../../data/dashboardData';
import { useCollapsibleSections } from '../../hooks/useCollapsibleSections';

function CollapsibleDashboard() {
  const { openSections, toggleSection, closeAllSections, openAllSections } = 
    useCollapsibleSections(dashboardSections);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Collapsible 3D chart sections for comprehensive data analysis
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={closeAllSections}
                className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
              >
                Collapse All
              </button>
              <button
                onClick={openAllSections}
                className="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                Expand All
              </button>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {dashboardSections.map((section) => (
          <CollapsibleSection
            key={section.id}
            title={section.title}
            icon={section.icon}
            subtitle={section.subtitle}
            defaultOpen={openSections[section.id]}
          >
            <ChartGrid 
              charts={section.charts} 
              columns={section.charts.length <= 2 ? 2 : 3}
            />
          </CollapsibleSection>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm">
              © 2024 3D Analytics Dashboard. Interactive collapsible charts with React Three Fiber.
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="text-sm text-gray-500">
                {dashboardSections.reduce((total, section) => total + section.charts.length, 0)} Charts Active
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>System Ready</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CollapsibleDashboard;