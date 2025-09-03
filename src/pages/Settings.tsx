import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Save,
  Camera
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Passionate learner and career enthusiast',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    mentorRequests: true,
    learningReminders: true,
    weeklyDigest: false
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    emailVerification: true,
    sessionTimeout: 30
  });

  const handleSave = async (section: string) => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    
    // Show success message
    const event = new CustomEvent('showNotification', {
      detail: { message: `${section} settings saved successfully!`, type: 'success' }
    });
    window.dispatchEvent(event);
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your account preferences and settings
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </motion.button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <motion.img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                    whileHover={{ scale: 1.05 }}
                  />
                  <motion.button
                    className="absolute -bottom-2 -right-2 p-2 bg-primary-600 text-white rounded-full shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Camera className="h-4 w-4" />
                  </motion.button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Profile Picture
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Upload a new profile picture
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <motion.button
                onClick={() => handleSave('Profile')}
                disabled={isSaving}
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSaving ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </motion.button>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notification Preferences
              </h3>
              
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Receive notifications for {key.toLowerCase()}
                      </p>
                    </div>
                    <motion.button
                      onClick={() => setNotifications({ ...notifications, [key]: !value })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                        layout
                      />
                    </motion.button>
                  </div>
                ))}
              </div>

              <motion.button
                onClick={() => handleSave('Notification')}
                disabled={isSaving}
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSaving ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </motion.button>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Security Settings
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <motion.button
                    onClick={() => setSecurity({ ...security, twoFactor: !security.twoFactor })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      security.twoFactor ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        security.twoFactor ? 'translate-x-6' : 'translate-x-1'
                      }`}
                      layout
                    />
                  </motion.button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      Email Verification
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Require email verification for new devices
                    </p>
                  </div>
                  <motion.button
                    onClick={() => setSecurity({ ...security, emailVerification: !security.emailVerification })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      security.emailVerification ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        security.emailVerification ? 'translate-x-6' : 'translate-x-1'
                      }`}
                      layout
                    />
                  </motion.button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Session Timeout (minutes)
                </label>
                <select
                  value={security.sessionTimeout}
                  onChange={(e) => setSecurity({ ...security, sessionTimeout: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={120}>2 hours</option>
                </select>
              </div>

              <motion.button
                onClick={() => handleSave('Security')}
                disabled={isSaving}
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSaving ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </motion.button>
            </motion.div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Appearance Settings
              </h3>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    Theme
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Choose your preferred theme
                  </p>
                </div>
                <motion.button
                  onClick={toggleTheme}
                  className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Palette className="mr-2 h-4 w-4" />
                  {theme === 'light' ? 'Light' : 'Dark'} Mode
                </motion.button>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Preview
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Current theme: {theme === 'light' ? 'Light' : 'Dark'} mode
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
