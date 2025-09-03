import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  BookOpen, 
  Settings, 
  LogOut,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { mentors } from '../data/mentors';
import NotificationSystem from './NotificationSystem';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [userProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'JD',
    role: 'Student',
    progress: 65
  });
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Auto-close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarOpen && window.innerWidth < 1024) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  const handleLogout = () => {
    setIsLoading(true);
    // Simulate logout process
    setTimeout(() => {
      setIsLoading(false);
      console.log('Logging out...');
      alert('Logout functionality would be implemented here');
    }, 1000);
  };

  // Keyboard navigation support for accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape key to close mobile sidebar
      if (event.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
      
      // Ctrl/Cmd + K to focus search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          (searchInput as HTMLInputElement).focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      // Navigate to mentors page with search query
      navigate(`/mentors?search=${encodeURIComponent(query)}`);
    }
  }, [navigate]);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      handleSearch(query);
    }, 300),
    [handleSearch]
  );

  // Debounce utility function
  function debounce<T extends (...args: Parameters<typeof handleSearch>) => void>(
    func: T,
    wait: number
  ): (...args: Parameters<typeof handleSearch>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<typeof handleSearch>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  const getActiveMentorsCount = () => {
    return mentors.filter(mentor => mentor.availability === 'Available').length;
  };

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/', 
      icon: Home,
      badge: null,
      description: 'Overview and analytics'
    },
    { 
      name: 'Mentors', 
      href: '/mentors', 
      icon: Users,
      badge: getActiveMentorsCount(),
      description: 'Find and connect with mentors'
    },
    { 
      name: 'Learning Paths', 
      href: '/learning-paths', 
      icon: BookOpen,
      badge: null,
      description: 'Structured learning programs'
    },
    { 
      name: 'Settings', 
      href: '/settings', 
      icon: Settings,
      badge: null,
      description: 'Account and preferences'
    },
  ];

    const SidebarContent = ({ showLogo = true, showSignOut = true }: { showLogo?: boolean; showSignOut?: boolean }) => (
    <div className={`flex h-screen flex-col transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`} id="sidebar">
      {/* Logo - Only show when showLogo is true */}
      {showLogo && (
        <div className={`flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 ${sidebarCollapsed ? 'px-2' : 'px-6'}`}>
          <div className={`flex items-center space-x-2 ${sidebarCollapsed ? 'justify-center w-full' : ''}`}>
            <motion.img 
              src="/logo/logo.png" 
              alt="SkillDossier Logo" 
              className="h-10 w-10 object-contain"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            {!sidebarCollapsed && (
              <motion.span 
                className="text-xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                SkillDossier
              </motion.span>
            )}
          </div>
          <div className={`flex items-center space-x-1 ${sidebarCollapsed ? 'hidden' : ''}`}>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ChevronLeft className="h-4 w-4" />
              </motion.div>
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {/* Collapse button for collapsed state */}
          {sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="Expand sidebar"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ChevronRight className="h-4 w-4" />
              </motion.div>
            </button>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className={`flex-1 py-6 space-y-2 ${sidebarCollapsed ? 'px-2' : 'px-4'}`}>
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center text-sm font-medium rounded-lg transition-colors group relative ${
                isActive
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              } ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'px-3 py-2'}`}
              title={sidebarCollapsed ? item.name : item.description}
              onClick={() => setSidebarOpen(false)}
              aria-label={`Navigate to ${item.name} page`}
              aria-current={isActive ? 'page' : undefined}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex items-center w-full"
              >
                <Icon className={`h-5 w-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <motion.span 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </>
                )}
              </motion.div>
              {/* Tooltip for collapsed state */}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
              {/* Tooltip for expanded state */}
              {!sidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.description}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

            {/* User section */}
      <div className={`border-t border-gray-200 dark:border-gray-700 p-4 ${sidebarCollapsed ? 'p-2' : ''}`}>
        <div className={`flex items-center space-x-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center relative overflow-hidden">
            <motion.img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="User Avatar" 
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            {/* Progress indicator */}
            <motion.div 
              className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {userProfile.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {userProfile.email}
              </p>
              <div className="flex items-center mt-1">
                <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-600 rounded-full transition-all duration-300"
                    style={{ width: `${userProfile.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  {userProfile.progress}%
                </span>
              </div>
            </div>
          )}
        </div>
        {!sidebarCollapsed && showSignOut && (
          <motion.button 
            onClick={handleLogout}
            disabled={isLoading}
            className="mt-3 w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mr-3 h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full"
              />
            ) : (
              <LogOut className="mr-3 h-4 w-4" />
            )}
            {isLoading ? 'Signing out...' : 'Sign out'}
          </motion.button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg lg:hidden flex flex-col"
        id="mobile-sidebar"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Mobile Logo Section - Only visible on mobile */}
        <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20">
          <div className="flex items-center space-x-3">
            <motion.img 
              src="/logo/logo.png" 
              alt="SkillDossier Logo" 
              className="h-12 w-12 object-contain"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.img 
                src="/logo/name_logo.png" 
                alt="SkillDossier" 
                className="h-8 object-contain"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </motion.div>
          </div>
        </div>
        
        <SidebarContent showLogo={false} showSignOut={false} />
        
        {/* Mobile Sign Out Button */}
        <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
          <motion.button 
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            aria-label="Sign out of your account"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mr-3 h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full"
              />
            ) : (
              <LogOut className="mr-3 h-4 w-4" />
            )}
            {isLoading ? 'Signing out...' : 'Sign out'}
          </motion.button>
        </div>
      </motion.div>

      {/* Desktop Sidebar */}
      <div className={`hidden lg:block lg:fixed lg:inset-y-0 lg:z-50 lg:bg-white lg:dark:bg-gray-800 lg:shadow-lg transition-all duration-300 ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'}`}>
        <SidebarContent showLogo />
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'}`}>
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Open navigation menu"
              aria-expanded={sidebarOpen}
              aria-controls="mobile-sidebar"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            </button>
            
            {/* Mobile Logo - Only visible on mobile */}
            <div className="lg:hidden flex items-center space-x-2">
              <motion.img 
                src="/logo/logo.png" 
                alt="SkillDossier Logo" 
                className="h-8 w-8 object-contain"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <motion.img 
                src="/logo/name_logo.png" 
                alt="SkillDossier" 
                className="h-6 object-contain"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </div>
            
            {/* Page Title */}
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {location.pathname === '/' && 'Dashboard'}
                {location.pathname === '/mentors' && 'Find Mentors'}
                {location.pathname === '/learning-paths' && 'Learning Paths'}
                {location.pathname === '/settings' && 'Settings'}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {location.pathname === '/' && 'Welcome back! Your learning journey continues.'}
                {location.pathname === '/mentors' && `${getActiveMentorsCount()} mentors available`}
                {location.pathname === '/learning-paths' && 'Structured programs for your career growth'}
                {location.pathname === '/settings' && 'Manage your account and preferences'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search mentors, skills..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    debouncedSearch(e.target.value);
                  }}
                  onFocus={() => {}}
                  className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  id="search-input"
                  aria-label="Search mentors and skills (Ctrl+K or Cmd+K)"
                />
              </div>
            </div>

            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {theme === 'light' ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </motion.button>

            {/* Notifications */}
            <NotificationSystem />

            {/* User avatar */}
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center relative overflow-hidden">
              <motion.img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt="User Avatar" 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <motion.div 
                className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;