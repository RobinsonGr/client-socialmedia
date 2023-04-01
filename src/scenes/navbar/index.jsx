import {useState}  from "react"
import {
Box, 
InputBase,
IconButton,
Typography,
Select,
MenuItem,
FormControl,
useTheme,
useMediaQuery
} from "@mui/material"

import {

Help,
Search,
Message,
DarkMode,
LightMode,
Notifications,
Menu,
Close

} from "@mui/icons-material"

import {useDispatch, useSelector} from "react-redux";
import {setMode, setLogout} from "../../state";
import {useNavigate} from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";


export default function Navbar () {

    //This state only works to handle the mobile menu

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)


    const dispatch = useDispatch()
   const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    //const fullName = ` ${user.firstName} ${user.lastName}`;
    const fullName = ` Robinson Gonzalez`;

    const consoleMode = useSelector((state) => state.mode)



    return (

        <FlexBetween padding="1rem" sx={{backgroundColor: alt}}>

            <FlexBetween gap="1.5rem">
                <Typography 
                fontWeight = "bold"
                fontSize ="clamp(1rem, 2rem, 2.25rem)"
                color="primary" 
                onClick={() => navigate("/")}
                sx={
                    {
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer",
                            gap: "3rem",
                        }
                    }
                }
               
                >
                    LiveFun
                </Typography>
                

                {/*  Search bar in Desktop view  */}
                {isNonMobileScreens && ( 
                    <FlexBetween 
                    backgroundColor={primaryLight}
                    borderRadius="9px"
                    gap="3rem"
                    padding = "0.1rem 1.5rem"
                 
                    >
                        <InputBase placeholder="Seach..."/>
                            <IconButton>
                              <Search />
                        </IconButton>
                            

                    </FlexBetween>

                )}
            </FlexBetween>

            {/* The navBar right side with elements for Desktop screen */}

            {isNonMobileScreens ? (
                <FlexBetween gap={"2rem"}>

                   {/* Toggle between light and dark */}
                    <IconButton onClick={() =>  
                       {
                        console.log(theme.palette.mode)
                        return dispatch(setMode())}}>

                        {
                            (theme.palette.mode === "dark") ? 
                            <DarkMode sx={{fontSize: "25px"}}/> :
                            <LightMode sx={{fontSize: "25px"}}/> 
                        }
                    </IconButton>

                    <Message sx={{fontSize: "25px"}}/> 
                    <Notifications sx={{fontSize: "25px"}} />
                    <Help sx={{fontSize: "25px"}}/>

                    <FormControl value={fullName}>

                        <Select 
                        value={fullName}
                        // 46 min lost in the first half
                        sx={{
                            backgroundColor : neutralLight,
                            width: "170px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon.root": {
                                pr: "0.25rem",
                                width: "3rem",
                    
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight
                            }
                        }}
                        input={<InputBase/>}

                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>

                            <MenuItem onClick={() => dispatch(setLogout)}>
                                Log Out
                            </MenuItem>
                        </Select>


                    </FormControl>

                 </FlexBetween>
            ): 
            // Handling menu icon that appearing for less than 1000px
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                <Menu/>
            </IconButton>
        }


            {/* Mobile menu */}
        {
            isMobileMenuToggled && !isNonMobileScreens && (
                <Box 
                position = "fixed"
                right = "0"
                top = "0"
                zIndex = "10"
                height = "100px"
                maxWidth = "500px"
                minWidth = "300px"
                backgroundColor = {background}

                >


                    {/* CLOSE ICON */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close/>
                        </IconButton>

                    </Box>

                {/* MENU ITEMS */}
                    
                <FlexBetween

                    display = "flex"
                    flexDirection = "column"
                    gap = "3rem"

                    >

                    <IconButton onClick={() => dispatch(setMode())}>

                        {
                            theme.palette.mode === "dark" ? 
                            <DarkMode sx={{fontSize: "25px"}}/>:
                            <LightMode sx={{fontSize: "25px"}}/>
                            
                        }
                    </IconButton>

                    
                    <Message sx={{fontSize: "25px"}}/> 
                    <Notifications sx={{fontSize: "25px"}} />
                    <Help sx={{fontSize: "25px"}}/>


                    <FormControl variant="standard" value={fullName}>

                        <Select

                        value={fullName}
                        
                        sx={{
                            backgroundColor : neutralLight,
                            width: "170px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem",
                                
                                
                            },
                        }}
                        
                        input={<InputBase/>   
                    
                    }
                        >

                        <MenuItem value={fullName}> 
                            <Typography>{fullName}</Typography>
                        </MenuItem>


                        <MenuItem onClick={()=> dispatch(setLogout())}>
                                Log out
                        </MenuItem>


                        </Select>


                    </FormControl>
                </FlexBetween>

                    
                </Box>

            )

        }

        </FlexBetween>
    )




}