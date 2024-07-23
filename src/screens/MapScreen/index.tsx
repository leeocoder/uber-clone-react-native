import Map from '@/components/Map';
import NavigateCard from '@/components/NavigateCard';
import RideOptionsCard from '@/components/RideOptionsCard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../../App';

export type MapStackParamList = {
  NavigateCard: undefined;
  RideOptionsCard: undefined;
};

const MapScreen = () => {
  const { Navigator, Screen } = createNativeStackNavigator<MapStackParamList>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View>
      <TouchableOpacity
        style={tw`absolute top-16 left-8 bg-gray-100 z-50 p-3 rounded-full shadow-lg`}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Ionicons
          name='menu'
          size={24}
        />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <Navigator>
          <Screen
            name='NavigateCard'
            component={NavigateCard}
            options={{ headerShown: false }}
          />
          <Screen
            name='RideOptionsCard'
            component={RideOptionsCard}
            options={{ headerShown: false }}
          />
        </Navigator>
      </View>
    </View>
  );
};

export default MapScreen;
