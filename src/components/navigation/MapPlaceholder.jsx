import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation as NavigationIcon } from 'lucide-react';

const MapPlaceholder = ({ onQuickAction }) => {
  const svgBackgroundUrl = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="glass-effect border-white/20">
        <CardContent className="p-0">
          <div className="h-64 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: `url("${svgBackgroundUrl}")` }}
            />
            <div className="text-center z-10">
              <MapPin className="h-16 w-16 mx-auto text-white/30 mb-4" />
              <p className="text-white/70 font-medium">Interactive Map</p>
              <p className="text-sm text-white/50">Real-time GPS navigation will appear here</p>
              <Button
                className="mt-4 bg-blue-500 hover:bg-blue-600"
                onClick={() => onQuickAction('open_map')}
              >
                <NavigationIcon className="h-4 w-4 mr-2" />
                Open Full Map
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MapPlaceholder;