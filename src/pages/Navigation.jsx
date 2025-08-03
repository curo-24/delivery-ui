import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useData } from '@/contexts/DataContext';
import BottomNavigation from '@/components/BottomNavigation';
import { toast } from '@/components/ui/use-toast';

import NavigationHeader from '@/components/navigation/NavigationHeader';
import LocationStatusCard from '@/components/navigation/LocationStatusCard';
import TrafficInfoCard from '@/components/navigation/TrafficInfoCard';
import RouteOptimizationCard from '@/components/navigation/RouteOptimizationCard';
import VehicleSelectionCard from '@/components/navigation/VehicleSelectionCard';
import MapPlaceholder from '@/components/navigation/MapPlaceholder';

const Navigation = () => {
  const { orders } = useData();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routeOptimized, setRouteOptimized] = useState(false);
  const [trafficData, setTrafficData] = useState({
    level: 'moderate',
    delay: '5-10 mins',
    alternateRoutes: 2
  });

  const activeOrders = orders.filter(order => 
    ['assigned', 'picked_up', 'out_for_delivery'].includes(order.status)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation({
        lat: 40.7128 + (Math.random() - 0.5) * 0.01,
        lng: -74.0060 + (Math.random() - 0.5) * 0.01,
        accuracy: Math.floor(Math.random() * 10) + 5
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStartNavigation = (order) => {
    setSelectedRoute(order);
    toast({
      title: "Navigation Started 🗺️",
      description: `Navigating to ${order.pharmacy}`
    });
  };

  const handleOptimizeRoute = () => {
    setRouteOptimized(true);
    toast({
      title: "Route Optimized! ⚡",
      description: "Found the fastest route for all your deliveries"
    });
  };

  const handleQuickAction = (action) => {
    toast({
      title: "🚧 Navigation Feature",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>Navigation - Delivery Boy Panel</title>
        <meta name="description" content="Real-time GPS navigation with route optimization, traffic updates, and multi-order routing for efficient deliveries." />
      </Helmet>

      <div className="min-h-screen pb-20 p-4 space-y-6">
        <NavigationHeader onQuickAction={handleQuickAction} />
        
        <LocationStatusCard 
          currentLocation={currentLocation} 
          selectedRoute={selectedRoute} 
        />
        
        <TrafficInfoCard 
          trafficData={trafficData} 
          onQuickAction={handleQuickAction} 
        />
        
        <RouteOptimizationCard
          activeOrders={activeOrders}
          routeOptimized={routeOptimized}
          selectedRoute={selectedRoute}
          onOptimizeRoute={handleOptimizeRoute}
          onStartNavigation={handleStartNavigation}
          onQuickAction={handleQuickAction}
        />
        
        <VehicleSelectionCard onQuickAction={handleQuickAction} />
        
        <MapPlaceholder onQuickAction={handleQuickAction} />
      </div>

      <BottomNavigation />
    </>
  );
};

export default Navigation;