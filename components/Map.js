import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../slices/navSlice';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    // If `origin` is null or doesn't have coordinates yet, show a loading state or fallback
    if (!origin || !origin.latitude || !origin.longitude) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <Text>Loading map...</Text>
            </View>
        );
    }

    return (
        <View style={tw`flex-1`}>
            <MapView
                style={tw`flex-1`}
                mapType='mutedStandard'
                initialRegion={{
                    latitude: origin.latitude || -1.286389,  // Default latitude
                    longitude: origin.longitude || 36.817223, // Default longitude
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {/* {origin && destination } */}

                {origin && origin.latitude && (
                    <Marker
                        coordinate={{
                            latitude: origin.latitude,
                            longitude: origin.longitude,
                        }}
                        title={origin.name} // Optional: title for the marker
                        description={origin.country} // Optional: description for the marker
                    />
                )}
            </MapView>
        </View>
    );
};

export default Map;
