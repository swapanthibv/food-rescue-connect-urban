
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Bell, MapPin, Clock, User, Car, Award, CheckCircle, XCircle, Camera } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const VolunteerPortal = () => {
  const { isAuthenticated, user } = useAuth();
  const [isActive, setIsActive] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'pickup_request',
      donor: 'Restaurant ABC',
      location: 'Connaught Place, New Delhi',
      servings: 75,
      time: '2:30 PM',
      status: 'pending',
      distance: '2.3 km',
    },
    {
      id: 2,
      type: 'pickup_request',
      donor: 'Wedding Hall XYZ',
      location: 'Lajpat Nagar, New Delhi',
      servings: 120,
      time: '4:00 PM',
      status: 'pending',
      distance: '5.1 km',
    },
  ]);

  const volunteerProfile = {
    name: user?.name || 'Volunteer',
    phone: '+91 98765 43210',
    vehicleNumber: 'DL-01-AB-1234',
    vehicleType: 'Motorcycle',
    completedDeliveries: 47,
    rating: 4.8,
    certificates: 3,
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleRequestAction = (id, action) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, status: action === 'accept' ? 'accepted' : 'rejected' } : notif
      )
    );

    if (action === 'accept') {
      toast({
        title: "Request Accepted",
        description: "Opening maps for navigation to pickup location...",
      });
      // In a real app, this would open maps/navigation
    } else {
      toast({
        title: "Request Rejected",
        description: "The request has been declined.",
      });
    }
  };

  const openMaps = (location) => {
    // Simulate opening maps - in real app would integrate with Google Maps/other mapping service
    toast({
      title: "Opening Maps",
      description: `Navigating to ${location}`,
    });
  };

  const markDeliveryComplete = (id) => {
    toast({
      title: "Delivery Completed",
      description: "Thank you for completing the delivery! Points have been added to your account.",
    });
    
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, status: 'completed' } : notif
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="gradient-bg text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Volunteer Portal</h1>
              <p className="text-orange-100">Welcome back, {volunteerProfile.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm">Active Status:</span>
                <Switch
                  checked={isActive}
                  onCheckedChange={setIsActive}
                  className="data-[state=checked]:bg-orange-500"
                />
                <Badge variant={isActive ? "default" : "secondary"} className="bg-white text-blue-800">
                  {isActive ? 'Online' : 'Offline'}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader className="bg-blue-600 text-white">
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Volunteer Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold">{volunteerProfile.name}</h3>
                    <p className="text-gray-600">{volunteerProfile.phone}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Vehicle:</span>
                      <div className="flex items-center">
                        <Car className="w-4 h-4 mr-1" />
                        <span className="font-medium">{volunteerProfile.vehicleType}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Vehicle No:</span>
                      <span className="font-medium">{volunteerProfile.vehicleNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Deliveries:</span>
                      <span className="font-bold text-orange-600">{volunteerProfile.completedDeliveries}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-bold text-green-600">⭐ {volunteerProfile.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Certificates:</span>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1 text-yellow-500" />
                        <span className="font-medium">{volunteerProfile.certificates}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600">
                    <Award className="w-4 h-4 mr-2" />
                    View Certificates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications and Requests */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader className="bg-orange-500 text-white">
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Pickup Requests ({notifications.filter(n => n.status === 'pending').length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {!isActive && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-yellow-700 font-medium">
                      You are currently offline. Turn on your active status to receive pickup requests.
                    </p>
                  </div>
                )}
                
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="border rounded-lg p-4 bg-white shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-lg">{notification.donor}</h4>
                            <Badge
                              variant={
                                notification.status === 'accepted' ? 'default' :
                                notification.status === 'rejected' ? 'destructive' :
                                notification.status === 'completed' ? 'default' : 'secondary'
                              }
                              className={
                                notification.status === 'accepted' ? 'bg-green-500' :
                                notification.status === 'completed' ? 'bg-blue-500' : ''
                              }
                            >
                              {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {notification.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              Pickup: {notification.time}
                            </div>
                            <div>
                              <strong>Servings:</strong> {notification.servings} people
                            </div>
                            <div>
                              <strong>Distance:</strong> {notification.distance}
                            </div>
                          </div>

                          {notification.status === 'pending' && isActive && (
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => handleRequestAction(notification.id, 'accept')}
                                className="bg-green-500 hover:bg-green-600 flex items-center"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Accept
                              </Button>
                              <Button
                                onClick={() => handleRequestAction(notification.id, 'reject')}
                                variant="outline"
                                className="border-red-500 text-red-500 hover:bg-red-50 flex items-center"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}

                          {notification.status === 'accepted' && (
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => openMaps(notification.location)}
                                className="bg-blue-500 hover:bg-blue-600 flex items-center"
                              >
                                <MapPin className="w-4 h-4 mr-1" />
                                Navigate
                              </Button>
                              <Button
                                onClick={() => markDeliveryComplete(notification.id)}
                                className="bg-green-500 hover:bg-green-600 flex items-center"
                              >
                                <Camera className="w-4 h-4 mr-1" />
                                Complete Delivery
                              </Button>
                            </div>
                          )}

                          {notification.status === 'completed' && (
                            <div className="text-green-600 font-medium flex items-center">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Delivery Completed Successfully!
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {notifications.filter(n => n.status !== 'completed').length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No active pickup requests at the moment.</p>
                      <p className="text-sm">Check back later or ensure your status is active.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPortal;
