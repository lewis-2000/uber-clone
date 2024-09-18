import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../slices/navSlice';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    console.log("Origin: ", origin.latitude);

    const mapref = useRef(null);



    console.log("Origin Coordinates: ", origin.latitude, origin.longitude);
    console.log("Destination Coordinates: ", destination.latitude, destination.longitude);


    const [routeCoordinates, setRouteCoordinates] = useState([]);

    useEffect(() => {
        fetchDirections();
    }, [origin, destination]);

    //Zoom out to fit the route on the map
    useEffect(() => {
        if (routeCoordinates.length > 0) {
            mapref.current.fitToCoordinates(routeCoordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            });
            if (!origin || !destination) return
        }
    }, [routeCoordinates]);

    const fetchDirections = async () => {
        if (origin && destination) {
            const API_KEY = '5b3ce3597851110001cf62484210fd338b334202ba935e60d04bc173';
            const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${origin.longitude},${origin.latitude}&end=${destination.longitude},${destination.latitude}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                // Log the entire response to see its structure
                console.log("Data from Routing is: ", data);

                // Extract the polyline coordinates (if the structure is correct)
                const routeCoords = data.features[0].geometry.coordinates.map(coord => ({
                    latitude: coord[1],
                    longitude: coord[0]
                }));

                setRouteCoordinates(routeCoords); // Set the polyline coordinates

                console.log("Route Coordinates: ", routeCoords);
            } catch (error) {
                console.error('Error fetching directions:', error);
            }
        }
    };


    if (!origin || !origin.latitude || !origin.longitude) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading map...</Text>
            </View>
        );
    }

    return (
        <MapView
            style={{ flex: 1 }}
            ref={mapref}
            initialRegion={{
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }}
        >
            {/* Marker for the origin */}
            <Marker
                coordinate={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                }}
                title={origin.name}
                description={origin.country}
            />

            {/* Marker for the destination */}
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

            {/* Polyline for the route */}
            {routeCoordinates.length > 0 && (
                <Polyline
                    coordinates={routeCoordinates}
                    strokeColor="blue"
                    strokeWidth={3}
                />
            )}
        </MapView>
    );
};

export default Map;
