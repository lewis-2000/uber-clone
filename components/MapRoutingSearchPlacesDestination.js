import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../slices/navSlice';

const RoutingMap = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const [routeCoordinates, setRouteCoordinates] = useState([]); // Store the polyline coordinates here

    // Fetch directions from OpenRouteService
    useEffect(() => {
        const fetchDirections = async () => {
            if (origin && destination && origin.latitude && origin.longitude && destination.latitude && destination.longitude) {
                const API_KEY = '5b3ce3597851110001cf62484210fd338b334202ba935e60d04bc173'; // Replace with your OpenRouteService API key
                const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${origin.longitude},${origin.latitude}&end=${destination.longitude},${destination.latitude}`;

                try {
                    const response = await fetch(url);
                    const data = await response.json();

                    // Extract the polyline coordinates from the response
                    const routeCoords = data.features[0].geometry.coordinates.map(coord => ({
                        latitude: coord[1],
                        longitude: coord[0],
                    }));

                    setRouteCoordinates(routeCoords); // Set the polyline coordinates
                } catch (error) {
                    console.error('Error fetching directions:', error);
                }
            }
        };

        // Only fetch directions when both origin and destination are available
        if (origin && destination) {
            fetchDirections();
        }
    }, [origin, destination]);

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
                {origin && (
                    <Marker
                        coordinate={{
                            latitude: origin.latitude,
                            longitude: origin.longitude,
                        }}
                        title={origin.name}
                        description={origin.country}
                    />
                )}

                {destination && (
                    <Marker
                        coordinate={{
                            latitude: destination.latitude,
                            longitude: destination.longitude,
                        }}
                        title={destination.name}
                        description={destination.country}
                    />
                )}

                {routeCoordinates.length > 0 && (
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="blue" // Color of the line
                        strokeWidth={3} // Thickness of the line
                    />
                )}
            </MapView>
        </View>
    );
};

export default RoutingMap;
