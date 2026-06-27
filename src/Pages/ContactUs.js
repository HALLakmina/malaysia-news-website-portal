import React, { useState } from 'react'
import { createContact } from '../APIS/ContactUsApi'

const responseMessages = require('../Util/responseMessages')

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 18l-2 4a16 16 0 0 1-13-13z" />
  </svg>
)

const inputClass =
  'font-body text-[14.5px] font-medium text-meridian-ink bg-white border border-[#D7DCE3] rounded-lg px-3.5 py-3 outline-none w-full focus:border-meridian-navy'
const labelClass = 'flex flex-col gap-1.5 font-display font-bold text-[13px] text-meridian-ink'

const ContactUs = () => {
  const contactOje = { firstName: '', lastName: '', email: '', phoneNumber: '', message: '' }
  const [contact, setContact] = useState(contactOje)
  const [apiState, setApiState] = useState({ success: false, error: false, message: undefined })

  const resetApiState = () => {
    setApiState(({ success: false, error: false, message: undefined }))
  }
  const resetNewsValues = () => {
    setContact(contactOje)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    resetApiState()
    try {
      const response = await createContact(contact)
      const { message } = response.data
      setApiState({ ...apiState, success: true, message: message || responseMessages.common.updated(responseMessages.type.news) })
      setTimeout(() => {
        resetApiState()
        resetNewsValues()
      }, 1000)
    }
    catch (error) {
      let takeMessage = error?.message
      const response = error?.response
      if (response) {
        const { status, data } = response
        const message = data?.message
        if (response && status === 400) {
          const message = data[0]?.message
          takeMessage = message || responseMessages.error[400]
        }
        else if (response && status === 500) {
          takeMessage = message || responseMessages.error[500]
        }
        setApiState({ ...apiState, error: true, message: takeMessage })
      }
    }
  }
  const handleInputValue = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    const isKeyExist = contactOje.hasOwnProperty(name)
    if (isKeyExist) {
      const obj = {}
      obj[name] = value
      setContact({ ...contact, ...obj })
    }
  }

  return (
    <div className="bg-white">
      <div className="px-4 sm:px-8 lg:px-14 pt-7 sm:pt-9 pb-7 sm:pb-9 border-b border-meridian-border">
        <div className="text-meridian-navy font-display font-bold text-xs tracking-[.12em] uppercase mb-3.5">
          Get in touch
        </div>
        <h1 className="font-display font-extrabold tracking-tight leading-tight text-meridian-ink text-[28px] sm:text-[40px] lg:text-[46px] m-0">
          Contact us
        </h1>
        <p className="text-[#3A434E] text-[16px] sm:text-[18px] leading-relaxed font-medium mt-4 max-w-[760px]">
          Have a tip, a question or feedback on our reporting? Send us a message below or reach us directly — we read
          everything.
        </p>
      </div>

      <section className="px-4 sm:px-8 lg:px-14 py-7 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-7 lg:gap-12 items-start">
          <div className="flex-1 w-full lg:basis-3/5 min-w-0">
            <h2 className="font-display font-extrabold tracking-tight text-meridian-ink text-[21px] lg:text-[26px] m-0">
              Send us a message
            </h2>

            {apiState.success && (
              <p className="text-sm font-semibold text-center bg-green-100 text-green-800 mt-4 p-3 rounded-lg">
                {apiState.message}
              </p>
            )}
            {apiState.error && (
              <p className="text-sm font-semibold text-center bg-red-100 text-red-700 mt-4 p-3 rounded-lg">
                {apiState.message}
              </p>
            )}

            <form className="flex flex-col gap-[18px] mt-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
                <label className={labelClass}>
                  First name
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Your first name"
                    className={inputClass}
                    value={contact.firstName}
                    onChange={handleInputValue}
                  />
                </label>
                <label className={labelClass}>
                  Last name
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Your last name"
                    className={inputClass}
                    value={contact.lastName}
                    onChange={handleInputValue}
                  />
                </label>
              </div>
              <label className={labelClass}>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className={inputClass}
                  value={contact.email}
                  onChange={handleInputValue}
                />
              </label>
              <label className={labelClass}>
                Phone number
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Your phone number"
                  className={inputClass}
                  value={contact.phoneNumber}
                  onChange={handleInputValue}
                />
              </label>
              <label className={labelClass}>
                Message
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Tell us what's on your mind…"
                  className={`${inputClass} resize-y`}
                  value={contact.message}
                  onChange={handleInputValue}
                />
              </label>
              <div>
                <button
                  type="submit"
                  className="bg-meridian-navy hover:bg-meridian-navyDark text-white font-body font-bold text-[15px] rounded-lg px-7 py-3.5"
                >
                  Send message
                </button>
              </div>
            </form>
          </div>

          <aside className="w-full lg:basis-2/5 min-w-0">
            <div className="bg-[#F6F7F9] border border-[#EEF0F3] rounded-xl p-5">
              <h3 className="font-display font-extrabold text-base m-0 mb-1">Contact details</h3>
              <div className="flex items-start gap-3 py-3 border-t border-meridian-border first:border-t-0 mt-3">
                <span className="flex-none w-9 h-9 rounded-[9px] bg-white border border-meridian-border text-meridian-navy grid place-items-center">
                  <MailIcon />
                </span>
                <div className="min-w-0">
                  <div className="font-bold text-[13.5px] text-meridian-ink">Email</div>
                  <div className="text-[#5B6573] text-[13.5px] mt-0.5">nayanajith@gmail.com</div>
                </div>
              </div>
              <div className="flex items-start gap-3 py-3 border-t border-meridian-border">
                <span className="flex-none w-9 h-9 rounded-[9px] bg-white border border-meridian-border text-meridian-navy grid place-items-center">
                  <PhoneIcon />
                </span>
                <div className="min-w-0">
                  <div className="font-bold text-[13.5px] text-meridian-ink">Phone</div>
                  <div className="text-[#5B6573] text-[13.5px] mt-0.5">+60 548-XXX-XXXX</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

export default ContactUs
