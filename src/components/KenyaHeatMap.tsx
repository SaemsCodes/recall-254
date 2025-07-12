
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, TrendingUp } from 'lucide-react';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

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
  const [map, setMap] = useState<any>(null);
  const [selectedCounty, setSelectedCounty] = useState<CountyData | null>(null);

  // Sample data for major counties (you can expand this with your full dataset)
  const kenyaCountyData: CountyData[] = [
    {
      county: "MOMBASA",
      lat: -4.0435,
      lng: 39.6682,
      voters: 93561,
      constituencies: [
        { name: "Changamwe", wards: ["port reitz", "kipevu", "airport", "changamwe", "chaani"], voters: 93561 },
        { name: "Jomvu", wards: ["jomvu kuu", "miritini", "mikindani"], voters: 75085 },
        { name: "Kisauni", wards: ["mjambere", "junda", "bamburi", "mwakirunge", "mtopanga", "magogoni", "shanzu"], voters: 135276 }
      ]
    },
    {
      county: "NAIROBI",
      lat: -1.2921,
      lng: 36.8219,
      voters: 2500000,
      constituencies: [
        { name: "Westlands", wards: ["kitisuru", "parklands/highridge", "karura", "kangemi", "mountain view"], voters: 250000 },
        { name: "Dagoretti North", wards: ["kilimani", "kawangware", "gatina", "kileleshwa", "kabiro"], voters: 180000 },
        { name: "Langata", wards: ["karen", "nairobi west", "mugumoini", "south c", "nyayo highrise"], voters: 220000 }
      ]
    },
    {
      county: "KIAMBU",
      lat: -1.0314,
      lng: 36.8685,
      voters: 79860,
      constituencies: [
        { name: "Gatundu South", wards: ["kiamwangi", "kiganjo", "ndarugu", "ngenda"], voters: 79860 },
        { name: "Thika Town", wards: ["township", "kamenu", "hospital", "gatuanyaga", "ngoliba"], voters: 156018 },
        { name: "Ruiru", wards: ["gitothua", "biashara", "gatongora", "kahawa sukari", "kahawa wendani"], voters: 172088 }
      ]
    },
    {
      county: "NAKURU",
      lat: -0.3031,
      lng: 36.0800,
      voters: 77027,
      constituencies: [
        { name: "Nakuru Town East", wards: ["biashara", "kivumbini", "flamingo", "menengai", "nakuru east"], voters: 125551 },
        { name: "Nakuru Town West", wards: ["barut", "london", "kaptembwo", "kapkures", "rhoda", "shaabab"], voters: 112127 },
        { name: "Naivasha", wards: ["biashara", "hells gate", "lakeview", "maai-mahiu", "maiella"], voters: 157128 }
      ]
    },
    {
      county: "KISUMU",
      lat: -0.1022,
      lng: 34.7617,
      voters: 93177,
      constituencies: [
        { name: "Kisumu East", wards: ["kajulu", "kolwa east", "manyatta 'b'", "nyalenda 'a'", "kolwa central"], voters: 93177 },
        { name: "Kisumu West", wards: ["south west kisumu", "central kisumu", "kisumu north", "west kisumu"], voters: 82927 },
        { name: "Kisumu Central", wards: ["railways", "migosi", "shaurimoyo kaloleni", "market milimani"], voters: 130149 }
      ]
    }
  ];

  useEffect(() => {
    loadGoogleMaps();
  }, []);

  const loadGoogleMaps = () => {
    if (window.google) {
      initializeMap();
      return;
    }

    window.initMap = initializeMap;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=visualization&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const mapOptions = {
      zoom: 6,
      center: { lat: -0.0236, lng: 37.9062 }, // Center of Kenya
      mapTypeId: window.google.maps.MapTypeId.TERRAIN,
      styles: [
        {
          featureType: "all",
          elementType: "geometry.fill",
          stylers: [{ color: "#f0f5f0" }]
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [{ color: "#d4e8d4" }]
        }
      ]
    };

    const googleMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(googleMap);

    // Create heatmap data
    const heatmapData = kenyaCountyData.map(county => ({
      location: new window.google.maps.LatLng(county.lat, county.lng),
      weight: Math.sqrt(county.voters / 10000) // Adjust weight scaling
    }));

    // Add heatmap layer
    const heatmap = new window.google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      map: googleMap,
      gradient: [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
      ],
      radius: 50,
      opacity: 0.7
    });

    // Add markers for each county
    kenyaCountyData.forEach(county => {
      const marker = new window.google.maps.Marker({
        position: { lat: county.lat, lng: county.lng },
        map: googleMap,
        title: `${county.county}: ${county.voters.toLocaleString()} voters`,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#006600',
          fillOpacity: 0.8,
          strokeColor: '#004400',
          strokeWeight: 2,
          scale: Math.sqrt(county.voters / 50000) + 5
        }
      });

      marker.addListener('click', () => {
        setSelectedCounty(county);
        googleMap.setCenter({ lat: county.lat, lng: county.lng });
        googleMap.setZoom(9);
      });
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-900">
            <MapPin className="w-5 h-5 mr-2" />
            Kenya Electoral Heat Map
          </CardTitle>
          <p className="text-green-700 text-sm">
            Interactive map showing voter distribution across Kenyan counties with ward-level data
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Container */}
            <div className="lg:col-span-2">
              <div 
                ref={mapRef} 
                className="w-full h-96 rounded-lg border border-green-200 bg-green-50"
                style={{ minHeight: '400px' }}
              >
                {!window.google && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
                      <p className="text-green-600">Loading map...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* County Details Panel */}
            <div className="space-y-4">
              {selectedCounty ? (
                <Card className="border-green-200 bg-green-50/50">
                  <CardHeader>
                    <CardTitle className="text-green-900">{selectedCounty.county}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-green-700">Total Voters</span>
                      <Badge className="bg-green-100 text-green-800">
                        {selectedCounty.voters.toLocaleString()}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">Constituencies</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {selectedCounty.constituencies.map((constituency, index) => (
                          <div key={index} className="bg-white rounded p-2 border border-green-100">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-green-800">{constituency.name}</span>
                              <span className="text-sm text-green-600">
                                {constituency.voters.toLocaleString()}
                              </span>
                            </div>
                            <div className="text-xs text-green-600">
                              {constituency.wards.length} wards: {constituency.wards.slice(0, 3).join(', ')}
                              {constituency.wards.length > 3 && `... +${constituency.wards.length - 3} more`}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-green-200 bg-green-50/50">
                  <CardContent className="text-center py-8">
                    <MapPin className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <h3 className="text-green-900 font-semibold mb-2">Select a County</h3>
                    <p className="text-green-600 text-sm">
                      Click on any county marker to view detailed constituency and ward information
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Legend */}
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900 text-sm">Map Legend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-red-600"></div>
                    <span className="text-xs text-green-700">Voter Density Heat Map</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-green-600 border-2 border-green-800"></div>
                    <span className="text-xs text-green-700">County Markers</span>
                  </div>
                  <p className="text-xs text-green-600 mt-2">
                    Marker size represents voter population. Click markers for details.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KenyaHeatMap;
