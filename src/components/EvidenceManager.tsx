
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Download,
  Eye,
  Calendar,
  Gavel,
  Scale,
  Search,
  RefreshCw
} from 'lucide-react';

interface Evidence {
  id: string;
  type: 'chapter6' | 'funds_mismanagement' | 'electoral_crime' | 'court_order' | 'audit_report';
  title: string;
  description: string;
  documentId: string;
  status: 'verified' | 'pending' | 'rejected' | 'expired';
  uploadDate: string;
  verificationDate?: string;
  expiryDate?: string;
  fileSize: number;
  fileType: string;
  source: string;
  verifier?: string;
  complianceScore: number;
}

const EvidenceManager = () => {
  const [evidenceList, setEvidenceList] = useState<Evidence[]>([]);
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    loadEvidenceData();
  }, []);

  const loadEvidenceData = async () => {
    // Simulate loading evidence from database
    const mockEvidence: Evidence[] = [
      {
        id: 'ev_001',
        type: 'funds_mismanagement',
        title: 'Auditor General Report 2023/24',
        description: 'Comprehensive audit revealing CDF fund misappropriation totaling Ksh 15M',
        documentId: 'OAG-2024-001',
        status: 'verified',
        uploadDate: '2024-01-10T09:00:00Z',
        verificationDate: '2024-01-12T14:30:00Z',
        expiryDate: '2024-12-31T23:59:59Z',
        fileSize: 2.5 * 1024 * 1024, // 2.5MB
        fileType: 'application/pdf',
        source: 'Office of the Auditor General',
        verifier: 'Dr. Nancy Gathungu',
        complianceScore: 95
      },
      {
        id: 'ev_002',
        type: 'chapter6',
        title: 'EACC Investigation Report',
        description: 'Ethics and Anti-Corruption Commission findings on leadership integrity violations',
        documentId: 'EACC-2024-015',
        status: 'verified',
        uploadDate: '2024-01-12T11:30:00Z',
        verificationDate: '2024-01-15T10:15:00Z',
        expiryDate: '2024-06-30T23:59:59Z',
        fileSize: 1.8 * 1024 * 1024, // 1.8MB
        fileType: 'application/pdf',
        source: 'Ethics and Anti-Corruption Commission',
        verifier: 'Mr. Twalib Mbarak',
        complianceScore: 88
      },
      {
        id: 'ev_003',
        type: 'court_order',
        title: 'High Court Judgment - Misuse of Public Funds',
        description: 'Court ruling on misappropriation case with detailed findings',
        documentId: 'HC-2024-089',
        status: 'pending',
        uploadDate: '2024-01-18T16:20:00Z',
        fileSize: 3.2 * 1024 * 1024, // 3.2MB
        fileType: 'application/pdf',
        source: 'High Court of Kenya',
        complianceScore: 0
      },
      {
        id: 'ev_004',
        type: 'electoral_crime',
        title: 'Electoral Offenses Conviction Certificate',
        description: 'Certificate of conviction for electoral offenses during 2022 general election',
        documentId: 'EOC-2024-003',
        status: 'verified',
        uploadDate: '2024-01-20T08:45:00Z',
        verificationDate: '2024-01-22T13:20:00Z',
        fileSize: 0.8 * 1024 * 1024, // 800KB
        fileType: 'application/pdf',
        source: 'Director of Public Prosecutions',
        verifier: 'Ms. Noordin Haji',
        complianceScore: 92
      }
    ];

    setEvidenceList(mockEvidence);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // Simulate file upload and processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newEvidence: Evidence = {
        id: `ev_${Date.now()}`,
        type: 'audit_report',
        title: file.name,
        description: 'Uploaded document awaiting verification',
        documentId: `DOC-${Date.now()}`,
        status: 'pending',
        uploadDate: new Date().toISOString(),
        fileSize: file.size,
        fileType: file.type,
        source: 'User Upload',
        complianceScore: 0
      };

      setEvidenceList(prev => [newEvidence, ...prev]);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const verifyEvidence = async (evidenceId: string) => {
    setIsVerifying(true);

    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 3000));

      setEvidenceList(prev =>
        prev.map(evidence =>
          evidence.id === evidenceId
            ? {
                ...evidence,
                status: 'verified' as const,
                verificationDate: new Date().toISOString(),
                complianceScore: Math.floor(Math.random() * 20) + 80, // 80-100
                verifier: 'System Verification'
              }
            : evidence
        )
      );
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'expired': return <XCircle className="w-5 h-5 text-gray-600" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'border-green-200 bg-green-50';
      case 'pending': return 'border-yellow-200 bg-yellow-50';
      case 'rejected': return 'border-red-200 bg-red-50';
      case 'expired': return 'border-gray-200 bg-gray-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'chapter6': return <Shield className="w-5 h-5 text-blue-600" />;
      case 'funds_mismanagement': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'electoral_crime': return <Gavel className="w-5 h-5 text-purple-600" />;
      case 'court_order': return <Scale className="w-5 h-5 text-green-600" />;
      case 'audit_report': return <FileText className="w-5 h-5 text-orange-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredEvidence = evidenceList.filter(evidence => {
    const matchesSearch = evidence.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evidence.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || evidence.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const evidenceStats = {
    total: evidenceList.length,
    verified: evidenceList.filter(e => e.status === 'verified').length,
    pending: evidenceList.filter(e => e.status === 'pending').length,
    rejected: evidenceList.filter(e => e.status === 'rejected').length,
    averageScore: evidenceList
      .filter(e => e.status === 'verified')
      .reduce((acc, e) => acc + e.complianceScore, 0) / 
      evidenceList.filter(e => e.status === 'verified').length || 0
  };

  return (
    <div className="space-y-6">
      {/* Evidence Overview */}
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center text-green-800">
            <FileText className="w-5 h-5 mr-2" />
            Evidence Documentation Center
          </CardTitle>
          <CardDescription className="text-green-600">
            Manage and verify legal evidence supporting recall petition grounds
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{evidenceStats.total}</div>
              <div className="text-sm text-gray-600">Total Documents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{evidenceStats.verified}</div>
              <div className="text-sm text-gray-600">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{evidenceStats.pending}</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {evidenceStats.averageScore.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Avg. Compliance</div>
            </div>
          </div>

          {/* Upload New Evidence */}
          <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center">
            <Upload className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Upload Supporting Evidence</h3>
            <p className="text-gray-600 mb-4">
              Upload court orders, audit reports, EACC findings, or other legal documents
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="evidence-upload"
              disabled={isUploading}
            />
            <Button
              onClick={() => document.getElementById('evidence-upload')?.click()}
              disabled={isUploading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isUploading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Evidence</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="filter">Filter by Type</Label>
              <select
                id="filter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Types</option>
                <option value="chapter6">Chapter 6 Violations</option>
                <option value="funds_mismanagement">Fund Mismanagement</option>
                <option value="electoral_crime">Electoral Crime</option>
                <option value="court_order">Court Orders</option>
                <option value="audit_report">Audit Reports</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evidence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvidence.map((evidence) => (
          <Card key={evidence.id} className={`cursor-pointer transition-all hover:shadow-lg ${getStatusColor(evidence.status)}`}>
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getTypeIcon(evidence.type)}
                  <div>
                    <div className="font-semibold">{evidence.title}</div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {evidence.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(evidence.status)}
                  <span className="text-sm font-medium capitalize">{evidence.status}</span>
                </div>
              </CardTitle>
              <CardDescription className="text-sm">
                {evidence.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Document Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Document ID:</span>
                    <div className="font-mono">{evidence.documentId}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">File Size:</span>
                    <div>{formatFileSize(evidence.fileSize)}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Source:</span>
                    <div>{evidence.source}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Upload Date:</span>
                    <div>{new Date(evidence.uploadDate).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* Compliance Score */}
                {evidence.status === 'verified' && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Compliance Score</span>
                      <span>{evidence.complianceScore}%</span>
                    </div>
                    <Progress value={evidence.complianceScore} className="h-2" />
                  </div>
                )}

                {/* Verification Details */}
                {evidence.verificationDate && (
                  <div className="text-sm">
                    <span className="text-gray-600">Verified by:</span>
                    <div>{evidence.verifier}</div>
                    <span className="text-gray-600">Date:</span>
                    <div>{new Date(evidence.verificationDate).toLocaleDateString()}</div>
                  </div>
                )}

                {/* Expiry Warning */}
                {evidence.expiryDate && new Date(evidence.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                  <Alert>
                    <Calendar className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      <strong>Expiry Notice:</strong> This document expires on{' '}
                      {new Date(evidence.expiryDate).toLocaleDateString()}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-3 h-3 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-3 h-3 mr-2" />
                    Download
                  </Button>
                  {evidence.status === 'pending' && (
                    <Button
                      onClick={() => verifyEvidence(evidence.id)}
                      disabled={isVerifying}
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isVerifying ? (
                        <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="w-3 h-3 mr-2" />
                      )}
                      Verify
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Evidence Verification Guidelines */}
      <Card className="border-blue-200">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex items-center text-blue-800">
            <Scale className="w-5 h-5 mr-2" />
            Evidence Verification Guidelines
          </CardTitle>
          <CardDescription className="text-blue-600">
            Legal standards and requirements for admissible evidence
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Document Requirements</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Original or certified copies only
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Official letterhead and signatures
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Clear and legible document quality
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Valid dates within statute of limitations
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Verification Process</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Cross-reference with government databases
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Digital signature validation
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Legal expert review and approval
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Blockchain timestamping for integrity
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800">Legal Notice</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  All evidence must meet the standards established in the <em>Evidence Act</em> and 
                  be relevant to the grounds specified in Article 104 of the Constitution. 
                  False or misleading evidence may result in legal consequences.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvidenceManager;
