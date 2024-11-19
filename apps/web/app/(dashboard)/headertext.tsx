import React from 'react'

interface HeaderTextProps {
  text: string
}

const HeaderText: React.FC<HeaderTextProps> = ({ text }) => {
  return (
    <div className="flex items-center justify-center h-16 text-2xl">{text}</div>
  )
}

export default HeaderText
