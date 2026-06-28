import React from 'react'

const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const DashboardIcon = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="3" width="7.5" height="7.5" rx="1.6" />
    <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" />
    <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" />
    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6" />
  </svg>
)

export const NewsIcon = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M5 4h11v15.5H6.5A1.5 1.5 0 0 1 5 18V4z" />
    <path d="M16 8.5h2.5A1.5 1.5 0 0 1 20 10v8a1.5 1.5 0 0 1-1.5 1.5" />
    <path d="M8 8h5" /><path d="M8 11.5h5" /><path d="M8 15h3.5" />
  </svg>
)

export const DotIcon = (p) => (
  <svg width="8" height="8" viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="12" r="10" fill="currentColor" />
  </svg>
)

export const CategoriesIcon = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M20.6 13.4l-7.2 7.2a1.8 1.8 0 0 1-2.6 0l-7-7A1.8 1.8 0 0 1 3.3 12.3V5.2A1.9 1.9 0 0 1 5.2 3.3h7.1a1.8 1.8 0 0 1 1.3.5l7 7a1.8 1.8 0 0 1 0 2.6z" />
    <circle cx="8" cy="8" r="1.2" fill="currentColor" stroke="none" />
  </svg>
)

export const SubcategoriesIcon = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 3l8.5 4.7L12 12.4 3.5 7.7 12 3z" />
    <path d="M3.5 12.2L12 16.9l8.5-4.7" />
    <path d="M3.5 16.4L12 21.1l8.5-4.7" />
  </svg>
)

export const AdminsIcon = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 3l7 2.7v5.5c0 4.4-3 7.4-7 8.8-4-1.4-7-4.4-7-8.8V5.7L12 3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

export const LatusIcon = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8 6.8 19.5l1-5.8-4.2-4.1 5.8-.8L12 3.5z" />
  </svg>
)

export const AiIcon = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 3l1.7 4.8L18.5 9.5l-4.8 1.7L12 16l-1.7-4.8L5.5 9.5l4.8-1.7L12 3z" />
    <path d="M18.5 14.5l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9.9-2.4z" />
  </svg>
)

export const SettingsIcon = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 12.9a7.6 7.6 0 0 0 0-1.8l1.9-1.5-1.9-3.3-2.3 1a7.6 7.6 0 0 0-1.6-.9L14.9 3h-3.8l-.6 2.4a7.6 7.6 0 0 0-1.6.9l-2.3-1L4.7 8.6l1.9 1.5a7.6 7.6 0 0 0 0 1.8l-1.9 1.5 1.9 3.3 2.3-1a7.6 7.6 0 0 0 1.6.9l.6 2.4h3.8l.6-2.4a7.6 7.6 0 0 0 1.6-.9l2.3 1 1.9-3.3-1.9-1.5z" />
  </svg>
)

export const SearchIcon = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" />
  </svg>
)

export const CloseIcon = (p) => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

export const PlusIcon = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const EditIcon = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
  </svg>
)

export const TrashIcon = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" {...base} {...p}>
    <path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M6 6l1 14h10l1-14" />
  </svg>
)

export const CheckIcon = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export const UpIcon = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M18 15l-6-6-6 6" />
  </svg>
)

export const DownIcon = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
)
