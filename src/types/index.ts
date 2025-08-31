export interface UserProfile {
  id: string;
  householdSize: number;
  hasChildren: boolean;
  income: string;
  zipCode: string;
  primaryNeeds: string[];
  language: string;
  completedAt: string;
}

export interface ResourceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Program {
  id: string;
  name: string;
  category: string;
  description: string;
  eligibility: {
    income: string;
    age: string;
    residency: string;
    [key: string]: string;
  };
  benefits: string[];
  documents: string[];
  contact: {
    phone: string;
    website: string;
    address: string;
    hours: string;
  };
  languages: string[];
  applicationUrl: string;
}

export interface Application {
  id: string;
  programId: string;
  programName: string;
  status: 'saved' | 'started' | 'submitted' | 'approved' | 'denied';
  appliedAt: string;
  documentsChecked: string[];
  notes?: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  url: string;
  category: string;
}

export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: 'urgent' | 'important' | 'routine';
  dueDate?: string;
  createdAt: string;
  applicationId?: string;
  programId?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface ProgressMilestone {
  id: string;
  applicationId: string;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: string;
  order: number;
  estimatedDays: number;
}

export interface Document {
  id: string;
  applicationId: string;
  name: string;
  type: string;
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
  uploadedAt?: string;
  verifiedAt?: string;
  fileUrl?: string;
  notes?: string;
}

export interface UserReview {
  id: string;
  programId: string;
  userId: string;
  rating: number;
  comment: string;
  helpful: boolean;
  waitTime?: number;
  createdAt: string;
}

export interface SuccessStory {
  id: string;
  programId: string;
  userId: string;
  title: string;
  story: string;
  benefitsReceived: string[];
  timeToApproval: number;
  featured: boolean;
  createdAt: string;
}

export interface AnalyticsData {
  totalApplications: number;
  approvedApplications: number;
  deniedApplications: number;
  averageWaitTime: number;
  successRate: number;
  totalBenefitsReceived: number;
  monthlyApplications: {
    month: string;
    count: number;
  }[];
  programSuccessRates: {
    programId: string;
    programName: string;
    successRate: number;
    averageWaitTime: number;
  }[];
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  likes: number;
  replies: CommunityReply[];
  createdAt: string;
}

export interface CommunityReply {
  id: string;
  userId: string;
  userName: string;
  content: string;
  likes: number;
  createdAt: string;
}

// Enterprise Types
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator' | 'support';
  isActive: boolean;
  lastLogin?: string;
  permissions: string[];
  department?: string;
  createdAt: string;
}

export interface AdminProgram {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  budget: number;
  maxApplicants?: number;
  currentApplicants: number;
  applicationsCount: number;
  successRate: number;
  averageProcessingTime: number;
  requirements: string[];
  benefits: string[];
  eligibility: {
    income: string;
    age: string;
    other: string[];
  };
  applicationUrl: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  lastModified: string;
  lastUpdated: string;
  modifiedBy: string;
  createdBy: string;
  isActive: boolean;
}

export interface SystemAnalytics {
  totalUsers: number;
  activeUsers: number;
  totalApplications: number;
  totalPrograms: number;
  systemUptime: number;
  averageResponseTime: number;
  averageProcessingTime: number;
  overallSuccessRate: number;
  monthlyGrowth: number;
  topPrograms: {
    programId: string;
    programName: string;
    applicationCount: number;
    successRate: number;
  }[];
  userEngagement: {
    dailyActiveUsers: number;
    weeklyActiveUsers: number;
    monthlyActiveUsers: number;
    averageSessionDuration: number;
  };
  performanceMetrics: {
    pageLoadTime: number;
    apiResponseTime: number;
    errorRate: number;
    uptime: number;
  };
}

export interface APIIntegration {
  id: string;
  name: string;
  description: string;
  type: 'government' | 'payment' | 'notification' | 'analytics' | 'verification';
  status: 'active' | 'inactive' | 'error' | 'pending';
  endpoint: string;
  lastSync?: string;
  lastChecked?: string;
  createdAt: string;
  errorCount: number;
  successRate: number;
  responseTime: number;
  apiKey?: string;
  rateLimitRemaining?: number;
  rateLimitReset?: string;
  uptime: number;
  requestsToday: number;
  lastError?: string;
  isActive: boolean;
  config: Record<string, any>;
  rateLimit: number;
}

export interface SecurityAudit {
  id: string;
  timestamp: string;
  eventType: 'login' | 'logout' | 'data_access' | 'permission_change' | 'system_alert' | 'failed_login';
  userId?: string;
  userName?: string;
  ipAddress: string;
  userAgent: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  details: Record<string, any>;
}

export interface DataEncryption {
  id: string;
  encryptionMethod: string;
  keyRotationSchedule: string;
  lastKeyRotation: string;
  encryptedFields: string[];
  complianceStandards: string[];
  backupEncryption: boolean;
  status: 'active' | 'rotation_due' | 'error';
}

export interface EnterpriseSettings {
  id: string;
  organizationName: string;
  complianceMode: boolean;
  dataRetentionPeriod: number;
  auditLogRetention: number;
  sessionTimeout: number;
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    expirationDays: number;
  };
  twoFactorAuth: boolean;
  ipWhitelist: string[];
  maintenanceMode: boolean;
  lastUpdated: string;
  updatedBy: string;
}