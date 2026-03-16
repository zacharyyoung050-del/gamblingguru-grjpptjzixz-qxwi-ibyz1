import React from 'react';
import { Outlet } from 'react-router-dom';
import { RetroLayout } from './RetroLayout';
export function LayoutWrapper() {
  return (
    <RetroLayout>
      <Outlet />
    </RetroLayout>
  );
}