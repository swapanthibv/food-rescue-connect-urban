
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Clock, Users, MapPin, Camera, Utensils } from 'lucide-react';

const DonateFoodPage = () => {
  const { isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    quantity: '',
    servingCapacity: '',
    hoursAfterCooking: '',
    foodType: '',
    pickupTime: '',
    location: '',
    foodCondition: '',
    foodImage: null,
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, foodImage: file }));
    }
  };

  const calculatePickupTime = () => {
    if (!formData.pickupTime) return '';
    
    const now = new Date();
    const pickupDateTime = new Date(formData.pickupTime);
    const diffInMinutes = Math.floor((pickupDateTime.getTime() - now.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 0) return 'Pickup time has passed';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes from now`;
    
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return `${hours}h ${minutes}m from now`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation
      const servingCapacity = parseInt(formData.servingCapacity);
      if (servingCapacity < 50) {
        toast({
          title: "Donation Not Accepted",
          description: "Please make donations for more than 50 people to ensure efficient distribution.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Calculate estimated collection time (30-90 minutes)
      const estimatedMinutes = Math.floor(Math.random() * 60) + 30;

      toast({
        title: "Donation Accepted!",
        description: `Thank you! Your food will be collected in approximately ${estimatedMinutes} minutes. A volunteer will contact you shortly.`,
      });

      // Reset form
      setFormData({
        phoneNumber: '',
        quantity: '',
        servingCapacity: '',
        hoursAfterCooking: '',
        foodType: '',
        pickupTime: '',
        location: '',
        foodCondition: '',
        foodImage: null,
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Donate Food</h1>
          <p className="text-xl text-gray-600">
            Help us feed those in need by donating your surplus food
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="gradient-bg text-white">
            <CardTitle className="text-2xl flex items-center">
              <Utensils className="w-6 h-6 mr-2" />
              Food Donation Form
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-lg font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    required
                    className="text-lg"
                  />
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-lg font-medium">
                    Quantity of Food Available *
                  </Label>
                  <Input
                    id="quantity"
                    type="text"
                    placeholder="e.g., 5 kg rice, 2 kg dal"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    required
                    className="text-lg"
                  />
                </div>

                {/* Serving Capacity */}
                <div className="space-y-2">
                  <Label htmlFor="servingCapacity" className="text-lg font-medium flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    How Many People Can It Serve? *
                  </Label>
                  <Input
                    id="servingCapacity"
                    type="number"
                    placeholder="Minimum 50 people"
                    value={formData.servingCapacity}
                    onChange={(e) => handleInputChange('servingCapacity', e.target.value)}
                    required
                    min="1"
                    className="text-lg"
                  />
                  <p className="text-sm text-gray-500">Minimum serving capacity: 50 people</p>
                </div>

                {/* Hours After Cooking */}
                <div className="space-y-2">
                  <Label htmlFor="hoursAfterCooking" className="text-lg font-medium flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Hours Since Cooked *
                  </Label>
                  <Select value={formData.hoursAfterCooking} onValueChange={(value) => handleInputChange('hoursAfterCooking', value)}>
                    <SelectTrigger className="text-lg">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 hours</SelectItem>
                      <SelectItem value="2-4">2-4 hours</SelectItem>
                      <SelectItem value="4-6">4-6 hours</SelectItem>
                      <SelectItem value="6-8">6-8 hours</SelectItem>
                      <SelectItem value="8+">More than 8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Food Type */}
                <div className="space-y-2">
                  <Label htmlFor="foodType" className="text-lg font-medium">
                    Type of Food *
                  </Label>
                  <Select value={formData.foodType} onValueChange={(value) => handleInputChange('foodType', value)}>
                    <SelectTrigger className="text-lg">
                      <SelectValue placeholder="Select food type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Pickup Time */}
                <div className="space-y-2">
                  <Label htmlFor="pickupTime" className="text-lg font-medium">
                    Preferred Pickup Time *
                  </Label>
                  <Input
                    id="pickupTime"
                    type="datetime-local"
                    value={formData.pickupTime}
                    onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                    required
                    className="text-lg"
                  />
                  {formData.pickupTime && (
                    <p className="text-sm text-blue-600 font-medium">
                      {calculatePickupTime()}
                    </p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-lg font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Pickup Location *
                </Label>
                <Textarea
                  id="location"
                  placeholder="Complete address with landmarks for easy pickup"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                  className="text-lg min-h-[100px]"
                />
              </div>

              {/* Food Condition */}
              <div className="space-y-2">
                <Label className="text-lg font-medium">Food Condition *</Label>
                <Select value={formData.foodCondition} onValueChange={(value) => handleInputChange('foodCondition', value)}>
                  <SelectTrigger className="text-lg">
                    <SelectValue placeholder="Select food condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freshly-cooked">Freshly Cooked Food</SelectItem>
                    <SelectItem value="leftover">Leftover Food</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Food Image */}
              <div className="space-y-2">
                <Label htmlFor="foodImage" className="text-lg font-medium flex items-center">
                  <Camera className="w-4 h-4 mr-1" />
                  Photo of Food Items *
                </Label>
                <Input
                  id="foodImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                  className="text-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                />
                <p className="text-sm text-gray-500">Upload a clear photo of the food items</p>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-semibold"
                >
                  {isSubmitting ? 'Submitting Donation...' : 'Submit Food Donation'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonateFoodPage;
