// import React, { Component } from 'react';
// import { StyleSheet, ScrollView, Image, FlatList } from 'react-native';
// import {
//     Container,
//     Header,
//     Content,
//     View,
//     Card,
//     Right,
//     auto,
//     CardItem,
//     Thumbnail,
//     Text,
//     Left,
//     Body,
//     List,
//     ListItem,
//     Separator,
//     Footer,
//     Switch,
//     Button
// } from 'native-base';
// import Icon from 'react-native-vector-icons/Ionicons';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import { firebase } from '@react-native-firebase/auth';
// import { Alert } from 'react-native';



// export default class Profile extends Component {

//     constructor() {
//         super();
//         this.userRef = firestore().collection('User');
//         this.state = {
//             users: [],
//             username: '',
//             phonenumber: '',
//             keyplayer: '',
//             uniqueId: '',
//             jobdesc: '',
//             photo: '',
//             url: '',
//             uid: '',
//             username: '',
//             email: '',
//             phoneNumber: '',
//             profileImage: '',
//             status: 'job_seeker',
//             imageType: '',
//             worktype: '',
//             salary: '',
//             peoplenum: '',
//             time: 0,
//             lat: 0,
//             lng: 0,
//             location: '',
//             show: true,
//             //listViewData: data,
//             newContact: "",
//             mytext: '',

//             isModalVisible: false,
//             inputText: '',
//             editedItem: 0,

//         };

//         // const user = firebase.auth().currentUser;
//         // user.providerData.forEach((userInfo) => {
//         //     console.log('User info for provider: ', userInfo);
//         // });

//         // if (user == null) {

//         //     //set status to job seeker
//         //     let Jobstatus = this.state.status;
//         //     firebase.firestore().collection('Users').doc(user.uid).set({
//         //         uid: user.uid,
//         //         username: user.email,
//         //         email: user.email,
//         //         phoneNumber: user.phoneNumber,
//         //         profileImage: user.photoURL,
//         //         status: Jobstatus
//         //     }).then(() => {
//         //         firebase.firestore().collection('Users')
//         //             .doc(user.uid)
//         //             .where('status', '=', 'job_seeker')
//         //             .get()
//         //             .then(data => { console.log(data) })
//         //     });
//         // } else {
//         //     console.log('Data Already Exist');
//         //     //Alert.alert('Data already exist');
//         // }

//     }


//     componentDidMount() {
//         //SplashScreen.hide();
//         this.unsubscribe = this.userRef.onSnapshot(this.getCollection);

//     }

//     componentWillUnmount() {
//         this.unsubscribe();

//     }



//     getCollection = (querySnapshot) => {
//         const jobs = [];
//         querySnapshot.forEach((res) => {
//             const { uid, username, email, phoneNumber, profileImage } = res.data();
//             jobs.push({
//                 key: res.id,
//                 res,
//                 uid,
//                 username,
//                 email,
//                 phoneNumber,
//                 profileImage,

//             });
//         });
//         this.setState({
//             jobs,
//             isLoading: false
//         })
//     }

//     static navigationOptions = {
//         title: 'Profile',
//         tabBarIcon: ({ tintColor }) => (
//             <Icon name="md-person" style={{ color: tintColor }} size={20} />
//         ),
//         headerTitle: {
//             title: 'GET-THE-JOB'
//         },
//         headerStyle: {
//             backgroundColor: '#f45fff',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//             fontWeight: 'bold',
//         },
//     }

//     render() {
//         return (




//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         backgroundColor: '#fff',
//         justifyContent: 'center',
//         paddingTop: 10,
//         paddingBottom: 10
//     },
//     listitem: {
//         fontFamily: 'Montserrat-Regular',
//         fontSize: 15,

//     }

