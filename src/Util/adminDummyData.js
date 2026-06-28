export const SUBCATEGORY_SEED = {
  sri_lankan: [['Politics', 'politics'], ['Economy', 'economy'], ['Crime', 'crime'], ['Education', 'education']],
  malaysian: [['Politics', 'politics'], ['Economy', 'economy'], ['Crime', 'crime'], ['Education', 'education']],
  gossip: [['Celebrity', 'celebrity'], ['Entertainment', 'entertainment'], ['Cinema', 'cinema']],
  sport: [['Cricket', 'cricket'], ['Football', 'football'], ['Rugby', 'rugby'], ['Athletics', 'athletics']],
  world: [['Asia', 'asia'], ['Europe', 'europe'], ['Middle East', 'middle-east'], ['Americas', 'americas']],
}

export const ADMINS_SEED = [
  { id: 'a1', firstName: 'Amara', lastName: 'Reed', email: 'amara.reed@malaysri.news', role: 'Super Admin', articles: 62, last: '2 min ago', active: true },
  { id: 'a2', firstName: 'Diego', lastName: 'Salas', email: 'diego.salas@malaysri.news', role: 'Editor', articles: 48, last: '1 hr ago', active: true },
  { id: 'a3', firstName: 'Priya', lastName: 'Nair', email: 'priya.nair@malaysri.news', role: 'Editor', articles: 39, last: '3 hr ago', active: true },
  { id: 'a4', firstName: 'Lena', lastName: 'Ortiz', email: 'lena.ortiz@malaysri.news', role: 'Author', articles: 27, last: 'Yesterday', active: true },
  { id: 'a5', firstName: 'Marcus', lastName: 'Cole', email: 'marcus.cole@malaysri.news', role: 'Author', articles: 14, last: '3 days ago', active: false },
  { id: 'a6', firstName: 'Sofia', lastName: 'Khan', email: 'sofia.khan@malaysri.news', role: 'Contributor', articles: 6, last: '1 week ago', active: false },
]

export const AI_LOG_SEED = [
  { title: 'Sri Lankan parliament — wire copy ingest', cat: 'sri_lankan', status: 'processed', conf: 96, time: '2 min ago' },
  { title: 'Malaysian economy roundup (Reuters feed)', cat: 'malaysian', status: 'processed', conf: 91, time: '18 min ago' },
  { title: 'Untitled press release — malformed PDF', cat: '—', status: 'failed', conf: 0, time: '34 min ago' },
  { title: 'Cricket match report transcript', cat: 'sport', status: 'processed', conf: 88, time: '1 hr ago' },
  { title: 'Celebrity announcement draft', cat: 'gossip', status: 'pending', conf: 0, time: '1 hr ago' },
  { title: 'World summit embargoed brief', cat: 'world', status: 'processed', conf: 93, time: '2 hr ago' },
]

export const ACTIVITY_LOG_SEED = [
  { who: 'Amara Reed', act: 'published', obj: 'a Sri Lankan politics update', time: '2 min ago', kind: 'Published' },
  { who: 'Diego Salas', act: 'created', obj: 'a Malaysian economy draft', time: '26 min ago', kind: 'Draft' },
  { who: 'Priya Nair', act: 'assigned to Latus', obj: 'a sport headline', time: '1 hr ago', kind: 'Latus' },
  { who: 'Amara Reed', act: 'edited category', obj: 'Gossip → renamed slug', time: '2 hr ago', kind: 'Edit' },
  { who: 'Lena Ortiz', act: 'deleted', obj: 'a duplicate world draft', time: '3 hr ago', kind: 'Delete' },
  { who: 'System (n8n)', act: 'AI-processed', obj: 'a Sri Lankan parliament brief', time: '4 hr ago', kind: 'AI' },
]
