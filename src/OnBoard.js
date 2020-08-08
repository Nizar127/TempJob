import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import { firebase } from '@react-native-firebase/auth'
import { Button, Icon } from 'react-native-elements';
import Onboarding from 'react-native-onboarding-swiper';
console.disableYellowBox = true;



export default class OnBoard extends Component {


    render() {
        return (
            <Onboarding
                showDone={false}
                onSkip={() => Alert.alert('Skipped')}
                pages={[
                    {
                        title: 'Hey!',
                        subtitle: 'Welcome to $App!',
                        backgroundColor: '#003c8f',
                        image: (
                            <Icon
                                name="hand-peace-o"
                                type="font-awesome"
                                size={100}
                                color="white"
                            />
                        ),
                    },
                    {
                        title: 'Send Messages',
                        subtitle: 'You can reach everybody with us',
                        backgroundColor: '#5e92f3',
                        image: (
                            <Icon
                                name="paper-plane-o"
                                type="font-awesome"
                                size={100}
                                color="white"
                            />
                        ),
                    },
                    {
                        title: 'Get Notified',
                        subtitle: 'We will send you notification as soon as something happened',
                        backgroundColor: '#1565c0',
                        image: (
                            <Icon name="bell-o" type="font-awesome" size={100} color="white" />
                        ),
                    },
                    {
                        title: "That's Enough",
                        subtitle: (
                            <Button
                                title={'Get Started'}
                                containerViewStyle={{ marginTop: 20 }}
                                backgroundColor={'white'}
                                borderRadius={5}
                                textStyle={{ color: '#003c8f' }}
                                onPress={() => {
                                    this.props.navigation.navigate('Home')
                                    StatusBar.setBarStyle('default');
                                }}
                            />
                        ),
                        backgroundColor: '#003c8f',
                        image: (
                            <Icon name="rocket" type="font-awesome" size={100} color="white" />
                        ),
                    },
                ]}
            />
        )

    }

}


//export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
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
        fontWeight: 'bold'
    }
});


