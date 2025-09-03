import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Circle
} from 'lucide-react';
import { learningPaths, mentors } from '../data/mentors';

const LearningPaths: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedPath, setSelectedPath] = useState<number | null>(null);

  // Handle URL parameters
  useEffect(() => {
    const pathId = searchParams.get('path');
    if (pathId) {
      const pathIdNum = parseInt(pathId);
      setSelectedPath(pathIdNum);
      // Scroll to the selected path if it exists
      const pathElement = document.getElementById(`path-${pathIdNum}`);
      if (pathElement) {
        pathElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [searchParams]);
  const getProgressPercentage = (pathId: number) => {
    const progressMap: { [key: number]: number } = {
      1: 25,
      2: 0,
      3: 60,
      4: 15
    };
    return progressMap[pathId] || 0;
  };

  const getCompletedSkills = (pathId: number) => {
    const progress = getProgressPercentage(pathId);
    const path = learningPaths.find(p => p.id === pathId);
    if (!path) return 0;
    return Math.floor((progress / 100) * path.skills.length);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Career Development Paths
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Structured learning journeys designed by industry experts to accelerate your career growth and skill development.
        </p>
      </div>

      {/* Learning Paths Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {learningPaths.map((path, index) => {
          const progress = getProgressPercentage(path.id);
          const completedSkills = getCompletedSkills(path.id);
          const pathMentors = mentors.filter(mentor => 
            path.skills.some(skill => mentor.skills.includes(skill))
          );

          return (
            <motion.div
              key={path.id}
              id={`path-${path.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)" 
              }}
              whileTap={{ scale: 0.98 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 transition-all duration-300 overflow-hidden hover:shadow-md ${
                selectedPath === path.id 
                  ? 'border-primary-500 dark:border-primary-400' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              onClick={() => setSelectedPath(path.id)}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {path.title}
                    </h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      {path.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {path.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {pathMentors.length} mentors
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    {path.difficulty}
                  </div>
                </div>
              </div>

              {/* Progress */}
              {progress > 0 && (
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Progress
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="bg-primary-600 h-2 rounded-full"
                    />
                  </div>
                </div>
              )}

              {/* Skills */}
              <div className="p-6">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Skills you'll learn ({completedSkills}/{path.skills.length})
                </h4>
                <div className="space-y-2">
                  {path.skills.map((skill, skillIndex) => {
                    const isCompleted = skillIndex < completedSkills;
                    return (
                      <div key={skill} className="flex items-center space-x-3">
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                        )}
                        <span className={`text-sm ${
                          isCompleted 
                            ? 'text-green-700 dark:text-green-400' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {skill}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mentors */}
              <div className="px-6 pb-6">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Available Mentors
                </h4>
                <div className="flex -space-x-2">
                  {pathMentors.slice(0, 4).map((mentor) => (
                    <img
                      key={mentor.id}
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                      title={mentor.name}
                    />
                  ))}
                  {pathMentors.length > 4 && (
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        +{pathMentors.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6">
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                  {progress > 0 ? (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </>
                  ) : (
                    <>
                      Start Learning Path
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Featured Mentors Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Featured Mentors for Learning Paths
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Connect with expert mentors who can guide you through your learning journey.
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentors.slice(0, 4).map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full object-cover mx-auto group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <h3 className="mt-3 text-sm font-medium text-gray-900 dark:text-white">
                  {mentor.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {mentor.title}
                </p>
                <div className="mt-2 flex items-center justify-center">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600 dark:text-gray-300 ml-1">
                    {mentor.rating}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPaths;
