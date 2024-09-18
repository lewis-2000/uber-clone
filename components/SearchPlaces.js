import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Pressable } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { setDestination, setOrigin } from '../slices/navSlice'; // Import actions from navSlice
import { useDispatch } from 'react-redux'; // Import useDispatch from react-redux

const SearchPlaces = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch(); // Set up dispatch
    const navigation = useNavigation();
    let debounceTimeout = null;

    // Function to handle place search with debouncing
    const searchPlace = (text) => {
        setSearchText(text);

        // Clear previous debounce timer
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        // Start new debounce timer
        debounceTimeout = setTimeout(async () => {
            if (text.length > 2) {
                const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(text)}&limit=10`;
                try {
                    const response = await axios.get(url);
                    const results = response.data.features.map((place) => ({
                        name: place.properties.name || place.properties.city || 'Unnamed place',
                        lat: place.geometry.coordinates[1],
                        lon: place.geometry.coordinates[0],
                        postcode: place.properties.postcode,
                        country: place.properties.country
                    }));
                    setSearchResults(results);
                } catch (error) {
                    console.error('Error searching for place:', error);
                }
            } else {
                setSearchResults([]);
            }
        }, 400);
    };

    // Clear the search text
    const clearSearchText = () => {
        setSearchText('');
        setSearchResults([]); // Clear search results when clearing text
    };

    // Handle selection of a place and store it in Redux, then navigate to MapScreen
    const handleSelectPlace = (place) => {

        setSearchText(place.name);
        // Dispatch to Redux
        dispatch(setOrigin({
            latitude: place.lat,
            longitude: place.lon,
            name: place.name,
            postcode: place.postcode,
            country: place.country
        }));

        // dispatch(setDestination(null)); // Clear destination if needed

        // // Navigate to MapScreen with the selected place's data
        // navigation.navigate('MapScreen', {
        //     latitude: place.lat,
        //     longitude: place.lon,
        //     name: place.name,
        //     postcode: place.postcode,
        //     country: place.country
        // });

        setSearchResults([]); // Clear search results after clicking a result
    };

    return (
        <View>
            {/* Search Input with Clear Button */}
            <View style={tw`flex-row bg-white p-2 rounded-lg mb-2`}>
                <TextInput
                    style={tw`flex-1 text-base`}
                    placeholder="Where From?"
                    value={searchText}
                    onChangeText={searchPlace} // Debounced search
                />
                {searchText.length > 0 && (
                    <Pressable onPress={clearSearchText}>
                        <Ionicons name="close-circle" size={24} color="gray" />
                    </Pressable>
                )}
            </View>

            {/* Search Results */}
            {searchResults.length > 0 && (
                <FlatList
                    data={searchResults}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { handleSelectPlace(item) }}>
                            <Text style={tw`p-2 border-b border-gray-200 font-semibold`}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    style={tw`bg-white rounded-lg max-h-40 mb-2`}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

export default SearchPlaces;