// });


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
    FooterTab
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


        const user = firebase.auth().currentUser;
        user.providerData.forEach((userInfo) => {
            console.log('User info for provider: ', userInfo);
        });

        //if user dh wujud, just alert
        if (user == null) {
            firebase.firestore().collection('Users').doc(user.uid).set({
                uid: user.uid,
                username: user.email,
                email: user.email,
                phoneNumber: user.phoneNumber,
                profileImage: user.photoURL
            }).then(() => {
                firebase.firestore().collection('Users').doc(user.uid).get().then(data => { console.log(data) })
            });
        } else {
            console.log('Data Already Exist');
            //Alert.alert('Data already exist');
        }

        this.initData = user


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

    componentDidMount() {
        this.unsubscribe = firebase.firestore().collection('Users').onSnapshot(this.getCollection);
    }


    componentWillUnmount() {
        this.unsubscribe();
    }

    //get the data first
    getCollection = (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((res) => {
            const { username, phonenumber, profileImage, description, keyplayer, project } = res.data();
            users.push({
                key: res.id,
                res,
                username,
                phonenumber,
                profileImage,
                description,
                keyplayer,
                project,
            });
        });
        this.setState({
            users,
            isLoading: false
        })
    }

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
            this.state.users.map((item, index) => {
                return (
                    <View key={index}>
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


                            <Card style={{ height: auto }}>
                                <CardItem cardBody>
                                    <Content>
                                        <Separator>
                                            <Text style={{ fontSize: 20, justifyContent: 'center' }}>Account Settings</Text>
                                        </Separator>
                                        <List style={styles.listitem}>
                                            <ListItem onPress={() => this.props.navigation.navigate('Personal')}>
                                                <Left><Text>Personal Information</Text></Left>
                                                <Right>
                                                    <Icon active name="md-person" size={30} />
                                                </Right>
                                            </ListItem>
                                            <ListItem onPress={() => this.props.navigation.navigate('Resume')}>
                                                <Left><Text>Resume</Text></Left>
                                                <Right>
                                                    <Icon active name="md-briefcase" size={30} />
                                                </Right>
                                            </ListItem>
                                            <ListItem onPress={() => this.props.navigation.navigate('PaymentSetting')}>
                                                <Left><Text>Payments</Text></Left>
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
                                        <Separator bordered>
                                            <Text>Multi-Skills Working</Text>
                                        </Separator>
                                        <List style={styles.listitem}>
                                            <ListItem onPress={() => this.props.navigation.navigate('PersonalSkill')}>
                                                <Left><Text>List Your Skills</Text></Left>
                                                <Right>
                                                    <Icon active name="md-person" size={30} />
                                                </Right>
                                            </ListItem>
                                            <ListItem onPress={() => this.props.navigation.navigate('JobType')}>
                                                <Left><Text>Job Type</Text></Left>
                                                <Right>
                                                    <Icon active name="md-briefcase" size={30} />
                                                </Right>
                                            </ListItem>
                                            <ListItem onPress={() => this.props.navigation.navigate('WorkSkill')}>
                                                <Left style={{ flexDirection: 'column' }}><Text>Learn About Multi-Skills Workforce</Text><Text note>Earn Up to RM 3,000 per month</Text></Left>
                                                <Right>
                                                    <Icon active name="md-cash" size={30} />
                                                </Right>
                                            </ListItem>
                                        </List>
                                        <Separator>
                                            <Text style={{ fontSize: 20, justifyContent: 'center' }}>Support</Text>
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
                )

            })
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

    }
})










//  <ScrollView> 


//  <Card>

