import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapComponent = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/satellite/style.json?key=${import.meta.env.MAP_TILER_KEY}`, // ✅ USE style.json!
      center: [73.885, 12.899], // Mangalore (example)
      zoom: 14,
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: '1200px', height: '500px', borderRadius: '12px', marginTop: '1rem' }}
    />
  );
};

export default MapComponent;
