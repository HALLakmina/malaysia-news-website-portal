import React, { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../../ContextAPI/AppContext'
import { CATEGORY_LIST, getCategoryMeta } from '../../../Util/categories'
import { sortByRecency, formatNewsDate } from '../../../Util/formatDate'
import { hexa, chipStyle, dotStyle } from '../../../Util/adminStyles'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis } from 'recharts'
import { DashboardIcon, NewsIcon, CategoriesIcon, CheckIcon } from '../Shell/icons'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const Card = ({ children, style }) => (
  <div style={{ background: '#10141C', border: '1px solid rgba(255,255,255,.06)', borderRadius: '14px', ...style }}>{children}</div>
)

const KpiCard = ({ label, value, Icon, color }) => (
  <Card style={{ padding: '15px 16px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
      <span style={{ display: 'flex', width: '30px', height: '30px', borderRadius: '9px', alignItems: 'center', justifyContent: 'center', background: hexa(color, 0.12), flex: 'none' }}>
        <Icon style={{ color }} width={15} height={15} />
      </span>
      <span style={{ fontSize: '10.5px', color: '#5C6577', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px', whiteSpace: 'nowrap' }}>{label}</span>
    </div>
    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '28px', fontWeight: 600, color: '#EAEEF6', margin: '11px 0 0', lineHeight: 1 }}>{value}</div>
  </Card>
)

const AdminDashboard = () => {
  const { adminNews = [], adminNewsCount = 0 } = useContext(AppContext)
  const navigate = useNavigate()

  const published = useMemo(() => adminNews.filter((n) => !n.isDisable).length, [adminNews])
  const disabled = adminNews.length - published

  const feed = useMemo(() => sortByRecency(adminNews).slice(0, 6), [adminNews])

  const categoryData = useMemo(() => {
    return CATEGORY_LIST.map((cat) => ({
      name: cat.name,
      color: cat.color,
      value: adminNews.filter((n) => n.category === cat.key).length,
    })).filter((d) => d.value > 0)
  }, [adminNews])

  const monthlyData = useMemo(() => {
    const now = new Date()
    const buckets = []
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      buckets.push({ key: `${d.getFullYear()}-${d.getMonth()}`, month: MONTHS[d.getMonth()], count: 0 })
    }
    adminNews.forEach((n) => {
      const d = new Date(n.createdAt)
      if (isNaN(d.getTime())) return
      const key = `${d.getFullYear()}-${d.getMonth()}`
      const bucket = buckets.find((b) => b.key === key)
      if (bucket) bucket.count += 1
    })
    return buckets
  }, [adminNews])

  return (
    <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <KpiCard label="Total News" value={adminNewsCount} Icon={NewsIcon} color="#22D3EE" />
        <KpiCard label="Published" value={published} Icon={CheckIcon} color="#34D399" />
        <KpiCard label="Disabled" value={disabled} Icon={DashboardIcon} color="#FBBF24" />
        <KpiCard label="Categories" value={CATEGORY_LIST.length} Icon={CategoriesIcon} color="#60A5FA" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.7fr_1fr]">
        <Card style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 18px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#EAEEF6' }}>Latest in the newsroom</div>
            <span onClick={() => navigate('/admin-panel/all-news')} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#22D3EE', cursor: 'pointer' }}>View all →</span>
          </div>
          {feed.length === 0 && (
            <div style={{ padding: '28px 18px', color: '#5C6577', fontSize: '13px' }}>No news yet — create your first article.</div>
          )}
          {feed.map((r) => {
            const meta = getCategoryMeta(r.category)
            const statusColor = r.isDisable ? '#FB7185' : '#34D399'
            return (
              <div key={r._id} className="mn-tr" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '13px 18px', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                <div style={{
                  width: '42px', height: '42px', flex: 'none', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `linear-gradient(135deg,${hexa(meta.color, 0.22)},${hexa(meta.color, 0.06)})`, border: `1px solid ${hexa(meta.color, 0.28)}`,
                }}>
                  <NewsIcon style={{ color: meta.color }} width={16} height={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', color: '#D5DCE8', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.topic}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px' }}>
                    <span style={chipStyle(meta.color)}>{meta.name}</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10.5px', color: '#5C6577' }}>{formatNewsDate(r.createdAt)}</span>
                  </div>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: statusColor, background: hexa(statusColor, 0.12), borderRadius: '7px', padding: '3px 9px', whiteSpace: 'nowrap' }}>
                  <span style={dotStyle(statusColor)} />{r.isDisable ? 'Disabled' : 'Published'}
                </span>
              </div>
            )
          })}
        </Card>

        <div className="flex flex-col gap-4.5" style={{ gap: '18px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Card style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#EAEEF6', alignSelf: 'flex-start', marginBottom: '6px' }}>Category distribution</div>
            {categoryData.length === 0 ? (
              <div style={{ color: '#5C6577', fontSize: '12.5px', padding: '30px 0' }}>No news yet</div>
            ) : (
              <div style={{ position: 'relative', width: '160px', height: '160px' }}>
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={54} outerRadius={67} startAngle={90} endAngle={-270} stroke="none">
                      {categoryData.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '24px', fontWeight: 600, color: '#EAEEF6', lineHeight: 1 }}>{adminNewsCount}</div>
                  <div style={{ fontSize: '9px', letterSpacing: '1.5px', color: '#5C6577', marginTop: '3px' }}>ARTICLES</div>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginTop: '14px', width: '100%' }}>
              {categoryData.map((d) => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '9px', height: '9px', borderRadius: '3px', background: d.color, flex: 'none' }} />
                  <span style={{ fontSize: '12px', color: '#9AA4B6', flex: 1 }}>{d.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11.5px', color: '#D5DCE8' }}>
                    {adminNewsCount ? Math.round((d.value / adminNews.length) * 100) : 0}%
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#EAEEF6' }}>News per month</div>
            <div style={{ fontSize: '11px', color: '#5C6577', marginBottom: '2px' }}>Last 12 months</div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={monthlyData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="rgba(34,211,238,.18)" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: '#5C6577', fontSize: 9 }} axisLine={false} tickLine={false} />
                <Bar dataKey="count" fill="url(#barGradient)" radius={[5, 5, 2, 2]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
