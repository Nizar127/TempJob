import React, { Component } from 'react';
import { StyleSheet, Image, Animated, Alert, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    Container,
    Header,
    TabHeading,
    View,
    Card,
    Tab,
    Tabs,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Button,
    Right,
    Fab,
    Separator,
    Content
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
//import { db } from '../../config/firebase';
//import { addApplicant } from '../../config/firebase';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';


//let job = db.ref('/Job');


export default class JobList extends Component {

    constructor() {
        super();
        this.jobAcceptRef = firestore().collection('Job_Hired')/* .where('jobSeekerID', '==', auth().currentUser.uid) */;
        this.startJobRef = firestore().collection('Ongoing_Job');
        this.state = {
            show: true,
            jobs: [],
            jobId: '',
            userID: '',
            applyID: '',
            jobname: '',
            userId: '',
            job_provider: '',
            isVisible: false,
            jobCreatorID: '',
            job_creator_name: '',
            job_creator_Image: '',
            jobSeekerName: '',
            jobDescription: '',
            job_seekerImage: '',
            jobName: '',
            job_seekerSalary: '',
            jobWorkType: '',
            workingLocation: '',
            lat: '',
            lng: '',
            startDate: '',
            ref_task: '',
            ref_period: '',
            startDateWork: '',
            EndDateWork: '',
            start_working_time: '',

        };
    }



    componentDidMount() {
        //SplashScreen.hide();
        this.unsubscribe = this.jobAcceptRef.onSnapshot(this.getCollection);


    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    getCollection = (querySnapshot) => {
        const jobs = [];
        querySnapshot.forEach((res) => {
            const { jobName, jobCreatorID, jobDescription, jobSeekerID, job_creator_Image, job_creator_name, job_seekerImage, lat, lng, job_seekerSalary, location, task, time, type_of_Job, startDate, endDate } = res.data();
            jobs.push({
                key: res.id,
                res,
                jobName,
                jobCreatorID,
                jobDescription,
                jobSeekerID,
                job_creator_Image,
                job_creator_name,
                job_seekerImage,
                lat,
                lng,
                job_seekerSalary,
                location,
                task,
                time,
                type_of_Job,
                startDate,
                endDate

            });
        });
        this.setState({
            jobs,
            isLoading: false
        })
    }


    static navigationOptions = {
        title: 'Job List',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-briefcase" style={{ color: tintColor }} size={20} />
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

    renderSuccess = () => {
        if (this.state.show == true) {
            this.setState({ show: false });
        } else {
            this.setState({ show: true });
        }
    };


    render() {

        return (
            <View style={{ flex: 1 }}>

                <Container>
                    <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }}>List of Available Task and Job</Text>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.state.jobs}

                            renderItem={({ item, index }) => {
                                return (

                                    <Card style={{ marginBottom: 10 }} key={index} onPress={() => this.props.navigation.navigate('FeedDetail', {
                                        userkey: item.key
                                    })}>
                                        <CardItem header bordered>
                                            <Text style={{ fontStyle: 'bold', textAlign: 'center', textColor: 'green' }}>{item.jobName}</Text>
                                            <Right>
                                                <Button style={{ flex: 4 }} success onPress={() => this.props.navigation.navigate('PaymentScreen')}/*  onPress={() => this.startJob(item.key), this.renderSuccess} */>
                                                    <Text>Start Job</Text>
                                                </Button>

                                            </Right>
                                        </CardItem>
                                        <CardItem>
                                            <Body>
                                                <Text style={{ fontStyle: 'bold', margin: 2, textAlign: 'center', textColor: 'green' }}>{item.type_of_Job}</Text>
                                                <Text style={{ fontStyle: 'bold', margin: 2, textAlign: 'center', textColor: 'green' }}>{item.job_creator_name}</Text>
                                            </Body>

                                        </CardItem>
                                        <CardItem cardBody bordered button style={{ paddingTop: 20, paddingBottom: 30 }}>
                                            <Image source={{ uri: item.job_creator_Image }} style={{ height: 150, width: '100%', padding: 10 }} />
                                        </CardItem>
                                        <CardItem cardBody>
                                            <Body style={{ flex: 1, padding: 10 }}>
                                                <Text>{item.task}</Text>
                                                <Text>{item.startDate}</Text>
                                                <Text>{item.endDate}</Text>
                                                <Text style={{ fontColor: 'Blue' }}>Time: {item.time}</Text>
                                            </Body>
                                        </CardItem>
                                        <CardItem>
                                            <Text>RM  {item.job_seekerSalary}/job</Text>
                                        </CardItem>

                                    </Card>

                                )
                            }}
                        />
                    </View>
                </Container>
            </View>

        );

    }
}


const Style = StyleSheet.create({

    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 150,
        backgroundColor: '#E91E63',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    },
})  