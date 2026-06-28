/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../ContextAPI/AppContext'
import { AdminContext } from '../ContextAPI/AdminContext'
import { CATEGORY_LIST } from '../Util/categories'
import { SUBCATEGORY_SEED, ADMINS_SEED, ACTIVITY_LOG_SEED } from '../Util/adminDummyData'
import { slugify } from '../Util/slug'
import AdminSidebar from '../Components/AdminPanel/Shell/AdminSidebar'
import AdminTopbar from '../Components/AdminPanel/Shell/AdminTopbar'
import CommandPalette from '../Components/AdminPanel/Shell/CommandPalette'
import ConfirmModal from '../Components/AdminPanel/Shell/ConfirmModal'
import Toast from '../Components/AdminPanel/Shell/Toast'
import AdminDashboard from '../Components/AdminPanel/Pages/AdminDashboard'
import AllNewsPage from '../Components/AdminPanel/Pages/AllNewsPage'
import AddNewsPage from '../Components/AdminPanel/Pages/AddNewsPage'
import CategoriesPage from '../Components/AdminPanel/Pages/CategoriesPage'
import SubCategoriesPage from '../Components/AdminPanel/Pages/SubCategoriesPage'
import AdminsPage from '../Components/AdminPanel/Pages/AdminsPage'
import LatusAssignPage from '../Components/AdminPanel/Pages/LatusAssignPage'
import AiAutomationPage from '../Components/AdminPanel/Pages/AiAutomationPage'
import SettingsPage from '../Components/AdminPanel/Pages/SettingsPage'

const initialCategories = () => CATEGORY_LIST.map((c) => ({
  label: c.name, value: c.key, subs: SUBCATEGORY_SEED[c.key] || [], created: 'Since launch',
}))

const PAGES = {
  '': { Component: AdminDashboard, title: 'Dashboard', sub: 'Overview of your newsroom' },
  'all-news': { Component: AllNewsPage, title: 'All News', sub: 'Browse, filter and manage every article' },
  'add-news': { Component: AddNewsPage, title: 'Add News', sub: 'Create a new article' },
  categories: { Component: CategoriesPage, title: 'Categories', sub: 'Organize your newsroom verticals' },
  subcategories: { Component: SubCategoriesPage, title: 'Sub-categories', sub: 'Manage nested topics within categories' },
  admins: { Component: AdminsPage, title: 'Admins', sub: 'Manage your editorial team' },
  latus: { Component: LatusAssignPage, title: 'Latus Assign', sub: 'Curate the featured rail' },
  ai: { Component: AiAutomationPage, title: 'AI Automation', sub: 'Automated ingestion & extraction pipeline' },
  settings: { Component: SettingsPage, title: 'Settings', sub: 'Workspace preferences & activity log' },
}

