import React from 'react'
import './DepositCTA.css'

const DepositCTA = ({isNavOpen}) => {
  return (
    <div
      style={{ backgroundImage: 'url("/deposit-bg.svg")' }}
      className={`deposit-cta ${isNavOpen ? 'deposit-cta-extended' : ''}`}
    >
      <div className="deposit-cta__txt">
        <h4>Quick & Easy Start:<br></br> Your Gateway to Fun <span className='begin-now'>Begins Now! </span></h4>
      </div>
      <button>Deposit</button>
    </div>
  )
}

export default DepositCTA
