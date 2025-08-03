import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BottomNavigation from '@/components/BottomNavigation';
import { toast } from '@/components/ui/use-toast';
import {
  History as HistoryIcon,
  Package,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  TrendingUp
} from 'lucide-react';

const History = () => {
  const { orders, performance } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  // Mock historical data - in real app, this would come from API
  const historicalOrders = [
    ...orders,
    {
      id: 'ORD004',
      status: 'delivered',
      items: ['Blood Test Kit', 'Sample Containers'],
      pharmacy: 'MediLab Diagnostics',
      distance: '1.2 km',
      customerName: 'Robert Wilson',
      customerPhone: '+1234567893',
      amount: 32.75,
      paymentMethod: 'Paid',
      deliveredAt: '2024-01-14 16:45',
      rating: 5,
      tip: 5.00,
      feedback: 'Very fast and professional service!'
    },
    {
      id: 'ORD005',
      status: 'delivered',
      items: ['Prescription Medicines', 'Vitamins'],
      pharmacy: 'QuickCare Pharmacy',
      distance: '2.8 km',
      customerName: 'Lisa Anderson',
      customerPhone: '+1234567894',
      amount: 67.50,
      paymentMethod: 'COD',
      deliveredAt: '2024-01-14 14:20',
      rating: 4,
      tip: 3.50,
      feedback: 'Good service, arrived on time.'
    },
    {
      id: 'ORD006',
      status: 'failed',
      items: ['Medical Equipment'],
      pharmacy: 'HealthTech Store',
      distance: '4.1 km',
      customerName: 'Mark Thompson',
      customerPhone: '+1234567895',
      amount: 125.00,
      paymentMethod: 'Paid',
      failedAt: '2024-01-13 18:30',
      failureReason: 'Customer not available',
      attempts: 3
    },
    {
      id: 'ORD007',
      status: 'delivered',
      items: ['Lab Reports', 'Medical Documents'],
      pharmacy: 'Central Lab',
      distance: '0.8 km',
      customerName: 'Jennifer Davis',
      customerPhone: '+1234567896',
      amount: 15.00,
      paymentMethod: 'Paid',
      deliveredAt: '2024-01-13 11:15',
      rating: 5,
      tip: 2.00,
      feedback: 'Excellent service, very careful with documents.'
    }
  ];

  const filteredOrders = historicalOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.pharmacy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    const matchesDate = filterDate === 'all' || 
                       (filterDate === 'today' && (order.deliveredAt || order.failedAt)?.includes('2024-01-15')) ||
                       (filterDate === 'week' && (order.deliveredAt || order.failedAt)?.includes('2024-01-1')) ||
                       (filterDate === 'month' && (order.deliveredAt || order.failedAt)?.includes('2024-01'));
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'cancelled': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return CheckCircle;
      case 'failed': return XCircle;
      case 'cancelled': return AlertCircle;
      default: return Package;
    }
  };

  const handleQuickAction = (action) => {
    toast({
      title: "🚧 History Feature",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const totalEarnings = filteredOrders
    .filter(order => order.status === 'delivered')
    .reduce((sum, order) => sum + order.amount + (order.tip || 0), 0);

  const completedCount = filteredOrders.filter(order => order.status === 'delivered').length;
  const failedCount = filteredOrders.filter(order => order.status === 'failed').length;
  const averageRating = filteredOrders
    .filter(order => order.rating)
    .reduce((sum, order, _, arr) => sum + order.rating / arr.length, 0);

  return (
    <>
      <Helmet>
        <title>History - Delivery Boy Panel</title>
        <meta name="description" content="Complete delivery history with earnings tracking, customer feedback, and detailed analytics for performance review." />
      </Helmet>

      <div className="min-h-screen pb-20 p-4 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">Delivery History</h1>
            <p className="text-white/70">Track your past deliveries and performance</p>
          </div>
          <Button
            onClick={() => handleQuickAction('download_report')}
            variant="outline"
            size="sm"
            className="glass-effect border-white/20 text-white hover:bg-white/10"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
            <Input
              placeholder="Search by order ID, customer, or pharmacy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-effect border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {[
              { key: 'all', label: 'All Orders' },
              { key: 'delivered', label: 'Delivered' },
              { key: 'failed', label: 'Failed' },
              { key: 'cancelled', label: 'Cancelled' }
            ].map((status) => (
              <Button
                key={status.key}
                variant={filterStatus === status.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status.key)}
                className={`whitespace-nowrap ${
                  filterStatus === status.key 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'glass-effect border-white/20 text-white hover:bg-white/10'
                }`}
              >
                {status.label}
              </Button>
            ))}
          </div>

          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {[
              { key: 'all', label: 'All Time' },
              { key: 'today', label: 'Today' },
              { key: 'week', label: 'This Week' },
              { key: 'month', label: 'This Month' }
            ].map((date) => (
              <Button
                key={date.key}
                variant={filterDate === date.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterDate(date.key)}
                className={`whitespace-nowrap ${
                  filterDate === date.key 
                    ? 'bg-purple-500 hover:bg-purple-600' 
                    : 'glass-effect border-white/20 text-white hover:bg-white/10'
                }`}
              >
                <Calendar className="h-4 w-4 mr-1" />
                {date.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Summary Statistics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <DollarSign className="h-6 w-6 mx-auto text-green-400 mb-2" />
                  <p className="text-lg font-bold text-white">${totalEarnings.toFixed(2)}</p>
                  <p className="text-sm text-white/70">Total Earnings</p>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <CheckCircle className="h-6 w-6 mx-auto text-blue-400 mb-2" />
                  <p className="text-lg font-bold text-white">{completedCount}</p>
                  <p className="text-sm text-white/70">Completed</p>
                </div>
                <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <XCircle className="h-6 w-6 mx-auto text-red-400 mb-2" />
                  <p className="text-lg font-bold text-white">{failedCount}</p>
                  <p className="text-sm text-white/70">Failed</p>
                </div>
                <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <Star className="h-6 w-6 mx-auto text-yellow-400 mb-2" />
                  <p className="text-lg font-bold text-white">{averageRating.toFixed(1)}</p>
                  <p className="text-sm text-white/70">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Orders List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {filteredOrders.length === 0 ? (
            <Card className="glass-effect border-white/20">
              <CardContent className="p-8 text-center">
                <HistoryIcon className="h-16 w-16 mx-auto text-white/30 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No Orders Found</h3>
                <p className="text-white/70">
                  {searchTerm || filterStatus !== 'all' || filterDate !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'Your delivery history will appear here'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status);
              return (
                <motion.div
                  key={order.id}
                  whileHover={{ scale: 1.01 }}
                  className="mb-4"
                >
                  <Card className="glass-effect border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs font-mono">
                            {order.id}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {order.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-white">${order.amount}</p>
                          {order.tip && (
                            <p className="text-xs text-purple-400">+${order.tip} tip</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-sm">
                          <Package className="h-4 w-4 text-blue-400" />
                          <span className="text-white/80">{order.pharmacy}</span>
                          <span className="text-white/60">• {order.distance}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm">
                          <User className="h-4 w-4 text-green-400" />
                          <span className="text-white/80">{order.customerName}</span>
                        </div>

                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="h-4 w-4 text-orange-400" />
                          <span className="text-white/80">
                            {order.deliveredAt || order.failedAt || 'In progress'}
                          </span>
                        </div>

                        <div className="text-sm text-white/70">
                          <p className="font-medium">Items:</p>
                          <p>{order.items.join(', ')}</p>
                        </div>
                      </div>

                      {/* Customer Feedback */}
                      {order.rating && (
                        <div className="mb-4 p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < order.rating ? 'text-yellow-400 fill-current' : 'text-white/30'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-white/70">Customer Rating</span>
                          </div>
                          {order.feedback && (
                            <p className="text-sm text-white/80 italic">"{order.feedback}"</p>
                          )}
                        </div>
                      )}

                      {/* Failure Information */}
                      {order.status === 'failed' && (
                        <div className="mb-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                          <div className="flex items-center space-x-2 mb-1">
                            <AlertCircle className="h-4 w-4 text-red-400" />
                            <span className="text-sm font-medium text-red-400">Delivery Failed</span>
                          </div>
                          <p className="text-sm text-white/70">Reason: {order.failureReason}</p>
                          {order.attempts && (
                            <p className="text-xs text-white/60">Attempts made: {order.attempts}</p>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuickAction('view_details')}
                          className="flex-1 glass-effect border-white/20 text-white hover:bg-white/10"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuickAction('call_customer')}
                          className="glass-effect border-white/20 text-white hover:bg-white/10"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        {order.status === 'failed' && (
                          <Button
                            size="sm"
                            onClick={() => handleQuickAction('retry_delivery')}
                            className="bg-blue-500 hover:bg-blue-600"
                          >
                            Retry
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* Load More */}
        {filteredOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Button
              onClick={() => handleQuickAction('load_more')}
              variant="outline"
              className="glass-effect border-white/20 text-white hover:bg-white/10"
            >
              Load More Orders
            </Button>
          </motion.div>
        )}
      </div>

      <BottomNavigation />
    </>
  );
};

export default History;