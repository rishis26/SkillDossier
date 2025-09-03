import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <img 
            src="/logo/full_logo.png" 
            alt="SkillDossier Logo" 
            className="h-16 object-contain animate-pulse"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          SkillDossier
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Loading your mentorship platform...
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
