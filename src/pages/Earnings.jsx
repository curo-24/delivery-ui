import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/BottomNavigation';
import { toast } from '@/components/ui/use-toast';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Wallet,
  Gift,
  Download,
  CreditCard,
  Banknote,
  Target,
  Award,
  Clock,
  Receipt,
  PiggyBank,
  FileText
} from 'lucide-react';

const Earnings = () => {
  const { earnings } = useData();
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [showCashCollection, setShowCashCollection] = useState(false);

  const earningsData = {
    today: {
      total: earnings.today,
      deliveries: 8,
      tips: 15.50,
      bonus: 10.00,
      base: earnings.today - 25.50
    },
    week: {
      total: earnings.week,
      deliveries: 45,
      tips: 89.25,
      bonus: 50.00,
      base: earnings.week - 139.25
    },
    month: {
      total: earnings.month,
      deliveries: 186,
      tips: 356.75,
      bonus: 200.00,
      base: earnings.month - 556.75
    }
  };

  const currentData = earningsData[selectedPeriod];

  const incentives = [
    {
      title: 'Peak Hour Bonus',
      description: 'Extra $2 per delivery during 6-9 PM',
      amount: 16.00,
      status: 'active',
      icon: Clock
    },
    {
      title: 'Weekly Target',
      description: 'Complete 50 deliveries this week',
      progress: 45,
      target: 50,
      reward: 25.00,
      status: 'progress',
      icon: Target
    },
    {
      title: 'Customer Rating Bonus',
      description: 'Maintain 4.8+ rating',
      amount: 20.00,
      status: 'completed',
      icon: Award
    },
    {
      title: 'Referral Program',
      description: 'Refer new delivery partners',
      amount: 50.00,
      status: 'available',
      icon: Gift
    }
  ];

  const recentTransactions = [
    {
      id: 'TXN001',
      type: 'delivery',
      description: 'Order #ORD001 - HealthCare Pharmacy',
      amount: 12.50,
      tip: 3.00,
      date: '2024-01-15 14:30',
      status: 'completed'
    },
    {
      id: 'TXN002',
      type: 'bonus',
      description: 'Peak Hour Bonus',
      amount: 8.00,
      date: '2024-01-15 19:45',
      status: 'completed'
    },
    {
      id: 'TXN003',
      type: 'delivery',
      description: 'Order #ORD002 - City Lab Center',
      amount: 8.75,
      tip: 2.50,
      date: '2024-01-15 16:15',
      status: 'completed'
    }
  ];

  const handleCashSubmission = () => {
    toast({
      title: "Cash Submitted! 💰",
      description: `$${earnings.cashCollected} has been recorded for submission`
    });
    setShowCashCollection(false);
  };

  const handleQuickAction = (action) => {
    toast({
      title: "🚧 Earnings Feature",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'available': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <>
      <Helmet>
        <title>Earnings - Delivery Boy Panel</title>
        <meta name="description" content="Track your delivery earnings, tips, bonuses, and incentives with detailed analytics and payout management." />
      </Helmet>

      <div className="min-h-screen pb-20 p-4 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">Earnings</h1>
            <p className="text-white/70">Track your income and bonuses</p>
          </div>
          <Button
            onClick={() => handleQuickAction('download_report')}
            variant="outline"
            size="sm"
            className="glass-effect border-white/20 text-white hover:bg-white/10"
          >
            <Download className="h-4 w-4 mr-2" />
            Report
          </Button>
        </motion.div>

        {/* Period Selector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex space-x-2"
        >
          {[
            { key: 'today', label: 'Today' },
            { key: 'week', label: 'This Week' },
            { key: 'month', label: 'This Month' }
          ].map((period) => (
            <Button
              key={period.key}
              variant={selectedPeriod === period.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(period.key)}
              className={`${
                selectedPeriod === period.key 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'glass-effect border-white/20 text-white hover:bg-white/10'
              }`}
            >
              {period.label}
            </Button>
          ))}
        </motion.div>

        {/* Main Earnings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="earnings-card border-green-500/20">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <DollarSign className="h-8 w-8 text-green-400" />
                  <h2 className="text-4xl font-bold text-white">${currentData.total}</h2>
                </div>
                <p className="text-green-400 font-medium capitalize">{selectedPeriod}'s Earnings</p>
                <p className="text-sm text-white/70">{currentData.deliveries} deliveries completed</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Banknote className="h-5 w-5 mx-auto text-blue-400 mb-1" />
                  <p className="text-sm text-white/70">Base Pay</p>
                  <p className="font-bold text-white">${currentData.base.toFixed(2)}</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Gift className="h-5 w-5 mx-auto text-purple-400 mb-1" />
                  <p className="text-sm text-white/70">Tips</p>
                  <p className="font-bold text-white">${currentData.tips.toFixed(2)}</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Award className="h-5 w-5 mx-auto text-yellow-400 mb-1" />
                  <p className="text-sm text-white/70">Bonuses</p>
                  <p className="font-bold text-white">${currentData.bonus.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cash Collection (COD) */}
        {earnings.cashCollected > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-effect border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Wallet className="h-5 w-5" />
                  <span>Cash Collection (COD)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-orange-400">${earnings.cashCollected}</p>
                    <p className="text-sm text-white/70">Total cash collected today</p>
                  </div>
                  <Button
                    onClick={handleCashSubmission}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Receipt className="h-4 w-4 mr-2" />
                    Submit Cash
                  </Button>
                </div>
                
                <div className="text-xs text-white/60 bg-white/5 p-3 rounded-lg">
                  <p className="font-medium mb-1">Submission Instructions:</p>
                  <p>• Submit cash at the nearest hub before 8 PM</p>
                  <p>• Upload deposit receipt after submission</p>
                  <p>• Keep all COD receipts for verification</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Incentives & Bonuses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Incentives & Bonuses</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {incentives.map((incentive, index) => {
                const Icon = incentive.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border ${getStatusColor(incentive.status)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <div>
                          <p className="font-medium text-white">{incentive.title}</p>
                          <p className="text-sm text-white/70">{incentive.description}</p>
                        </div>
                      </div>
                      {incentive.amount && (
                        <span className="font-bold text-white">+${incentive.amount}</span>
                      )}
                    </div>

                    {incentive.progress && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/70">Progress</span>
                          <span className="text-white">{incentive.progress}/{incentive.target}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(incentive.progress / incentive.target) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-white/60 mt-1">
                          Reward: ${incentive.reward} when completed
                        </p>
                      </div>
                    )}

                    <Badge className={`mt-2 text-xs ${getStatusColor(incentive.status)}`}>
                      {incentive.status}
                    </Badge>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Recent Transactions</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickAction('view_all')}
                  className="glass-effect border-white/20 text-white hover:bg-white/10"
                >
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      transaction.type === 'delivery' ? 'bg-blue-400' : 'bg-green-400'
                    }`} />
                    <div>
                      <p className="font-medium text-white text-sm">{transaction.description}</p>
                      <p className="text-xs text-white/60">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-400">
                      +${transaction.amount}
                      {transaction.tip && (
                        <span className="text-xs text-purple-400 ml-1">
                          (+${transaction.tip} tip)
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Tax & Expenses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Tax & Expenses</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <PiggyBank className="h-6 w-6 mx-auto text-red-400 mb-2" />
                  <p className="text-sm text-white/70">Fuel Expenses</p>
                  <p className="text-lg font-bold text-red-400">$45.20</p>
                  <p className="text-xs text-white/50">This month</p>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <Receipt className="h-6 w-6 mx-auto text-blue-400 mb-2" />
                  <p className="text-sm text-white/70">Tax Deductions</p>
                  <p className="text-lg font-bold text-blue-400">$156.80</p>
                  <p className="text-xs text-white/50">Available</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickAction('add_expense')}
                  className="flex-1 glass-effect border-white/20 text-white hover:bg-white/10"
                >
                  Add Expense
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickAction('tax_report')}
                  className="flex-1 glass-effect border-white/20 text-white hover:bg-white/10"
                >
                  Tax Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <BottomNavigation />
    </>
  );
};

export default Earnings;