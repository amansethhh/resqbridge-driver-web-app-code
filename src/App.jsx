import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from '@/lib/theme';
import { DriverStateProvider } from '@/lib/driverState';

// Platform auth pages
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';

// Driver app pages
import Splash from '@/pages/Splash';
import DriverLogin from '@/pages/DriverLogin';
import EmailOtp from '@/pages/EmailOtp';
import DriverVerification from '@/pages/DriverVerification';
import ProfileSetup from '@/pages/ProfileSetup';
import Home from '@/pages/Home';
import AmbulanceDetails from '@/pages/AmbulanceDetails';
import Availability from '@/pages/Availability';
import Alerts from '@/pages/Alerts';
import DriverProfile from '@/pages/DriverProfile';
import IncomingAssignment from '@/pages/IncomingAssignment';
import AssignmentDetails from '@/pages/AssignmentDetails';
import AssignmentHistory from '@/pages/AssignmentHistory';
import AssignmentHistoryDetail from '@/pages/AssignmentHistoryDetail';
import EnRouteToPatient from '@/pages/EnRouteToPatient';
import ArrivedAtScene from '@/pages/ArrivedAtScene';
import AtScene from '@/pages/AtScene';
import PatientPickup from '@/pages/PatientPickup';
import EnRouteToHospital from '@/pages/EnRouteToHospital';
import ArrivedAtHospital from '@/pages/ArrivedAtHospital';
import PatientHandover from '@/pages/PatientHandover';
import EmergencyCompleted from '@/pages/EmergencyCompleted';
import Settings from '@/pages/Settings';
import HelpSupport from '@/pages/HelpSupport';
import VehicleIssue from '@/pages/VehicleIssue';
import DriverSecurity from '@/pages/DriverSecurity';
import CriticalStates from '@/pages/CriticalStates';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <DriverStateProvider>
      <Routes>
        {/* Platform auth routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />

        {/* Driver app flow */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<DriverLogin />} />
        <Route path="/otp" element={<EmailOtp />} />
        <Route path="/verification" element={<DriverVerification />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ambulance" element={<AmbulanceDetails />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/profile" element={<DriverProfile />} />
        <Route path="/incoming" element={<IncomingAssignment />} />
        <Route path="/assignment" element={<AssignmentDetails />} />
        <Route path="/assignments" element={<AssignmentHistory />} />
        <Route path="/history/:id" element={<AssignmentHistoryDetail />} />
        <Route path="/en-route-patient" element={<EnRouteToPatient />} />
        <Route path="/arrived-scene" element={<ArrivedAtScene />} />
        <Route path="/at-scene" element={<AtScene />} />
        <Route path="/patient-pickup" element={<PatientPickup />} />
        <Route path="/en-route-hospital" element={<EnRouteToHospital />} />
        <Route path="/arrived-hospital" element={<ArrivedAtHospital />} />
        <Route path="/handover" element={<PatientHandover />} />
        <Route path="/completed" element={<EmergencyCompleted />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/issue" element={<VehicleIssue />} />
        <Route path="/security" element={<DriverSecurity />} />
        <Route path="/states" element={<CriticalStates />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </DriverStateProvider>
  );
};


function App() {

  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App