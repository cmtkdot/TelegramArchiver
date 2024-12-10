import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from '@/components/Dashboard';
import { Settings } from '@/pages/Settings';
import { ToastProvider } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon, Home } from 'lucide-react';

function App() {
  return (
    <Router>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Navigation */}
          <nav className="border-b bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-[#3c75ef]">
                    Telegram Archiver
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  <Link to="/">
                    <Button variant="ghost" className="gap-2">
                      <Home className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/settings">
                    <Button variant="ghost" className="gap-2">
                      <SettingsIcon className="h-4 w-4" />
                      Settings
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="container mx-auto py-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </ToastProvider>
    </Router>
  );
}

export default App; 