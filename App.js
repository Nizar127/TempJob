import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import PaymentScreen from './src/screen/payment/PaymentScreen';
import SplashScreen from './src/SplashScreen';
import Calendar from './src/screen/main/Calendar';
import Home from './src/screen/main/Home';
import JobList from './src/screen/main/Job_List';
import Profile from './src/screen/main/Profile';
import Payment from './src/screen/drawer/payment';
import Notification from './src/screen/drawer/notifications';
import CarouselMap from './src/screen/other/CarouselMap';
import Loading from './src/Loading';
import GoogleLogin from './src/screen/auth/googlelogin';
import OnBoard from './src/OnBoard';
import FeedDetail from './src/screen/other/FeedDetail';
import Contact from './src/screen/profile/Contact';
import JobType from './src/screen/profile/JobType';
import PaymentSetting from './src/screen/profile/PaymentSetting';
import Personal from './src/screen/profile/Personal';
import PersonalSkill from './src/screen/profile/PersonalSkill';
import Privacy from './src/screen/profile/Privacy';
import Resume from './src/screen/profile/Resume';
import Reward from './src/screen/profile/Reward';
import Support from './src/screen/profile/Support';
import WorkSkill from './src/screen/profile/WorkSkill';
import ViewProfile from './src/screen/profile/ViewProfile';
import UserProfile from './src/screen/profile/userProfile';

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Home: Home,
    //Search: Search,
    JobList: JobList,
    //Scan: Scan,
    Calendar: Calendar,
    Profile: Profile
  },

  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  }
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator,
    //SplashScreen: SplashScreen,
    CarouselMap: CarouselMap,
    OnBoard: OnBoard,
    Loading: Loading,
    PaymentScreen: PaymentScreen,
    GoogleLogin: GoogleLogin,
    Contact: Contact,
    JobType: JobType,
    PaymentSetting: PaymentSetting,
    Personal: Personal,
    PersonalSkill: PersonalSkill,
    Privacy: Privacy,
    Resume: Resume,
    Reward: Reward,
    Support: Support,
    WorkSkill: WorkSkill,
    ViewProfile: ViewProfile,
    UserProfile: UserProfile,
    // PaymentDetails:PaymentDetails,
    // SearchDetails: SearchDetails,
    // JobHome: JobHome,
    // AddBlog: AddBlog,
    // BlogDetail: BlogDetail,
    FeedDetail: FeedDetail,
    // ViewCalendar: ViewCalendar
    // OnGoingJob: OnGoingJob,
    // AvailabilityView: AvailabilityView,
    // JobComplete: JobComplete,
    // AddJob: AddJob,
    // JobHome: JobHome
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: () =>
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />

      };
    }
  }
);

const CustomDrawerContentComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
    </View>
    <View style={{ justifyContent: 'center', alignItems: 'center', fontSize: 20, fontWeight: 'bold' }}>
      <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 20, fontWeight: 'bold' }}>
        Hamzah

      </Text>
    </View>
    <View>
      <DrawerItems {...props} />
    </View>
  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  },
  Notification: {
    screen: Notification
  },
  Payment: {
    screen: Payment
  },
  // Messaging:{
  //   screen: Inbox
  // },



},
  {
    contentComponent: CustomDrawerContentComponent
  });



const AppSwitchNavigator = createSwitchNavigator({
  //Login: { screen: Login},
  //Welcome: { screen: WelcomeScreen },
  SplashScreen: { screen: SplashScreen },
  //GoogleLogin: { screen: GoogleLogin },
  //NewStartScreen: { screen: NewStartScreen },
  Dashboard: { screen: AppDrawerNavigator }
});

export default AppContainer = createAppContainer(AppSwitchNavigator);