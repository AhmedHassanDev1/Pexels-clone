import React from 'react'

type dropDownWrapperProp={
  children:React.ReactNode
}
function dropDownWrapper({children}:dropDownWrapperProp) {
  return (
    <div className="absolute bottom-0 translate-y-full  duration-150 right-0  opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto  bg-white rounded-xl  ring-1 ring-gray-200 shadow-2xl ">
      {children}
    </div>
  ) 
}

export default dropDownWrapper