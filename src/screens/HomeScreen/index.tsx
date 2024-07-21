import { RootStackParamList } from '@/../App';
import NavOptions from '@/components/NavOptions';
import { setDestination, setOrigin } from '@/uberSlice';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { RouteProp } from '@react-navigation/native';

import { Image, SafeAreaView, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import tw from 'twrnc';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;

type DetailScreenProps = {
  route: DetailScreenRouteProp;
};

const HomeScreen = ({ route }: DetailScreenProps) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
          source={{ uri: 'https://links.papareact.com/gzs' }}
        />
        <View>
          <GooglePlacesAutocomplete
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                backgroundColor: 'white',
                paddingHorizontal: 16,
                height: 50,
                fontSize: 16,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                marginBottom: 10,
              },
            }}
            enablePoweredByContainer={false}
            minLength={2}
            placeholder='Where from ?'
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  location: details?.geometry.location,
                  description: data.description,
                })
              );
              dispatch(setDestination(null));
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
        <NavOptions />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
