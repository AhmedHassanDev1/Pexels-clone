import Link from 'next/link'
import React from 'react'

function LicenseLink() {
  return (
    <Link 
    href={'/'} 
    className='hover:bg-hover-effect rounded-3xl p-3 '
    >license</Link>
  )
}

export default LicenseLink