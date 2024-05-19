import './UserInformationPopup.css';

const Modal = ({
  isOpen,
  close,
  title,
  width,
  children
}) => {
  return (
    <>
      <div className="userinfopopup" style={{
        display: isOpen ? 'flex' : 'none'
      }}>
        <div className="userinfopopup-content" style={{
          width: width || '500px'
        }}>
          <div className="editusername-popup_header">
            <p>{title}</p>
            <span
              onClick={() => {
                close();
              }} className='close'>x
            </span>
          </div>
          <div className='userinfopopup-main-content'>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
