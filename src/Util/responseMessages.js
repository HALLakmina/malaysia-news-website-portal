const common = {
    add: (resource) => `A New ${resource} Added Successfully`,
    updated: (resource) => `${resource} Updated Successfully`,
    disable: (resource) => `${resource} Disable Successfully`,
    deleted: (resource) => `${resource} Deleted Successfully`,
}
const error ={
    400:`Bard Request`,
    404:(resource)=>`${resource} Not Found`,
    409:(resource)=>`${resource} Conflict By Code`,
    500:`Internal Server Error`
}
const type ={
    news:`NEWS`,
    contactUs:`Contact Us`,
    admin :`Admin`
}

const contactUs = {
    add: `Your Message Was Successfully Sent. We Will Contact You Soon.`
}
const admin = {   
    found:`You Have Successfully Sign In.`,
    notFound: `Invalid Email Or Password`
}

module.exports = {
    common,
    error,
    type,
    contactUs,
    admin
}