//  </Card>
//  <Card>
//      <Container>
//          <Content style={{ padding: 15 }}>
            //  <Separator>
            //      <Text style={{ fontSize: 20, justifyContent: 'center' }}>Account Settings</Text>
            //  </Separator>
            //  <List style={styles.listitem}>
            //      <ListItem onPress={() => this.props.navigation.navigate('Personal')}>
            //          <Left><Text>Personal Information</Text></Left>
            //          <Right>
            //             <Icon active name="md-person" size={30} />
            //          </Right>
            //      </ListItem>
            //      <ListItem onPress={() => this.props.navigation.navigate('Resume')}>
            //          <Left><Text>Resume</Text></Left>
            //          <Right>
            //              <Icon active name="md-briefcase" size={30} />
            //          </Right>
            //      </ListItem>
            //      <ListItem onPress={() => this.props.navigation.navigate('PaymentSetting')}>
            //          <Left><Text>Payments</Text></Left>
            //          <Right>
            //              <Icon active name="md-wallet" size={30} />
            //          </Right>
            //      </ListItem>
            //      <ListItem onPress={() => this.props.navigation.navigate('Privacy')}>
            //          <Left><Text>Privacy Settings</Text></Left>
            //          <Right>
            //              <Icon active name="md-unlock" size={30} />
            //          </Right>
            //      </ListItem>
            //      <ListItem>
            //          <Left>
            //              <Body>
            //                  <Text>Print Receipt</Text>
            //                  <Text note>Toggle to Switch Auto or Manual</Text>
            //              </Body>
            //          </Left>
            //          <Right>
            //              <Switch selected={true} />
            //          </Right>
            //      </ListItem>
            //      <ListItem>
            //          <Left><Text>Rewards</Text></Left>
            //          <Right>
            //              <Icon active name="md-cash" size={30} />
            //          </Right>
            //      </ListItem>
            //  </List>

            // <Separator>
            //     <Text style={{ fontSize: 20, justifyContent: 'center' }}>Multi-Skills Workforce</Text>
            // </Separator>
            // <List style={styles.listitem}>
            //     <ListItem onPress={() => this.props.navigation.navigate('PersonalSkill')}>
            //         <Left><Text>List Your Skills</Text></Left>
            //         <Right>
            //             <Icon active name="md-person" size={30} />
            //         </Right>
            //     </ListItem>
            //     <ListItem onPress={() => this.props.navigation.navigate('JobType')}>
            //         <Left><Text>Job Type</Text></Left>
            //         <Right>
            //             <Icon active name="md-briefcase" size={30} />
            //         </Right>
            //     </ListItem>
            //     <ListItem onPress={() => this.props.navigation.navigate('WorkSkill')}>
            //         <Left><Text>Learn About Multi-Skills Workforce</Text><Text note>Earn Up to RM 3,000 per month</Text></Left>
            //         <Right>
            //             <Icon active name="md-cash" size={30} />
            //         </Right>
            //     </ListItem>

            // </List>
            // <Separator>
            //     <Text style={{ fontSize: 20, justifyContent: 'center' }}>Support</Text>
            // </Separator>
            // <List style={styles.listitem}>
            //     <ListItem onPress={() => this.props.navigation.navigate('Support')}>
            //         <Left><Text>Safety Centre</Text><Text note>Get the Support you need as well as Labor Union help</Text></Left>
            //         <Right>
            //             <Icon active name="md-person" size={30} />
            //         </Right>
            //     </ListItem>
            //     <ListItem onPress={() => this.props.navigation.navigate('Contact')}>
            //         <Left><Text>Get Help</Text></Left>
            //         <Right>
            //             <Icon active name="md-briefcase" size={30} />
            //         </Right>
            //     </ListItem>
            //     <ListItem onPress={() => this.props.navigation.navigate('PaymentMethod')}>
            //         <Left><Text>Please Give Us Your Feedback</Text></Left>
            //         <Right>
            //             <Icon active name="md-wallet" size={30} />
            //         </Right>
            //     </ListItem>
            // </List>
            // <Separator>
            //     <Text style={{ fontSize: 20, justifyContent: 'center' }}>Legal</Text>
            // </Separator>
            // <List style={styles.listitem}>
            //     <ListItem onPress={() => this.props.navigation.navigate('Terms')}>
            //         <Left><Text>Terms of Service</Text></Left>
            //         <Right>
            //             <Icon active name="md-person" size={30} />
            //         </Right>
            //     </ListItem>
            //     <ListItem onPress={() => this.props.navigation.navigate('Privacy')}>
            //         <Left><Text>Privacy Policy</Text></Left>
            //         <Right>
            //             <Icon active name="md-briefcase" size={30} />
            //         </Right>
            //     </ListItem>
//             </List>
//             <List>
//                 <ListItem onPress={() => this.props.navigation.navigate('Logout')}>
//                     <Left><Text>Logout</Text></Left>
//                 </ListItem>
//             </List>
//         </Content>
//     </Container>
// </Card>

// <Footer style={{ paddingTop: 50 }}>
//     <Content>
//         <Text>Developed by Ahmad Fakhrul Nizar Bin Ab Ghani</Text>
//         <Text>All Right Reserved</Text>
//     </Content>
// </Footer>




// </ScrollView> 
