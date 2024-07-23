import { MapStackParamList } from '@/screens/MapScreen';
import { setDestination } from '@/uberSlice';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import tw from 'twrnc';
import NavFavorites from '../NavFavorites';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<MapStackParamList>>();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Leonardo</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            styles={styles}
            enablePoweredByContainer={false}
            minLength={2}
            placeholder='Where to ?'
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details?.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate('RideOptionsCard');
            }}
            fetchDetails={true}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
          />
        </View>
        <NavFavorites />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly py-3 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          style={tw`flex-row bg-black w-24 px-4 py-3 rounded-full gap-3`}
          onPress={() => navigation.navigate('RideOptionsCard')}
        >
          <FontAwesome
            name='car'
            color='white'
            size={16}
          />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex flex-row w-24 px-4 py-3 rounded-full gap-3`}
        >
          <Ionicons
            name='fast-food-outline'
            color='black'
            size={16}
          />
          <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});

export default NavigateCard;
