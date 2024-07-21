import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import AtnDesign from '@expo/vector-icons/AntDesign';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/../App';
import { selectOrigin } from '@/uberSlice';
import { useSelector } from 'react-redux';

type DataItem = {
  id: string;
  title: string;
  image: string;
  screen: keyof RootStackParamList;
};

const data: DataItem[] = [
  {
    id: '123',
    title: 'Get a ride',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen',
  },
  {
    id: '456',
    title: 'Order food',
    image: 'https://links.papareact.com/28w',
    screen: 'EatsScreen',
  },
];

const NavOptions = () => {
  const origin = useSelector(selectOrigin);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={tw`p-2 pl-6 pb-8 pt-4 m-2 bg-gray-200 w-40`}
            onPress={() => navigation.navigate(item.screen)}
            disabled={!origin}
          >
            <View style={tw`${!origin ? 'opacity-50' : ''}`}>
              <Image
                style={{ width: 120, height: 120, resizeMode: 'contain' }}
                source={{ uri: item.image }}
              />
              <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
              <View
                style={tw`p-2 bg-black rounded-full w-10 h-10 flex items-center justify-center mt-4`}
              >
                <AtnDesign
                  name='arrowright'
                  color='white'
                  size={18}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default NavOptions;
