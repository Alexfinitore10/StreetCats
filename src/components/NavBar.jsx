import {Link} from "react-router-dom";
function Navbar({resetState}){

    return (
        <nav className='flex justify-between bg-[#93c0f7]'>
          <Link to='/' className=''>Logo</Link>
          <div className='p-5 space-x-4 '>
            <Link to='/home' onClick={() => {window.location.href = '/home';}}>Home</Link>
            <Link to='/about' >About</Link>
            <Link to='/contact'>Contact</Link>
            <Link to='/creazione-utenza'>Creazione Utenza</Link>
            <Link to='/pubblica-articolo'>Crea articolo</Link>
          </div>
          <div className='flex'>
            <Link to='/login'>Log-in</Link>
          </div>
        </nav>
    );
}

export default Navbar;