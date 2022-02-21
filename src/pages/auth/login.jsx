import { React } from 'react'
import { Button, Container, FormFeedback, Input } from 'reactstrap'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { authLogin } from '../../service/auth'

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Alamat Email Salah"),
  password: yup.string().min(8).required(),
});

const Login = () => {
  const handleLogin = async (e) => {
    const {code, msg} = await  authLogin(formik.values)
    if (code === 200){
      sessionStorage.setItem('logged', true)
      window.location = '/dashboard'
    }else{
      alert("Invalid username or password")
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: () => handleLogin()
  });

  return (  
    <Container className="container-login" >
      <h3 style={{marginBottom:"20px", marginTop:"20px"}}>Login</h3>
      <form onSubmit={formik.handleSubmit}>
        {
          Object.keys(formik.initialValues).map((key, index) => (
            <div key={index} className="row-input">
              <Input type={key === "password" ? "password" : "text"}
                id={key}
                name={key}
                placeholder={key}
                value={formik.values[key]}
                onChange={formik.handleChange}
                invalid={formik.touched[key] && Boolean(formik.errors[key])}
              />

              {
                formik.touched[key] && Boolean(formik.errors[key]) &&
                <FormFeedback className="error-feedback">{formik.errors[key]}</FormFeedback>
              }
            <br/>
            </div>
          ))
        }
        <Button color='primary' className="btn-submit" type="submit">
          Login
        </Button>
      </form>
    </Container>
  )
}

export default Login;