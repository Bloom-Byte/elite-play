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
                    <td>Indian English</td>
                    <td>Tiếng việt</td>
                    <td>Indonesian</td>
                  </tr>
                  <tr>
                    <td>日本語</td>
                    <td>한국어</td>
                    <td>Français</td>
                    <td>Español</td>
                  </tr>
                  <tr>
                    <td>Filipino</td>
                    <td>عربى</td>
                    <td>Marathi</td>
                    <td>Türkçe</td>
                  </tr>
                  <tr>
                    <td>فارسی</td>
                    <td>Português</td>
                    <td>Руccкий</td>
                    <td>Deutsch</td>
                  </tr>
                  <tr>
                    <td>ภาษาไทย</td>
                    <td>Suomi</td>
                    <td>Polski</td>
                    <td>Italiano</td>
                  </tr>
                  <tr>
                    <td>বাংলা</td>
                    <td>اردو</td>
                    <td>Українська</td>
                    <td>Melayu</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
  )
}

export default LanguagePopup