import Map from '@/components/Map';
import NavigateCard from '@/components/NavigateCard';
import RideOptionsCard from '@/components/RideOptionsCard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View } from 'react-native';
import tw from 'twrnc';

export type MapStackParamList = {
  NavigateCard: undefined;
  RideOptionsCard: undefined;
};

const MapScreen = () => {
  const { Navigator, Screen } = createNativeStackNavigator<MapStackParamList>();
  return (
    <View>
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
