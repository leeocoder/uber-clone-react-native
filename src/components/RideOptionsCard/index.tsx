import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { FontAwesome } from '@expo/vector-icons';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MapStackParamList } from '@/screens/MapScreen';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '@/uberSlice';

type Data = {
  id: string;
  title: string;
  multiplier: number;
  image: string;
};

const SURGE_CHARGE_RATE = 1.5;

const data: Data[] = [
  {
    id: 'Uber-X-123',
    title: 'UberX',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn',
  },
  {
    id: 'Uber-X-456',
    title: 'Uber XL',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8',
  },
  {
    id: 'Uber-X-789',
    title: 'Uber LUX',
    multiplier: 1,
    image: 'https://links.papareact.com/7pf',
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation<NavigationProp<MapStackParamList>>();
  const [selected, setSelected] = useState<Data | null>(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View style={tw`flex-row items-center ml-3`}>
        <TouchableOpacity
          style={tw`w-10 h-10 items-center justify-center rounded-full`}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome
            name='chevron-left'
            size={16}
          />
        </TouchableOpacity>
        <View style={tw`flex-1 mr-13`}>
          <Text style={tw`text-center text-xl`}>
            Select a Ride - {travelTimeInformation?.distance?.text}
          </Text>
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={tw`flex-row items-center justify-between px-10 ${
                item.id === selected?.id ? 'bg-gray-200' : ''
              }`}
              onPress={() => setSelected(item)}
            >
              <Image
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
                source={{ uri: item.image }}
              />
              <View style={tw`-ml-6`}>
                <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
                <Text style={tw`text-xl text-sm`}>
                  {travelTimeInformation?.duration?.text} Travel Time
                </Text>
              </View>
              <Text style={tw`text-lg`}>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(
                  (travelTimeInformation?.duration?.value *
                    SURGE_CHARGE_RATE *
                    item.multiplier) /
                    100
                )}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          style={tw`bg-black py-3 m-3 ${!selected ? 'bg-gray-300' : ''}`}
        >
          <Text style={tw`text-center text-white text-lg`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
