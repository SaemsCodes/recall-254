
declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
  }

  namespace google {
    namespace maps {
      class Map {
        constructor(mapDiv: HTMLElement, opts?: MapOptions);
        setMapTypeId(mapTypeId: MapTypeId): void;
        setCenter(latlng: LatLng | LatLngLiteral): void;
        setZoom(zoom: number): void;
        addListener(eventName: string, handler: Function): MapsEventListener;
      }

      interface MapOptions {
        center?: LatLng | LatLngLiteral;
        zoom?: number;
        mapTypeId?: MapTypeId;
        styles?: MapTypeStyle[];
      }

      interface LatLngLiteral {
        lat: number;
        lng: number;
      }

      class LatLng {
        constructor(lat: number, lng: number);
        lat(): number;
        lng(): number;
      }

      class Marker {
        constructor(opts?: MarkerOptions);
        setMap(map: Map | null): void;
        addListener(eventName: string, handler: Function): MapsEventListener;
      }

      interface MarkerOptions {
        position?: LatLng | LatLngLiteral;
        map?: Map;
        title?: string;
        icon?: Icon | string | Symbol;
      }

      interface Icon {
        path: SymbolPath | string;
        scale?: number;
        fillColor?: string;
        fillOpacity?: number;
        strokeColor?: string;
        strokeWeight?: number;
      }

      enum SymbolPath {
        CIRCLE = 0,
        FORWARD_CLOSED_ARROW = 1,
        FORWARD_OPEN_ARROW = 2,
        BACKWARD_CLOSED_ARROW = 3,
        BACKWARD_OPEN_ARROW = 4
      }

      enum MapTypeId {
        HYBRID = 'hybrid',
        ROADMAP = 'roadmap',
        SATELLITE = 'satellite',
        TERRAIN = 'terrain'
      }

      interface MapTypeStyle {
        featureType?: string;
        elementType?: string;
        stylers?: MapTypeStyler[];
      }

      interface MapTypeStyler {
        color?: string;
        lightness?: number;
        saturation?: number;
        gamma?: number;
        invert_lightness?: boolean;
        visibility?: string;
        weight?: number;
      }

      interface MapsEventListener {
        remove(): void;
      }
    }
  }
}

export {};
