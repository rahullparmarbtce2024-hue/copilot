// User Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string | null;
 educationLevel: (educationLevel || 'HIGH_SCHOOL') as any;
  institution?: string | null;
  phone?: string | null;
  bio?: string | null;
  isAdmin: boolean;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  educationLevel: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: User;
  token?: string;
}

// Assignment Types
export interface AssignmentInput {
  topic: string;
  subject: string;
  wordCount: number;
  educationLevel: string;
  format: 'ESSAY' | 'REPORT' | 'RESEARCH_PAPER';
}

export interface Assignment extends AssignmentInput {
  id: string;
  userId: string;
  title: string;
  content: string;
  introduction: string;
  conclusion: string;
  references: string[];
  plagiarismScore: number;
  status: 'DRAFT' | 'COMPLETED' | 'SUBMITTED';
  exportFormats: string[];
  createdAt: string;
  updatedAt: string;
}

// Note Types
export interface NoteInput {
  topic: string;
  subject: string;
  difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
}

export interface Note extends NoteInput {
  id: string;
  userId: string;
  content: string;
  keyPoints: string[];
  createdAt: string;
  updatedAt: string;
}

// Question Types
export interface QuestionInput {
  topic: string;
  subject: string;
  marks: 2 | 5 | 10;
  question: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
}

export interface Question extends QuestionInput {
  id: string;
  userId: string;
  answer: string;
  explanation?: string | null;
  type: 'SHORT' | 'MEDIUM' | 'LONG';
  createdAt: string;
  updatedAt: string;
}

// Paper Upload Types
export interface PaperUpload {
  id: string;
  userId: string;
  fileName: string;
  filePath: string;
  subject: string;
  year?: number | null;
  board?: string | null;
  importantTopics: string[];
  analysis?: string | null;
  fileSize: number;
  uploadedAt: string;
  updatedAt: string;
}

// Admin Types
export interface AdminLog {
  id: string;
  action: string;
  userId?: string | null;
  details: string;
  ipAddress?: string | null;
  createdAt: string;
}

export interface AdminStats {
  totalUsers: number;
  totalAssignments: number;
  totalNotes: number;
  totalQuestions: number;
  totalPapers: number;
  activeUsers: number;
  apiUsageToday: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Dashboard Stats
export interface DashboardStats {
  assignmentsCount: number;
  notesCount: number;
  questionsCount: number;
  papersCount: number;
  recentAssignments: Assignment[];
  recentNotes: Note[];
}
