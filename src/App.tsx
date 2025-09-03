import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Mentors from './pages/Mentors';
import LearningPaths from './pages/LearningPaths';
import Settings from './pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/learning-paths" element={<LearningPaths />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  404 - Page Not Found
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  The page you're looking for doesn't exist.
                </p>
              </div>
            } />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
