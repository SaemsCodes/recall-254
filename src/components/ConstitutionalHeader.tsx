import React from 'react';
import { Shield, Lock, Award, FileCheck } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
const ConstitutionalHeader = () => {
  return <>
      {/* Constitutional Banner */}
      <div className="bg-kenya-green text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <FileCheck className="w-4 h-4 mr-1" />
              Art. 38: Right to Recall
            </span>
            <span className="flex items-center">
              <Award className="w-4 h-4 mr-1" />
              KICA §83C Compliant
            </span>
            <span className="flex items-center">
              <Shield className="w-4 h-4 mr-1" />
              CAK-Certified: <span className="ml-1 font-semibold">GEDA</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Lock className="w-4 h-4 mr-1" />
              End-to-End Encryption: Active
            </span>
            <span className="text-xs">ISO 27001 Audit ID: AX-88392-2023</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-gradient-to-r from-kenya-green via-kenya-red to-kenya-black text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Shield className="w-10 h-10 text-kenya-green" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Recall254</h1>
                <p className="text-green-100 text-lg">"We, the People" - Constitution, 2010</p>
                <p className="text-sm text-gray-200">Digital Democracy • Legally Compliant • Secure</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-white text-kenya-green border-green-200">
                CAK Licensed
              </Badge>
              <Badge variant="outline" className="bg-white text-kenya-red border-red-200">
                IEBC Integrated
              </Badge>
              <Badge variant="outline" className="bg-white text-kenya-black border-gray-200">
                ISO 27001
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Legal Quick Links */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 text-sm">
            <a href="#kica" className="text-kenya-green hover:underline font-medium">KICA §83C</a>
            <a href="#katiba-ruling" className="text-kenya-green hover:underline font-medium">Katiba Institute Ruling</a>
            <a href="#four-eyes" className="text-kenya-green hover:underline font-medium">Four-Eyes Verification</a>
            <a href="#article-104" className="text-kenya-green hover:underline font-medium">Constitution Art. 104</a>
          </div>
        </div>
      </div>
    </>;
};
export default ConstitutionalHeader;