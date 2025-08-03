import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { 
  Phone, 
  Mail, 
  Lock, 
  Truck, 
  Shield, 
  Fingerprint,
  Eye,
  EyeOff
} from 'lucide-react';

const LoginPage = () => {
  const [loginMethod, setLoginMethod] = useState('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!phone) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    // Mock OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      toast({
        title: "OTP Sent!",
        description: "Check your phone for the verification code"
      });
    }, 1500);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (loginMethod === 'phone' && (!phone || !otp)) {
        throw new Error('Please enter phone number and OTP');
      }
      
      if (loginMethod === 'email' && (!email || !password)) {
        throw new Error('Please enter email and password');
      }

      await login({ phone, email, password });
      
      toast({
        title: "Welcome Back! 🎉",
        description: "Successfully logged in to your delivery panel"
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = () => {
    toast({
      title: "🚧 Biometric Login",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>Login - Delivery Boy Panel</title>
        <meta name="description" content="Secure login for delivery professionals with phone OTP and biometric authentication options." />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl floating-animation" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="glass-effect border-white/20">
            <CardHeader className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              >
                <Truck className="w-8 h-8 text-white" />
              </motion.div>
              
              <CardTitle className="text-2xl font-bold gradient-text">
                Delivery Boy Panel
              </CardTitle>
              
              <p className="text-white/70">
                Secure login to access your delivery dashboard
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Login Method Toggle */}
              <div className="flex bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all ${
                    loginMethod === 'phone' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Phone size={16} />
                  Phone + OTP
                </button>
                <button
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all ${
                    loginMethod === 'email' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Mail size={16} />
                  Email + Password
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {loginMethod === 'phone' ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
                        <Input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-10 glass-effect border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                    </div>

                    {!otpSent ? (
                      <Button
                        type="button"
                        onClick={handleSendOTP}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        {loading ? 'Sending...' : 'Send OTP'}
                      </Button>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white/80">Enter OTP</label>
                          <div className="relative">
                            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
                            <Input
                              type="text"
                              placeholder="123456"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              className="pl-10 glass-effect border-white/20 text-white placeholder:text-white/50"
                              maxLength={6}
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                        >
                          {loading ? 'Verifying...' : 'Verify & Login'}
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 glass-effect border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10 glass-effect border-white/20 text-white placeholder:text-white/50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </>
                )}
              </form>

              {/* Biometric Login */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-white/50">Or</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleBiometricLogin}
                className="w-full glass-effect border-white/20 text-white hover:bg-white/10"
              >
                <Fingerprint className="mr-2" size={16} />
                Biometric Login
              </Button>

              {/* Demo Credentials */}
              <div className="text-center text-xs text-white/50 space-y-1">
                <p>Demo Mode: Use any phone/email to login</p>
                <p>OTP: Any 6 digits • Password: Any text</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;