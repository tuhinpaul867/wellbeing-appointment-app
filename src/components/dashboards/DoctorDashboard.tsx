
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Calendar, Users, Settings, LogOut, Bell, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DoctorDashboardProps {
  profile: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    profile_picture_url: string | null;
    user_type: string | null;
  };
}

const DoctorDashboard = ({ profile }: DoctorDashboardProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const initials = `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || ''}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 animate-fade-in">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <Heart className="h-6 w-6" />
              <span className="text-xl font-bold">HealthCare+</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile.profile_picture_url || ''} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700">
                  Dr. {profile.first_name} {profile.last_name}
                </span>
              </div>
              
              <Button 
                variant="outline" 
                onClick={handleLogout}
                disabled={loading}
                className="hover-scale"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {loading ? 'Logging out...' : 'Logout'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-scale-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, Dr. {profile.first_name}!
          </h1>
          <p className="text-gray-600">Manage your practice and patient appointments</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover-scale cursor-pointer transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">0</div>
              <p className="text-xs text-gray-500">scheduled for today</p>
            </CardContent>
          </Card>

          <Card className="hover-scale cursor-pointer transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">0</div>
              <p className="text-xs text-gray-500">registered patients</p>
            </CardContent>
          </Card>

          <Card className="hover-scale cursor-pointer transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consultations</CardTitle>
              <Stethoscope className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">0</div>
              <p className="text-xs text-gray-500">this month</p>
            </CardContent>
          </Card>

          <Card className="hover-scale cursor-pointer transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Settings</CardTitle>
              <Settings className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Manage Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Schedule Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No appointments scheduled</p>
                <p className="text-sm text-gray-400 mt-2">
                  Your appointments for today will appear here
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No recent patients</p>
                <p className="text-sm text-gray-400 mt-2">
                  Your recent patient consultations will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
