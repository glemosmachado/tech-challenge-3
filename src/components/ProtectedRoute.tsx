import { Navigate } from 'react-router-dom';
import { auth } from '../lib/auth';
import React from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const role = auth.getRole(); // 'student' | 'teacher' | null
  if (!role) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
