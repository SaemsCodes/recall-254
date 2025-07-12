
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, MapPin, Users, FileText, Shield, Phone, Smartphone, Scale, Clock } from 'lucide-react';
import ConstitutionalHeader from '@/components/ConstitutionalHeader';
import EnhancedPetitionDashboard from '@/components/EnhancedPetitionDashboard';
import EnhancedSignatureFlow from '@/components/EnhancedSignatureFlow';
import LegalRepository from '@/components/LegalRepository';
import WardDistributionMap from '@/components/WardDistributionMap';
import ComplianceChecker from '@/components/ComplianceChecker';
import CSPIntegration from '@/components/CSPIntegration';
import EvidenceManager from '@/components/EvidenceManager';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [petitionStats, setPetitionStats] = useState({
    totalSignatures: 15342,
    validSignatures: 14876,
    wardsCovered: 7,
    totalWards: 12,
    complianceScore: 67
  });

  useEffect(() => {
    // Initialize real-time data fetching
    fetchPetitionStats();
    const interval = setInterval(fetchPetitionStats, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchPetitionStats = async () => {
    try {
      const response = await fetch('/api/petition-stats');
      if (response.ok) {
        const data = await response.json();
        setPetitionStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch petition stats:', error);
    }
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Petition Dashboard', icon: Users },
    { id: 'sign', label: 'Sign Petition', icon: FileText },
    { id: 'legal', label: 'Legal Framework', icon: Scale },
    { id: 'evidence', label: 'Evidence Manager', icon: Shield },
    { id: 'compliance', label: 'Compliance Check', icon: CheckCircle },
    { id: 'map', label: 'Ward Distribution', icon: MapPin }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <ConstitutionalHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-kenya-green/10 via-white to-kenya-green/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="w-24 h-24 bg-kenya-green rounded-full flex items-center justify-center">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-kenya-black mb-4">
            Your Constitution. Your Power.
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Exercise your constitutional right to hold MPs accountable through legally compliant digital recall petitions. 
            Powered by KICA §83C certified signatures and IEBC integration.
          </p>
          
          {/* Constitutional Process Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <Card className="border-kenya-green/30 hover:border-kenya-green/60 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scale className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">1. Legal Grounds</h3>
                <p className="text-sm text-gray-600">Chapter 6 violations, fund misuse, or electoral crimes with documented evidence</p>
              </CardContent>
            </Card>
            
            <Card className="border-kenya-green/30 hover:border-kenya-green/60 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-kenya-green" />
                </div>
                <h3 className="font-bold text-lg mb-2">2. Collect Signatures</h3>
                <p className="text-sm text-gray-600">30% of registered voters across 50% of wards with CAK-certified digital signatures</p>
              </CardContent>
            </Card>
            
            <Card className="border-kenya-green/30 hover:border-kenya-green/60 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">3. Recall Vote</h3>
                <p className="text-sm text-gray-600">IEBC conducts official recall election within 90 days of petition submission</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center space-x-4">
            <Button 
              size="lg" 
              className="bg-kenya-green hover:bg-kenya-green/90 text-white px-8 py-3 text-lg"
              onClick={() => setActiveTab('dashboard')}
            >
              View Active Petitions
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-kenya-green text-kenya-green hover:bg-kenya-green/10 px-8 py-3 text-lg"
              onClick={() => setActiveTab('legal')}
            >
              Learn Legal Process
            </Button>
          </div>
        </div>
      </section>

      {/* Live Statistics */}
      <section className="bg-white py-12 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Card className="border-kenya-green/30 bg-gradient-to-br from-kenya-green/5 to-kenya-green/10">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-8 h-8 text-kenya-green" />
                  <Badge className="bg-kenya-green/20 text-kenya-green">Live</Badge>
                </div>
                <p className="text-2xl font-bold text-kenya-green">{petitionStats.totalSignatures.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Signatures</p>
              </CardContent>
            </Card>

            <Card className="border-kenya-red/30 bg-gradient-to-br from-kenya-red/5 to-kenya-red/10">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-8 h-8 text-kenya-red" />
                  <Badge className="bg-kenya-red/20 text-kenya-red">Verified</Badge>
                </div>
                <p className="text-2xl font-bold text-kenya-red">{petitionStats.validSignatures.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Valid Signatures</p>
              </CardContent>
            </Card>

            <Card className="border-kenya-black/30 bg-gradient-to-br from-gray-100 to-gray-200">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-between mb-2">
                  <MapPin className="w-8 h-8 text-kenya-black" />
                  <Badge className="bg-gray-200 text-kenya-black">Coverage</Badge>
                </div>
                <p className="text-2xl font-bold text-kenya-black">{petitionStats.wardsCovered}/{petitionStats.totalWards}</p>
                <p className="text-sm text-gray-600">Wards Covered</p>
              </CardContent>
            </Card>

            <Card className="border-green-500/30 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-between mb-2">
                  <Shield className="w-8 h-8 text-green-600" />
                  <Badge className="bg-green-200 text-green-800">Score</Badge>
                </div>
                <p className="text-2xl font-bold text-green-600">{petitionStats.complianceScore}%</p>
                <p className="text-sm text-gray-600">Compliance</p>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <Badge className="bg-blue-200 text-blue-800">Active</Badge>
                </div>
                <p className="text-2xl font-bold text-blue-600">3</p>
                <p className="text-sm text-gray-600">Active Petitions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Application Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "outline"}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 ${
                  activeTab === item.id 
                    ? 'bg-kenya-green hover:bg-kenya-green/90 text-white' 
                    : 'border-kenya-green/30 text-kenya-green hover:bg-kenya-green/10'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'dashboard' && <EnhancedPetitionDashboard />}
          {activeTab === 'sign' && <EnhancedSignatureFlow />}
          {activeTab === 'legal' && <LegalRepository />}
          {activeTab === 'evidence' && <EvidenceManager />}
          {activeTab === 'compliance' && <ComplianceChecker />}
          {activeTab === 'map' && <WardDistributionMap />}
        </div>
      </div>

      {/* Multi-Access Footer */}
      <footer className="bg-kenya-black text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center text-kenya-green">
                <Smartphone className="w-5 h-5 mr-2" />
                Smartphone Access
              </h3>
              <p className="text-gray-300 mb-4">Download our mobile app or visit this website on your smartphone for full features including biometric signatures.</p>
              <Button variant="outline" className="border-kenya-green text-kenya-green hover:bg-kenya-green/10">
                Download App
              </Button>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center text-kenya-red">
                <Phone className="w-5 h-5 mr-2" />
                Feature Phone (USSD)
              </h3>
              <p className="text-gray-300 mb-2">Dial <strong className="text-white">*483*58#</strong> to sign petitions using your feature phone.</p>
              <p className="text-sm text-gray-400">Works on all networks • No internet required</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-green-400">WhatsApp Integration</h3>
              <p className="text-gray-300 mb-2">Text <strong className="text-white">+254 700 RECALL</strong> for petition updates and signature tracking.</p>
              <p className="text-sm text-gray-400">Automated updates • Signature verification</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-400">Legal Compliance</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  <span>KICA §83C Certified</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  <span>IEBC API Integration</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  <span>CAK Licensed Providers</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  <span>ISO 27001 Compliant</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; 2024 PetaRecall Platform. Constitutional democracy through digital innovation.
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <Badge variant="outline" className="bg-kenya-green/20 text-kenya-green border-kenya-green">
                  CAK Licensed
                </Badge>
                <Badge variant="outline" className="bg-kenya-red/20 text-kenya-red border-kenya-red">
                  IEBC Integrated
                </Badge>
                <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                  ISO 27001 Compliant
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