const AdminPanelPage = () => {
  const { adminSignIn, adminNewsCount, dataDispatchEvent } = useContext(AppContext)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const pageName = pathname.split('/', 3)[2] || ''

  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)

  const [categories, setCategories] = useState(initialCategories)
  const [admins, setAdmins] = useState(ADMINS_SEED)
  const [latusAssigned, setLatusAssigned] = useState([])
  const [aiCred, setAiCred] = useState({ name: '', apiKey: '', baseUrl: '' })
  const [autoPublish, setAutoPublish] = useState(false)
  const [activityLog, setActivityLog] = useState(ACTIVITY_LOG_SEED)
  const [confirm, setConfirm] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (pageName !== 'all-news') dataDispatchEvent('GET_NEWS_FOR_ADMIN', { limit: 500 })
  }, [pageName])
  useEffect(() => {
    if (adminSignIn === undefined) navigate('/')
  }, [adminSignIn])

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCmdOpen((o) => !o)
      } else if (e.key === 'Escape') {
        setCmdOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const showToast = (msg, kind, onUndo) => {
    setToast({ msg, kind, onUndo })
    setTimeout(() => setToast((t) => (t && t.msg === msg ? null : t)), 4000)
  }

  const logActivity = (act, obj, kind) => {
    setActivityLog((log) => [{ who: 'Admin', act, obj, time: 'just now', kind }, ...log])
  }

  const adminDispatchEvent = (action, payload) => {
    switch (action) {
      case 'SHOW_CONFIRM':
        setConfirm(payload)
        break
      case 'HIDE_CONFIRM':
        setConfirm(null)
        break
      case 'SHOW_TOAST':
        showToast(payload.msg, payload.kind, payload.onUndo)
        break
      case 'HIDE_TOAST':
        setToast(null)
        break
      case 'SAVE_CATEGORY': {
        const { editValue, label, value } = payload
        setCategories((cats) => {
          if (editValue) return cats.map((c) => (c.value === editValue ? { ...c, label, value } : c))
          return [...cats, { label, value: value || slugify(label), subs: [], created: 'Just now' }]
        })
        showToast(editValue ? `Category "${label}" updated` : `Category "${label}" added`)
        logActivity(editValue ? 'edited category' : 'created category', label, 'Edit')
        break
      }
      case 'DELETE_CATEGORY': {
        const cat = categories.find((c) => c.value === payload.value)
        setCategories((cats) => cats.filter((c) => c.value !== payload.value))
        setConfirm(null)
        showToast(`Category "${cat?.label}" deleted`, 'danger')
        logActivity('deleted category', cat?.label, 'Delete')
        break
      }
      case 'SAVE_SUBCATEGORY': {
        const { editing, parent, label, value } = payload
        setCategories((cats) => cats.map((c) => {
          if (editing && c.value === editing.parent) {
            const subs = c.subs.filter((s) => s[1] !== editing.value)
            if (c.value === parent) return { ...c, subs: [...subs, [label, value]] }
            return { ...c, subs }
          }
          if (!editing && c.value === parent) return { ...c, subs: [...c.subs, [label, value]] }
          if (editing && editing.parent !== parent && c.value === parent) return { ...c, subs: [...c.subs, [label, value]] }
          return c
        }))
        showToast(editing ? `Sub-category "${label}" updated` : `Sub-category "${label}" added`)
        break
      }
      case 'DELETE_SUBCATEGORY': {
        const { parent, value } = payload
        setCategories((cats) => cats.map((c) => (c.value === parent ? { ...c, subs: c.subs.filter((s) => s[1] !== value) } : c)))
        setConfirm(null)
        showToast('Sub-category deleted', 'danger')
        break
      }
      case 'SAVE_ADMIN': {
        const { editId, firstName, lastName, email, role } = payload
        setAdmins((list) => {
          if (editId) return list.map((a) => (a.id === editId ? { ...a, firstName, lastName, email, role } : a))
          return [...list, { id: `a${Date.now()}`, firstName, lastName, email, role, articles: 0, last: 'Just now', active: true }]
        })
        showToast(editId ? 'Admin updated' : `${firstName} ${lastName} invited`)
        break
      }
      case 'DELETE_ADMIN': {
        setAdmins((list) => list.filter((a) => a.id !== payload.id))
        setConfirm(null)
        showToast(`${payload.name} removed`, 'danger')
        break
      }
      case 'ASSIGN_LATUS': {
        setLatusAssigned((ids) => [...ids, ...payload.ids.filter((id) => !ids.includes(id))])
        showToast(`${payload.ids.length} article${payload.ids.length > 1 ? 's' : ''} assigned to Latus`)
        logActivity('assigned to Latus', `${payload.ids.length} article(s)`, 'Latus')
        break
      }
      case 'REMOVE_LATUS': {
        setLatusAssigned((ids) => ids.filter((id) => id !== payload.id))
        setConfirm(null)
        showToast('Removed from Latus rail', 'danger')
        break
      }
      case 'MOVE_LATUS': {
        setLatusAssigned((ids) => {
          const idx = ids.indexOf(payload.id)
          const next = idx + payload.dir
          if (idx < 0 || next < 0 || next >= ids.length) return ids
          const copy = [...ids]
          ;[copy[idx], copy[next]] = [copy[next], copy[idx]]
          return copy
        })
        break
      }
      case 'SAVE_AI_CRED':
        setAiCred(payload)
        break
      case 'TOGGLE_AUTO_PUBLISH':
        setAutoPublish((v) => !v)
        break
      default:
        return
    }
  }

  const page = PAGES[pageName] || PAGES['']
  const action = pageName === '' || pageName === 'all-news'
    ? { label: '+ New article', onClick: () => navigate('/admin-panel/add-news') }
    : null
  const pageSub = pageName === 'all-news' ? `${adminNewsCount} articles total` : page.sub

  return (
    <AdminContext.Provider value={{ categories, admins, latusAssigned, aiCred, autoPublish, activityLog, confirm, toast, adminDispatchEvent }}>
      <div style={{ height: '100vh', display: 'flex', background: '#070910', color: '#EAEEF6', fontFamily: "'Inter',system-ui,sans-serif" }}>
        <AdminSidebar collapsed={collapsed} mobileOpen={mobileOpen} onCloseDrawer={() => setMobileOpen(false)} newsCount={adminNewsCount} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%' }}>
          <AdminTopbar
            pageTitle={page.title}
            pageSub={pageSub}
            onToggleDrawer={() => setMobileOpen((o) => !o)}
            onToggleCollapse={() => setCollapsed((c) => !c)}
            onOpenCmd={() => setCmdOpen(true)}
            action={action}
          />
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <page.Component />
          </div>
        </div>
      </div>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      <ConfirmModal confirm={confirm} onCancel={() => setConfirm(null)} />
      <Toast toast={toast} onUndo={toast?.onUndo} onClose={() => setToast(null)} />
    </AdminContext.Provider>
  )
}

export default AdminPanelPage
