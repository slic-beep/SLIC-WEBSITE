import React from "react";

export const IconUsers = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconRocket = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" d="M12 3l3 7 7 3-3 7-7-3-7-3 3-7 7-3z" />
  </svg>
);

export const IconCalendar = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={1.5} />
    <path d="M16 2v4M8 2v4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconPrograms = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7l9-4 9 4-9 4-9-4z" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 11v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconHandshake = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12l5 5 7-7 8 8" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconApplications = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 10h8M8 14h8" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconLeader = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="7" r="4" strokeWidth={1.5} />
    <path d="M5 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 17v4" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

export default {
  IconUsers,
  IconRocket,
  IconCalendar,
  IconPrograms,
  IconHandshake,
  IconApplications,
};
