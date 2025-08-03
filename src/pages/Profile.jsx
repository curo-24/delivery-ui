import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import BottomNavigation from '@/components/BottomNavigation';
import { toast } from '@/components/ui/use-toast';
import {
  User,
  Star,
  Award,
  Phone,
  Mail,
  MapPin,
  Truck,
  Camera,
  Edit,
  Shield,
  FileText,
  Calendar,
  Clock,
  TrendingUp,
  Settings,
  LogOut,
  Upload,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const { performance } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    vehicleType: user?.vehicleType || 'Bike'
  });

  const documents = [
    {
      name: 'Driving License',
      status: 'verified',
      uploadDate: '2024-01-10',
      expiryDate: '2026-01-10'
    },
    {
      name: 'Aadhar Card',
      status: 'verified',
      uploadDate: '2024-01-10',
      expiryDate: null
    },
    {
      name: 'Vehicle Registration',
      status: 'pending',
      uploadDate: '2024-01-15',
      expiryDate: '2025-12-31'
    },
    {
      name: 'Insurance Certificate',
      status: 'expired',
      uploadDate: '2023-12-01',
      expiryDate: '2024-01-01'
    }
  ];

  const achievements = [
    {
      title: 'Gold Level Partner',
      description: 'Completed 500+ deliveries',
      icon: Award,
      color: 'text-yellow-400',
      earned: true
    },
    {
      title: 'Speed Demon',
      description: 'Average delivery time under 25 mins',
      icon: Clock,
      color: 'text-blue-400',
      earned: true
    },
    {
      title: 'Customer Favorite',
      description: 'Maintain 4.8+ rating for 30 days',
      icon: Star,
      color: 'text-purple-400',
      earned: true
    },
    {
      title: 'Perfect Week',
      description: 'Zero failed deliveries in a week',
      icon: CheckCircle,
      color: 'text-green-400',
      earned: false
    }
  ];

  const workHours = [
    { day: 'Monday', start: '09:00', end: '18:00', active: true },
    { day: 'Tuesday', start: '09:00', end: '18:00', active: true },
    { day: 'Wednesday', start: '09:00', end: '18:00', active: true },
    { day: 'Thursday', start: '09:00', end: '18:00', active: true },
    { day: 'Friday', start: '09:00', end: '18:00', active: true },
    { day: 'Saturday', start: '10:00', end: '16:00', active: true },
    { day: 'Sunday', start: '10:00', end: '16:00', active: false }
  ];

  const handleSaveProfile = () => {
    updateProfile(editForm);
    setIsEditing(false);
    toast({
      title: "Profile Updated! ✅",
      description: "Your profile information has been saved successfully"
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out"
    });
  };

  const handleQuickAction = (action) => {
    toast({
      title: "🚧 Profile Feature",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const getDocumentStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'expired': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile - Delivery Boy Panel</title>
        <meta name="description" content="Manage your delivery profile, documents, achievements, and work schedule with comprehensive settings and verification status." />
      </Helmet>

      <div className="min-h-screen pb-20 p-4 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">Profile</h1>
            <p className="text-white/70">Manage your account and preferences</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="glass-effect border-red-500/30 text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-4 border-blue-500/50">
                    <AvatarImage src={user?.profileImage} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'DB'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    onClick={() => handleQuickAction('change_photo')}
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h2 className="text-xl font-bold text-white">{user?.name}</h2>
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      {user?.level} Level
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-white/70">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{performance.rating} Rating</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>{performance.completedDeliveries} Deliveries</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Truck className="h-4 w-4 text-blue-400" />
                      <span>{user?.vehicleType}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                  className="glass-effect border-white/20 text-white hover:bg-white/10"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-white/70">Phone</p>
                    <p className="text-white font-medium">{user?.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <Mail className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-sm text-white/70">Email</p>
                    <p className="text-white font-medium">{user?.email}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="performance-card border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Performance Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <Star className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
                  <p className="text-2xl font-bold text-white">{performance.rating}</p>
                  <p className="text-sm text-white/70">Average Rating</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <CheckCircle className="h-8 w-8 mx-auto text-green-400 mb-2" />
                  <p className="text-2xl font-bold text-white">{performance.completedDeliveries}</p>
                  <p className="text-sm text-white/70">Total Deliveries</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <Clock className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                  <p className="text-2xl font-bold text-white">{performance.onTimeDeliveries}</p>
                  <p className="text-sm text-white/70">On-Time Deliveries</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <Award className="h-8 w-8 mx-auto text-purple-400 mb-2" />
                  <p className="text-2xl font-bold text-white">
                    {Math.round((performance.onTimeDeliveries / performance.completedDeliveries) * 100)}%
                  </p>
                  <p className="text-sm text-white/70">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-lg border ${
                        achievement.earned 
                          ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30' 
                          : 'bg-white/5 border-white/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-8 w-8 ${achievement.earned ? achievement.color : 'text-white/30'}`} />
                        <div className="flex-1">
                          <p className={`font-medium ${achievement.earned ? 'text-white' : 'text-white/50'}`}>
                            {achievement.title}
                          </p>
                          <p className={`text-sm ${achievement.earned ? 'text-white/70' : 'text-white/40'}`}>
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.earned && (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Documents</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleQuickAction('upload_document')}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="font-medium text-white">{doc.name}</p>
                      <p className="text-xs text-white/60">
                        Uploaded: {doc.uploadDate}
                        {doc.expiryDate && ` • Expires: ${doc.expiryDate}`}
                      </p>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getDocumentStatusColor(doc.status)}`}>
                    {doc.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Work Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Work Schedule</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickAction('edit_schedule')}
                  className="glass-effect border-white/20 text-white hover:bg-white/10"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {workHours.map((schedule, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    schedule.active 
                      ? 'bg-green-500/10 border border-green-500/20' 
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      schedule.active ? 'bg-green-400' : 'bg-gray-400'
                    }`} />
                    <span className="font-medium text-white">{schedule.day}</span>
                  </div>
                  <div className="text-sm text-white/70">
                    {schedule.active ? `${schedule.start} - ${schedule.end}` : 'Off'}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Quick Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleQuickAction('notifications')}
                  className="glass-effect border-white/20 text-white hover:bg-white/10"
                >
                  Notifications
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleQuickAction('privacy')}
                  className="glass-effect border-white/20 text-white hover:bg-white/10"
                >
                  Privacy
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleQuickAction('language')}
                  className="glass-effect border-white/20 text-white hover:bg-white/10"
                >
                  Language
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleQuickAction('help')}
                  className="glass-effect border-white/20 text-white hover:bg-white/10"
                >
                  Help & Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Edit Profile Dialog */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="glass-effect border-white/20 text-white">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white/80">Name</label>
                <Input
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="glass-effect border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white/80">Phone</label>
                <Input
                  value={editForm.phone}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  className="glass-effect border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white/80">Email</label>
                <Input
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="glass-effect border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white/80">Vehicle Type</label>
                <select
                  value={editForm.vehicleType}
                  onChange={(e) => setEditForm({...editForm, vehicleType: e.target.value})}
                  className="w-full p-2 rounded-md glass-effect border border-white/20 text-white bg-transparent"
                >
                  <option value="Bike" className="bg-slate-800">Bike</option>
                  <option value="Car" className="bg-slate-800">Car</option>
                  <option value="Truck" className="bg-slate-800">Truck</option>
                </select>
              </div>
              <div className="flex space-x-2 pt-4">
                <Button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="flex-1 glass-effect border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <BottomNavigation />
    </>
  );
};

export default Profile;