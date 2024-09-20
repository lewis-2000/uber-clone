import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../../slices/navSlice'

const GooglePlacesAutoCompletesearch = () => {
    const dispatch = useDispatch();

    return (
        <View>
            <GooglePlacesAutocomplete
                placeholder='Where from?'
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
                    dispatch(setOrigin({
                        location: details.geometry.location,
                        description: data.description,
                    }))

                    dispatch(setDestination(null))

                }}
                fetchDetails={true}
                styles={{
                    container: {
                        flex: 0
                    },
                    textInput: {
                        fontSize: 18
                    }
                }}


            />
        </View>
    )
}

export default GooglePlacesAutoCompletesearch

const styles = StyleSheet.create({})