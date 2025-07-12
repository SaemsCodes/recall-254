
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  Scale, 
  Gavel,
  Clock,
  Download,
  RefreshCw,
  Eye,
  AlertCircle
} from 'lucide-react';

interface ComplianceCheck {
  id: string;
  category: 'constitutional' | 'procedural' | 'evidence' | 'technical';
  title: string;
  description: string;
  status: 'compliant' | 'non-compliant' | 'pending' | 'warning';
  details: string;
  lastChecked: string;
  requiredAction?: string;
}

interface EvidenceItem {
  id: string;
  type: 'chapter6' | 'funds_mismanagement' | 'electoral_crime' | 'court_order';
  title: string;
  description: string;
  status: 'verified' | 'pending' | 'invalid';
  documentId: string;
  verificationDate?: string;
  expiryDate?: string;
}

const ComplianceChecker = () => {
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>([]);
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [isRunningCheck, setIsRunningCheck] = useState(false);
  const [lastFullAudit, setLastFullAudit] = useState<string>('2024-01-15T10:30:00Z');

  useEffect(() => {
    loadComplianceData();
  }, []);

  const loadComplianceData = async () => {
    // Simulate loading compliance data
    const checks: ComplianceCheck[] = [
      {
        id: 'const_001',
        category: 'constitutional',
        title: 'Article 104 - Recall Grounds',
        description: 'Verification that recall petition meets constitutional grounds',
        status: 'compliant',
        details: 'Chapter 6 violations documented and verified',
        lastChecked: '2024-01-20T14:30:00Z'
      },
      {
        id: 'proc_001',
        category: 'procedural',
        title: 'IEBC Form 24 Compliance',
        description: 'Petition format compliance with IEBC requirements',
        status: 'compliant',
        details: 'All required fields completed and formatted correctly',
        lastChecked: '2024-01-20T14:30:00Z'
      },
      {
        id: 'tech_001',
        category: 'technical',
        title: 'KICA Section 83C - Digital Signatures',
        description: 'Digital signature compliance with Kenya ICT Authority regulations',
        status: 'compliant',
        details: 'All signatures created using CAK-licensed CSPs with proper encryption',
        lastChecked: '2024-01-20T14:30:00Z'
      },
      {
        id: 'proc_002',
        category: 'procedural',
        title: 'Ward Distribution Requirement',
        description: 'Minimum 50% ward coverage with 15% signatures per ward',
        status: 'warning',
        details: '12 of 20 wards have adequate signatures (60% coverage)',
        lastChecked: '2024-01-20T14:30:00Z',
        requiredAction: 'Focus campaign efforts on remaining 8 wards'
      },
      {
        id: 'evid_001',
        category: 'evidence',
        title: 'Supporting Documentation',
        description: 'Admissible evidence supporting recall grounds',
        status: 'compliant',
        details: 'Auditor General report and EACC findings properly authenticated',
        lastChecked: '2024-01-20T14:30:00Z'
      }
    ];

    const evidence: EvidenceItem[] = [
      {
        id: 'ev_001',
        type: 'funds_mismanagement',
        title: 'Auditor General Report 2023/24',
        description: 'CDF fund misappropriation findings',
        status: 'verified',
        documentId: 'OAG-2024-001',
        verificationDate: '2024-01-10T09:00:00Z',
        expiryDate: '2024-12-31T23:59:59Z'
      },
      {
        id: 'ev_002',
        type: 'chapter6',
        title: 'EACC Investigation Report',
        description: 'Ethics and Anti-Corruption Commission findings',
        status: 'verified',
        documentId: 'EACC-2024-015',
        verificationDate: '2024-01-12T11:30:00Z',
        expiryDate: '2024-06-30T23:59:59Z'
      },
      {
        id: 'ev_003',
        type: 'court_order',
        title: 'High Court Judgment',
        description: 'Court ruling on misuse of public funds',
        status: 'pending',
        documentId: 'HC-2024-089'
      }
    ];

    setComplianceChecks(checks);
    setEvidenceItems(evidence);
    
    // Calculate overall compliance score
    const compliantCount = checks.filter(c => c.status === 'compliant').length;
    const score = Math.round((compliantCount / checks.length) * 100);
    setOverallScore(score);
  };

  const runFullComplianceCheck = async () => {
    setIsRunningCheck(true);
    
    // Simulate comprehensive compliance check
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update last audit time
    setLastFullAudit(new Date().toISOString());
    
    // Refresh compliance data
    await loadComplianceData();
    
    setIsRunningCheck(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'non-compliant': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending': return <Clock className="w-5 h-5 text-blue-600" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'non-compliant': return 'border-red-200 bg-red-50';
      case 'pending': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'constitutional': return <Scale className="w-5 h-5" />;
      case 'procedural': return <FileText className="w-5 h-5" />;
      case 'evidence': return <Gavel className="w-5 h-5" />;
      case 'technical': return <Shield className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center justify-between text-green-800">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Legal Compliance Dashboard
            </div>
            <Badge className="bg-green-600 text-white">
              {overallScore}% Compliant
            </Badge>
          </CardTitle>
          <CardDescription className="text-green-600">
            Comprehensive legal and procedural compliance verification
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {complianceChecks.filter(c => c.status === 'compliant').length}
              </div>
              <div className="text-sm text-gray-600">Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {complianceChecks.filter(c => c.status === 'warning').length}
              </div>
              <div className="text-sm text-gray-600">Warnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {complianceChecks.filter(c => c.status === 'non-compliant').length}
              </div>
              <div className="text-sm text-gray-600">Non-Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {complianceChecks.filter(c => c.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Overall Compliance Score</span>
              <span>{overallScore}%</span>
            </div>
            <Progress value={overallScore} className="h-3" />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Last full audit: {new Date(lastFullAudit).toLocaleDateString()}
            </div>
            <Button
              onClick={runFullComplianceCheck}
              disabled={isRunningCheck}
              className="bg-green-600 hover:bg-green-700"
            >
              {isRunningCheck ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Running Check...
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Run Full Audit
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Compliance Checks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Constitutional & Procedural Compliance */}
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center text-blue-800">
              <Scale className="w-5 h-5 mr-2" />
              Legal Framework Compliance
            </CardTitle>
            <CardDescription className="text-blue-600">
              Constitutional and procedural requirement verification
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {complianceChecks
                .filter(check => ['constitutional', 'procedural'].includes(check.category))
                .map((check) => (
                <div key={check.id} className={`p-4 border rounded-lg ${getStatusColor(check.status)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start space-x-3">
                      {getCategoryIcon(check.category)}
                      <div>
                        <h4 className="font-semibold">{check.title}</h4>
                        <p className="text-sm text-gray-600">{check.description}</p>
                      </div>
                    </div>
                    {getStatusIcon(check.status)}
                  </div>
                  
                  <div className="text-sm text-gray-700 mb-2">{check.details}</div>
                  
                  {check.requiredAction && (
                    <Alert className="mt-3">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        <strong>Action Required:</strong> {check.requiredAction}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="text-xs text-gray-500 mt-2">
                    Last checked: {new Date(check.lastChecked).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technical & Evidence Compliance */}
        <Card className="border-purple-200">
          <CardHeader className="bg-purple-50">
            <CardTitle className="flex items-center text-purple-800">
              <Shield className="w-5 h-5 mr-2" />
              Technical & Evidence Compliance
            </CardTitle>
            <CardDescription className="text-purple-600">
              Digital signature standards and evidence verification
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {complianceChecks
                .filter(check => ['technical', 'evidence'].includes(check.category))
                .map((check) => (
                <div key={check.id} className={`p-4 border rounded-lg ${getStatusColor(check.status)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start space-x-3">
                      {getCategoryIcon(check.category)}
                      <div>
                        <h4 className="font-semibold">{check.title}</h4>
                        <p className="text-sm text-gray-600">{check.description}</p>
                      </div>
                    </div>
                    {getStatusIcon(check.status)}
                  </div>
                  
                  <div className="text-sm text-gray-700 mb-2">{check.details}</div>
                  
                  {check.requiredAction && (
                    <Alert className="mt-3">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        <strong>Action Required:</strong> {check.requiredAction}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="text-xs text-gray-500 mt-2">
                    Last checked: {new Date(check.lastChecked).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Evidence Documentation */}
      <Card className="border-red-200">
        <CardHeader className="bg-red-50">
          <CardTitle className="flex items-center text-red-800">
            <Gavel className="w-5 h-5 mr-2" />
            Supporting Evidence Registry
          </CardTitle>
          <CardDescription className="text-red-600">
            Legal documentation supporting recall petition grounds
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {evidenceItems.map((evidence) => (
              <div key={evidence.id} className={`p-4 border rounded-lg ${getStatusColor(evidence.status)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{evidence.title}</h4>
                    <Badge variant="outline" className="text-xs mt-1">
                      {evidence.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  {getStatusIcon(evidence.status)}
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{evidence.description}</p>
                
                <div className="space-y-1 text-xs text-gray-500">
                  <div>Document ID: {evidence.documentId}</div>
                  {evidence.verificationDate && (
                    <div>Verified: {new Date(evidence.verificationDate).toLocaleDateString()}</div>
                  )}
                  {evidence.expiryDate && (
                    <div>Expires: {new Date(evidence.expiryDate).toLocaleDateString()}</div>
                  )}
                </div>
                
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  <Download className="w-3 h-3 mr-2" />
                  View Document
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legal Disclaimer and Compliance Standards */}
      <Card className="border-yellow-200">
        <CardHeader className="bg-yellow-50">
          <CardTitle className="flex items-center text-yellow-800">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Legal Standards & Compliance Framework
          </CardTitle>
          <CardDescription className="text-yellow-600">
            Regulatory framework and legal requirements reference
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Constitutional Requirements</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Article 104 - Grounds for recall
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Chapter 6 - Leadership and integrity violations
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Ward distribution requirements (50% minimum)
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Signature threshold per ward (15% minimum)
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Technical Standards</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  KICA Section 83C - Digital signature compliance
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  CAK-licensed CSP integration
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  End-to-end encryption requirements
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  ISO 27001 security standards
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Legal Basis:</strong> This platform complies with the 
              <em> Katiba Institute v Attorney General</em> ruling and all requirements 
              under the Kenya Information and Communications Act (KICA) and Communications 
              Authority of Kenya (CAK) regulations for digital signatures in civic processes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceChecker;
