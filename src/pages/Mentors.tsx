import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign,
  Users,
  X
} from 'lucide-react';
import { mentors, skillCategories } from '../data/mentors';
import type { Mentor, SkillCategory } from '../data/mentors';
import ConnectionModal from '../components/ConnectionModal';

const Mentors: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rating');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);

  // Handle URL parameters
  useEffect(() => {
    const mentorId = searchParams.get('mentor');
    const categoryId = searchParams.get('category');
    
    if (mentorId) {
      const mentor = mentors.find((m: Mentor) => m.id === parseInt(mentorId));
      if (mentor) {
        setSelectedMentor(mentor);
        setIsConnectionModalOpen(true);
      }
    }
    
    if (categoryId) {
      const category = parseInt(categoryId);
      // Filter by category - find mentors with matching skills
      const categoryMentors = mentors.filter((mentor: Mentor) => 
        mentor.skills.some((skill: string) => skill.toLowerCase().includes(skillCategories.find((cat: SkillCategory) => cat.id === category)?.name.toLowerCase() || ''))
      );
      if (categoryMentors.length > 0) {
        // Update URL to show filtered results
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('category', categoryId);
        setSearchParams(newSearchParams);
      }
    }
  }, [searchParams, setSearchParams]);

  // Get all unique skills
  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    mentors.forEach((mentor: Mentor) => {
      mentor.skills.forEach((skill: string) => skills.add(skill));
    });
    return Array.from(skills).sort();
  }, []);

  // Filter and sort mentors
  const filteredMentors = useMemo(() => {
    const filtered = mentors.filter((mentor: Mentor) => {
      const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.skills.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesSkills = selectedSkills.length === 0 || 
                           selectedSkills.some(skill => mentor.skills.includes(skill));

      const matchesAvailability = availabilityFilter === 'all' || 
                                 mentor.availability.toLowerCase() === availabilityFilter.toLowerCase();

      return matchesSearch && matchesSkills && matchesAvailability;
    });

    // Sort mentors
    filtered.sort((a: Mentor, b: Mentor) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'students':
          return b.students - a.students;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedSkills, availabilityFilter, sortBy]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleConnectMentor = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsConnectionModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsConnectionModalOpen(false);
    setSelectedMentor(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSkills([]);
    setAvailabilityFilter('all');
    setSortBy('rating');
  };

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Find Your Perfect Mentor
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Connect with industry experts and accelerate your learning journey.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search mentors by name, title, company, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Skills Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Skills:
              </span>
              <div className="flex flex-wrap gap-2">
                {allSkills.slice(0, 8).map((skill) => (
                  <motion.button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                      selectedSkills.includes(skill)
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {skill}
                  </motion.button>
                ))}
                {allSkills.length > 8 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{allSkills.length - 8} more
                  </span>
                )}
              </div>
            </div>

            {/* Availability Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Availability:
              </span>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="available">Available</option>
                <option value="limited">Limited</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="rating">Rating</option>
                <option value="students">Students</option>
                <option value="experience">Experience</option>
                <option value="name">Name</option>
              </select>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedSkills.length > 0 || availabilityFilter !== 'all') && (
              <button
                onClick={clearFilters}
                className="flex items-center px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4 mr-1" />
                Clear filters
              </button>
            )}
          </div>

          {/* Active Filters */}
          {selectedSkills.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Active skills:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                  >
                    {skill}
                    <button
                      onClick={() => toggleSkill(skill)}
                      className="ml-1 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredMentors.length} of {mentors.length} mentors
        </p>
      </div>

      {/* Mentors Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${searchTerm}-${selectedSkills.join(',')}-${availabilityFilter}-${sortBy}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredMentors.map((mentor: Mentor, index: number) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)" 
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => handleConnectMentor(mentor)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="w-16 h-16 rounded-full overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <motion.h3 
                      className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {mentor.name}
                    </motion.h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {mentor.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {mentor.company}
                    </p>
                  </div>
                  <motion.div 
                    className="flex items-center space-x-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {mentor.rating}
                    </span>
                  </motion.div>
                </div>

                {/* Bio */}
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {mentor.bio}
                </p>

                {/* Skills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {mentor.skills.slice(0, 4).map((skill: string) => (
                    <motion.span
                      key={skill}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                  {mentor.skills.length > 4 && (
                    <motion.span 
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      +{mentor.skills.length - 4}
                    </motion.span>
                  )}
                </div>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-xs">{mentor.students}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Students</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-xs">{mentor.experience}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Experience</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span className="text-xs">{mentor.hourlyRate}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hourly</p>
                  </div>
                </div>

                {/* Availability */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      mentor.availability === 'Available' 
                        ? 'bg-green-500' 
                        : 'bg-yellow-500'
                    }`} />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {mentor.availability}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-1" />
                    {mentor.location}
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => handleConnectMentor(mentor)}
                  className="mt-4 w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Connect with {mentor.name.split(' ')[0]}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* No Results */}
      {filteredMentors.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No mentors found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your search criteria or filters.
          </p>
          <button
            onClick={clearFilters}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
      {/* Connection Modal */}
      <ConnectionModal
        mentor={selectedMentor}
        isOpen={isConnectionModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Mentors;

