import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import BottomNavigation from '@/components/BottomNavigation';
import { toast } from '@/components/ui/use-toast';
import {
  Package,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation as NavigationIcon,
  CheckCircle,
  XCircle,
  AlertCircle,
  Camera,
  FileText,
  DollarSign,
  User,
  Truck,
  Star
} from 'lucide-react';

const Orders = () => {
  const { orders, updateOrderStatus } = useData();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'active') return ['assigned', 'picked_up', 'out_for_delivery'].includes(order.status);
    if (filter === 'completed') return order.status === 'delivered';
    if (filter === 'failed') return order.status === 'failed';
    return order.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'picked_up': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'out_for_delivery': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'assigned': return 'Assigned';
      case 'picked_up': return 'Picked Up';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      case 'failed': return 'Failed';
      default: return status;
    }
  };

  const handleAcceptOrder = (orderId) => {
    updateOrderStatus(orderId, 'accepted');
    toast({
      title: "Order Accepted! 🎉",
      description: "You can now proceed to pickup location"
    });
  };

  const handleRejectOrder = (orderId) => {
    updateOrderStatus(orderId, 'rejected');
    toast({
      title: "Order Rejected",
      description: "Order has been reassigned to another delivery partner"
    });
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    const statusMessages = {
      'reached_pickup': 'Marked as reached pickup location',
      'picked_up': 'Order picked up successfully',
      'out_for_delivery': 'Out for delivery',
      'delivered': 'Order delivered successfully! 🎉'
    };
    
    toast({
      title: "Status Updated",
      description: statusMessages[newStatus] || `Status updated to ${newStatus}`
    });
  };

  const handleQuickAction = (action, order) => {
    toast({
      title: "🚧 Quick Action",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const OrderCard = ({ order }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="mb-4"
    >
      <Card className={`glass-effect border-white/20 ${
        order.status === 'assigned' ? 'ring-2 ring-yellow-500/50' : ''
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs font-mono">
                {order.id}
              </Badge>
              <Badge 
                className={`text-xs ${getStatusColor(order.status)}`}
              >
                {getStatusText(order.status)}
              </Badge>
              <Badge 
                variant={order.priority === 'high' ? 'destructive' : 'secondary'}
                className="text-xs"
              >
                {order.priority}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-white">${order.amount}</p>
              <p className="text-xs text-white/60">{order.paymentMethod}</p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-sm">
              <Package className="h-4 w-4 text-blue-400" />
              <span className="text-white/80">{order.pharmacy}</span>
              <span className="text-white/60">• {order.distance}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-orange-400" />
              <span className="text-white/80">ETA: {order.estimatedTime}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4 text-green-400" />
              <span className="text-white/80">{order.customerName}</span>
            </div>

            <div className="text-sm text-white/70">
              <p className="font-medium">Items:</p>
              <p>{order.items.join(', ')}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            {order.status === 'assigned' && (
              <>
                <Button
                  size="sm"
                  onClick={() => handleAcceptOrder(order.id)}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRejectOrder(order.id)}
                  className="flex-1 glass-effect border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </>
            )}

            {['accepted', 'picked_up', 'out_for_delivery'].includes(order.status) && (
              <>
                <Button
                  size="sm"
                  onClick={() => handleQuickAction('navigate', order)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  <NavigationIcon className="h-4 w-4 mr-1" />
                  Navigate
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass-effect border-white/20 text-white hover:bg-white/10"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-effect border-white/20 text-white">
                    <DialogHeader>
                      <DialogTitle>Order Details - {order.id}</DialogTitle>
                    </DialogHeader>
                    <OrderDetails order={order} onStatusUpdate={handleStatusUpdate} />
                  </DialogContent>
                </Dialog>
              </>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickAction('call', order)}
              className="glass-effect border-white/20 text-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickAction('message', order)}
              className="glass-effect border-white/20 text-white hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const OrderDetails = ({ order, onStatusUpdate }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-white/80">Customer</p>
          <p className="text-white">{order.customerName}</p>
          <p className="text-sm text-white/60">{order.customerPhone}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-white/80">Payment</p>
          <p className="text-white">${order.amount}</p>
          <p className="text-sm text-white/60">{order.paymentMethod}</p>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-white/80 mb-2">Pickup Address</p>
        <p className="text-white/90 text-sm">{order.pickupAddress}</p>
      </div>

      <div>
        <p className="text-sm font-medium text-white/80 mb-2">Delivery Address</p>
        <p className="text-white/90 text-sm">{order.deliveryAddress}</p>
      </div>

      <div>
        <p className="text-sm font-medium text-white/80 mb-2">Special Instructions</p>
        <p className="text-white/90 text-sm">{order.instructions || 'No special instructions'}</p>
      </div>

      <div>
        <p className="text-sm font-medium text-white/80 mb-2">Items</p>
        <div className="space-y-1">
          {order.items.map((item, index) => (
            <p key={index} className="text-white/90 text-sm">• {item}</p>
          ))}
        </div>
      </div>

      {/* Status Update Buttons */}
      <div className="space-y-2 pt-4 border-t border-white/20">
        <p className="text-sm font-medium text-white/80">Update Status</p>
        <div className="grid grid-cols-2 gap-2">
          {order.status === 'accepted' && (
            <Button
              size="sm"
              onClick={() => onStatusUpdate(order.id, 'reached_pickup')}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Reached Pickup
            </Button>
          )}
          {order.status === 'reached_pickup' && (
            <Button
              size="sm"
              onClick={() => onStatusUpdate(order.id, 'picked_up')}
              className="bg-purple-500 hover:bg-purple-600"
            >
              Picked Up
            </Button>
          )}
          {order.status === 'picked_up' && (
            <Button
              size="sm"
              onClick={() => onStatusUpdate(order.id, 'out_for_delivery')}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Out for Delivery
            </Button>
          )}
          {order.status === 'out_for_delivery' && (
            <Button
              size="sm"
              onClick={() => onStatusUpdate(order.id, 'delivered')}
              className="bg-green-500 hover:bg-green-600"
            >
              Mark Delivered
            </Button>
          )}
        </div>
      </div>

      {/* Proof of Delivery */}
      {order.status === 'out_for_delivery' && (
        <div className="space-y-2 pt-4 border-t border-white/20">
          <p className="text-sm font-medium text-white/80">Proof of Delivery</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickAction('photo')}
              className="glass-effect border-white/20 text-white hover:bg-white/10"
            >
              <Camera className="h-4 w-4 mr-1" />
              Take Photo
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickAction('signature')}
              className="glass-effect border-white/20 text-white hover:bg-white/10"
            >
              <FileText className="h-4 w-4 mr-1" />
              Signature
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Orders - Delivery Boy Panel</title>
        <meta name="description" content="Manage your delivery orders with real-time status updates, navigation, and customer communication tools." />
      </Helmet>

      <div className="min-h-screen pb-20 p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-white mb-4">Order Management</h1>
          
          {/* Filter Tabs */}
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {[
              { key: 'all', label: 'All Orders', count: orders.length },
              { key: 'active', label: 'Active', count: orders.filter(o => ['assigned', 'picked_up', 'out_for_delivery'].includes(o.status)).length },
              { key: 'assigned', label: 'New', count: orders.filter(o => o.status === 'assigned').length },
              { key: 'completed', label: 'Completed', count: orders.filter(o => o.status === 'delivered').length }
            ].map((tab) => (
              <Button
                key={tab.key}
                variant={filter === tab.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(tab.key)}
                className={`whitespace-nowrap ${
                  filter === tab.key 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'glass-effect border-white/20 text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {tab.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Orders List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {filteredOrders.length === 0 ? (
            <Card className="glass-effect border-white/20">
              <CardContent className="p-8 text-center">
                <Package className="h-16 w-16 mx-auto text-white/30 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No Orders Found</h3>
                <p className="text-white/70">
                  {filter === 'all' 
                    ? 'No orders available at the moment'
                    : `No ${filter} orders found`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Today's Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-400">
                    {orders.filter(o => o.status === 'delivered').length}
                  </p>
                  <p className="text-sm text-white/70">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-400">
                    {orders.filter(o => ['picked_up', 'out_for_delivery'].includes(o.status)).length}
                  </p>
                  <p className="text-sm text-white/70">In Progress</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-400">
                    {orders.filter(o => o.status === 'assigned').length}
                  </p>
                  <p className="text-sm text-white/70">Pending</p>
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

export default Orders;