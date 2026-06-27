export const formatNewsDate = (createdAt) => {
  if (!createdAt) return ''
  const date = new Date(createdAt)
  if (isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
