
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Users, 
  TrendingUp, 
  BarChart3, 
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface WardData {
  id: string;
  name: string;
  signatures: number;
  requiredSignatures: number;
  coordinates: [number, number];
  center: [number, number];
  population: number;
  status: 'adequate' | 'insufficient' | 'excellent';
}

interface Constituency {
  name: string;
  totalWards: number;
  validWards: number;
  totalSignatures: number;
  requiredSignatures: number;
}

const WardDistributionMap = () => {
  const [wardData, setWardData] = useState<WardData[]>([]);
  const [selectedWard, setSelectedWard] = useState<WardData | null>(null);
  const [constituency, setConstituency] = useState<Constituency>({
    name: 'Nairobi Central',
    totalWards: 20,
    validWards: 12,
    totalSignatures: 8750,
    requiredSignatures: 15000
  });
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadWardData();
  }, []);

  const loadWardData = async () => {
    setIsLoading(true);
    
    // Simulate loading ward data from IEBC API
    const mockWardData: WardData[] = [
      {
        id: 'ward_001',
        name: 'Ziwani',
        signatures: 890,
        requiredSignatures: 750,
        coordinates: [36.8219, -1.2921],
        center: [36.8219, -1.2921],
        population: 25000,
        status: 'excellent'
      },
      {
        id: 'ward_002',
        name: 'Kariokor',
        signatures: 650,
        requiredSignatures: 600,
        coordinates: [36.8319, -1.2821],
        center: [36.8319, -1.2821],
        population: 20000,
        status: 'adequate'
      },
      {
        id: 'ward_003',
        name: 'Ngara',
        signatures: 420,
        requiredSignatures: 650,
        coordinates: [36.8419, -1.2721],
        center: [36.8419, -1.2721],
        population: 18000,
        status: 'insufficient'
      },
      {
        id: 'ward_004',
        name: 'Landhies',
        signatures: 780,
        requiredSignatures: 700,
        coordinates: [36.8519, -1.2621],
        center: [36.8519, -1.2621],
        population: 22000,
        status: 'excellent'
      },
      {
        id: 'ward_005',
        name: 'Nairobi Central',
        signatures: 950,
        requiredSignatures: 800,
        coordinates: [36.8119, -1.3021],
        center: [36.8119, -1.3021],
        population: 28000,
        status: 'excellent'
      }
    ];

    setTimeout(() => {
      setWardData(mockWardData);
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'adequate': return 'bg-yellow-500';
      case 'insufficient': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'adequate': return <TrendingUp className="w-4 h-4 text-yellow-600" />;
      case 'insufficient': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <MapPin className="w-4 h-4 text-gray-600" />;
    }
  };

  const wardDistributionValid = constituency.validWards >= Math.ceil(constituency.totalWards * 0.5);
  const signatureThresholdMet = wardData.filter(ward => 
    ward.signatures >= ward.requiredSignatures * 0.15
  ).length >= Math.ceil(constituency.totalWards * 0.5);

  return (
    <div className="space-y-6">
      {/* Ward Distribution Overview */}
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center text-green-800">
            <MapPin className="w-5 h-5 mr-2" />
            Ward Distribution Analysis
          </CardTitle>
          <CardDescription className="text-green-600">
            Real-time geographic distribution of petition signatures across {constituency.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{constituency.validWards}</div>
              <div className="text-sm text-gray-600">Valid Wards</div>
              <div className="text-xs text-gray-500">of {constituency.totalWards} total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((constituency.validWards / constituency.totalWards) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Coverage</div>
              <div className="text-xs text-gray-500">50% required</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {wardData.filter(w => w.status === 'excellent').length}
              </div>
              <div className="text-sm text-gray-600">Excellent</div>
              <div className="text-xs text-gray-500">wards performing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {wardData.filter(w => w.status === 'insufficient').length}
              </div>
              <div className="text-sm text-gray-600">Need Focus</div>
              <div className="text-xs text-gray-500">require attention</div>
            </div>
          </div>

          {/* Compliance Status */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Legal Compliance Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Ward Distribution Requirement</span>
                <div className="flex items-center">
                  {wardDistributionValid ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-green-600 font-semibold">COMPLIANT</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                      <span className="text-red-600 font-semibold">NON-COMPLIANT</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Signature Threshold (15% per ward)</span>
                <div className="flex items-center">
                  {signatureThresholdMet ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-green-600 font-semibold">COMPLIANT</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-yellow-500 mr-2" />
                      <span className="text-yellow-600 font-semibold">IN PROGRESS</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Map Visualization */}
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center text-blue-800">
              <BarChart3 className="w-5 h-5 mr-2" />
              Geographic Heat Map
            </CardTitle>
            <CardDescription className="text-blue-600">
              Visual representation of signature density by ward
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div 
              ref={mapRef}
              className="relative bg-gray-100 rounded-lg overflow-hidden"
              style={{ height: '400px' }}
            >
              {/* Simulated Map Interface */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 z-10">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs">Excellent (>120%)</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs">Adequate (100-120%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs">Insufficient (<100%)</span>
                  </div>
                </div>

                {/* Ward Markers */}
                {wardData.map((ward, index) => (
                  <div
                    key={ward.id}
                    className={`absolute w-6 h-6 rounded-full cursor-pointer transform -translate-x-3 -translate-y-3 ${
                      getStatusColor(ward.status)
                    } opacity-80 hover:opacity-100 hover:scale-110 transition-all`}
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${30 + (index % 3) * 20}%`
                    }}
                    onClick={() => setSelectedWard(ward)}
                    title={`${ward.name}: ${ward.signatures} signatures`}
                  >
                    <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                      {ward.signatures > 999 ? '1k+' : ward.signatures}
                    </div>
                  </div>
                ))}

                {/* Geographic Labels */}
                <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-2">
                  <div className="text-xs font-semibold text-gray-700">{constituency.name}</div>
                  <div className="text-xs text-gray-500">Nairobi County</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <Button
                onClick={loadWardData}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh Data</span>
              </Button>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ward Details Panel */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Ward Performance Details
            </CardTitle>
            <CardDescription>
              Detailed analytics for selected ward or overall summary
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {selectedWard ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{selectedWard.name} Ward</h3>
                  <Badge className={`${getStatusColor(selectedWard.status)} text-white`}>
                    {selectedWard.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Current Signatures</div>
                    <div className="text-xl font-bold text-green-600">{selectedWard.signatures}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Required (15%)</div>
                    <div className="text-xl font-bold">{Math.ceil(selectedWard.requiredSignatures * 0.15)}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Population</div>
                    <div className="text-xl font-bold">{selectedWard.population.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Participation</div>
                    <div className="text-xl font-bold">
                      {((selectedWard.signatures / selectedWard.population) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to 15% threshold</span>
                    <span>{Math.round((selectedWard.signatures / (selectedWard.requiredSignatures * 0.15)) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        selectedWard.signatures >= selectedWard.requiredSignatures * 0.15 
                          ? 'bg-green-500' 
                          : 'bg-yellow-500'
                      }`}
                      style={{ 
                        width: `${Math.min(100, (selectedWard.signatures / (selectedWard.requiredSignatures * 0.15)) * 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Recommendations</h4>
                  {selectedWard.status === 'insufficient' && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                      Focus campaigning efforts in this ward. Consider community outreach programs 
                      and local leader engagement to increase participation.
                    </div>
                  )}
                  {selectedWard.status === 'adequate' && (
                    <div className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                      Good progress! Continue current strategies and consider expanding 
                      to nearby areas for optimal coverage.
                    </div>
                  )}
                  {selectedWard.status === 'excellent' && (
                    <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                      Excellent performance! This ward can serve as a model for others. 
                      Consider volunteer recruitment from this area.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a Ward</h3>
                <p className="text-gray-500">Click on a ward marker in the map to view detailed analytics</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Ward Performance Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Ward Performance Summary
          </CardTitle>
          <CardDescription>
            Complete overview of signature collection progress across all wards
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Ward Name</th>
                  <th className="text-right py-2">Signatures</th>
                  <th className="text-right py-2">Required (15%)</th>
                  <th className="text-right py-2">Progress</th>
                  <th className="text-center py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {wardData.map((ward) => (
                  <tr key={ward.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium">{ward.name}</td>
                    <td className="text-right py-3">{ward.signatures.toLocaleString()}</td>
                    <td className="text-right py-3">{Math.ceil(ward.requiredSignatures * 0.15)}</td>
                    <td className="text-right py-3">
                      {Math.round((ward.signatures / (ward.requiredSignatures * 0.15)) * 100)}%
                    </td>
                    <td className="text-center py-3">
                      <div className="flex items-center justify-center">
                        {getStatusIcon(ward.status)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WardDistributionMap;
