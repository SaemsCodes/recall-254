
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, FileText, Shield, MapPin, TrendingUp, BarChart3, Scale, Search } from 'lucide-react';
import ModernHeader from '@/components/ModernHeader';
import ModernFooter from '@/components/ModernFooter';
import WardSearchInterface from '@/components/WardSearchInterface';
import KenyaHeatMap from '@/components/KenyaHeatMap';
import SimplifiedSignatureFlow from '@/components/SimplifiedSignatureFlow';
import EnhancedPetitionDashboard from '@/components/EnhancedPetitionDashboard';
import LegalRepository from '@/components/LegalRepository';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [petitionStats, setPetitionStats] = useState({
    totalSignatures: 15342,
    validSignatures: 14876,
    wardsCovered: 7,
    totalWards: 12,
    complianceScore: 67,
    activePetitions: 3
  });

  useEffect(() => {
    // Initialize real-time data fetching
    fetchPetitionStats();
    const interval = setInterval(fetchPetitionStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchPetitionStats = async () => {
    try {
      console.log('Fetching petition stats...');
      // Mock stats for demonstration
      setPetitionStats(prev => ({
        ...prev,
        totalSignatures: prev.totalSignatures + Math.floor(Math.random() * 10),
      }));
    } catch (error) {
      console.error('Failed to fetch petition stats:', error);
    }
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Active Petitions', icon: Users },
    { id: 'search', label: 'Search Wards', icon: Search },
    { id: 'sign', label: 'Sign Petition', icon: FileText },
    { id: 'map', label: 'Electoral Map', icon: MapPin },
    { id: 'legal', label: 'Legal Framework', icon: Scale }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-white">
      <ModernHeader />

      {/* Hero Section - Minimalistic */}
      <section className="bg-gradient-to-br from-green-50/40 via-white to-green-50/20 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-green-900 mb-3">
            Your Constitution. Your Power.
          </h2>
          <p className="text-lg text-green-700 mb-8 max-w-2xl mx-auto">
            Exercise your constitutional right to hold MPs accountable through legally compliant digital recall petitions.
          </p>
          
          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <Card className="border-green-200 hover:border-green-300 transition-all cursor-pointer hover:shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Scale className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-900 mb-2">Legal Grounds</h3>
                <p className="text-sm text-green-700">Article 104 violations with documented evidence</p>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 hover:border-green-300 transition-all cursor-pointer hover:shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-900 mb-2">Collect Signatures</h3>
                <p className="text-sm text-green-700">30% of registered voters with KICA-certified signatures</p>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 hover:border-green-300 transition-all cursor-pointer hover:shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-900 mb-2">IEBC Review</h3>
                <p className="text-sm text-green-700">Official recall election within 90 days</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Live Statistics - Modern Minimal */}
      <section className="bg-white/50 backdrop-blur-sm py-8 border-y border-green-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="border-green-200/50 bg-gradient-to-br from-green-50/30 to-white">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xl font-bold text-green-800">{petitionStats.totalSignatures.toLocaleString()}</p>
                <p className="text-xs text-green-600">Total Signatures</p>
              </CardContent>
            </Card>

            <Card className="border-green-200/50 bg-gradient-to-br from-green-50/30 to-white">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xl font-bold text-green-800">{petitionStats.validSignatures.toLocaleString()}</p>
                <p className="text-xs text-green-600">Verified</p>
              </CardContent>
            </Card>

            <Card className="border-green-200/50 bg-gradient-to-br from-green-50/30 to-white">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xl font-bold text-green-800">{petitionStats.wardsCovered}/{petitionStats.totalWards}</p>
                <p className="text-xs text-green-600">Wards</p>
              </CardContent>
            </Card>

            <Card className="border-green-200/50 bg-gradient-to-br from-green-50/30 to-white">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xl font-bold text-green-800">{petitionStats.complianceScore}%</p>
                <p className="text-xs text-green-600">Compliant</p>
              </CardContent>
            </Card>

            <Card className="border-green-200/50 bg-gradient-to-br from-green-50/30 to-white">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xl font-bold text-green-800">{petitionStats.activePetitions}</p>
                <p className="text-xs text-green-600">Active</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Application Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs - Ghost Design */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 transition-all ${
                  activeTab === item.id 
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-md' 
                    : 'text-green-700 hover:bg-green-50 hover:text-green-800'
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
          {activeTab === 'search' && <WardSearchInterface />}
          {activeTab === 'sign' && <SimplifiedSignatureFlow />}
          {activeTab === 'map' && <KenyaHeatMap />}
          {activeTab === 'legal' && <LegalRepository />}
        </div>
      </div>

      <ModernFooter />
    </div>
  );
};

export default Index;
