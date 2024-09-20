import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'


import NavOptions from '../components/NavOptions'
// import SearchPlaces from '../components/SearchPlaces'
import GooglePlacesAutoCompleteSearch from '../components/MapScreen/GooglePlacesAutoCompleteSearch'
import NavFavourites from '../components/NavFavourites'
import Accounts from '../components/Accounts'

const HomeScreen = () => {
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image style={styles.logo} source={require('../assets/Uber2.png')} />

                {/* Search Component */}
                <View style={tw`px-4`}>
                    {/* <SearchPlaces /> */}
                    <GooglePlacesAutoCompleteSearch />

                </View>


                <NavOptions />

                <NavFavourites />

                <Accounts />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: 'blue'
    },

    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain',

    },
})