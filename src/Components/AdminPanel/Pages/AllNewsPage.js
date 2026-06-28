import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Pagination from 'rc-pagination/lib/Pagination'
import { getCoreRowModel, useReactTable, flexRender, createColumnHelper } from '@tanstack/react-table'
import { AppContext } from '../../../ContextAPI/AppContext'
import { CATEGORY_LIST, getCategoryMeta } from '../../../Util/categories'
import { formatNewsDate } from '../../../Util/formatDate'
import { hexa, chipStyle, dotStyle } from '../../../Util/adminStyles'
import { NewsIcon, SearchIcon, EditIcon, TrashIcon } from '../Shell/icons'
import EditNewsModal from './EditNewsModal'
import NewsDisableDeleteAlert from '../NewsPanel/NewsDisableDeleteAlert'

const columnHelper = createColumnHelper()

const AllNewsPage = () => {
  const { adminNews = [], adminNewsCount = 0, dataDispatchEvent } = useContext(AppContext)
  const navigate = useNavigate()

  const [filters, setFilters] = useState({ category: '', language: '', sortOrder: 'DESC', search: '' })
  const [status, setStatus] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [editData, setEditData] = useState(null)
  const [alertData, setAlertData] = useState(null)

  useEffect(() => {
    dataDispatchEvent('GET_NEWS_FOR_ADMIN', { page: currentPage, limit: 10, ...filters })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, currentPage])

  const updateFilter = (patch) => {
    setCurrentPage(1)
    setFilters((f) => ({ ...f, ...patch }))
  }

  const rows = useMemo(() => {
    if (status === 'All') return adminNews
    return adminNews.filter((n) => (status === 'Disabled' ? n.isDisable : !n.isDisable))
  }, [adminNews, status])

  const columns = useMemo(() => [
    columnHelper.accessor('topic', {
      header: 'Title',
      cell: (info) => {
        const r = info.row.original
        const meta = getCategoryMeta(r.category)
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '11px', minWidth: 0 }}>
            <div style={{
              width: '34px', height: '34px', flex: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `linear-gradient(135deg,${hexa(meta.color, 0.22)},${hexa(meta.color, 0.06)})`, border: `1px solid ${hexa(meta.color, 0.28)}`,
            }}>
              <NewsIcon style={{ color: meta.color }} width={15} height={15} />
            </div>
            <div style={{ fontSize: '13px', color: '#D5DCE8', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.topic}</div>
          </div>
        )
      },
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: (info) => {
        const meta = getCategoryMeta(info.getValue())
        return <span style={chipStyle(meta.color)}>{meta.name}</span>
      },
    }),
    columnHelper.accessor('isDisable', {
      header: 'Status',
      cell: (info) => {
        const isDisable = info.getValue()
        const color = isDisable ? '#FB7185' : '#34D399'
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color, background: hexa(color, 0.12), borderRadius: '7px', padding: '3px 9px', whiteSpace: 'nowrap' }}>
            <span style={dotStyle(color)} />{isDisable ? 'Disabled' : 'Published'}
          </span>
        )
      },
    }),
    columnHelper.accessor('createdAt', {
      header: 'Date',
      cell: (info) => (
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11.5px', color: '#7C8698' }}>{formatNewsDate(info.getValue())}</span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <div style={{ textAlign: 'right' }}>Actions</div>,
      cell: (info) => {
        const r = info.row.original
        return (
          <div style={{ display: 'flex', gap: '9px', justifyContent: 'flex-end' }}>
            <EditIcon style={{ color: '#5C6577', cursor: 'pointer' }} onClick={() => setEditData(r)} />
            <span
              onClick={() => setAlertData({ type: r.isDisable ? 'active' : 'disable', data: r })}
              style={{ fontSize: '10.5px', fontWeight: 600, color: '#5C6577', cursor: 'pointer', textDecoration: 'underline' }}
            >
              {r.isDisable ? 'Enable' : 'Disable'}
            </span>
            <TrashIcon style={{ color: '#5C6577', cursor: 'pointer' }} onClick={() => setAlertData({ type: 'delete', data: r })} />
          </div>
        )
      },
    }),
  ], [])

  const table = useReactTable({ data: rows, columns, getCoreRowModel: getCoreRowModel() })

  return (
    <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '9px', background: '#0C0F16', border: '1px solid rgba(255,255,255,.09)', borderRadius: '9px', padding: '0 12px' }}>
          <SearchIcon style={{ color: '#5C6577' }} />
          <input
            className="mn-ipt"
            style={{ border: 'none', background: 'transparent', padding: '10px 0', boxShadow: 'none' }}
            placeholder="Search articles by title…"
            value={filters.search}
            onChange={(e) => updateFilter({ search: e.target.value })}
          />
        </div>
        <select className="mn-ipt" style={{ width: 'auto', cursor: 'pointer' }} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All status</option>
          <option value="Published">Published</option>
          <option value="Disabled">Disabled</option>
        </select>
        <select className="mn-ipt" style={{ width: 'auto', cursor: 'pointer' }} value={filters.category} onChange={(e) => updateFilter({ category: e.target.value })}>
          <option value="">All categories</option>
          {CATEGORY_LIST.map((c) => <option key={c.key} value={c.key}>{c.name}</option>)}
        </select>
        <select className="mn-ipt" style={{ width: 'auto', cursor: 'pointer' }} value={filters.language} onChange={(e) => updateFilter({ language: e.target.value })}>
          <option value="">All languages</option>
          <option value="sinhala">Sinhala</option>
          <option value="english">English</option>
        </select>
        <select className="mn-ipt" style={{ width: 'auto', cursor: 'pointer' }} value={filters.sortOrder} onChange={(e) => updateFilter({ sortOrder: e.target.value })}>
          <option value="DESC">Newest first</option>
          <option value="ASC">Oldest first</option>
        </select>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11.5px', color: '#5C6577', padding: '0 4px' }}>{rows.length} results</span>
      </div>

      <div style={{ background: '#10141C', border: '1px solid rgba(255,255,255,.06)', borderRadius: '14px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ minWidth: '760px', width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th key={h.id} style={{ textAlign: 'left', padding: '11px 18px', fontSize: '10px', letterSpacing: '.6px', textTransform: 'uppercase', color: '#5C6577', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                      {flexRender(h.column.columnDef.header, h.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="mn-tr">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '40px 18px', textAlign: 'center', color: '#5C6577', fontSize: '13px' }}>
                    No news found. <span onClick={() => navigate('/admin-panel/add-news')} style={{ color: '#22D3EE', cursor: 'pointer' }}>Create one →</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        align="center"
        current={currentPage}
        total={adminNewsCount}
        pageSize={10}
        showLessItems
        hideOnSinglePage
        className="flex flex-row items-center justify-center"
        onChange={setCurrentPage}
        prevIcon="<"
        nextIcon=">"
        jumpPrevIcon="<<"
        jumpNextIcon=">>"
      />

      {editData && <EditNewsModal data={editData} close={() => setEditData(null)} />}
      <NewsDisableDeleteAlert visible={!!alertData} close={() => setAlertData(null)} data={alertData || { type: '', data: {} }} />
    </div>
  )
}

export default AllNewsPage
