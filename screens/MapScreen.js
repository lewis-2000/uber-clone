import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { createStackNavigator } from '@react-navigation/stack'

// import Map from '../components/Map'
// import RoutingMap from '../components/SearchPlacesDestinationwithroutingMap'
// import OpenMap from '../components/OpenStreetMapWithRouting'
import { GOOGLE_MAPS_APIKEY } from '@env'
import GoogleMapComponent from '../components/MapScreen/GoogleMapComponent'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'


const MapScreen = () => {
    const Stack = createStackNavigator();


    return (
        <View>
            <View style={tw`h-1/2`}>
                <GoogleMapComponent />
                {/* <Map /> */}
                {/* <OpenMap /> */}
            </View>

            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={
                            {
                                headerShown: false,
                            }
                        } />

                    <Stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={
                            {
                                headerShown: false,
                            }
                        } />
                </Stack.Navigator>

            </View>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({})