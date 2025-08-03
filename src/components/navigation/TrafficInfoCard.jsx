import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const TrafficInfoCard = ({ trafficData, onQuickAction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Traffic Conditions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                trafficData.level === 'light' ? 'bg-green-500' :
                trafficData.level === 'moderate' ? 'bg-yellow-500' :
                'bg-red-500'
              }`} />
              <div>
                <p className="font-semibold text-white capitalize">{trafficData.level} Traffic</p>
                <p className="text-sm text-white/70">Expected delay: {trafficData.delay}</p>
              </div>
            </div>
            <Badge variant="outline" className="text-blue-400 border-blue-400">
              {trafficData.alternateRoutes} Alt Routes
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onQuickAction('avoid_tolls')}
              className="glass-effect border-white/20 text-white hover:bg-white/10"
            >
              Avoid Tolls
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onQuickAction('avoid_highways')}
              className="glass-effect border-white/20 text-white hover:bg-white/10"
            >
              Avoid Highways
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onQuickAction('fastest_route')}
              className="glass-effect border-white/20 text-white hover:bg-white/10"
            >
              Fastest Route
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TrafficInfoCard;