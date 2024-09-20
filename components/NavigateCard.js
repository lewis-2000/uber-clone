import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native';


// import SearchPlacesDestination from './SearchPlacesDestination'
import GoogleMapAutoCompleteSearchComponentDestination from './MapScreen/GoogleMapAutoCompleteSearchComponentDestination'
import NavFavourites from './NavFavourites'


const NavigateCard = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={tw`bg-white flex-1 `}>
            <View style={tw``}>
                <Text style={tw`text-center py-1 text-xl font-semibold`}>Good Morning User</Text>
                <View style={tw`border-t border-gray-200 flex-shrink`}>
                    {/* <SearchPlacesDestination /> */}
                    <GoogleMapAutoCompleteSearchComponentDestination />
                </View>
                <NavFavourites />
            </View>
            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity style={tw`flex flex-row bg-black justify-between w-24 px-4 py-3 rounded-full`} onPress={() => { navigation.navigate('RideOptionsCard') }}>
                    <Icon name="car" type="font-awesome" color="white" size={16} />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`flex flex-row  justify-between w-24 px-4 py-3 rounded-full`} onPress={() => { }}>
                    <Icon name="car" type="font-awesome" color="black" size={16} />
                    <Text style={tw`text-black text-center`}>Rides</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const styles = StyleSheet.create({})