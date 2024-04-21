import React from 'react'

const LanguagePopup = ({languagePopup, setLanguagePopup}) => {
  return (
<div className="editusername-popup">
          <div className="editusername-popup_container">
            <div className="editusername-popup_header">
              <p>Language</p>
              <span
                onClick={() => {
                  setLanguagePopup(!languagePopup);
                }}
                className="close email-close"
              >
                X
              </span>
            </div>
            <div className="editusername-popup_main-content">
              <table className="language-table">
                <tbody>
                  <tr>
                    <td className="language-active">English</td>
                    <td>German</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
  )
}

export default LanguagePopup