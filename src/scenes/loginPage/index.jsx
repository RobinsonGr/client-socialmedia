import {useState} from "react";
import {TextField,  Button} from "@mui/material";
import * as yup from "yup"
import Formik from "formik"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {setLogin} from "../../state"




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


const LoginPage = () => {

    const [switchPage, setSwitchPage] = useState("login")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLogin = switchPage === "login"
    const isRegister = switchPage === "login"



    const register = async (values, onSubmitProps) => {

        const formData = new formData()


        //Append values in formData

        for(let value in values) {

            formData.append(value, values[value])

        }

        //Send to the server
        const saveUser = await fetch("http://localhost:3001/auth/register", {method: "POST", body: formData})

        const savedUser = await saveUser.json();

        //Reset form state
        onSubmitProps.resetForm()

        // When the user has registered, show the login interface


        if(savedUser) {
            setSwitchPage();
        }
    }


    const user = async (values, onSubmitProps) => {

        //Send values to the server for authenticate them and receive the token

        const logIn = await fetch("http://localhost:3001/auth/login", 
        {method: "POST", body: values});
        const loggedIn = await logIn.json();
        
        onSubmitProps.resetForm()


        // Send the user and token to the Redux storage

        if(loggedIn){
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                })
            )

        }

        navigate("/home")
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if(isLogin) await user(values, onSubmitProps);
        if(isRegister) await user(values, onSubmitProps);
    }


    return (
    <Formik> 
       <form onSubmit={handleFormSubmit}> 

        





        </form>
    </Formik>
    )

}







export default LoginPage;