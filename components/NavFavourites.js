import React from 'react'
import { FlatList, StyleSheet, Text, Touchable, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'

const NavFavourites = () => {

    const data = [
        {
            id: '123',
            icon: 'home',
            location: 'home',
            destination: 'Limuru, Kenya',
        },
        {
            id: '456',
            icon: 'briefcase',
            location: 'Work',
            destination: 'PMS, Nairobi, Kenya',
        }
    ]

    return (
        <FlatList data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
                <View style={[tw`h-0.5 bg-gray-200`, { height: 0.5 }]} />
            )}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity style={tw`flex-row items-center p-5`}>
                        <Icon
                            name={item.icon} size={18}
                            color="white"
                            type='ionicon'
                            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        />

                        <View>
                            <Text style={tw`text-lg font-semibold`}>{item.location}</Text>
                            <Text style={tw`font-semibold text-gray-500`}>{item.destination}</Text>
                        </View>


                    </TouchableOpacity>)
            }} />
    )
}

export default NavFavourites

const styles = StyleSheet.create({})