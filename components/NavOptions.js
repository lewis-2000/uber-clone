import React from 'react'
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import FoodLink from '../assets/FoodLink.png'
import RideLink from '../assets/RideLink.webp'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'

const data = [
    {
        id: "123",
        title: "Get a ride",
        image: RideLink,
        screen: "MapScreen",
    },

    {
        id: "456",
        title: "Order food",
        image: FoodLink,
        screen: "EatsScreen", // Change in future ...
    }
]
const NavOptions = () => {

    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);


    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate(item.screen)}
                    style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
                    disabled={!origin}>
                    <View style={tw`${!origin && 'opacity-20'}`}>
                        <Image style={{ width: 120, height: 120, resizeMode: 'contain' }} source={item.image} />
                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                        <Icon type='antdesign' name='arrowright' color='white' style={tw`p-2 bg-black rounded-full w-10 m-2 `} />

                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavOptions

