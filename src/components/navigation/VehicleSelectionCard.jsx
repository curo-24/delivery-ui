import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Bike, Truck } from 'lucide-react';

const VehicleSelectionCard = ({ onQuickAction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Car className="h-5 w-5" />
            <span>Vehicle Mode</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={() => onQuickAction('bike_mode')}
              className="flex flex-col items-center p-4 h-auto glass-effect border-white/20 text-white hover:bg-white/10"
            >
              <Bike className="h-6 w-6 mb-2" />
              <span className="text-xs">Bike</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => onQuickAction('car_mode')}
              className="flex flex-col items-center p-4 h-auto glass-effect border-blue-500/30 text-blue-400 bg-blue-500/10"
            >
              <Car className="h-6 w-6 mb-2" />
              <span className="text-xs">Car</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => onQuickAction('truck_mode')}
              className="flex flex-col items-center p-4 h-auto glass-effect border-white/20 text-white hover:bg-white/10"
            >
              <Truck className="h-6 w-6 mb-2" />
              <span className="text-xs">Truck</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VehicleSelectionCard;