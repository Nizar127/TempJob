import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Platform,
  Dimensions
} from 'react-native';
import MapView,
{ PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle }
  from 'react-native-maps';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import Carousel from 'react-native-snap-carousel';

export default class CarouselMap extends Component {

  static navigationOptions = {
    title: 'Petaling Jaya',
  };

  state = {
    markers: [],
    coordinates: [
      { name: 'Programmers', payment: 'RM 20/hour', type: 'Contract', latitude: 3.098790, longitude: 101.644920, image: require('../../img/coding.jpg') },
      { name: 'Project Manager', payment: 'RM 500', type: 'Freelance', latitude: 3.149943, longitude: 101.660357, image: require('../../img/project_manager.jpg') },
      { name: 'Office Temp Work', payment: 'RM 1200/month', type: 'Part-Time', latitude: 3.130880, longitude: 101.679604, image: require('../../img/startup_culture.jpg') },
      { name: 'Manual Labor', payment: 'RM 100/hour', type: 'Hire-As-Needed', latitude: 3.182166, longitude: 101.678381, image: require('../../img/labour.jpg') },
      { name: 'Restaurant Waiter', payment: 'RM 40/hour', type: 'Urgent', latitude: 3.140173, longitude: 101.662588, image: require('../../img/waiter.jpg') },
      { name: 'Restaurant Waiter', payment: 'RM 2500', type: 'Per Milestones', latitude: 3.056733, longitude: 101.585121, image: require('../../img/waiter.jpg') },

    ]
  }

  componentDidMount() {
    this.requestLocationPermission();
  }

  showWelcomeMessage = () =>
    Alert.alert(
      'Get to Know Nearby Job',
      'Amazing Work, Amazing Payment',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Ok'
        }
      ]
    )

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iPhone: ' + response);

      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android: ' + response);

      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    }
  }

  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(JSON.stringify(position));

        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035
        }

        this.setState({ initialPosition });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    )
  }

  onCarouselItemChange = (index) => {
    let location = this.state.coordinates[index];

    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035
    })

    this.state.markers[index].showCallout()
  }

  onMarkerPressed = (location, index) => {
    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035
    });

    this._carousel.snapToItem(index);
  }

  renderCarouselItem = ({ item }) =>
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Image style={styles.cardImage} source={item.image} />
      <Text style={styles.cardType}>{item.type}</Text>
      <Text style={styles.cardPayment}>{item.payment}</Text>

    </View>

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={map => this._map = map}
          showsUserLocation={true}
          liteMode={true}
          style={styles.map}
          initialRegion={this.state.initialPosition}>

          <Polygon
            coordinates={this.state.coordinates}
            fillColor={'rgba(100, 100, 200, 0.3)'}
          />
          <Circle
            center={{ latitude: 3.098790, longitude: 101.644920 }}
            radius={1000}
            fillColor={'rgba(200, 300, 200, 0.5)'}
          />
          <Marker
            draggable
            coordinate={{ latitude: 3.098790, longitude: 101.644920 }}
          >

            <Callout onPress={this.showWelcomeMessage}>
              <Text>An Interesting Job</Text>
            </Callout>

          </Marker>
          {
            this.state.coordinates.map((marker, index) => (
              <Marker
                key={marker.name}
                ref={ref => this.state.markers[index] = ref}
                onPress={() => this.onMarkerPressed(marker, index)}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              >
                <Callout>
                  <Text>{marker.name}</Text>
                </Callout>

              </Marker>
            ))
          }


        </MapView>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.state.coordinates}
          containerCustomStyle={styles.carousel}
          renderItem={this.renderCarouselItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={300}
          removeClippedSubviews={false}
          onSnapToItem={(index) => this.onCarouselItemChange(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    height: 300,
    width: Dimensions.get('window').width,
    //...StyleSheet.absoluteFillObject
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 25
  },
  cardContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 200,
    width: 220,
    padding: 24,
    borderRadius: 24
  },
  cardImage: {
    height: 120,
    width: 220,
    bottom: 0,
    position: 'absolute',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  cardTitle: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center'
  },
  cardPayment: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  cardType: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'center'
  }
});