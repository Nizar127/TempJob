import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StatusBar,
    Image,
    StyleSheet,
    Button,
    Alert
} from 'react-native'
import {
    GoogleSigninButton,
    GoogleSignin,
    statusCodes
} from '@react-native-community/google-signin'
import { WEB_CLIENT_ID } from './utils/keys'
//import { firebase } from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app';
import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';

export default function GoogleLogin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [error, setError] = useState(null)
    //const { colors } = useTheme();

    // useEffect(() => {
    //     configureGoogleSign()
    // }, [])

    useEffect(() => {
        configureGoogleSign()

        // firebase.auth().onAuthStateChanged(user => {
        //     if (user) {
        //         Alert.alert('Status', 'You are logged in.')

        //         firestore().collection('users').doc(user.uid).get().then(doc => {
        //             if (!doc.exists) {
        //                 addNewUserToFirestore(user);
        //                 console.log("onAuthStateChanged:User created::uid=" + user.uid)
        //             }
        //         });
        //         this.props.navigation.navigate('Home');
        //     }
        //     else {
        //         this.props.navigation.navigate('GoogleLogin');
        //     }
        // })
    }, [])

    configureGoogleSign = () => {
        GoogleSignin.configure({
            webClientId: WEB_CLIENT_ID,
            offlineAccess: false
        })
    }

    signIn = () => {
        return new Promise(async (resolve, reject) => {
            console.log("SignIn start")
            try {
                await GoogleSignin.hasPlayServices()
                const userInfo = await GoogleSignin.signIn()
                const { accessToken, idToken } = await GoogleSignin.signIn()
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    idToken,
                    accessToken
                )
                setUserInfo(userInfo)
                setError(null)
                setIsLoggedIn(true)
                let userCre = await firebase.auth().signInWithCredential(credential)
                console.log("signIn", userCre)
                resolve(userCre)

            } catch (error) {
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    // when user cancels sign in process,
                    Alert.alert('Process Cancelled')
                } else if (error.code === statusCodes.IN_PROGRESS) {
                    // when in progress already
                    Alert.alert('Process in progress')
                } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                    // when play services not available
                    Alert.alert('Play services are not available')
                } else {
                    // some other error
                    Alert.alert('Something else went wrong... ', error.toString())
                    setError(error)
                    reject(null)
                }
            }

        })

    }


    getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently()
            setUserInfo(userInfo)
            const user = firebase.auth().currentUser;
            if (user) {
                return firestore().collection('Users').doc(user).set({ type: "job_seeker" }, { merge: true });
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                // when user hasn't signed in yet
                Alert.alert('Please Sign in')
                setIsLoggedIn(false)
            } else {
                Alert.alert('Something else went wrong... ', error.toString())
                setIsLoggedIn(false)
            }
        }
    }

    addNewUserToFirestore = (user) => {
        const collection = firestore().collection('users');
        //const { display } = user.additionalUserInfo;
        const details = {
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            description: '',
            mainskills: '',
            skills: '',
            experience: '',
            achievement: '',
            interest: '',
            project: '',
            money_collect: '',
            job_done: '',
            current_job: '',
            incoming_job: '',
            paymentMethod: '',
            education: '',
            createdDtm: firestore.FieldValue.serverTimestamp(),
            lastLoginTime: firestore.FieldValue.serverTimestamp(),
            userType: 'Job_Seeker',
        };
        collection.doc(user.uid).set(details);
        return { user, details };
    }


    StartWork = async () => {
        console.log("StartWork", user)
        const user = await signIn()
        if (user) {
            Alert.alert('Lets Go')
            this.props.navigation.navigate('Home')
        } else {
            Alert.alert('Something Wrong')
        }


    }

    // StartWork = async () => {
    //     const user = await signIn();
    //     if (user) {
    //         Alert.alert('Lets Go')
    //         this.props.navigation.navigate('Home')
    //     } else {
    //         Alert.alert('Something Wrong')
    //     }


    // }

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess()
            await GoogleSignin.signOut()
            setIsLoggedIn(false)
        } catch (error) {
            Alert.alert('Something else went wrong... ', error.toString())
        }
    }

    return (
        <>
            <StatusBar backgroundColor='#4741FD' barStyle='light-content' />


            <View style={styles.header}>
                <View style={{ marginTop: 10, marginBottom: 20, marginLeft: 50 }}>
                    <Image source={require('../../img/icon.png')} style={{ width: 250, height: 250 }} />
                </View>
                <GoogleSigninButton
                    style={styles.signIn}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => StartWork()}
                />


                <View style={styles.header}>
                    {isLoggedIn === false ? (
                        <Text style={styles.textSign}>You must sign in!</Text>
                    ) : (
                            <Button onPress={() => signOut()} title='Sign out' color='#332211' />
                        )}
                </View>
                <View style={styles.header}>
                    {isLoggedIn === true ? (
                        <>
                            <Text style={styles.header}>
                                Welcome {userInfo.user.name}
                            </Text>
                            <View style={styles.profileImageContainer}>
                                <Image
                                    style={styles.profileImage}
                                    source={{
                                        uri: userInfo && userInfo.user && userInfo.user.photo
                                    }}
                                />
                            </View>
                        </>
                    ) : null}
                </View>
            </View>
        </>
    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4741FD'
    },
    logo: {
        flex: 1,
        width: '100%',
        height: 900
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
        paddingTop: 50,
        backgroundColor: '#4741FD'
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    }

})
