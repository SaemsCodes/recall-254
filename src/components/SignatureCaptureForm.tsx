
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  Fingerprint, 
  MapPin, 
  Smartphone, 
  AlertTriangle, 
  CheckCircle,
  Eye,
  Clock,
  Users
} from 'lucide-react';

interface SignatureFormData {
  nationalId: string;
  phoneNumber: string;
  constituency: string;
  ward: string;
  petitionId: string;
}

interface CSPProvider {
  id: string;
  name: string;
  type: 'advanced' | 'qualified';
  features: string[];
  cost: string;
  availability: 'available' | 'limited' | 'unavailable';
}

const SignatureCaptureForm = () => {
  const [formData, setFormData] = useState<SignatureFormData>({
    nationalId: '',
    phoneNumber: '',
    constituency: '',
    ward: '',
    petitionId: '1'
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResults, setVerificationResults] = useState<any>(null);
  const [selectedCSP, setSelectedCSP] = useState<string>('');
  const [biometricData, setBiometricData] = useState<string>('');
  const [deviceInfo, setDeviceInfo] = useState<any>(null);

  const cspProviders: CSPProvider[] = [
    {
      id: 'geda',
      name: 'GEDA LIMITED',
      type: 'advanced',
      features: ['Government Integration', 'API Authentication', 'Audit Trail'],
      cost: 'Free for civic petitions',
      availability: 'available'
    },
    {
      id: 'tendaworld',
      name: 'TENDAWORLD LTD',
      type: 'qualified',
      features: ['USSD Support', 'Mobile SDK', 'Biometric Verification'],
      cost: 'Free (500/month)',
      availability: 'available'
    },
    {
      id: 'emudhra',
      name: 'Emudhra Technologies',
      type: 'qualified',
      features: ['PKI Certificates', 'Global Standards', 'Cross-border Recognition'],
      cost: 'NGO Subsidized',
      availability: 'available'
    },
    {
      id: 'icta',
      name: 'ICTA (Government)',
      type: 'qualified',
      features: ['eCitizen Integration', 'National ID Validation', 'Government QES'],
      cost: 'Free for government petitions',
      availability: 'available'
    }
  ];

  useEffect(() => {
    // Capture device information for audit trail
    const deviceFingerprint = {
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      timestamp: new Date().toISOString()
    };
    setDeviceInfo(deviceFingerprint);
  }, []);

  const handleInputChange = (field: keyof SignatureFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const performFourEyesVerification = async () => {
    setIsVerifying(true);
    
    try {
      // Simulate dual verification process
      console.log('Starting Four-Eyes verification for:', formData.nationalId);
      
      // First Eye: IEBC Verification
      const iebcResponse = await fetch('/api/verify-voter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nationalId: formData.nationalId,
          constituency: formData.constituency
        })
      });
      
      const iebcResult = await iebcResponse.json();
      
      // Second Eye: National ID Database Verification
      const nationalIdResponse = await fetch('/api/verify-national-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nationalId: formData.nationalId,
          biometricHash: biometricData
        })
      });
      
      const nationalIdResult = await nationalIdResponse.json();
      
      const results = {
        iebcVerified: iebcResult.verified,
        nationalIdVerified: nationalIdResult.verified,
        voterDetails: iebcResult.voterDetails,
        wardMatch: iebcResult.ward === formData.ward,
        constituencyMatch: iebcResult.constituency === formData.constituency
      };
      
      setVerificationResults(results);
      
      if (results.iebcVerified && results.nationalIdVerified && results.wardMatch) {
        setCurrentStep(3); // Proceed to CSP selection
      }
      
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const initiateCSPSignature = async () => {
    const csp = cspProviders.find(p => p.id === selectedCSP);
    if (!csp) return;

    try {
      const signatureSession = await fetch('/api/create-signature-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cspProvider: selectedCSP,
          voterData: formData,
          deviceFingerprint: deviceInfo,
          verificationResults: verificationResults
        })
      });

      const session = await signatureSession.json();
      
      // Redirect to CSP signature portal
      window.location.href = session.redirectUrl;
      
    } catch (error) {
      console.error('Failed to initiate CSP signature:', error);
    }
  };

  const simulateBiometricCapture = () => {
    // Simulate biometric data capture
    const mockBiometric = `bio_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setBiometricData(mockBiometric);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Indicator */}
      <Card className="border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200'
              }`}>
                3
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 4 ? 'bg-green-600 text-white' : 'bg-gray-200'
              }`}>
                4
              </div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Identity Verification</span>
            <span>Four-Eyes Check</span>
            <span>CSP Selection</span>
            <span>Digital Signature</span>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Identity Verification */}
      {currentStep === 1 && (
        <Card className="border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center text-green-800">
              <Shield className="w-5 h-5 mr-2" />
              Identity Verification
            </CardTitle>
            <CardDescription className="text-green-600">
              Provide your identification details for voter verification
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nationalId">National ID Number *</Label>
                  <Input
                    id="nationalId"
                    value={formData.nationalId}
                    onChange={(e) => handleInputChange('nationalId', e.target.value)}
                    placeholder="Enter your National ID"
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="+254 7XX XXX XXX"
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="constituency">Constituency *</Label>
                  <Input
                    id="constituency"
                    value={formData.constituency}
                    onChange={(e) => handleInputChange('constituency', e.target.value)}
                    placeholder="e.g., Nairobi Central"
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                <div>
                  <Label htmlFor="ward">Ward *</Label>
                  <Input
                    id="ward"
                    value={formData.ward}
                    onChange={(e) => handleInputChange('ward', e.target.value)}
                    placeholder="e.g., Ziwani"
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
              </div>

              {/* Biometric Capture */}
              <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center">
                <Fingerprint className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Biometric Verification</h3>
                <p className="text-gray-600 mb-4">Touch the fingerprint sensor or use facial recognition</p>
                {!biometricData ? (
                  <Button 
                    onClick={simulateBiometricCapture}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Capture Biometric Data
                  </Button>
                ) : (
                  <div className="flex items-center justify-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Biometric data captured successfully
                  </div>
                )}
              </div>

              <Button 
                onClick={() => setCurrentStep(2)}
                disabled={!formData.nationalId || !formData.phoneNumber || !biometricData}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Proceed to Verification
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Four-Eyes Verification */}
      {currentStep === 2 && (
        <Card className="border-yellow-200">
          <CardHeader className="bg-yellow-50">
            <CardTitle className="flex items-center text-yellow-800">
              <Eye className="w-5 h-5 mr-2" />
              Four-Eyes Verification Process
            </CardTitle>
            <CardDescription className="text-yellow-600">
              Dual verification system: IEBC registration + National ID database
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {!verificationResults ? (
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-lg font-semibold">Performing Dual Verification</h3>
                <p className="text-gray-600">Checking IEBC voter registration and National ID database...</p>
                {!isVerifying && (
                  <Button 
                    onClick={performFourEyesVerification}
                    className="bg-yellow-600 hover:bg-yellow-700"
                  >
                    Start Verification Process
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Verification Results</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 border rounded-lg ${
                    verificationResults.iebcVerified ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-center mb-2">
                      {verificationResults.iebcVerified ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                      )}
                      <span className="font-semibold">IEBC Verification</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {verificationResults.iebcVerified ? 'Registered voter confirmed' : 'Voter registration not found'}
                    </p>
                  </div>

                  <div className={`p-4 border rounded-lg ${
                    verificationResults.nationalIdVerified ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-center mb-2">
                      {verificationResults.nationalIdVerified ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                      )}
                      <span className="font-semibold">National ID Verification</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {verificationResults.nationalIdVerified ? 'Identity confirmed' : 'Identity verification failed'}
                    </p>
                  </div>
                </div>

                {verificationResults.iebcVerified && verificationResults.nationalIdVerified && (
                  <Button 
                    onClick={() => setCurrentStep(3)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Proceed to Digital Signature
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: CSP Selection */}
      {currentStep === 3 && (
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center text-blue-800">
              <Shield className="w-5 h-5 mr-2" />
              Select Digital Signature Provider
            </CardTitle>
            <CardDescription className="text-blue-600">
              Choose from CAK-licensed Certificate Service Providers
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cspProviders.map((csp) => (
                <div
                  key={csp.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedCSP === csp.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedCSP(csp.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{csp.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={csp.type === 'qualified' ? 'border-green-500 text-green-700' : 'border-blue-500 text-blue-700'}
                      >
                        {csp.type.toUpperCase()} eSignature
                      </Badge>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        csp.availability === 'available' 
                          ? 'border-green-500 text-green-700' 
                          : 'border-yellow-500 text-yellow-700'
                      }
                    >
                      {csp.availability}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Features:</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {csp.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="text-sm font-medium text-green-600 mt-2">{csp.cost}</div>
                  </div>
                </div>
              ))}
            </div>

            {selectedCSP && (
              <div className="mt-6">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    You will be redirected to {cspProviders.find(p => p.id === selectedCSP)?.name} 
                    for secure digital signature creation. This process is encrypted and legally binding.
                  </AlertDescription>
                </Alert>
                
                <Button 
                  onClick={initiateCSPSignature}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                >
                  Create Digital Signature with {cspProviders.find(p => p.id === selectedCSP)?.name}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Alternative Access Methods */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="w-5 h-5 mr-2" />
            Alternative Access Methods
          </CardTitle>
          <CardDescription>
            Multiple ways to sign the petition for maximum accessibility
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="font-mono text-lg font-bold text-green-600 mb-2">*483*58#</div>
              <h3 className="font-semibold mb-2">USSD Access</h3>
              <p className="text-sm text-gray-600">Use any phone to sign via USSD menu system</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-lg font-bold text-blue-600 mb-2">WhatsApp</div>
              <h3 className="font-semibold mb-2">+254 700 RECALL</h3>
              <p className="text-sm text-gray-600">Get signature links and updates via WhatsApp</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-lg font-bold text-purple-600 mb-2">QR Code</div>
              <h3 className="font-semibold mb-2">Offline Distribution</h3>
              <p className="text-sm text-gray-600">Scan QR codes at community centers and offices</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignatureCaptureForm;
