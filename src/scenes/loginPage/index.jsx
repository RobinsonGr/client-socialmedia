import {Typography, Box, useTheme, useMediaQuery} from "@mui/material";
import Form from "./Form.jsx";



const LoginPage = () => {


    const {palette} = useTheme()
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

    return (
        <> 
        <Box
        textAlign="center"
        backgroundColor= {palette.background.alt}
        mb="1rem"
        color={palette.primary.main}
        >
            <Typography 
            fontWeight = "bold"
            fontSize ="clamp(1rem, 2rem, 2.25rem)"
            >
                LiveFun
            </Typography>
        </Box>

        {
            <Box
            width={isNonMobileScreens ? "60%" : "93%"}
            p="2rem"
            borderRadius="1rem"
            m="2rem auto"
           
            backgroundColor={palette.background.alt}
            >
                <Typography variant="h5" pb="1rem"  fontWeight="500">
                    Welcome to LiveFun, the funniest socialmedia
                </Typography>
                <Form/>
            </Box>
        }

         
         </>
    )


}

export default LoginPage