import {useState} from "react";
import {Box, TextField,  Button, 
    useMediaQuery, useTheme, Typography} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import * as yup from "yup"
import {Formik} from "formik"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {setLogin} from "../../state"
import Dropzone from "react-dropzone"
import FlexBetween from "../../components/FlexBetween"



const registerValidationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    occupation: yup.string().required("Occupation is required"),
    email: yup.string().required("email is required"),
    password: yup.string().required("password is required")
})

const loginValidationSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required")
})

const initialValueRegister = {

    firstName: "",
    lastName: "",
    occupation: "",
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
    const isNonMobile = useMediaQuery("(min-width: 600px)")
    const isLogin = switchPage === "login"
    const isRegister = switchPage === "register"
    const {palette} = useTheme()


    const register = async (values, onSubmitProps) => {


        const formData = new FormData()
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
            setSwitchPage("login");
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
        if(isRegister) await register(values, onSubmitProps);
    }

    return (
    <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValueLogin : initialValueRegister}
        validationSchema={isLogin ? loginValidationSchema : registerValidationSchema}
    > 

        {(
            {values,
            touched,
            errors,
            handleSubmit,
            handleChange,
            handleBlur,
            resetForm,
            setFieldValues
        
        }
        ) => (

            
            <form onSubmit={handleSubmit} >
            <Box
            display="grid"
            gap="1rem"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
                "& > div": {gridColumn: isNonMobile ? null : "span 4" }
            }}
            >
                {isRegister && (
                    <> 
                    <TextField 
                    label ="First Name"
                    name = "firstName" //event.target object property "name"
                    value={values.firstName}
                    onChange = {handleChange}
                    //Add the touched object if that field was touched or not
                    onBlur = {handleBlur}
                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                    helperText={Boolean(touched.firstName) && Boolean(errors.firstName)}
                    sx={{
                        //only fill the half when above 600px
                        gridColumn: "span 2"
                    }}
                    />

                    <TextField
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                    helperText={Boolean(touched.lastName) && Boolean(errors.lastName)}
                    sx={{gridColumn: "span 2"}}
                    />

                    <TextField
                    label = "Location"
                    name = "location"
                    value = {values.location}
                    onChange = {handleChange}
                    onBlur = {handleBlur}
                    error = {Boolean(errors.location) && Boolean(touched.location)}
                    helperText = {Boolean(errors.location) && Boolean(touched.location)}
                    sx={{gridColumn: "span 4"}}
                    />

                    <TextField
                    label = "Occupation"
                    name = "occupation"
                    value = {values.occupation}
                    onChange = {handleChange}
                    onBlur = {handleBlur}
                    error = {Boolean(errors.occupation) && Boolean(touched.occupation)}
                    helperText = {Boolean(errors.occupation) && Boolean(touched.occupation)}
                    sx={{gridColumn: "span 4"}}
                    />


                    <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    p="1rem"
                    
                    >
                    <Dropzone
                    acceptedFiles=".jpg,.jped,.png"                 
                    multiple={false} //can only select and upload a single file at a time.
                    onDrop={(files) => {
                        //Add img to values for send to the server
                        setFieldValues("picture", files[0])

                    }}
                    >
                        {
                            ({getRootProps, getInputProps }) => (
                                <Box
                                {...getRootProps}
                                p="1rem"
                                border={`2px dashed ${palette.primary.main}`}
                                sx={{"&:hover": {cursor: "pointer"}}}
                                >
                                    <input {...getInputProps()}/>
                                        {!values.picture ? (
                                            <p>Add picture here</p>
                                        ) : (
                                            <FlexBetween>
                                                <Typography>
                                                    {values.picture.name}
                                                </Typography>
                                                <EditOutlinedIcon/>
                                            </FlexBetween>
                                        )}                

                                </Box>


                            )
                        }
                    </Dropzone>
                    </Box>
                    </>
                )}

            
                    <TextField
                    label = "Email"
                    name = "email"
                    value = {values.email}
                    onChange = {handleChange}
                    onBlur = {handleBlur}
                    error = {Boolean(errors.email) && Boolean(touched.email)}
                    helperText = {Boolean(errors.email) && Boolean(touched.email)}
                    sx={{gridColumn: "span 4"}}
                    />

                    <TextField
                    label = "Password"
                    name = "password"
                    type="password"
                    value = {values.password}
                    onChange = {handleChange}
                    onBlur = {handleBlur}
                    error = {Boolean(errors.password) && Boolean(touched.password)}
                    helperText = {Boolean(errors.password) && Boolean(touched.password)}
                    sx={{gridColumn: "span 4"}}
                    />
            </Box>

            {/* TOGGLE BUTTONS */}
        
        <Box>
            <Button
            fullWidth
          
            sx={{
                backgroundColor: palette.primary.main,
                p: "1rem",
                m: "2rem 0",
                color: palette.background.alt,
                "&:hover": {color: palette.primary.main}
            }}
            
            
            >
              {isLogin ? "LOGIN" : "REGISTER"}  
            </Button>

            <Typography
            onClick={() => setSwitchPage(isLogin ? "register" : "login")}
            sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover":{
                    cursor: "pointer",
                    color: palette.primary.light
                }
            }}
            >
                
                {
                    isLogin ? "Don't have account? Sign up here" :
                    "Do you have account? Login here"
                }

                    
            </Typography>
        </Box>
        
        </form>
        )}
    </Formik>
    )

}







export default LoginPage;