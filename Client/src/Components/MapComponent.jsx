import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import axios from 'axios';

const Key = import.meta.env.VITE_MAP_TILER_KEY;
const fallbackCoords = [74.855, 12.914]; // Default to Mangalore

const MapComponent = ({ Location }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const encodedLocation = encodeURIComponent(Location.trim());
        const res = await axios.get(
          `https://api.maptiler.com/geocoding/${encodedLocation}.json?key=${Key}`,
          { withCredentials: false }
        );

        const features = res.data.features;

        let coords = fallbackCoords;
        let isValid = false;

        if (features && features.length > 0) {
          const relevance = features[0].relevance ?? 1; // default to 1 if missing
          if (relevance >= 0.6) {
            coords = features[0].center;
            setWarning('');
            isValid = true;
          } else {
            setWarning('⚠️ The location entered is unclear. Showing approximate location.');
          }
        } else {
          setWarning('⚠️ Unable to find the location. Showing default location.');
        }

        // If first load
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
        setWarning('⚠️ There was an error locating the place. Showing fallback location.');
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
    <>
      {warning && (
        <p className="text-yellow-700 bg-yellow-100 border border-yellow-300 p-3 mb-2 rounded-lg text-sm">
          {warning}
        </p>
      )}
      <div
        ref={mapContainer}
        style={{ width: '100%', height: '500px', borderRadius: '12px', marginTop: '1rem' }}
      />
    </>
  );
};

export default MapComponent;
