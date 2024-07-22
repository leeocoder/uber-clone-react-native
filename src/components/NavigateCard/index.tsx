import { MapStackParamList } from '@/screens/MapScreen';
import { setDestination } from '@/uberSlice';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import tw from 'twrnc';
import NavFavorites from '../NavFavorites';

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
