import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, Header, TabHeading, View, DeckSwiper, Fab, Card, Tab, Tabs, CardItem, Thumbnail, Text, Left, Body, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Agenda } from 'react-native-calendars';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
//import { fromBinary } from 'uuid-js';
//import Modal from "react-native-modal";



export default class Calendar extends Component {
    constructor(props) {
        super(props);
        this.jobAcceptRef = firestore().collection('Job_Hired').where('jobSeekerID', '==', auth().currentUser.uid);
        this.state = {
            items: {},
            Agenda: {},
            active: false,
            isModalVisible: false,
            events:
                [
                    {
                        startDate: '',
                        endDate: '',
                        title: '',
                        task: ''
                    }
                ]
        };
    }

    // toggleModal = () => {
    //   this.setState({ isModalVisible: !this.state.isModalVisible });
    // };

    // clickHandler = () => {
    //   //function to handle click on floating Action Button
    //   Alert.alert('Floating Button Clicked');
    // };



    componentDidMount() {
        //SplashScreen.hide();
        //this.unsubscribe = this.jobAcceptRef.onSnapshot(this.getCollection);
    this.unsubscribe = firebase.firestore().collection('Job_Hired').onSnapshot(doc => {
      //console.log(doc.docs);
      let A = [];
      doc.forEach(e => {
       const data = e.data();
       A.push({
         name: data.jobname,
         task: data.task,
         to_do_list: data.task,
        //  type:data.worktype,
        //  latitude: data.lat,
        //  longitude: data.lng,
        //  image: data.url
       })

      })
      console.log("A: ",A)
      this.setState({
        Agenda: {
            //for format purposes
            //create agenda
            //check state , check array of the date
            
            "2020-12-25" : A
        }
      })

      

  });

    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    // getCollection = (querySnapshot) => {
    //     const jobs = [];
    //     querySnapshot.forEach((res) => {
    //         const { jobName, jobCreatorID, jobDescription, jobSeekerID, job_creator_Image, job_creator_name, job_seekerImage, lat, lng, job_seekerSalary, location, task, time, type_of_Job, startDate, endDate } = res.data();
    //         jobs.push({
    //             key: res.id,
    //             res,
    //             jobName,
    //             jobCreatorID,
    //             jobDescription,
    //             jobSeekerID,
    //             job_creator_Image,
    //             job_creator_name,
    //             job_seekerImage,
    //             lat,
    //             lng,
    //             job_seekerSalary,
    //             location,
    //             task,
    //             time,
    //             type_of_Job,
    //             startDate,
    //             endDate

    //         });
    //     });
    //     this.setState({
    //         jobs,
    //         isLoading: false
    //     })
    // }

    events = () => {
        this.setState(
            {
                startDate: jobs.startDate,
                endDate: jobs.endDate,
                title: jobs.jobName,
                task: jobs.task
            }
        )

    }

    static navigationOptions = {
        title: 'Calendar',
        tabBarIcon: ({ tintColor }) => (
            <Icon android name="md-calendar" style={{ color: tintColor }} size={30} />
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
            <Container>
                <Container>

                    <Agenda
                    items={this.state.Agenda}
                    // items={{
                    //     '2020-12-22': [{name: 'item 1 - any js object', task: 'Create new item', to_do_list:'do great'}],
                    //     '2020-12-23': [{name: 'item 1 - any js object', task: 'Create new item', to_do_list:'do great'}],
                    //     '2020-12-24': [],
                    //     '2020-12-25': [{name: 'item 1 - any js object', task: 'Create new item', to_do_list:'do great'}]
                    //   }}
                        // items={this.events}
                        loadItemsForMonth={this.loadItems.bind(this)}
                        selected={new Date()}
                        //markedDates={{this.startDate}}
                       
                        renderItem={this.renderItem.bind(this)}
                        renderEmptyDate={this.renderEmptyDate.bind(this)}
                        rowHasChanged={this.rowHasChanged.bind(this)}
                        onRefresh={() => console.log('refreshing...')}
                        // Set this true while waiting for new data from a refresh
                        refreshing={false}
                        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
                        refreshControl={null}
                    // markingType={'period'}
                    // markedDates={{
                    //    '2017-05-08': {textColor: '#666'},
                    //    '2017-05-09': {textColor: '#666'},
                    //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                    //    '2017-05-21': {startingDay: true, color: 'blue'},
                    //    '2017-05-22': {endingDay: true, color: 'gray'},
                    //    '2017-05-24': {startingDay: true, color: 'gray'},
                    //    '2017-05-25': {color: 'gray'},
                    //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                    // monthFormat={'yyyy'}
                    // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                    //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                    />
                </Container>
                {/* <Fab style={{ backgroundColor: '#66cd00' }} onPress={() => this.props.navigation.navigate('addjob')}>

                    <Icon android name="md-add" ios name="ios-add" />
                </Fab> */}

            </Container>
        );


    }

    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 5);
                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: 'Item for ' + strTime,
                            height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    }
                }
            }
            //console.log(this.state.items);
            const newItems = {};
            Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
            this.setState({
                items: newItems
            });
        }, 1000);
        // console.log(`Load Items for ${day.year}-${day.month}`);
    }

    renderItem(item) {
        return (
            <View style={[styles.item, { height: item.height }]}>

                <Text>{item.name}</Text>
                <Text>{item.task}</Text>
              
                <Text>{item.to_do_list}</Text>
                
        
            </View>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});