export const formatNewsDate = (createdAt) => {
  if (!createdAt) return ''
  const date = new Date(createdAt)
  if (isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const sortByRecency = (articles = []) =>
  [...articles].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
