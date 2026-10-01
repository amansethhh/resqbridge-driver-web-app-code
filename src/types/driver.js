// Backend-ready data contracts. The future FastAPI/PostgreSQL backend will
// provide real instances of these shapes. Components depend only on these
// interfaces, never on arbitrary inline object structures.

export const DriverStatus = {
  OFFLINE: "OFFLINE",
  AVAILABLE: "AVAILABLE",
  UNAVAILABLE: "UNAVAILABLE",
  BUSY: "BUSY",
  ON_ASSIGNMENT: "ON_ASSIGNMENT",
  SUSPENDED: "SUSPENDED",
};

export const AssignmentState = {
  RECEIVED: "RECEIVED",
  ACCEPTED: "ACCEPTED",
  DECLINED: "DECLINED",
  EN_ROUTE_TO_PATIENT: "EN_ROUTE_TO_PATIENT",
  AT_SCENE: "AT_SCENE",
  PATIENT_PICKED_UP: "PATIENT_PICKED_UP",
  EN_ROUTE_TO_HOSPITAL: "EN_ROUTE_TO_HOSPITAL",
  AT_HOSPITAL: "AT_HOSPITAL",
  HANDOVER: "HANDOVER",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  FAILED: "FAILED",
};

export const Priority = {
  CRITICAL: "CRITICAL",
  URGENT: "URGENT",
  STANDARD: "STANDARD",
};

export const ConnectionState = {
  ONLINE: "ONLINE",
  CONNECTING: "CONNECTING",
  OFFLINE: "OFFLINE",
  RECONNECTING: "RECONNECTING",
};

export const GPSState = {
  ACTIVE: "ACTIVE",
  INITIALIZING: "INITIALIZING",
  PERMISSION_REQUIRED: "PERMISSION_REQUIRED",
  UNAVAILABLE: "UNAVAILABLE",
  ERROR: "ERROR",
};

export const VerificationStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  DOCUMENT_REQUIRED: "DOCUMENT_REQUIRED",
  SUSPENDED: "SUSPENDED",
};

/**
 * @typedef {Object} Location
 * @property {number} lat
 * @property {number} lng
 * @property {string} [label]
 */

/**
 * @typedef {Object} ETA
 * @property {number} minutes
 * @property {number} distanceMeters
 */

/**
 * @typedef {Object} Hospital
 * @property {string} id
 * @property {string} name
 * @property {Location} location
 * @property {string} [phone]
 * @property {boolean} [accepting]
 */

/**
 * @typedef {Object} Ambulance
 * @property {string} id
 * @property {string} registration
 * @property {string} type
 * @property {string} status
 * @property {number} fuel
 * @property {number} battery
 * @property {number} mileage
 * @property {string[]} equipment
 */

/**
 * @typedef {Object} Driver
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} driverId
 * @property {string} [photoUrl]
 * @property {string} license
 * @property {string} verification
 * @property {string} status
 * @property {Ambulance} [ambulance]
 */

/**
 * @typedef {Object} Emergency
 * @property {string} id
 * @property {string} summary
 * @property {string} priority
 * @property {Location} location
 * @property {boolean} evidenceAvailable
 * @property {string[]} [instructions]
 */

/**
 * @typedef {Object} Assignment
 * @property {string} id
 * @property {Emergency} emergency
 * @property {Hospital} [hospital]
 * @property {ETA} eta
 * @property {string} state
 * @property {string} createdAt
 * @property {string} [acceptedAt]
 * @property {string} [arrivedAt]
 * @property {string} [pickedUpAt]
 * @property {string} [hospitalArrivedAt]
 * @property {string} [handoverAt]
 * @property {string} [completedAt]
 * @property {string} [dispatchNote]
 */

/**
 * @typedef {Object} NotificationItem
 * @property {string} id
 * @property {string} type
 * @property {string} title
 * @property {string} body
 * @property {string} createdAt
 * @property {boolean} read
 * @property {boolean} important
 */

/**
 * @typedef {Object} TimelineEvent
 * @property {string} label
 * @property {string} time
 * @property {string} [state]
 * @property {boolean} [done]
 */

/**
 * @typedef {Object} AssignmentHistoryItem
 * @property {string} id
 * @property {string} emergencyId
 * @property {string} date
 * @property {string} destination
 * @property {number} durationMin
 * @property {string} state
 * @property {string} handoverStatus
 */