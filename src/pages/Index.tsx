
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, MapPin, Users, FileText, Shield, Phone, Smartphone } from 'lucide-react';
import PetitionDashboard from '@/components/PetitionDashboard';
import SignatureCaptureForm from '@/components/SignatureCaptureForm';
import WardDistributionMap from '@/components/WardDistributionMap';
import ComplianceChecker from '@/components/ComplianceChecker';
import CSPIntegration from '@/components/CSPIntegration';
import EvidenceManager from '@/components/EvidenceManager';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [petitionStats, setPetitionStats] = useState({
    totalSignatures: 0,
    validSignatures: 0,
    wardsCovered: 0,
    totalWards: 0,
    complianceScore: 0
  });

  useEffect(() => {
    // Initialize real-time data fetching
    fetchPetitionStats();
  }, []);

  const fetchPetitionStats = async () => {
    try {
      const response = await fetch('/api/petition-stats');
      const data = await response.json();
      setPetitionStats(data);
    } catch (error) {
      console.error('Failed to fetch petition stats:', error);
    }
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Users },
    { id: 'sign', label: 'Sign Petition', icon: FileText },
    { id: 'evidence', label: 'Evidence Manager', icon: Shield },
    { id: 'compliance', label: 'Compliance Check', icon: CheckCircle },
    { id: 'map', label: 'Ward Distribution', icon: MapPin }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header with Kenyan Flag Colors */}
      <header className="bg-gradient-to-r from-green-600 via-red-600 to-black text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">MP Recall Platform</h1>
                <p className="text-green-100">Digital Democracy • Legally Compliant • Secure</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-white text-green-600 border-green-200">
                CAK Licensed
              </Badge>
              <Badge variant="outline" className="bg-white text-red-600 border-red-200">
                IEBC Integrated
              </Badge>
              <Badge variant="outline" className="bg-white text-black border-gray-200">
                ISO 27001
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Legal Disclaimer Banner */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="container mx-auto">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3" />
            <p className="text-sm text-yellow-800">
              <strong>Legal Notice:</strong> This platform complies with KICA Section 83C, CAK regulations, and the 
              <em> Katiba Institute v Attorney General</em> ruling. All signatures are cryptographically secured and legally binding.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Signatures</p>
                  <p className="text-2xl font-bold text-green-600">{petitionStats.totalSignatures.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Valid Signatures</p>
                  <p className="text-2xl font-bold text-red-600">{petitionStats.validSignatures.toLocaleString()}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Wards Covered</p>
                  <p className="text-2xl font-bold text-black">{petitionStats.wardsCovered}/{petitionStats.totalWards}</p>
                </div>
                <MapPin className="w-8 h-8 text-black" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Compliance Score</p>
                  <p className="text-2xl font-bold text-green-600">{petitionStats.complianceScore}%</p>
                </div>
                <Shield className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "outline"}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 ${
                  activeTab === item.id 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'border-green-200 text-green-600 hover:bg-green-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="space-y-8">
          {activeTab === 'dashboard' && <PetitionDashboard />}
          {activeTab === 'sign' && <SignatureCaptureForm />}
          {activeTab === 'evidence' && <EvidenceManager />}
          {activeTab === 'compliance' && <ComplianceChecker />}
          {activeTab === 'map' && <WardDistributionMap />}
        </div>
      </div>

      {/* Multi-Access Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Smartphone className="w-5 h-5 mr-2 text-green-400" />
                Smartphone Access
              </h3>
              <p className="text-gray-300">Download our mobile app or visit this website on your smartphone for full features.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-red-400" />
                Feature Phone (USSD)
              </h3>
              <p className="text-gray-300">Dial <strong>*483*58#</strong> to sign petitions using your feature phone.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">WhatsApp Integration</h3>
              <p className="text-gray-300">Text <strong>+254 700 RECALL</strong> for petition updates and signature tracking.</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MP Recall Platform. CAK Licensed • IEBC Integrated • ISO 27001 Compliant</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
