
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import PatientDashboard from './dashboards/PatientDashboard';
import DoctorDashboard from './dashboards/DoctorDashboard';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!user?.id,
  });

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No profile found</p>
      </div>
    );
  }

  if (profile.user_type === 'patient') {
    return <PatientDashboard profile={profile} />;
  } else if (profile.user_type === 'doctor') {
    return <DoctorDashboard profile={profile} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Invalid user type</p>
    </div>
  );
};

export default Dashboard;
