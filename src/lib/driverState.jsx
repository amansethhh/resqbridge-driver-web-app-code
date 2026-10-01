import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import {
  DriverStatus,
  AssignmentState,
  ConnectionState,
  GPSState,
} from "@/types/driver";
import { mockDriver, mockAmbulance, mockAssignment, mockNotifications, mockHistory, mockTodaySummary } from "@/data/mock";

// Central operational state. The future backend/WebSocket layer will drive
// these values; components read from this context so swapping the source later
// requires no UI restructuring.
const DriverStateContext = createContext(null);

export function DriverStateProvider({ children }) {
  const [driver, setDriver] = useState(mockDriver);
  const [ambulance] = useState(mockAmbulance);
  const [assignment, setAssignment] = useState(null); // active assignment
  const [pendingAssignment, setPendingAssignment] = useState(null); // incoming
  const [connection, setConnection] = useState(ConnectionState.ONLINE);
  const [gps, setGps] = useState(GPSState.ACTIVE);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [history] = useState(mockHistory);
  const [summary] = useState(mockTodaySummary);

  const setAvailability = useCallback((status) => {
    setDriver((d) => ({ ...d, status }));
  }, []);

  const receiveAssignment = useCallback((asg) => {
    setPendingAssignment(asg || mockAssignment);
  }, []);

  const acceptAssignment = useCallback(() => {
    setPendingAssignment((p) => {
      if (!p) return null;
      const accepted = { ...p, state: AssignmentState.ACCEPTED, acceptedAt: new Date().toISOString() };
      setAssignment(accepted);
      setDriver((d) => ({ ...d, status: DriverStatus.ON_ASSIGNMENT }));
      return null;
    });
  }, []);

  const declineAssignment = useCallback(() => {
    setPendingAssignment(null);
  }, []);

  const advanceAssignment = useCallback((nextState, patch = {}) => {
    setAssignment((a) => (a ? { ...a, state: nextState, ...patch } : a));
  }, []);

  const clearAssignment = useCallback(() => {
    setAssignment(null);
    setDriver((d) => ({ ...d, status: DriverStatus.AVAILABLE }));
  }, []);

  const cancelAssignment = useCallback(() => {
    setAssignment((a) => (a ? { ...a, state: AssignmentState.CANCELLED } : a));
  }, []);

  const markNotificationRead = useCallback((id) => {
    setNotifications((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const value = useMemo(
    () => ({
      driver, ambulance, assignment, pendingAssignment,
      connection, gps, notifications, history, summary,
      setAvailability, receiveAssignment, acceptAssignment, declineAssignment,
      advanceAssignment, clearAssignment, cancelAssignment,
      setConnection, setGps, markNotificationRead,
    }),
    [driver, ambulance, assignment, pendingAssignment, connection, gps, notifications, history, summary,
     setAvailability, receiveAssignment, acceptAssignment, declineAssignment, advanceAssignment, clearAssignment, cancelAssignment, setConnection, setGps, markNotificationRead]
  );

  return <DriverStateContext.Provider value={value}>{children}</DriverStateContext.Provider>;
}

export const useDriverState = () => {
  const ctx = useContext(DriverStateContext);
  if (!ctx) throw new Error("useDriverState must be used within DriverStateProvider");
  return ctx;
}