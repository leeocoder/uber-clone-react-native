import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from '@/uberSlice';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useEffect, useRef } from 'react';

import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import tw from 'twrnc';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef<MapView>(null);
  const dispatch = useDispatch();

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

  useEffect(() => {
    // if (origin && destination) {
    //   fetch(
    //     `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.location.lat},${origin.location.lng}&destinations=${destination.location.lat},${destination.location.lng}&key=${GOOGLE_MAPS_APIKEY}`
    //   )
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      const URL: string = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`;
      const response = await fetch(URL);
      const json = await response.json();
      const [elements] = json.rows;
      const [data] = elements.elements;
      dispatch(setTravelTimeInformation(data));
    };
    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

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
