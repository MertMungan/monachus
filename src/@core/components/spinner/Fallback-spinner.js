// ** Logo
import logo from '@src/img/monachus1.png'

const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner vh-100'>
      <img className='fallback-logo' src={logo} alt='logo' />
    </div>
  )
}

export default SpinnerComponent
