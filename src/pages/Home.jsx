
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Utensils, Clock, Target, Eye, Award } from 'lucide-react';

const Home = () => {
  const stats = [
    { label: 'Food Donors', value: '2,450', icon: Utensils },
    { label: 'Active Volunteers', value: '850', icon: Users },
    { label: 'Meals Rescued', value: '125,000', icon: Heart },
    { label: 'Hours Saved', value: '45,000', icon: Clock },
  ];

  const impactAreas = [
    {
      title: 'Food Rescue',
      description: 'Collecting surplus food from restaurants, events, and households before it goes to waste.',
      icon: Utensils,
    },
    {
      title: 'Community Support',
      description: 'Delivering rescued food to shelters, orphanages, and communities in need.',
      icon: Users,
    },
    {
      title: 'Awareness Programs',
      description: 'Educating people about food waste and its impact on environment and society.',
      icon: Target,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center gradient-bg">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            No Food Should Go to <span className="text-orange-300">Waste</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Join us in our mission to eliminate food waste and feed the hungry. 
            Together, we can make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donate-food">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold hover-lift">
                Donate Food
              </Button>
            </Link>
            <Link to="/volunteer">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 text-lg font-semibold hover-lift">
                Become a Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Impact So Far</h2>
            <p className="text-xl text-gray-600">Together, we're making a real difference in our community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover-lift">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <stat.icon className="w-12 h-12 mx-auto text-orange-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Eye className="w-8 h-8 text-orange-500 mr-3" />
                  <h3 className="text-3xl font-bold text-gray-800">Our Vision</h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  A world where no food goes to waste while people go hungry. We envision communities 
                  where surplus food is efficiently redistributed to those in need, creating a sustainable 
                  ecosystem of care and responsibility.
                </p>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-3xl font-bold text-gray-800">Our Mission</h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To bridge the gap between food surplus and food scarcity by creating an efficient 
                  network of donors, volunteers, and beneficiaries. We aim to reduce food waste, 
                  alleviate hunger, and build stronger communities through collective action.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {impactAreas.map((area, index) => (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <area.icon className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">{area.title}</h4>
                        <p className="text-gray-600">{area.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 gradient-bg">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Award className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-100 mb-8">
            Whether you have food to donate, time to volunteer, or resources to contribute, 
            every action counts in our fight against food waste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donate-food">
              <Button size="lg" className="bg-white text-blue-800 hover:bg-gray-100 px-8 py-4 text-lg font-semibold hover-lift">
                Start Donating Food
              </Button>
            </Link>
            <Link to="/donate-money">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 text-lg font-semibold hover-lift">
                Support Financially
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
