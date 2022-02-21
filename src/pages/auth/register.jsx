import React from "react";
import { Button, Container, FormFeedback, Input } from 'reactstrap'
import { useFormik } from "formik"
import * as yup from 'yup'
import { authRegister } from '../../service/auth'

const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().min(8).required(),
    address: yup.string().required(),
    join_date: yup.date().required(),
    phone: yup.number().required(),
    password: yup.string().min(8).required(),
    retypePassword: yup.string().oneOf([yup.ref('password'), null], 'Password not Match')
})

const RegisterPages = ({setCurrentContainer}) => {
    const formik = useFormik({
        initialValues: {
            email:"",
            username:"",
            address: "",
            join_date: "",
            phone: "",
            password:"",
            retypePassword:""
        },
        validationSchema: validationSchema,
        onSubmit: () => handleRegister()
    })

    const handleRegister = async (e) => {
        const {code, msg} = await  authRegister(formik.values)
        if(code === 200){
          setCurrentContainer(false);
          alert(msg)
        }else{
          alert("username or email is registered")   
        }
      }

    return(
        
        <Container className="container-register" md="12" lg="6">
            <h3 style={{marginBottom:"20px"}}>Register</h3>
            <form onSubmit={formik.handleSubmit}>
                {
                    Object.keys(formik.initialValues).map((key, idx) => (
                        <div key={idx} className="row-input">
                            <Input 
                            type={key === "password" || key === "retypePassword" ? "password" : "text"}
                            id={key}
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
                <Button className="btn-submit" style={{marginBottom:"15px"}} color="primary" type="submit"> Register </Button>
                <br/>
                <a href='#' onClick={() => setCurrentContainer(false)}> Sudah punya Akun?</a>

            </form>
        </Container>
    )
}


export default RegisterPages;