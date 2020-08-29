import React, { Component } from 'react';
import {
    StyleSheet, ScrollView, Image, FlatList,
    UIManager, Animated,
    LayoutAnimation, TextInput, Modal, TouchableHighlight
} from 'react-native';
import {
    Container,
    Header,
    Content,
    View,
    Card,
    Right,
    auto,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Icon,
    List,
    ListItem,
    Separator,
    Button,
    Switch,
    Footer,
    FooterTab,
    Label

} from 'native-base';
import auth from '@react-native-firebase/auth';
//import firebase from '../config/firebase'
//import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import { Alert } from 'react-native';

console.disableYellowBox = true;




export default class Profile extends Component {


    constructor() {
        super();


        // const user = firebase.auth().currentUser;
        // user.providerData.forEach((userInfo) => {
        //     console.log('User info for provider: ', userInfo);
        // });

        // //if user dh wujud, just alert
        // if (user == null) {
        //     firebase.firestore().collection('Users').doc(user.uid).set({
        //         uid: user.uid,
        //         username: user.email,
        //         email: user.email,
        //         phoneNumber: user.phoneNumber,
        //         profileImage: user.photoURL
        //     }).then(() => {
        //         firebase.firestore().collection('Users').doc(user.uid).get().then(data => { console.log(data) })
        //     });
        // } else {
        //     console.log('Data Already Exist');
        //     //Alert.alert('Data already exist');
        // }

        // this.initData = user


        //firebase.firestore().collection('Users').doc(user.uid).set(user).collection('Job_Creator');
        this.state = {
            users: [],
            username: '',
            key: '',
            phonenumber: '',
            profileImage: '',
            keyplayer: '',
            uniqueId: '',
            jobdesc: '',
            photo: '',
            url: '',
            imageType: '',
            worktype: '',
            salary: '',
            peoplenum: '',
            time: 0,
            lat: 0,
            lng: 0,
            location: '',
            show: true,
            project: '',
            //listViewData: data,
            newContact: "",
            mytext: '',
            data: this.initData,
            isModalVisible: false,
            inputText: '',
            editedItem: 0,

        };

    }

    // componentDidMount() {
    //     this.unsubscribe = firebase.firestore().collection('Users').onSnapshot(this.getCollection);
    // }


    // componentWillUnmount() {
    //     this.unsubscribe();
    // }

    //get the data first
    // getCollection = (querySnapshot) => {
    //     const users = [];
    //     querySnapshot.forEach((res) => {
    //         const { username, phonenumber, profileImage, description, keyplayer, project } = res.data();
    //         users.push({
    //             key: res.id,
    //             res,
    //             username,
    //             phonenumber,
    //             profileImage,
    //             description,
    //             keyplayer,
    //             project,
    //         });
    //     });
    //     this.setState({
    //         users,
    //         isLoading: false
    //     })
    // }

    setModalVisible = (bool) => {
        this.setState({ isModalVisible: bool })
    }

    setInputText = (text) => {
        this.setState({ inputText: text })
    }

    setEditedItem = (id) => {
        this.setState({ editedItem: id })
    }
    handleEditItem = (editedItem) => {
        const newData = this.state.data.map(item => {
            if (item.id === editedItem) {
                item.text = this.state.inputText
                return item
            }
            return item
        })
        this.setState({ data: newData })
    }
    //hide card example
    ShowHideComponent = () => {
        if (this.state.show == true) {
            this.setState({ show: false });
        } else {
            this.setState({ show: true });
        }
    };




    updateText = (value) => {
        this.setState({ myText: value })
    }



