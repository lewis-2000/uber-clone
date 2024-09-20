import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../../slices/navSlice'
import { useNavigation } from '@react-navigation/native'



const GoogleMapAutoCompleteSearchComponentDestination = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <View>
            <GooglePlacesAutocomplete
                placeholder='Where To?'
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
                minLength={2}
                returnKeyType={'search'}
                enablePoweredByContainer={false}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en',
                }}
                onPress={(data, details = null) => {
                    dispatch(setDestination({
                        location: details.geometry.location,
                        description: data.description,
                    }))

                    navigation.navigate("RideOptionsCard")

                }}
                fetchDetails={true}
                styles={toInputBoxStyles}


            />
        </View>
    )
}

export default GoogleMapAutoCompleteSearchComponentDestination

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 20,
        flex: 0
    },
    textInput: {
        backgroundColor: '#DDDDDF',
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }

})