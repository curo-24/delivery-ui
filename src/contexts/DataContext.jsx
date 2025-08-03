import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [earnings, setEarnings] = useState({
    today: 0,
    week: 0,
    month: 0,
    cashCollected: 0
  });
  const [performance, setPerformance] = useState({
    rating: 4.8,
    completedDeliveries: 0,
    onTimeDeliveries: 0,
    customerFeedback: []
  });

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    const mockOrders = [
      {
        id: 'ORD001',
        status: 'assigned',
        items: ['Medicine Pack A', 'Vitamin Supplements'],
        pharmacy: 'HealthCare Pharmacy',
        distance: '2.5 km',
        pickupAddress: '123 Medical St, Floor 2',
        deliveryAddress: '456 Residential Ave, Apt 3B',
        customerName: 'Sarah Johnson',
        customerPhone: '+1234567890',
        amount: 45.99,
        paymentMethod: 'COD',
        estimatedTime: '25 mins',
        priority: 'high',
        instructions: 'Ring doorbell twice'
      },
      {
        id: 'ORD002',
        status: 'picked_up',
        items: ['Lab Report', 'X-Ray Films'],
        pharmacy: 'City Lab Center',
        distance: '1.8 km',
        pickupAddress: '789 Lab Complex, Ground Floor',
        deliveryAddress: '321 Park View, House 12',
        customerName: 'Mike Chen',
        customerPhone: '+1234567891',
        amount: 25.00,
        paymentMethod: 'Paid',
        estimatedTime: '15 mins',
        priority: 'normal',
        instructions: 'Handle with care - fragile'
      },
      {
        id: 'ORD003',
        status: 'out_for_delivery',
        items: ['Prescription Medicines', 'First Aid Kit'],
        pharmacy: 'MediQuick Store',
        distance: '3.2 km',
        pickupAddress: '555 Commerce St, Shop 15',
        deliveryAddress: '888 Suburb Lane, Villa 7',
        customerName: 'Emma Davis',
        customerPhone: '+1234567892',
        amount: 78.50,
        paymentMethod: 'COD',
        estimatedTime: '30 mins',
        priority: 'high',
        instructions: 'Call before delivery'
      }
    ];

    const mockEarnings = {
      today: 125.50,
      week: 890.25,
      month: 3456.75,
      cashCollected: 245.99
    };

    const mockPerformance = {
      rating: 4.8,
      completedDeliveries: 156,
      onTimeDeliveries: 148,
      customerFeedback: [
        { rating: 5, comment: 'Very professional and fast delivery!', date: '2024-01-15' },
        { rating: 4, comment: 'Good service, arrived on time.', date: '2024-01-14' },
        { rating: 5, comment: 'Excellent communication throughout.', date: '2024-01-13' }
      ]
    };

    setOrders(mockOrders);
    setEarnings(mockEarnings);
    setPerformance(mockPerformance);
  };

  const updateOrderStatus = (orderId, newStatus, additionalData = {}) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, ...additionalData }
          : order
      )
    );
  };

  const addOrder = (newOrder) => {
    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };

  const updateEarnings = (newEarnings) => {
    setEarnings(prevEarnings => ({ ...prevEarnings, ...newEarnings }));
  };

  const value = {
    orders,
    earnings,
    performance,
    updateOrderStatus,
    addOrder,
    updateEarnings,
    setOrders,
    setEarnings,
    setPerformance
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};