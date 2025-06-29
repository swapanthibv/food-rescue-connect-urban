
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Heart, Users, Utensils, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const DonateMoneyPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const donationTiers = [
    {
      amount: 500,
      title: 'Feed 10 People',
      description: 'Provide nutritious meals for 10 people for one day',
      impact: '10 meals delivered',
      icon: Utensils,
    },
    {
      amount: 1500,
      title: 'Support 30 People',
      description: 'Help us feed 30 people with rescued food',
      impact: '30 meals + transport costs',
      icon: Users,
    },
    {
      amount: 5000,
      title: 'Monthly Sponsor',
      description: 'Support our operations for a month',
      impact: '100+ meals + volunteer support',
      icon: Heart,
    },
    {
      amount: 0,
      title: 'Custom Amount',
      description: 'Choose your own donation amount',
      impact: 'Every rupee counts',
      icon: CheckCircle,
    },
  ];

  const impactStats = [
    { value: '₹50', description: 'feeds 1 person for a day' },
    { value: '₹1,500', description: 'covers fuel for 10 deliveries' },
    { value: '₹5,000', description: 'supports 1 volunteer for a month' },
    { value: '₹25,000', description: 'funds community kitchen for a week' },
  ];

  const handleDonate = (amount: number) => {
    // In a real app, this would integrate with payment gateway
    alert(`Redirecting to payment gateway for ₹${amount}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="gradient-bg text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Heart className="w-16 h-16 mx-auto mb-6 text-orange-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Support Our Mission
          </h1>
          <p className="text-xl text-gray-100 mb-8">
            Your financial contribution helps us rescue more food, support volunteers, 
            and reach more people in need.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Impact Information */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Your Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <Card key={index} className="text-center hover-lift">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Donation Options */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Choose Your Contribution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationTiers.map((tier, index) => (
              <Card key={index} className="hover-lift cursor-pointer group">
                <CardHeader className={`${tier.amount === 5000 ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'bg-gray-50'}`}>
                  <div className="text-center">
                    <tier.icon className={`w-8 h-8 mx-auto mb-2 ${tier.amount === 5000 ? 'text-white' : 'text-orange-500'}`} />
                    <CardTitle className={`text-xl ${tier.amount === 5000 ? 'text-white' : 'text-gray-800'}`}>
                      {tier.title}
                    </CardTitle>
                    {tier.amount > 0 && (
                      <div className={`text-2xl font-bold mt-2 ${tier.amount === 5000 ? 'text-orange-200' : 'text-orange-600'}`}>
                        ₹{tier.amount.toLocaleString()}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  <div className="flex items-center text-sm text-green-600 mb-4">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {tier.impact}
                  </div>
                  <Button
                    onClick={() => handleDonate(tier.amount)}
                    className="w-full bg-orange-500 hover:bg-orange-600 group-hover:shadow-lg transition-all"
                  >
                    {tier.amount > 0 ? `Donate ₹${tier.amount}` : 'Custom Donation'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How We Use Donations */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            How We Use Your Donations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Food Operations</h3>
              <p className="text-gray-600">60% goes directly to food rescue, packaging, and distribution to communities in need.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Volunteer Support</h3>
              <p className="text-gray-600">25% supports volunteer training, fuel reimbursements, and equipment for our heroes.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Operations</h3>
              <p className="text-gray-600">15% covers platform maintenance, awareness campaigns, and administrative costs.</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Transparent & Trusted
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span>80G Tax Exemption</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span>Monthly Impact Reports</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span>100% Transparent Usage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateMoneyPage;
