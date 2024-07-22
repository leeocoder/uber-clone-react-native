import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import tw from 'twrnc';

type data = {
  id: string;
  icon: string;
  location: string;
  destination: string;
};

const data: data[] = [
  {
    id: '123',
    icon: 'home',
    location: 'Home',
    destination: 'Code Street, London, UK',
  },
  {
    id: '456',
    icon: 'briefcase',
    location: 'Work',
    destination: 'London Eye, London, UK',
  },
];

const NavFavorites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, { height: 1 }]} />
      )}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity style={tw`flex-row items-center p-5`}>
            <View style={tw`mr-4 rounded-full bg-gray-300 p-3 w-8 h-8`}>
              <Ionicons
                name={item.icon as any}
                size={18}
              />
            </View>
            <View>
              <Text style={tw`font-semibold text-lg`}>{item.location}</Text>
              <Text style={tw`text-gray-500`}>{item.destination}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default NavFavorites;
