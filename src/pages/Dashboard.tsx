import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Star,
  ArrowRight,
  Clock
} from 'lucide-react';
import { mentors, skillCategories, learningPaths } from '../data/mentors';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleFindMentor = () => {
    navigate('/mentors');
  };

  const handleExplorePaths = () => {
    navigate('/learning-paths');
  };

  const handleMentorClick = (mentorId: number) => {
    navigate(`/mentors?mentor=${mentorId}`);
  };

  const handleLearningPathClick = (pathId: number) => {
    navigate(`/learning-paths?path=${pathId}`);
  };

  const handleSkillCategoryClick = (categoryId: number) => {
    navigate(`/mentors?category=${categoryId}`);
  };
  const stats = [
    {
      name: 'Total Mentors',
      value: mentors.length,
      icon: Users,
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'Learning Paths',
      value: learningPaths.length,
      icon: BookOpen,
      change: '+8%',
      changeType: 'positive'
    },
    {
      name: 'Active Students',
      value: mentors.reduce((sum, mentor) => sum + mentor.students, 0),
      icon: TrendingUp,
      change: '+23%',
      changeType: 'positive'
    },
    {
      name: 'Average Rating',
      value: (mentors.reduce((sum, mentor) => sum + mentor.rating, 0) / mentors.length).toFixed(1),
      icon: Star,
      change: '+0.2',
      changeType: 'positive'
    }
  ];

  const featuredMentors = mentors.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-3xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Welcome back, John! 👋
        </motion.h1>
        <motion.p 
          className="mt-2 text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Ready to accelerate your career growth? Here's your mentorship dashboard.
        </motion.p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)" 
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <motion.p 
                    className="text-2xl font-bold text-gray-900 dark:text-white mt-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <motion.div 
                  className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </motion.div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  from last month
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Featured Mentors */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Featured Mentors
            </h2>
            <Link 
              to="/mentors" 
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center"
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredMentors.map((mentor, index) => (
                          <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)" 
              }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer"
              onClick={() => handleMentorClick(mentor.id)}
            >
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div className="flex items-center space-x-3">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {mentor.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {mentor.title}
                      </p>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600 dark:text-gray-300 ml-1">
                          {mentor.rating}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                          • {mentor.students} students
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {mentor.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                      >
                        {skill}
                      </span>
                    ))}
                    {mentor.skills.length > 2 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                        +{mentor.skills.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Career Development Section */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-primary-200 dark:border-primary-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 Accelerate Your Career Growth
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Get personalized guidance from industry experts to advance your career, develop new skills, and achieve your professional goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              onClick={handleFindMentor}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors transform hover:scale-105"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" 
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Find Your Mentor
            </motion.button>
            <motion.button 
              onClick={handleExplorePaths}
              className="border border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium py-3 px-6 rounded-lg transition-colors transform hover:scale-105"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)" 
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Explore Learning Paths
            </motion.button>
          </div>
        </div>
      </div>

      {/* Learning Paths */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Popular Learning Paths
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {learningPaths.slice(0, 3).map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => handleLearningPathClick(path.id)}
              >
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {path.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {path.duration} • {path.difficulty}
                  </p>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {path.mentors.length} mentors
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Skill Categories
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
                          {skillCategories.slice(0, 4).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => handleSkillCategoryClick(category.id)}
              >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {category.mentors} mentors
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

