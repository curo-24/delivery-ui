import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BottomNavigation from '@/components/BottomNavigation';
import { toast } from '@/components/ui/use-toast';
import {
  Settings as SettingsIcon,
  Bell,
  Globe,
  Shield,
  HelpCircle,
  Info,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Smartphone,
  MapPin,
  Clock,
  DollarSign,
  Star,
  MessageCircle,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Download,
  Upload,
  Trash2,
  RefreshCw
} from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderUpdates: true,
    earnings: true,
    promotions: false,
    systemAlerts: true
  });
  const [preferences, setPreferences] = useState({
    language: 'English',
    theme: 'dark',
    soundEnabled: true,
    vibrationEnabled: true,
    autoAcceptOrders: false,
    workingHours: {
      start: '09:00',
      end: '18:00'
    }
  });
  const [privacy, setPrivacy] = useState({
    shareLocation: true,
    showOnlineStatus: true,
    allowRatings: true,
    sharePerformance: false
  });

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast({
      title: "Notification Settings Updated",
      description: `${key} notifications ${notifications[key] ? 'disabled' : 'enabled'}`
    });
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    toast({
      title: "Preference Updated",
      description: `${key} has been updated`
    });
  };

  const handlePrivacyToggle = (key) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast({
      title: "Privacy Settings Updated",
      description: `${key} ${privacy[key] ? 'disabled' : 'enabled'}`
    });
  };

  const handleQuickAction = (action) => {
    toast({
      title: "🚧 Settings Feature",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' }
  ];

  return (
    <>
      <Helmet>
        <title>Settings - Delivery Boy Panel</title>
        <meta name="description" content="Customize your delivery app settings including notifications, privacy, language preferences, and work schedule management." />
      </Helmet>

      <div className="min-h-screen pb-20 p-4 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-white/70">Customize your app preferences</p>
          </div>
          <Button
            onClick={() => handleQuickAction('reset_settings')}
            variant="outline"
            size="sm"
            className="glass-effect border-white/20 text-white hover:bg-white/10"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'newOrders', label: 'New Order Assignments', description: 'Get notified when new orders are assigned' },
                { key: 'orderUpdates', label: 'Order Status Updates', description: 'Updates about order changes and customer messages' },
                { key: 'earnings', label: 'Earnings & Payments', description: 'Payment confirmations and earning updates' },
                { key: 'promotions', label: 'Promotions & Bonuses', description: 'Special offers and bonus opportunities' },
                { key: 'systemAlerts', label: 'System Alerts', description: 'Important system updates and maintenance notices' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-white">{item.label}</p>
                    <p className="text-sm text-white/70">{item.description}</p>
                  </div>
                  <Button
                    onClick={() => handleNotificationToggle(item.key)}
                    variant="outline"
                    size="sm"
                    className={`${
                      notifications[item.key] 
                        ? 'bg-green-500/20 border-green-500/30 text-green-400' 
                        : 'glass-effect border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    {notifications[item.key] ? 'On' : 'Off'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* App Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Smartphone className="h-5 w-5" />
                <span>App Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Language Selection */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-medium text-white">Language</p>
                    <p className="text-sm text-white/70">Choose your preferred language</p>
                  </div>
                </div>
                <select
                  value={preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="p-2 rounded-md glass-effect border border-white/20 text-white bg-transparent"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.name} className="bg-slate-800">
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Theme Selection */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  {preferences.theme === 'dark' ? (
                    <Moon className="h-5 w-5 text-purple-400" />
                  ) : (
                    <Sun className="h-5 w-5 text-yellow-400" />
                  )}
                  <div>
                    <p className="font-medium text-white">Theme</p>
                    <p className="text-sm text-white/70">App appearance mode</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handlePreferenceChange('theme', 'dark')}
                    variant="outline"
                    size="sm"
                    className={`${
                      preferences.theme === 'dark' 
                        ? 'bg-purple-500/20 border-purple-500/30 text-purple-400' 
                        : 'glass-effect border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    <Moon className="h-4 w-4 mr-1" />
                    Dark
                  </Button>
                  <Button
                    onClick={() => handlePreferenceChange('theme', 'light')}
                    variant="outline"
                    size="sm"
                    className={`${
                      preferences.theme === 'light' 
                        ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' 
                        : 'glass-effect border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    <Sun className="h-4 w-4 mr-1" />
                    Light
                  </Button>
                </div>
              </div>

              {/* Sound Settings */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  {preferences.soundEnabled ? (
                    <Volume2 className="h-5 w-5 text-green-400" />
                  ) : (
                    <VolumeX className="h-5 w-5 text-red-400" />
                  )}
                  <div>
                    <p className="font-medium text-white">Sound Effects</p>
                    <p className="text-sm text-white/70">Enable notification sounds</p>
                  </div>
                </div>
                <Button
                  onClick={() => handlePreferenceChange('soundEnabled', !preferences.soundEnabled)}
                  variant="outline"
                  size="sm"
                  className={`${
                    preferences.soundEnabled 
                      ? 'bg-green-500/20 border-green-500/30 text-green-400' 
                      : 'glass-effect border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  {preferences.soundEnabled ? 'On' : 'Off'}
                </Button>
              </div>

              {/* Auto Accept Orders */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-orange-400" />
                  <div>
                    <p className="font-medium text-white">Auto Accept Orders</p>
                    <p className="text-sm text-white/70">Automatically accept new orders</p>
                  </div>
                </div>
                <Button
                  onClick={() => handlePreferenceChange('autoAcceptOrders', !preferences.autoAcceptOrders)}
                  variant="outline"
                  size="sm"
                  className={`${
                    preferences.autoAcceptOrders 
                      ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' 
                      : 'glass-effect border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  {preferences.autoAcceptOrders ? 'On' : 'Off'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Working Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Working Hours</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">Start Time</label>
                  <Input
                    type="time"
                    value={preferences.workingHours.start}
                    onChange={(e) => handlePreferenceChange('workingHours', {
                      ...preferences.workingHours,
                      start: e.target.value
                    })}
                    className="glass-effect border-white/20 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">End Time</label>
                  <Input
                    type="time"
                    value={preferences.workingHours.end}
                    onChange={(e) => handlePreferenceChange('workingHours', {
                      ...preferences.workingHours,
                      end: e.target.value
                    })}
                    className="glass-effect border-white/20 text-white"
                  />
                </div>
              </div>
              <div className="text-sm text-white/60 bg-white/5 p-3 rounded-lg">
                <p>You'll only receive orders during your working hours. Orders outside these times will be automatically declined.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Privacy & Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'shareLocation', label: 'Share Location', description: 'Allow real-time location tracking during deliveries', icon: MapPin },
                { key: 'showOnlineStatus', label: 'Show Online Status', description: 'Display your availability to dispatchers', icon: Eye },
                { key: 'allowRatings', label: 'Allow Customer Ratings', description: 'Let customers rate your delivery service', icon: Star },
                { key: 'sharePerformance', label: 'Share Performance Data', description: 'Include your stats in leaderboards', icon: DollarSign }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="font-medium text-white">{item.label}</p>
                        <p className="text-sm text-white/70">{item.description}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handlePrivacyToggle(item.key)}
                      variant="outline"
                      size="sm"
                      className={`${
                        privacy[item.key] 
                          ? 'bg-green-500/20 border-green-500/30 text-green-400' 
                          : 'glass-effect border-white/20 text-white hover:bg-white/10'
                      }`}
                    >
                      {privacy[item.key] ? 'On' : 'Off'}
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Data Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => handleQuickAction('export_data')}
                variant="outline"
                className="w-full glass-effect border-white/20 text-white hover:bg-white/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Export My Data
              </Button>
              <Button
                onClick={() => handleQuickAction('backup_settings')}
                variant="outline"
                className="w-full glass-effect border-white/20 text-white hover:bg-white/10"
              >
                <Upload className="h-4 w-4 mr-2" />
                Backup Settings
              </Button>
              <Button
                onClick={() => handleQuickAction('clear_cache')}
                variant="outline"
                className="w-full glass-effect border-white/20 text-white hover:bg-white/10"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cache
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Support & Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <HelpCircle className="h-5 w-5" />
                <span>Support & Help</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => handleQuickAction('help_center')}
                variant="outline"
                className="w-full glass-effect border-white/20 text-white hover:bg-white/10"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Help Center
              </Button>
              <Button
                onClick={() => handleQuickAction('contact_support')}
                variant="outline"
                className="w-full glass-effect border-white/20 text-white hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button
                onClick={() => handleQuickAction('report_issue')}
                variant="outline"
                className="w-full glass-effect border-white/20 text-white hover:bg-white/10"
              >
                <Phone className="h-4 w-4 mr-2" />
                Report an Issue
              </Button>
              <Button
                onClick={() => handleQuickAction('app_info')}
                variant="outline"
                className="w-full glass-effect border-white/20 text-white hover:bg-white/10"
              >
                <Info className="h-4 w-4 mr-2" />
                App Information
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* App Version */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center text-white/50 text-sm"
        >
          <p>Delivery Boy Panel v2.1.0</p>
          <p>© 2024 Delivery Management System</p>
        </motion.div>
      </div>

      <BottomNavigation />
    </>
  );
};

export default Settings;