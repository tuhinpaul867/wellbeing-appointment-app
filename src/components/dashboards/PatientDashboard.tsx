
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Calendar, User, LogOut, Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PatientDashboardProps {
  profile: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    profile_picture_url: string | null;
    user_type: string | null;
  };
}

const PatientDashboard = ({ profile }: PatientDashboardProps) => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 animate-fade-in">
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
                  {profile.first_name} {profile.last_name}
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
            Welcome back, {profile.first_name}!
          </h1>
          <p className="text-gray-600">Manage your health appointments and records</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover-scale cursor-pointer transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Find Doctors</CardTitle>
              <Search className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <Link to="/find-doctors">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Book Appointment
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover-scale cursor-pointer transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Appointments
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-scale cursor-pointer transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Profile</CardTitle>
              <User className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-500">No recent activity</p>
              <p className="text-sm text-gray-400 mt-2">
                Your recent appointments and updates will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PatientDashboard;
