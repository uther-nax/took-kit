import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';
import { Layout } from './Layout';
import { MergePdfPage, PdfDashboardPage } from './pages/pdf';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={(<Layout />)}>
        <Route path="about" element={<>hello aaa</>} />
        <Route path="pdf" element={<PdfDashboardPage />}>
          <Route path="/pdf/merge" element={<MergePdfPage />} />
        </Route>
      </Route>
      <Route path="*" element={(<Layout />)} />
    </Routes>
  );
}

export default Router;
