import {useState} from "react";
import {TextField,  Button} from "@mui/material";
import * as yup from "yup"
import Formik from "formik"


const registerValidationSchema = yup.object.shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    ocupation: yup.string().required("Ocupation is required"),
    email: yup.string().required("email is required"),
    password: yup.string().required("password is required")
})

const loginValidationSchema = yup.object.shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required")
})


const initalValueRegister = {

    firstName: "",
    lastName: "",
    ocupation: "",
    email: "",
    password: ""

}

const initialValueLogin = {
    user: "",
    password: "",
}


const register = (values, onSubmitProps) => {






}


const LoginPage = () => {

    const [pageType, setPageType] = useState("login")


    const isLogin = ""


    const register = async (values, onSubmitProps) => {

        const formData = new formData()

        for(let value in values) {

            formData.append(value, values[value])

        }


        onSubmitProps.rese




    }










    const handleData = (event) => {

        const {name, value} = event.target

        setDataForm({...dataForm, [name]: value})
        
        console.log(dataForm)

    }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(dataForm)
    }


    return (
    <Formik> 
       <form onSubmit={handleSubmit}> 

         <TextField name="name" value={dataForm.name} onChange={handleData}>
            Name
        </TextField>

        <TextField value={dataForm.password} onChange={handleData}>
            Password
        </TextField>

         <Button type="submit">Send data</Button>
        </form>
    </Formik>
    )

}







export default LoginPage;