import React from 'react';

import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

// Components
import CssBaseline from '@mui/material/CssBaseline';
import Router from './components/shared/Router';
import { UserProvider } from './context/UserContext';
import { MoodProvider } from './context/MoodContext';
import { AuthProvider } from './context/AuthContext';
import { MessageProvider } from './context/MessageContext';

let theme = createTheme({
    components: {
        // MuiGrid: {
        //     styleOverrides: {
        //         root: {
        //             ">.MuiGrid-item" : {
        //                 paddingTop: 0,
        //                 paddingLeft: 0,
        //             }
        //         }
        //     }
        // },
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    // height: "100vh",
                    height: "calc(var(--vh, 1vh) * 100)"
                },
                body: {
                    // height: "100vh",
                    height: "calc(var(--vh, 1vh) * 100)",
                    overflow: "hidden"
                },
                "& #root": {
                    // height: "100vh"
                    height: "calc(var(--vh, 1vh) * 100)"
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: "#FAA828",
                },
                root: {
                    "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#D98605",
                        }
                    },
                    "&:hover": {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#D98605",
                        },
                    }
                }
            }
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    backgroundColor: "#FAA828",
                    "&:hover": {
                        backgroundColor: "#D98605"
                    }
                }
            }
        },
        MuiButtonGroup: {
            styleOverrides: {
                grouped: {
                    "&:not(:last-of-type)": {
                        // borderColor: "#FAA828", // 基準
                        borderRight: "none"
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: "1.2rem", 
                    borderRadius: 25,
                    color: 'black',
                },
                text: ({ ownerState }) => ({
                    color: ownerState.selected ? '#FAA828' : '#000',
                }),
                contained: ({ ownerState }) => ({
                    color: ownerState.selected ? '#fff' : '#000',
                    backgroundColor: "#FAA828", 
                    "&:hover": {
                        backgroundColor: "#D98605" 
                    }
                }),
            },
        },
        MuiChip: {
            styleOverrides: {
                outlined: {
                    color: "#FAA828", 
                    borderColor: "#FAA828", 
                },
                filled: {
                    color: "#fff", 
                    backgroundColor: "#FAA828", 
                    "& .MuiSvgIcon-root": {
                        color: "#fff", 
                    },
                    "&:hover": {
                        backgroundColor: "#D98605",
                    }
                }
            }
        },
        FriendList: {
            styleOverrides: {
                div: {
                    backgroundColor: "#D98605",
                }
            }
        }
    },
    typography: {
        button: {
            textTransform: 'none'
        },
        fontFamily: [
            'Inter',
            'Roboto',
        ].join(',')
    },
    // palette: {
        // primary: {
        //     main: "#FCC36A"
        // },
        // tertiary:{
        //     main: "#FCC36A",
        //     // quaternary, quinary	 .. と足していける
        // }
    // },
});
theme = responsiveFontSizes(theme);

export default class App extends React.Component {
    render() {
        return(
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <UserProvider>
                        <MoodProvider>
                            <MessageProvider>
                                <Router />
                                <CssBaseline />
                            </MessageProvider>
                        </MoodProvider>
                    </UserProvider>
                </AuthProvider>
            </ThemeProvider>
        );
    }
}
