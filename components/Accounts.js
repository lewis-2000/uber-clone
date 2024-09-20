import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native'


const Accounts = () => {
    const navigation = useNavigation()
    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate("AccountScreen")}
                style={tw`p-2  pb-8 pt-4 bg-gray-200 m-2 w-full rounded-full`}>
                <View style={tw`flex text-center items-center`}>
                    <Text style={tw`bg-white`}>Accounts</Text>

                </View>

            </TouchableOpacity>
        </View>
    )
}

export default Accounts

const styles = StyleSheet.create({})