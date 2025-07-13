
declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
  }
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions);
      setCenter(latlng: LatLng | LatLngLiteral): void;
      getCenter(): LatLng;
      setZoom(zoom: number): void;
      getZoom(): number;
      setMapTypeId(mapTypeId: MapTypeId): void;
      addControl(control: any, position: ControlPosition): void;
      addListener(eventName: string, handler: Function): MapsEventListener;
      on(eventName: string, handler: Function): MapsEventListener;
      easeTo(options: { center: LatLng | LatLngLiteral; duration: number; easing: (n: number) => number }): void;
      setFog(options: any): void;
      remove(): void;
    }

    class Marker {
      constructor(opts?: MarkerOptions);
      setMap(map: Map | null): void;
      addListener(eventName: string, handler: Function): MapsEventListener;
    }

    class NavigationControl {
      constructor(opts?: NavigationControlOptions);
    }

    interface MapOptions {
      zoom?: number;
      center?: LatLng | LatLngLiteral;
      mapTypeId?: MapTypeId;
      styles?: MapTypeStyle[];
      projection?: string;
      pitch?: number;
    }

    interface MarkerOptions {
      position?: LatLng | LatLngLiteral;
      map?: Map;
      title?: string;
      icon?: Symbol | Icon | string;
    }

    interface NavigationControlOptions {
      visualizePitch?: boolean;
    }

    interface LatLng {
      lat(): number;
      lng(): number;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface Symbol {
      path: SymbolPath;
      scale?: number;
      fillColor?: string;
      fillOpacity?: number;
      strokeColor?: string;
      strokeWeight?: number;
    }

    interface Icon {
      url: string;
      scaledSize?: Size;
    }

    interface Size {
      width: number;
      height: number;
    }

    interface MapTypeStyle {
      featureType?: string;
      elementType?: string;
      stylers?: Array<{ [key: string]: any }>;
    }

    interface MapsEventListener {
      remove(): void;
    }

    enum MapTypeId {
      HYBRID = 'hybrid',
      ROADMAP = 'roadmap',
      SATELLITE = 'satellite',
      TERRAIN = 'terrain',
    }

    enum SymbolPath {
      CIRCLE = 0,
      FORWARD_CLOSED_ARROW = 1,
      FORWARD_OPEN_ARROW = 2,
      BACKWARD_CLOSED_ARROW = 3,
      BACKWARD_OPEN_ARROW = 4,
    }

    enum ControlPosition {
      BOTTOM_CENTER = 0,
      BOTTOM_LEFT = 1,
      BOTTOM_RIGHT = 2,
      LEFT_BOTTOM = 3,
      LEFT_CENTER = 4,
      LEFT_TOP = 5,
      RIGHT_BOTTOM = 6,
      RIGHT_CENTER = 7,
      RIGHT_TOP = 8,
      TOP_CENTER = 9,
      TOP_LEFT = 10,
      TOP_RIGHT = 11,
    }
  }
}

export {};
