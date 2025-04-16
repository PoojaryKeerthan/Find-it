import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import axios from 'axios';

const Key = import.meta.env.VITE_MAP_TILER_KEY;

const MapComponent = ({ Location }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null); 

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const encodedLocation = encodeURIComponent(Location.trim());
        const res = await axios.get(
          `https://api.maptiler.com/geocoding/${encodedLocation}.json?key=${Key}`,
          { withCredentials: false }
        );
        console.log(res.data);
        
        const coords = res.data.features[0].center;

       
        if (!mapRef.current) {
          mapRef.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/hybrid/style.json?key=${Key}`,
            center: coords,
            zoom: 14,
          });

          mapRef.current.addControl(new maplibregl.NavigationControl(), 'top-right');

          new maplibregl.Marker()
            .setLngLat(coords)
            .addTo(mapRef.current);
        } else {
          mapRef.current.setCenter(coords);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    if (Location) getCoordinates();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [Location]);

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '500px', borderRadius: '12px', marginTop: '1rem' }}
    />
  );
};

export default MapComponent;
