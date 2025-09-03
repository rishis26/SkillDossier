import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Calendar, Star, Users } from 'lucide-react';

interface Mentor {
  id: number;
  name: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
  students: number;
  hourlyRate: string;
  availability: string;
}

interface ConnectionModalProps {
  mentor: Mentor | null;
  isOpen: boolean;
  onClose: () => void;
}

const ConnectionModal: React.FC<ConnectionModalProps> = ({ mentor, isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState<'message' | 'schedule' | null>(null);
  const [message, setMessage] = useState('');

  if (!mentor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle connection request
    console.log('Connection request sent:', { mentor: mentor.name, message, option: selectedOption });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Connect with {mentor.name}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mentor Info */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {mentor.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{mentor.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{mentor.company}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                        {mentor.rating}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                        {mentor.students} students
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connection Options */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  How would you like to connect?
                </h4>
                
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      name="connection"
                      value="message"
                      checked={selectedOption === 'message'}
                      onChange={(e) => setSelectedOption(e.target.value as 'message')}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      selectedOption === 'message' 
                        ? 'border-primary-600 bg-primary-600' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {selectedOption === 'message' && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                      )}
                    </div>
                    <MessageCircle className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Send a message
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Start a conversation about your career goals
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      name="connection"
                      value="schedule"
                      checked={selectedOption === 'schedule'}
                      onChange={(e) => setSelectedOption(e.target.value as 'schedule')}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      selectedOption === 'schedule' 
                        ? 'border-primary-600 bg-primary-600' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {selectedOption === 'schedule' && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                      )}
                    </div>
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Schedule a session
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Book a 1-on-1 mentoring session ({mentor.hourlyRate}/hour)
                      </p>
                    </div>
                  </label>
                </div>

                {selectedOption && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Hi ${mentor.name.split(' ')[0]}, I'm interested in ${selectedOption === 'message' ? 'learning more about your experience' : 'scheduling a mentoring session'}. I'm particularly interested in...`}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      rows={4}
                      required
                    />
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedOption || !message.trim()}
                    className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConnectionModal;


