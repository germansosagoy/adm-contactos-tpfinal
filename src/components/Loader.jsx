import spinnerImg from '../assets/loader-spinner.gif';
import '../../Loader.css';


const Loader = () => {
  return (
    <>
    <div className='loader-container'>
        <img src={spinnerImg} alt="Cargando..." className='spinner' />
    </div>
    </>
  )
}

export default Loader