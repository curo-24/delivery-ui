import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BottomNavigation from '@/components/BottomNavigation';
import { toast } from '@/components/ui/use-toast';
import {
  Package,
  DollarSign,
  Star,
  MapPin,
  Clock,
  Bell,
  TrendingUp,
  Truck,
  CheckCircle,
  AlertCircle,
  Navigation as NavigationIcon,
  Phone,
  MessageCircle,
  Settings
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { orders, earnings, performance } = useData();
  const [isOnline, setIsOnline] = useState(true);

  const todayOrders = orders.filter(order => 
    ['assigned', 'picked_up', 'out_for_delivery'].includes(order.status)
  );

  const completedToday = orders.filter(order => order.status === 'delivered').length;
  const pendingOrders = orders.filter(order => order.status === 'assigned').length;
  const inTransitOrders = orders.filter(order => 
    ['picked_up', 'out_for_delivery'].includes(order.status)
  ).length;

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    toast({
      title: isOnline ? "Going Offline" : "Going Online",
      description: isOnline 
        ? "You won't receive new orders while offline" 
        : "You're now available for new deliveries!"
    });
  };

  const handleQuickAction = (action) => {
    toast({
      title: "🚧 Quick Action",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Delivery Boy Panel</title>
        <meta name="description" content="Real-time delivery dashboard with earnings, orders, and performance tracking for delivery professionals." />
      </Helmet>

      <div className="min-h-screen pb-20 p-4 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-blue-500/50">
              <AvatarImage src={user?.profileImage} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'DB'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold text-white">Welcome back, {user?.name || 'Delivery Boy'}!</h1>
              <div className="flex items-center space-x-2">
                <Badge variant={isOnline ? 'default' : 'secondary'} className={isOnline ? 'bg-green-500' : 'bg-gray-500'}>
                  {isOnline ? 'Online' : 'Offline'}
                </Badge>
                <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                  <Star className="w-3 h-3 mr-1" />
                  {performance.rating}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuickAction('notifications')}
              className="glass-effect border-white/20 text-white hover:bg-white/10"
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuickAction('settings')}
              className="glass-effect border-white/20 text-white hover:bg-white/10"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Online/Offline Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 pulse-glow' : 'bg-gray-500'}`} />
                  <div>
                    <p className="font-semibold text-white">
                      {isOnline ? 'You\'re Online' : 'You\'re Offline'}
                    </p>
                    <p className="text-sm text-white/70">
                      {isOnline ? 'Ready to receive new orders' : 'Not receiving new orders'}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={toggleOnlineStatus}
                  className={`${
                    isOnline 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {isOnline ? 'Go Offline' : 'Go Online'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Card className="earnings-card border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm text-white/70">Today's Earnings</p>
                  <p className="text-xl font-bold text-white">${earnings.today}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="order-card border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-white/70">Active Orders</p>
                  <p className="text-xl font-bold text-white">{todayOrders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="performance-card border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-white/70">Completed</p>
                  <p className="text-xl font-bold text-white">{completedToday}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="navigation-card border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-orange-400" />
                <div>
                  <p className="text-sm text-white/70">Rating</p>
                  <p className="text-xl font-bold text-white">{performance.rating}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Today's Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-yellow-500/20 rounded-full flex items-center justify-center mb-2">
                    <Clock className="h-6 w-6 text-yellow-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">{pendingOrders}</p>
                  <p className="text-sm text-white/70">Pending</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                    <Truck className="h-6 w-6 text-blue-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">{inTransitOrders}</p>
                  <p className="text-sm text-white/70">In Transit</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">{completedToday}</p>
                  <p className="text-sm text-white/70">Delivered</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Active Orders</span>
                </div>
                <Badge variant="outline" className="text-blue-400 border-blue-400">
                  {todayOrders.length} Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto text-white/30 mb-4" />
                  <p className="text-white/70">No active orders</p>
                  <p className="text-sm text-white/50">New orders will appear here</p>
                </div>
              ) : (
                todayOrders.slice(0, 3).map((order) => (
                  <motion.div
                    key={order.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border ${
                      order.status === 'assigned' ? 'status-pending' :
                      order.status === 'picked_up' ? 'status-in-transit' :
                      'status-in-transit'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {order.id}
                        </Badge>
                        <Badge 
                          variant={order.priority === 'high' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {order.priority}
                        </Badge>
                      </div>
                      <span className="text-sm font-semibold text-white">
                        ${order.amount}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-blue-400" />
                        <span className="text-white/80">{order.pharmacy}</span>
                        <span className="text-white/60">• {order.distance}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4 text-orange-400" />
                        <span className="text-white/80">ETA: {order.estimatedTime}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm">
                        <Package className="h-4 w-4 text-green-400" />
                        <span className="text-white/80">{order.items.join(', ')}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-3">
                      <Button
                        size="sm"
                        onClick={() => handleQuickAction('navigate')}
                        className="flex-1 bg-blue-500 hover:bg-blue-600"
                      >
                        <NavigationIcon className="h-4 w-4 mr-1" />
                        Navigate
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuickAction('call')}
                        className="glass-effect border-white/20 text-white hover:bg-white/10"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuickAction('message')}
                        className="glass-effect border-white/20 text-white hover:bg-white/10"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Recent Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium text-white">New Order Assigned</p>
                  <p className="text-xs text-white/70">Order #ORD001 from HealthCare Pharmacy</p>
                  <p className="text-xs text-white/50">2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium text-white">Bonus Earned!</p>
                  <p className="text-xs text-white/70">+$5 for completing 5 deliveries today</p>
                  <p className="text-xs text-white/50">1 hour ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium text-white">Customer Rating</p>
                  <p className="text-xs text-white/70">5-star rating received from Emma Davis</p>
                  <p className="text-xs text-white/50">3 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <BottomNavigation />
    </>
  );
};

export default Dashboard;