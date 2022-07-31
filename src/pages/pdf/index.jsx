import React from 'react';
import { Outlet } from 'react-router-dom';

export * from './Merge';

export function PdfDashboardPage() {
  return (
    <Outlet />
  );
}
