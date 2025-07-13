
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, Users } from 'lucide-react';

interface CountyData {
  county: string;
  lat: number;
  lng: number;
  voters: number;
  constituencies: Array<{
    name: string;
    wards: string[];
    voters: number;
  }>;
}

const KenyaHeatMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState<CountyData | null>(null);

  // Real data from the provided CSV
  const countyData: CountyData[] = [
    {
      county: "MOMBASA",
      lat: -4.0435,
      lng: 39.6682,
      voters: 641913,
      constituencies: [
        { name: "Changamwe", wards: ["port reitz", "kipevu", "airport", "changamwe", "chaani"], voters: 93561 },
        { name: "Jomvu", wards: ["jomvu kuu", "miritini", "mikindani"], voters: 75085 },
        { name: "Kisauni", wards: ["mjambere", "junda", "bamburi", "mwakirunge", "mtopanga", "magogoni", "shanzu"], voters: 135276 },
        { name: "Nyali", wards: ["frere town", "ziwa la ng'ombe", "mkomani", "kongowea", "kadzandani"], voters: 124253 },
        { name: "Likoni", wards: ["mtongwe", "shika adabu", "bofu", "likoni", "timbwani"], voters: 94764 },
        { name: "Mvita", wards: ["mji wa kale/makadara", "tudor", "tononoka", "shimanzi/ganjoni", "majengo"], voters: 118974 }
      ]
    },
    {
      county: "NAIROBI",
      lat: -1.2864,
      lng: 36.8172,
      voters: 2500000,
      constituencies: [
        { name: "Westlands", wards: ["kitisuru", "parklands/highridge", "karura", "kangemi", "mountain view"], voters: 160739 },
        { name: "Dagoretti North", wards: ["kilimani", "kawangware", "gatina", "kileleshwa", "kabiro"], voters: 157659 },
        { name: "Starehe", wards: ["nairobi central", "ngara", "ziwani/kariokor", "pangani", "landimawe", "nairobi south"], voters: 169575 }
      ]
    },
    {
      county: "KIAMBU",
      lat: -1.0314,
      lng: 36.8685,
      voters: 1300000,
      constituencies: [
        { name: "Gatundu South", wards: ["kiamwangi", "kiganjo", "ndarugu", "ngenda"], voters: 79860 },
        { name: "Ruiru", wards: ["gitothua", "biashara", "gatongora", "kahawa sukari", "kahawa wendani", "kiuu", "mwiki", "mwihoko"], voters: 172088 }
      ]
    }
  ];

  const loadGoogleMaps = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      // Using a placeholder API key - user needs to replace this
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBGne0aJNOqE8oa4Vc4HqZ8X5DZr4KX3hI&libraries=visualization&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      window.initMap = () => {
        resolve();
      };
      
      script.onerror = () => reject(new Error('Failed to load Google Maps'));
      document.head.appendChild(script);
    });
  };

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    clearMarkers();

    try {
      const map = new google.maps.Map(mapRef.current, {
        zoom: 6,
        center: { lat: -1.2921, lng: 36.8219 },
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [{ color: "#f5f5f5" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
          }
        ]
      });

      mapInstanceRef.current = map;

      countyData.forEach((county) => {
        const marker = new google.maps.Marker({
          position: { lat: county.lat, lng: county.lng },
          map: map,
          title: county.county,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: Math.sqrt(county.voters / 1000) * 2,
            fillColor: '#10b981',
            fillOpacity: 0.6,
            strokeColor: '#059669',
            strokeWeight: 2,
          }
        });

        marker.addListener('click', () => {
          setSelectedCounty(county);
        });

        markersRef.current.push(marker);
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const clearMarkers = () => {
    markersRef.current.forEach(marker => {
      if (marker && marker.setMap) {
        marker.setMap(null);
      }
    });
    markersRef.current = [];
  };

  useEffect(() => {
    const setupMap = async () => {
      try {
        await loadGoogleMaps();
        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to load Google Maps:', error);
      }
    };

    setupMap();

    return () => {
      clearMarkers();
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      initializeMap();
    }
  }, [isLoaded]);

  return (
    <div className="space-y-6">
      <Card className="border-green-200 bg-gradient-to-br from-green-50/50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center text-green-900">
            <MapPin className="w-5 h-5 mr-2" />
            Kenya Electoral Map
          </CardTitle>
          <CardDescription className="text-green-700">
            Interactive map showing voter distribution across Kenyan counties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div 
                ref={mapRef}
                className="w-full h-96 rounded-lg border border-green-200 bg-gray-100 relative"
                style={{ minHeight: '400px' }}
              >
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-green-50/80 rounded-lg">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
                      <p className="text-green-600">Loading map...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Map Legend</h4>
                <div className="space-y-2 text-sm text-green-700">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500/60 border-2 border-green-600 mr-2"></div>
                    <span>County markers (size = voter count)</span>
                  </div>
                  <div className="text-xs text-green-600">
                    Click on markers to view county details
                  </div>
                </div>
              </div>

              {selectedCounty && (
                <Card className="border-green-200 bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-green-900">
                      {selectedCounty.county}
                    </CardTitle>
                    <div className="flex items-center text-green-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="font-medium">{selectedCounty.voters.toLocaleString()}</span>
                      <span className="text-sm ml-1">registered voters</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-green-800 mb-2">Constituencies</h5>
                      <div className="space-y-2">
                        {selectedCounty.constituencies.map((constituency, index) => (
                          <div key={index} className="bg-green-50 p-3 rounded border border-green-100">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium text-green-900">{constituency.name}</span>
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                {constituency.voters.toLocaleString()}
                              </Badge>
                            </div>
                            <div className="text-xs text-green-600">
                              {constituency.wards.length} wards: {constituency.wards.slice(0, 3).join(', ')}
                              {constituency.wards.length > 3 && ` +${constituency.wards.length - 3} more`}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  County Statistics
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center p-2 bg-white rounded border border-green-100">
                    <div className="font-bold text-green-800">{countyData.length}</div>
                    <div className="text-green-600">Counties</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded border border-green-100">
                    <div className="font-bold text-green-800">
                      {countyData.reduce((total, county) => total + county.constituencies.length, 0)}
                    </div>
                    <div className="text-green-600">Constituencies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KenyaHeatMap;