    static navigationOptions = {
        title: 'Profile',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-person" style={{ color: tintColor }} />
        ),
        headerTitle: {
            title: 'GET-THE-JOB'
        },
        headerStyle: {
            backgroundColor: '#f45fff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }


    render() {
        return (
            // this.state.users.map((item, index) => {
            //     return (
            <View /* key={index} */ >
                <ScrollView>
                    <Card>
                        <CardItem cardBody>
                            <Left>
                                <Thumbnail source={{ uri: auth().currentUser.photoURL }} style={{ height: 80, width: 80, margin: 10, padding: 10 }} />
                            </Left>
                            <Body>
                                <Text style={{ margin: 10 }}>{auth().currentUser.displayName}</Text>
                            </Body>
                            <Button style={{ alignItems: 'center' }} transparent onPress={() => this.props.navigation.navigate('ViewProfile')} ><Text>View Profile</Text></Button>
                        </CardItem>
                    </Card>

                    <View style={styles.infoBoxWrapper}>
                        <View style={[styles.infoBox, {
                            borderRightColor: '#dddddd',
                            borderRightWidth: 1
                        }]}>
                            <Label>RM 1000</Label>
                            <Text>Money Collected</Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Label>12</Label>
                            <Text>Job</Text>
                        </View>
                    </View>
                    <Card style={{ height: auto }}>
                        <CardItem cardBody>
                            <Content>
                                <Separator>
                                    <Text style={styles.separator}>Account Settings</Text>
                                </Separator>
                                <List style={styles.listitem}>
                                    <ListItem onPress={() => this.props.navigation.navigate('Personal')}>
                                        <Left><Text>Personal Information</Text></Left>
                                        <Right>
                                            <Icon active name="md-person" size={30} />
                                        </Right>
                                    </ListItem>
                                    <ListItem onPress={() => this.props.navigation.navigate('PaymentScreen')}>
                                        <Left><Text>Add Payments</Text></Left>
                                        <Right>
                                            <Icon active name="md-wallet" size={30} />
                                        </Right>
                                    </ListItem>
                                    <ListItem onPress={() => this.props.navigation.navigate('Privacy')}>
                                        <Left><Text>Privacy</Text></Left>
                                        <Right>
                                            <Icon active name="md-wallet" size={30} />
                                        </Right>
                                    </ListItem>
                                    <ListItem>
                                        <Left>
                                            <Body>
                                                <Text>Print Receipt</Text>
                                                <Text note>Toggle to Switch Auto or Manual</Text>
                                            </Body>
                                        </Left>
                                        <Right>
                                            <Switch selected={true} />
                                        </Right>
                                    </ListItem>
                                    <ListItem>
                                        <Left><Text>Rewards</Text></Left>
                                        <Right>
                                            <Icon active name="md-cash" size={40} />
                                        </Right>
                                    </ListItem>
                                </List>
                                <Separator>
                                    <Text style={styles.separator}>Resume</Text>
                                </Separator>
                                <List style={styles.listitem}>
                                    <ListItem onPress={() => this.props.navigation.navigate('PersonalSkill')}>
                                        <Left><Text>Skills</Text></Left>
                                        <Right>
                                            <Icon active name="md-person" size={30} />
                                        </Right>
                                    </ListItem>
                                    <ListItem onPress={() => this.props.navigation.navigate('Experience')}>
                                        <Left><Text>Experience</Text></Left>
                                        <Right>
                                            <Icon active name="md-briefcase" size={30} />
                                        </Right>
                                    </ListItem>
                                    <ListItem onPress={() => this.props.navigation.navigate('Project')}>
                                        <Left><Text>Personal Project</Text></Left>
                                        <Right>
                                            <Icon active name="md-briefcase" size={30} />
                                        </Right>
                                    </ListItem>
                                    <ListItem onPress={() => this.props.navigation.navigate('Education')}>
                                        <Left><Text>Education Background</Text></Left>
                                        <Right>
                                            <Icon active name="md-briefcase" size={30} />
                                        </Right>
                                    </ListItem>
                                    <ListItem onPress={() => this.props.navigation.navigate('Interest')}>
                                        <Left><Text>Interest</Text></Left>
                                        <Right>
                                            <Icon active name="md-briefcase" size={30} />
                                        </Right>
                                    </ListItem>
                                    <ListItem onPress={() => this.props.navigation.navigate('Achievement')}>
                                        <Left><Text>Achievement</Text></Left>
                                        <Right>
                                            <Icon active name="md-briefcase" size={30} />
                                        </Right>
                                    </ListItem>

                                </List>
                                <Separator>
                                    <Text style={styles.separator}>Support</Text>
                                </Separator>
                                <List >
                                    <ListItem onPress={() => this.props.navigation.navigate('Support')}>
                                        <Left>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text>Safety Centre</Text>
                                                <Text note>Get the Support you need as well as Labor Union help</Text>
                                            </View>
                                        </Left>
                                        <Right>
                                            <Icon active name="md-person" size={30} />
                                        </Right>
                                    </ListItem>
                                    <ListItem onPress={() => this.props.navigation.navigate('Contact')}>
                                        <Left><Text>Get Help</Text></Left>
                                        <Right>
                                            <Icon active name="md-briefcase" size={30} />
                                        </Right>
                                    </ListItem>
                                    <ListItem onPress={() => this.props.navigation.navigate('PaymentMethod')}>
                                        <Left><Text>Please Give Us Your Feedback</Text></Left>
                                        <Right>
                                            <Icon active name="md-wallet" size={30} />
                                        </Right>
                                    </ListItem>
                                </List>
                                <Separator>
                                    <Text style={{ fontSize: 20, justifyContent: 'center' }}>Legal</Text>
                                </Separator>
                                <List style={styles.listitem}>
                                    <ListItem onPress={() => this.props.navigation.navigate('Terms')}>
                                        <Left><Text>Terms of Service</Text></Left>
                                        <Right>
                                            <Icon active name="md-person" size={30} />
                                        </Right>
                                    </ListItem>
                                    <ListItem onPress={() => this.props.navigation.navigate('Privacy')}>
                                        <Left><Text>Privacy Policy</Text></Left>
                                        <Right>
                                            <Icon active name="md-briefcase" size={30} />
                                        </Right>
                                    </ListItem>
                                </List>

                            </Content>
                        </CardItem>
                    </Card>

                    <Card>
                        <Footer style={{ padding: 5 }}>
                            <View>
                                <Text style={styles.footerText}>Developed by Ahmad Fakhrul Nizar Bin Ab Ghani</Text>
                                <Text style={styles.footerText}>All Right Reserved</Text>
                            </View>

                        </Footer>

                    </Card>


                </ScrollView>

            </View>
            //     )

            // })
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    contentContainer: {
        backgroundColor: 'white',
    },
    footerText: {
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignItems: 'center',
    },
    marginLeft: {
        marginLeft: 5,
    },
    separator: {
        fontSize: 20,
        fontFamily: "CerealMedium",
        alignItems: 'center',
        color: 'black',
        margin: 5
    },
    menu: {
        width: 20,
        height: 2,
        backgroundColor: '#111',
        margin: 2,
        borderRadius: 3,
    },
    text: {
        marginVertical: 30,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },

    textInput: {
        width: '90%',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        borderColor: 'gray',
        borderBottomWidth: 2,
        fontSize: 16,
    },
    modalView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableHighlight: {
        backgroundColor: 'white',
        marginVertical: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    listitem: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,

    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 2,
        borderTopColor: '#dddddd',
        borderTopWidth: 2,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
})

