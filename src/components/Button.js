import React from 'react'

const Button = ({ text, onClick, styles, disabled }) => {
  return (
    <button className={`btn ${styles}`} type="submit" onClick={onClick} disabled={disabled}>
      {text}
    </button>
  )
}

export default Button
