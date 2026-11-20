/* EDIT THIS LIST: one entry per sidebar item and page.
   id     URL hash (letters, digits, hyphens)
   label  sidebar text
   icon   a key from components/Icon.jsx
   sub    page subtitle
   badge  optional counter shown on the item
   roles  optional: only these roles see the item (omit for everyone) */
export const NAV = [
  { id: 'dashboard',     label: 'Dashboard',       icon: 'grid',     sub: 'Your overview goes here.' },
  { id: 'appointments',  label: 'Appointments',    icon: 'calendar', sub: 'Page description.' },
  { id: 'patients',      label: 'Patients',        icon: 'users',    sub: 'Page description.' },
  { id: 'schedule',      label: 'Schedule',        icon: 'clock',    sub: 'Page description.', roles: ['Doctor'] },
  { id: 'check-in',      label: 'QR Check-in',     icon: 'scan',     sub: 'Page description.', roles: ['Receptionist'] },
  { id: 'conversations', label: 'Conversations',   icon: 'chat',     sub: 'Page description.' },
  { id: 'delays',        label: 'Delays & Alerts', icon: 'alert',    sub: 'Page description.' },
  { id: 'setup',         label: 'Settings',        icon: 'cog',      sub: 'Page description.' },
];

export const ROLES = ['Doctor', 'Receptionist'];
