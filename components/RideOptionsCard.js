import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin, selectTravelTimeInformation } from '../slices/navSlice';
import tw from 'tailwind-react-native-classnames';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

//Car Options Image imports
import UberX from '../assets/UberX.webp'
import UberXL from '../assets/UberXL.webp'
import UberLUX from '../assets/Lux.webp'

const RidOptionsCard = () => {

    const [selected, setSelected] = useState(null);


    const destination = useSelector(selectDestination);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);
    console.log(travelTimeInformation)

    const navigation = useNavigation();

    const data = [
        {

            io: "Uber-X-123",
            title: "UberX",
            multiplier: 1,
            image: UberX,
        },


        {

            id: "Uber-XL-456",
            title: "Uber XL",
            multiplier: 1.2,
            image: UberXL,
        },

        {

            id: "Uber-LUX-789",
            title: "Uber LUX",
            multiplier: 1.75,
            image: UberLUX,
        },
    ]

    //Surge Rate 
    const SURGE_CHARGE_RATE = 1.5;

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <View>
                <View style={tw`mb-7`}>
                    <TouchableOpacity
                        style={tw`absolute mt-auto mb-auto left-5 p-3 rounded-full`}
                        onPress={() => navigation.navigate('NavigateCard')}>
                        <Icon name='chevron-left' type='fontawesome' />
                    </TouchableOpacity>
                    <Text style={tw`text-center py-1 text-xl font-semibold`}>Select a ride - {travelTimeInformation?.distance.text} </Text>

                </View>

            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={
                    ({ item: { id, title, multiplier, image }, item }) => (
                        <TouchableOpacity
                            style={tw`flex-row items-center justify-between px-10 ${id === selected?.id && 'bg-gray-200'} `}
                            onPress={() => setSelected(item)}>
                            <Image
                                style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'contain'
                                }}
                                source={image} />

                            <View style={tw`-ml-6`}>
                                <Text style={tw`text-xl font-semibold`}>{title}</Text>
                                <Text>{travelTimeInformation?.duration.text} Travel time</Text>
                            </View>

                            <Text style={tw`text-xl`}>
                                {new Intl.NumberFormat('en-gb', {
                                    style: 'currency',
                                    currency: 'KSH'
                                }).format(
                                    (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 10
                                )}
                            </Text>
                        </TouchableOpacity>
                    )
                }
            />

            <View style={tw`border-t border-gray-200 mt-auto`}>
                <TouchableOpacity style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`} disabled={!selected}>
                    <Text style={tw`text-center text-xl text-white`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RidOptionsCard

const styles = StyleSheet.create({})