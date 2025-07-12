
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Users, 
  FileText, 
  Shield,
  TrendingUp,
  Globe,
  Smartphone
} from 'lucide-react';

interface Petition {
  id: string;
  mpName: string;
  constituency: string;
  reason: string;
  status: 'active' | 'pending' | 'completed';
  signatures: number;
  requiredSignatures: number;
  wardsCovered: number;
  totalWards: number;
  createdDate: string;
  evidence: Evidence[];
  complianceScore: number;
}

interface Evidence {
  type: 'chapter6' | 'funds_mismanagement' | 'electoral_crime';
  description: string;
  verified: boolean;
  documentId: string;
}

const PetitionDashboard = () => {
  const [petitions, setPetitions] = useState<Petition[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPetition, setSelectedPetition] = useState<Petition | null>(null);

  useEffect(() => {
    fetchPetitions();
  }, []);

  const fetchPetitions = async () => {
    try {
      // Simulate API call - in real implementation, this would fetch from Supabase
      const mockPetitions: Petition[] = [
        {
          id: '1',
          mpName: 'Hon. John Doe',
          constituency: 'Nairobi Central',
          reason: 'Misappropriation of CDF funds and violation of Chapter 6 of the Constitution',
          status: 'active',
          signatures: 8750,
          requiredSignatures: 15000,
          wardsCovered: 12,
          totalWards: 20,
          createdDate: '2024-01-15',
          evidence: [
            {
              type: 'funds_mismanagement',
              description: 'Auditor General Report 2023/24 - CDF Misappropriation',
              verified: true,
              documentId: 'OAG-2024-001'
            },
            {
              type: 'chapter6',
              description: 'Ethics and Anti-Corruption Commission Report',
              verified: true,
              documentId: 'EACC-2024-015'
            }
          ],
          complianceScore: 92
        }
      ];
      
      setPetitions(mockPetitions);
      if (mockPetitions.length > 0) {
        setSelectedPetition(mockPetitions[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch petitions:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case 'chapter6': return <Shield className="w-4 h-4" />;
      case 'funds_mismanagement': return <AlertCircle className="w-4 h-4" />;
      case 'electoral_crime': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active Petitions List */}
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center text-green-800">
            <Users className="w-5 h-5 mr-2" />
            Active Recall Petitions
          </CardTitle>
          <CardDescription className="text-green-600">
            Ongoing petition campaigns for MP accountability
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {petitions.map((petition) => (
              <div
                key={petition.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedPetition?.id === petition.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
                onClick={() => setSelectedPetition(petition)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-lg">{petition.mpName}</h3>
                      <Badge className={`${getStatusColor(petition.status)} text-white`}>
                        {petition.status.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {petition.constituency}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{petition.reason}</p>
                    
                    {/* Progress Indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Signatures Progress</span>
                          <span className="text-sm text-gray-500">
                            {petition.signatures.toLocaleString()} / {petition.requiredSignatures.toLocaleString()}
                          </span>
                        </div>
                        <Progress 
                          value={(petition.signatures / petition.requiredSignatures) * 100} 
                          className="h-2"
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Ward Coverage</span>
                          <span className="text-sm text-gray-500">
                            {petition.wardsCovered} / {petition.totalWards} wards
                          </span>
                        </div>
                        <Progress 
                          value={(petition.wardsCovered / petition.totalWards) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4 text-right">
                    <div className="text-2xl font-bold text-green-600">{petition.complianceScore}%</div>
                    <div className="text-sm text-gray-500">Compliance</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Petition View */}
      {selectedPetition && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Evidence Documentation */}
          <Card className="border-red-200">
            <CardHeader className="bg-red-50">
              <CardTitle className="flex items-center text-red-800">
                <FileText className="w-5 h-5 mr-2" />
                Legal Evidence
              </CardTitle>
              <CardDescription className="text-red-600">
                Verified documentation supporting the recall petition
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {selectedPetition.evidence.map((evidence, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      {getEvidenceIcon(evidence.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium capitalize">
                          {evidence.type.replace('_', ' ')}
                        </span>
                        {evidence.verified ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{evidence.description}</p>
                      <Badge variant="outline" className="text-xs">
                        ID: {evidence.documentId}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Real-time Analytics */}
          <Card className="border-black">
            <CardHeader className="bg-gray-50">
              <CardTitle className="flex items-center text-black">
                <TrendingUp className="w-5 h-5 mr-2" />
                Real-time Analytics
              </CardTitle>
              <CardDescription className="text-gray-600">
                Live petition performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Signature Velocity */}
                <div>
                  <h4 className="font-medium mb-2">Signature Velocity</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last 24 hours</span>
                    <span className="font-semibold text-green-600">+247 signatures</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average per hour</span>
                    <span className="font-semibold">10.3 signatures</span>
                  </div>
                </div>

                {/* Geographic Distribution */}
                <div>
                  <h4 className="font-medium mb-2">Geographic Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Urban areas</span>
                      <span className="font-semibold">67%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Rural areas</span>
                      <span className="font-semibold">33%</span>
                    </div>
                  </div>
                </div>

                {/* Access Methods */}
                <div>
                  <h4 className="font-medium mb-2">Access Methods</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Smartphone className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="text-sm text-gray-600">Mobile App</span>
                      </div>
                      <span className="font-semibold">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 mr-2 text-green-500" />
                        <span className="text-sm text-gray-600">Web Platform</span>
                      </div>
                      <span className="font-semibold">35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm font-mono mr-2">*483*58#</span>
                        <span className="text-sm text-gray-600">USSD</span>
                      </div>
                      <span className="font-semibold">20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Legal Compliance Status */}
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center text-green-800">
            <Shield className="w-5 h-5 mr-2" />
            Legal Compliance Status
          </CardTitle>
          <CardDescription className="text-green-600">
            CAK, IEBC, and Constitutional compliance verification
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <h4 className="font-semibold">KICA Section 83C</h4>
              <p className="text-sm text-gray-600">Digital signature compliance verified</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <h4 className="font-semibold">CAK Licensed CSPs</h4>
              <p className="text-sm text-gray-600">Using approved signature providers</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <h4 className="font-semibold">IEBC Integration</h4>
              <p className="text-sm text-gray-600">Voter verification system active</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PetitionDashboard;
