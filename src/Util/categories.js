export const CATEGORY_LIST = [
  { key: 'sri_lankan', name: 'Sri Lankan', color: '#1F5FCC' },
  { key: 'malaysian', name: 'Malaysian', color: '#B45309' },
  { key: 'gossip', name: 'Gossip', color: '#C026A3' },
  { key: 'sport', name: 'Sport', color: '#15803D' },
  { key: 'world', name: 'World', color: '#6D28D9' },
]

export const getCategoryMeta = (key) =>
  CATEGORY_LIST.find((c) => c.key === key) || { key, name: key, color: '#14377D' }
