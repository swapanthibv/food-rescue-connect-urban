
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Users, Car, MapPin, FileText, Phone, User } from 'lucide-react';

const VolunteerPage = () => {
  const { isAuthenticated, userType } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    aadharNumber: '',
    licenseNumber: '',
    vehicleNumber: '',
    vehicleType: '',
    serviceableLocations: '',
    vehicleDocuments: null as File | null,
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userType === 'volunteer') {
    return <Navigate to="/volunteer-portal" replace />;
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, vehicleDocuments: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Volunteer Registration Successful!",
        description: "Welcome to our volunteer network! You can now access the volunteer portal.",
      });

      // In a real app, this would update the user's role in the backend
      // For demo, we'll redirect to volunteer portal
      window.location.href = '/volunteer-portal';

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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Become a Volunteer</h1>
          <p className="text-xl text-gray-600">
            Join our community of heroes who help distribute food to those in need
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="gradient-bg text-white">
            <CardTitle className="text-2xl flex items-center">
              <Users className="w-6 h-6 mr-2" />
              Volunteer Registration Form
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-lg font-medium flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                    className="text-lg"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-lg font-medium flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
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

                {/* Aadhar Number */}
                <div className="space-y-2">
                  <Label htmlFor="aadharNumber" className="text-lg font-medium flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    Aadhar Number *
                  </Label>
                  <Input
                    id="aadharNumber"
                    type="text"
                    placeholder="XXXX XXXX XXXX"
                    value={formData.aadharNumber}
                    onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                    required
                    maxLength={12}
                    className="text-lg"
                  />
                </div>

                {/* License Number */}
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber" className="text-lg font-medium">
                    Driving License Number *
                  </Label>
                  <Input
                    id="licenseNumber"
                    type="text"
                    placeholder="DL-XX-XXXXXXXXX"
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    required
                    className="text-lg"
                  />
                </div>

                {/* Vehicle Number */}
                <div className="space-y-2">
                  <Label htmlFor="vehicleNumber" className="text-lg font-medium flex items-center">
                    <Car className="w-4 h-4 mr-1" />
                    Vehicle Registration Number *
                  </Label>
                  <Input
                    id="vehicleNumber"
                    type="text"
                    placeholder="XX-XX-XX-XXXX"
                    value={formData.vehicleNumber}
                    onChange={(e) => handleInputChange('vehicleNumber', e.target.value)}
                    required
                    className="text-lg"
                  />
                </div>

                {/* Vehicle Type */}
                <div className="space-y-2">
                  <Label htmlFor="vehicleType" className="text-lg font-medium">
                    Vehicle Type *
                  </Label>
                  <Input
                    id="vehicleType"
                    type="text"
                    placeholder="e.g., Motorcycle, Car, Van"
                    value={formData.vehicleType}
                    onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                    required
                    className="text-lg"
                  />
                </div>
              </div>

              {/* Serviceable Locations */}
              <div className="space-y-2">
                <Label htmlFor="serviceableLocations" className="text-lg font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Areas You Can Service *
                </Label>
                <Textarea
                  id="serviceableLocations"
                  placeholder="List the areas/localities where you can pick up and deliver food (e.g., South Delhi, Connaught Place, etc.)"
                  value={formData.serviceableLocations}
                  onChange={(e) => handleInputChange('serviceableLocations', e.target.value)}
                  required
                  className="text-lg min-h-[100px]"
                />
              </div>

              {/* Vehicle Documents */}
              <div className="space-y-2">
                <Label htmlFor="vehicleDocuments" className="text-lg font-medium flex items-center">
                  <FileText className="w-4 h-4 mr-1" />
                  Vehicle Documents *
                </Label>
                <Input
                  id="vehicleDocuments"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  required
                  className="text-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-sm text-gray-500">
                  Upload scanned copies of your vehicle registration and insurance documents (PDF, JPG, PNG)
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Volunteer Requirements:</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Must have a valid driving license and vehicle registration</li>
                  <li>• Should be available for at least 10 hours per week</li>
                  <li>• Must maintain food safety and hygiene standards</li>
                  <li>• Should be punctual and reliable for food pickups and deliveries</li>
                </ul>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold"
                >
                  {isSubmitting ? 'Registering...' : 'Register as Volunteer'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VolunteerPage;
