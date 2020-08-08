// import React from 'react';
// import {StyleSheet, Text, List, View, Slider, ScrollView, Image, Alert} from 'react-native';
// import { 
//   Container, 
//   Card,
//   CardItem,
//   Separator,
//   Header, 
//   Left, 
//   Body, 
//   Thumbnail,
//   Right,
//   Button, 
//   Icon, 
//   Title, 
//   Content, 
//   Item} from 'native-base';


// export default class Notification extends React.Component {



//     render() {
//      return(
//        <View>
//            <Header>
//            <View style={{marginTop:25, marginEnd: 350}}>
//              <Icon style={{color:'white'}} name="md-menu" onPress={()=>this.props.navigation.openDrawer()}/>
//          </View>
//            </Header>
//            <ScrollView>
//            <Separator>
//               <Text style={{alignItems:'center', justifyContent: 'center', fontSize: 20}}>Notification</Text>           
//           </Separator>
//            </ScrollView>
//            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
//               <Text>Notification</Text>
//            </View>
//        </View>  
//      );

//     }
//   }

import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';
import { Header, Container, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const list = [
  {
    title: 'Ahmad Hassan',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Working on System Engineering for 6 Months',
    job_title: 'Contracts'
  },
  {
    title: 'Ahmad Hassan',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Working on System Engineering for 6 Months',
    job_title: 'Freelance'
  },
  {
    title: 'Ahmad Hassan',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Working on System Engineering for 6 Months',
    job_title: 'Part Time'
  },

]

export default class Notification extends Component {

  // static navigationOptions = {
  //   title: 'Profile',
  //     tabBarIcon: ({ tintColor }) => (
  //       <Icon name="person" style={{ color: tintColor }} />
  //     ),
  //     headerTitle:{
  //        title: 'GET-THE-JOB'
  //     },
  //   headerStyle: {
  //   backgroundColor: '#f45fff',
  // },
  //   headerTintColor: '#fff',
  //   headerTitleStyle: {
  //       fontWeight: 'bold',
  //   },
  // }



  render() {
    return (


      <Container>
        <Header
          placement="left"
          leftComponent={{ icon: 'md-menu', color: '#fff' }}
          centerComponent={{ text: 'Job Progress', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <ScrollView>
          <View>
            {
              list.map((item, i) => (
                <ListItem
                  key={i}
                  leftAvatar={{ source: { uri: l.avatar_url } }}
                  title={item.title}
                  subtitle={item.subtitle}
                  rightTitle={item.job_title}
                  bottomDivider
                  chevron
                />
              ))
            }
          </View>
        </ScrollView>



      </Container>




    );
  }
}


