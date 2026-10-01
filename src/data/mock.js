// Centralized mock data layer. The future backend (FastAPI/PostgreSQL) will
// replace this module cleanly. Components import from here, never inline.
import {
  DriverStatus,
  AssignmentState,
  Priority,
  ConnectionState,
  GPSState,
  VerificationStatus,
} from "@/types/driver";

export const DRIVER_LOGO_URL =
  "https://media.base44.com/images/public/user_6aba794f53ca6d824b804552/bb2425c03_resqbridge-driver-logo-transparent.png";

export const mockDriver = {
  id: "drv-7782",
  name: "Aarav Mehta",
  email: "aarav.mehta@resqbridge.io",
  phone: "+91 98765 43210",
  driverId: "RQD-7782",
  photoUrl: "",
  license: "DL-0420190008765 · Class III Ambulance",
  verification: VerificationStatus.APPROVED,
  status: DriverStatus.AVAILABLE,
};

export const mockAmbulance = {
  id: "AMB-204",
  registration: "DL 01 CAB 204",
  type: "Type III · Advanced Life Support",
  status: "OPERATIONAL",
  fuel: 72,
  battery: 88,
  mileage: 18420,
  equipment: ["Defibrillator", "Oxygen — full", "Trauma kit", "Stretcher", "Ventilator"],
};

export const mockHospital = {
  id: "hsp-11",
  name: "Northgate General Hospital",
  location: { lat: 28.6139, lng: 77.209, label: "Northgate General — Trauma Bay 2" },
  phone: "+91 11 4000 2200",
  accepting: true,
};

export const mockEmergency = {
  id: "EMG-44120",
  summary: "Adult male, chest pain and shortness of breath, conscious and responsive.",
  priority: Priority.CRITICAL,
  location: { lat: 28.621, lng: 77.218, label: "Sector 14, Park Street — near gate 3" },
  evidenceAvailable: true,
  instructions: [
    "Approach from Park Street east entrance.",
    "Patient is on the ground floor lobby.",
    "Dispatch has notified building security.",
  ],
};

export const mockAssignment = {
  id: "asg-90311",
  emergency: mockEmergency,
  hospital: mockHospital,
  eta: { minutes: 7, distanceMeters: 2100 },
  state: AssignmentState.RECEIVED,
  createdAt: "2026-10-01T11:02:00Z",
  dispatchNote: "Priority dispatch. Nearest available unit.",
};

export const mockNotifications = [
  { id: "n1", type: "assignment", title: "New assignment", body: "EMG-44120 · Critical · 2.1 km", createdAt: "11:02", read: false, important: true },
  { id: "n2", type: "dispatch", title: "Dispatch update", body: "Trauma bay reserved at Northgate General.", createdAt: "11:03", read: false, important: false },
  { id: "n3", type: "hospital", title: "Hospital ready", body: "Northgate General is accepting handovers.", createdAt: "10:48", read: true, important: false },
  { id: "n4", type: "system", title: "Shift reminder", body: "Your shift ends at 18:00.", createdAt: "09:30", read: true, important: false },
  { id: "n5", type: "account", title: "Verification approved", body: "Your driver authorization is approved.", createdAt: "08:15", read: true, important: false },
];

export const mockHistory = [
  { id: "h1", emergencyId: "EMG-44087", date: "2026-10-01", destination: "Northgate General Hospital", durationMin: 24, state: "COMPLETED", handoverStatus: "Confirmed" },
  { id: "h2", emergencyId: "EMG-44079", date: "2026-10-01", destination: "Lifeline Trauma Center", durationMin: 31, state: "COMPLETED", handoverStatus: "Confirmed" },
  { id: "h3", emergencyId: "EMG-44061", date: "2026-09-30", destination: "City Heart Institute", durationMin: 18, state: "CANCELLED", handoverStatus: "—" },
  { id: "h4", emergencyId: "EMG-44045", date: "2026-09-30", destination: "Northgate General Hospital", durationMin: 27, state: "COMPLETED", handoverStatus: "Confirmed" },
  { id: "h5", emergencyId: "EMG-44030", date: "2026-09-29", destination: "St. Mary Emergency", durationMin: 22, state: "COMPLETED", handoverStatus: "Confirmed" },
];

export const mockTimeline = [
  { label: "Assignment received", time: "11:02", state: "RECEIVED", done: true },
  { label: "Accepted by driver", time: "11:03", state: "ACCEPTED", done: true },
  { label: "En route to patient", time: "11:04", state: "EN_ROUTE_TO_PATIENT", done: true },
  { label: "Arrived at scene", time: "11:11", state: "AT_SCENE", done: true },
  { label: "Patient picked up", time: "11:15", state: "PATIENT_PICKED_UP", done: true },
  { label: "En route to hospital", time: "11:16", state: "EN_ROUTE_TO_HOSPITAL", done: false },
  { label: "Arrived at hospital", time: "—", state: "AT_HOSPITAL", done: false },
  { label: "Handover", time: "—", state: "HANDOVER", done: false },
  { label: "Completed", time: "—", state: "COMPLETED", done: false },
];

export const mockTodaySummary = {
  assignments: 4,
  completed: 3,
  cancelled: 1,
  avgResponseMin: 6.4,
  distanceKm: 38.2,
};