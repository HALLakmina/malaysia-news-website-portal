import React, { useState } from 'react'
import { createContact } from '../APIS/ContactUsApi'

const responseMessages = require('../Util/responseMessages')

const ContactUs = () => {

    const contactOje = {firstName:'', lastName:'', email:'', phoneNumber:'', message:''}
    const [contact, setContact] =useState(contactOje)
    const [apiState, setApiState] = useState({success:false, error:false, message:undefined})



    const resetApiState = ()=>{
        setApiState(({success:false, error:false, message:undefined}))
    }
    const resetNewsValues = ()=>{
        setContact(contactOje)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        resetApiState()
        try{
            const response = await createContact(contact)
            const {message} = response.data
            setApiState({...apiState, success:true,  message:message || responseMessages.common.updated(responseMessages.type.news)})
            setTimeout(()=>{
                resetApiState()
                resetNewsValues()
            },1000)

        }
        catch(error){
            let takeMessage = error?.message
            const response = error?.response
            if(response){
                const {status, data} = response
                const message = data?.message
                if(response && status === 400){
                    const message = data[0]?.message
                    takeMessage = message || responseMessages.error[400]
                }
                else if(response && status === 500){
                    takeMessage = message || responseMessages.error[500]
                }
                setApiState({...apiState, error:true,  message:takeMessage})
            }
        }
    }
    const handleInputValue = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        const isKeyExist = contactOje.hasOwnProperty(name)
        if(isKeyExist){
            const obj = {}
            obj[name] = value
            setContact({...contact, ...obj})
        }
    }

  return (
    <div className='w-full flex flex-col md:flex-row mt-14'>
        <div className='md:w-1/2 text-left m-5 md:m-2'>
            <p className='font-bold text-4xl '>Contact Us</p>
            <p className='text-sm my-4'>Email call, or complete the form to het in touch.</p>
            <p className='text-sm my-4'>nayanajith@gmail.com</p>
            <p className='text-sm my-4'>+60 548-XXX-XXXX</p>
        </div>
        <div className='w-full md:w-1/2'>
            {apiState.success && <p className="text-md min-w-xs font-bold text-center bg-green-400 color-white mb-5 p-3 rounded-lg">{apiState.message}</p>}
            {apiState.error && <p className="text-md min-w-xs font-bold text-center bg-red-300 color-white mb-5 p-3 rounded-lg">{apiState.message}</p>}
            <form className='bg-white p-5 flex flex-col m-5 md:m-2 rounded-xl shadow-lg' onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <p className='text-4xl font-bold'>Get in Touch</p>
                    <p>You can reach us anytime</p>
                </div>

                <div className='flex flex-col sm:flex-row'>
                    <input 
                        type='text' 
                        name='firstName' 
                        className='w-full my-5 py-2 px-4 border rounded-full'  
                        placeholder='First Name'
                        value={contact.firstName}
                        onChange={(e)=>handleInputValue(e)}
                    />
                    <input 
                        type='text' 
                        name='lastName' 
                        className='w-full my-5 sm:ms-5 py-2 px-4 border rounded-full' 
                        placeholder='Last Name'
                        value={contact.lastName}
                        onChange={(e)=>handleInputValue(e)}
                    />
                </div>
                
                <input 
                    type='text' 
                    name='email' 
                    className='w-full my-5 py-2 px-4 border rounded-full' 
                    placeholder='your Email'
                    value={contact.email}
                    onChange={(e)=>handleInputValue(e)}
                />
                <input 
                    type='text' 
                    name='phoneNumber' 
                    className='w-full my-5 py-2 px-4 border rounded-full' 
                    placeholder='Phone number'
                    value={contact.phoneNumber}
                    onChange={(e)=>handleInputValue(e)}
                />
                <textarea 
                    name="message" 
                    rows='8' 
                    className='w-full my-5 py-2 px-4 border rounded-xl' 
                    placeholder="How can we help?"
                    value={contact.message}
                    onChange={(e)=>handleInputValue(e)}
                />
                <button 
                    type="submit" 
                    className='w-full my-5 py-2 px-4 rounded-full bg-blue-500 text-white font-bold' 
                    name="submit"
                >Submit</button>
            </form>
        </div>
    </div>
  )
}

export default ContactUs