import { selectDestination, selectOrigin } from '@/uberSlice';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useEffect, useRef } from 'react';

import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useSelector } from 'react-redux';
import tw from 'twrnc';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (mapRef?.current && origin && destination) {
      mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      });
      // mapRef.current.animateCamera({
      //   center: {
      //     latitude: destination.location.lat,
      //     longitude: destination.location.lng,
      //   },
      //   zoom: 15,
      // });
    }
  });

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType='mutedStandard'
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor='#000'
        />
      )}
      {origin?.location && (
        <Marker
          pinColor='#000'
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title='Origin'
          description={origin.description}
          identifier='origin'
        />
      )}

      {destination?.location && (
        <Marker
          pinColor='#000'
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title='Destination'
          description={destination.description}
          identifier='destination'
        />
      )}
    </MapView>
  );
};

export default Map;
