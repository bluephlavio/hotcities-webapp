import React from 'react';
import mapboxgl from 'mapbox-gl';
import usePrevious from '@/hooks/usePrevious';
import { mapbox } from '@/config';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getLayer } from './helpers';
import styles from './Map.module.scss';

const { accessToken, mapstyle } = mapbox;

mapboxgl.accessToken = accessToken;

const Map = ({ center = [0, 0], zoom = 1, style = mapstyle, data }) => {
  const containerRef = React.useRef();

  const mapRef = React.useRef();

  const prevCenter = usePrevious(center);
  const prevZoom = usePrevious(zoom);

  React.useEffect(() => {
    const container = containerRef.current;
    mapRef.current = new mapboxgl.Map({
      container,
      style,
      zoom,
      center,
    });
  }, []);

  React.useEffect(() => {
    const map = mapRef.current;

    if (map && data) {
      map.on('load', () => {
        const layer = getLayer(data);
        map.addLayer(layer);
      });
    }
  }, [data]);

  React.useEffect(() => {
    if (prevCenter !== center || prevZoom !== zoom) {
      if (mapRef.current) {
        mapRef.current.flyTo({ center, zoom, speed: 0.3 });
      }
    }
  }, [center, zoom]);

  return <div className={styles.map} ref={containerRef} />;
};

export default Map;
