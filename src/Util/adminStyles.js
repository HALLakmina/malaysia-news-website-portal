export const hexa = (hex, a) => {
  const n = (hex || '#9AA4B6').replace('#', '')
  const r = parseInt(n.substr(0, 2), 16)
  const g = parseInt(n.substr(2, 2), 16)
  const b = parseInt(n.substr(4, 2), 16)
  return `rgba(${r},${g},${b},${a})`
}

const STATUS_COLORS = {
  Published: '#34D399',
  Disabled: '#FB7185',
  processed: '#34D399',
  failed: '#FB7185',
  pending: '#FBBF24',
  Draft: '#FBBF24',
  Latus: '#22D3EE',
  Edit: '#A78BFA',
  Delete: '#FB7185',
  AI: '#22D3EE',
}
export const getStatusColor = (status) => STATUS_COLORS[status] || '#9AA4B6'

const ROLE_COLORS = { 'Super Admin': '#FB7185', Editor: '#22D3EE', Author: '#A78BFA', Contributor: '#60A5FA' }
export const getRoleColor = (role) => ROLE_COLORS[role] || '#9AA4B6'

export const chipStyle = (color) => ({
  display: 'inline-block',
  fontSize: '10.5px',
  fontWeight: 600,
  color,
  background: hexa(color, 0.13),
  borderRadius: '6px',
  padding: '3px 8px',
  whiteSpace: 'nowrap',
})

export const dotStyle = (color, size = 6) => ({
  width: `${size}px`,
  height: `${size}px`,
  borderRadius: '50%',
  background: color,
  flex: 'none',
})
