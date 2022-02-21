import { React, useState, useEffect } from 'react'
import Login from './login'
import Signup from './register'
import { useNavigate } from 'react-router-dom'

const AuthPages = () => {
  const navigate = useNavigate()
  const [currentContainer, setCurrentContainer] = useState(false)

  useEffect(() => {
    // cek jika user sudah terotentikasi
    let isAuth = sessionStorage.getItem('logged')
    if (isAuth) {
      //arahkan user kembali ke dashboard jika sudah login
      navigate({ pathname: './dashboard' }) 
    }
  }, [navigate])

  return (
    <div>
      <div>
        { currentContainer ?
          <div>
            <Signup setCurrentContainer={setCurrentContainer} />
              <a href='#' onClick={()=> setCurrentContainer(false)}></a>
          </div> :

          <div>
            <Login />
              <div>
                <p className='link-daftar'>Belum memiliki akun? <a href='#' style={{marginLeft:"5px"}} onClick={()=> setCurrentContainer(true)}>Daftar</a></p>
              </div>
          </div>
        }
      </div>
    </div>
  )
}

export default AuthPages;