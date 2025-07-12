import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Smartphone, 
  Phone,
  Key,
  Globe,
  Fingerprint,
  RefreshCw
} from 'lucide-react';

interface CSPProvider {
  id: string;
  name: string;
  type: 'advanced' | 'qualified';
  status: 'online' | 'offline' | 'maintenance';
  features: string[];
  authMethod: string;
  cost: string;
  responseTime: number;
  successRate: number;
  supportedDevices: string[];
  apiEndpoint: string;
  documentation: string;
}

interface SignatureSession {
  id: string;
  cspProvider: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  createdAt: string;
  expiresAt: string;
  signatureUrl?: string;
}

const CSPIntegration = () => {
  const [cspProviders, setCspProviders] = useState<CSPProvider[]>([]);
  const [activeSessions, setActiveSessions] = useState<SignatureSession[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [integrationStatus, setIntegrationStatus] = useState<any>({});

  const providers: CSPProvider[] = [
    {
      id: 'geda',
      name: 'GEDA LIMITED',
      type: 'advanced',
      status: 'online',
      features: ['Government Integration', 'API Authentication', 'Audit Trail', 'PKI Certificates'],
      authMethod: 'OAuth 2.0',
      cost: 'Free for civic petitions',
      responseTime: 250,
      successRate: 99.2,
      supportedDevices: ['Desktop', 'Mobile', 'Tablet'],
      apiEndpoint: 'https://api.geda.co.ke/v1/esign',
      documentation: 'https://docs.geda.co.ke/digital-signatures'
    },
    {
      id: 'tendaworld',
      name: 'TENDAWORLD LTD',
      type: 'qualified',
      status: 'online',
      features: ['USSD Support', 'Mobile SDK', 'Biometric Verification', 'SMS Integration'],
      authMethod: 'API Key + HMAC',
      cost: 'Free (500 signatures/month)',
      responseTime: 180,
      successRate: 98.7,
      supportedDevices: ['Smartphone', 'Feature Phone', 'USSD'],
      apiEndpoint: 'https://api.tenda.world/v2/sign',
      documentation: 'https://docs.tendaworld.com/api'
    },
    {
      id: 'emudhra',
      name: 'Emudhra Technologies',
      type: 'qualified',
      status: 'online',
      features: ['PKI Certificates', 'Global Standards', 'Cross-border Recognition', 'Hardware Tokens'],
      authMethod: 'Client SSL Certificate',
      cost: 'NGO Subsidized (Ksh 50/signature)',
      responseTime: 320,
      successRate: 99.8,
      supportedDevices: ['Desktop', 'Mobile', 'Hardware Token'],
      apiEndpoint: 'https://api.emudhra.ke/v1/signatures',
      documentation: 'https://developer.emudhra.com/docs'
    },
    {
      id: 'icta',
      name: 'ICTA (Government)',
      type: 'qualified',
      status: 'online',
      features: ['eCitizen Integration', 'National ID Validation', 'Government QES', 'Huduma Number'],
      authMethod: 'eCitizen Token',
      cost: 'Free for government petitions',
      responseTime: 450,
      successRate: 97.5,
      supportedDevices: ['Desktop', 'Mobile', 'eCitizen Portal'],
      apiEndpoint: 'https://api.icta.go.ke/citizen/esign',
      documentation: 'https://developer.icta.go.ke/esignature'
    }
  ];

  useEffect(() => {
    loadCSPData();
    checkIntegrationStatus();
  }, []);

  const loadCSPData = async () => {
    setIsLoading(true);
    
    // Check real-time status of each CSP
    const providersWithStatus = await Promise.all(
      providers.map(async (provider) => {
        try {
          // Simulate health check API call
          const healthCheck = await fetch(`/api/csp-health/${provider.id}`);
          const status: 'online' | 'offline' | 'maintenance' = healthCheck.ok ? 'online' : 'offline';
          
          return {
            ...provider,
            status,
            responseTime: Math.random() * 200 + 150, // Simulate response time
            successRate: 95 + Math.random() * 5 // Simulate success rate
          };
        } catch (error) {
          return {
            ...provider,
            status: 'offline' as const,
            responseTime: 0,
            successRate: 0
          };
        }
      })
    );
    
    setCspProviders(providersWithStatus);
    setIsLoading(false);
  };

  const checkIntegrationStatus = async () => {
    // Simulate checking integration status
    const status = {
      totalSignatures: 8750,
      successfulSessions: 8520,
      failedSessions: 230,
      averageCompletionTime: 45,
      mostUsedProvider: 'tendaworld',
      lastUpdate: new Date().toISOString()
    };
    
    setIntegrationStatus(status);
  };

  const testCSPConnection = async (providerId: string) => {
    const provider = cspProviders.find(p => p.id === providerId);
    if (!provider) return;

    try {
      // Simulate connection test
      const response = await fetch('/api/test-csp-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId })
      });

      const result = await response.json();
      console.log(`Connection test for ${provider.name}:`, result);
      
      // Update provider status
      setCspProviders(prev => 
        prev.map(p => 
          p.id === providerId 
            ? { ...p, status: result.success ? 'online' : 'offline' }
            : p
        )
      );
    } catch (error) {
      console.error(`Failed to test connection for ${provider.name}:`, error);
    }
  };

  const createSignatureSession = async (providerId: string, userData: any) => {
    const provider = cspProviders.find(p => p.id === providerId);
    if (!provider) return;

    const session: SignatureSession = {
      id: `session_${Date.now()}`,
      cspProvider: providerId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
    };

    try {
      // Call CSP API to create signature session
      const response = await fetch('/api/create-signature-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cspProvider: providerId,
          userData,
          sessionId: session.id
        })
      });

      const result = await response.json();
      
      if (result.success) {
        session.status = 'active';
        session.signatureUrl = result.signatureUrl;
        
        setActiveSessions(prev => [...prev, session]);
        
        // Redirect to CSP signature portal
        window.open(result.signatureUrl, '_blank');
      }
    } catch (error) {
      console.error('Failed to create signature session:', error);
      session.status = 'failed';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'offline': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'maintenance': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'border-green-200 bg-green-50';
      case 'offline': return 'border-red-200 bg-red-50';
      case 'maintenance': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'smartphone':
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'feature phone':
      case 'ussd': return <Phone className="w-4 h-4" />;
      case 'desktop': return <Globe className="w-4 h-4" />;
      case 'hardware token': return <Key className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Integration Overview */}
      <Card className="border-blue-200">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex items-center text-blue-800">
            <Shield className="w-5 h-5 mr-2" />
            CSP Integration Status
          </CardTitle>
          <CardDescription className="text-blue-600">
            Real-time status of Certificate Service Provider integrations
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{integrationStatus.successfulSessions}</div>
              <div className="text-sm text-gray-600">Successful Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{integrationStatus.failedSessions}</div>
              <div className="text-sm text-gray-600">Failed Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{integrationStatus.averageCompletionTime}s</div>
              <div className="text-sm text-gray-600">Avg. Completion</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {cspProviders.filter(p => p.status === 'online').length}
              </div>
              <div className="text-sm text-gray-600">Online Providers</div>
            </div>
          </div>

          <Button
            onClick={loadCSPData}
            variant="outline"
            className="flex items-center space-x-2"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh Status</span>
          </Button>
        </CardContent>
      </Card>

      {/* CSP Provider Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cspProviders.map((provider) => (
          <Card key={provider.id} className={`${getStatusColor(provider.status)} transition-all hover:shadow-md`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-semibold">{provider.name}</div>
                    <Badge 
                      variant="outline" 
                      className={provider.type === 'qualified' ? 'border-green-500 text-green-700' : 'border-blue-500 text-blue-700'}
                    >
                      {provider.type.toUpperCase()} eSignature
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(provider.status)}
                  <span className="text-sm font-medium capitalize">{provider.status}</span>
                </div>
              </CardTitle>
              <CardDescription>
                {provider.authMethod} • {provider.cost}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Response Time</div>
                    <div className="text-lg font-bold text-blue-600">{provider.responseTime}ms</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Success Rate</div>
                    <div className="text-lg font-bold text-green-600">{provider.successRate.toFixed(1)}%</div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold mb-2">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Supported Devices */}
                <div>
                  <h4 className="font-semibold mb-2">Supported Devices</h4>
                  <div className="flex space-x-3">
                    {provider.supportedDevices.map((device, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        {getDeviceIcon(device)}
                        <span className="text-xs text-gray-600">{device}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Integration Controls */}
                <div className="flex space-x-2 pt-4 border-t">
                  <Button
                    onClick={() => testCSPConnection(provider.id)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    disabled={provider.status === 'offline'}
                  >
                    Test Connection
                  </Button>
                  <Button
                    onClick={() => window.open(provider.documentation, '_blank')}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    View Docs
                  </Button>
                </div>

                {/* Special Integration Notes */}
                {provider.id === 'tendaworld' && (
                  <Alert>
                    <Phone className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      USSD Access: Dial <strong>*483*58#</strong> for feature phone support
                    </AlertDescription>
                  </Alert>
                )}

                {provider.id === 'icta' && (
                  <Alert>
                    <Globe className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      Requires eCitizen account and Huduma Number for verification
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Signature Sessions */}
      {activeSessions.length > 0 && (
        <Card className="border-purple-200">
          <CardHeader className="bg-purple-50">
            <CardTitle className="flex items-center text-purple-800">
              <Clock className="w-5 h-5 mr-2" />
              Active Signature Sessions
            </CardTitle>
            <CardDescription className="text-purple-600">
              Currently ongoing digital signature processes
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {activeSessions.map((session) => {
                const provider = cspProviders.find(p => p.id === session.cspProvider);
                return (
                  <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        session.status === 'active' ? 'bg-green-500' :
                        session.status === 'pending' ? 'bg-yellow-500' :
                        session.status === 'completed' ? 'bg-blue-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <div className="font-medium">{provider?.name}</div>
                        <div className="text-sm text-gray-600">
                          Session {session.id} • Status: {session.status}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        Expires: {new Date(session.expiresAt).toLocaleTimeString()}
                      </div>
                      {session.signatureUrl && (
                        <Button
                          onClick={() => window.open(session.signatureUrl, '_blank')}
                          variant="outline"
                          size="sm"
                          className="mt-1"
                        >
                          Continue Signing
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Integration Guidelines */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Fingerprint className="w-5 h-5 mr-2" />
            CSP Integration Guidelines
          </CardTitle>
          <CardDescription>
            Technical requirements and best practices for CSP integration
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Technical Requirements</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  TLS 1.3 encryption for all API communications
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  OAuth 2.0 or certificate-based authentication
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Webhook endpoints for real-time status updates
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Comprehensive audit trail logging
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Compliance Standards</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  CAK certification and licensing verification
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  KICA Section 83C compliance validation
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  ISO 27001 security framework adherence
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Annual security audit requirements
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CSPIntegration;
