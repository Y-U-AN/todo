import React, { useEffect, useRef } from 'react';

const MapComponent = ({ location }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const pos = location ? { lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) } : { lat: -34.397, lng: 150.644 };

    const map = new window.google.maps.Map(mapRef.current, {
      center: pos,
      zoom: 4,
    });

    new window.google.maps.Marker({
      position: pos,
      map: map,
      title: "Location",
    });
  }, [location]);

  return <div ref={mapRef} style={{ height: '200px', width: '300px' }} />;
};

export default MapComponent;
