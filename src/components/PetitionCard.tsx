
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, Users, AlertTriangle, CheckCircle } from 'lucide-react';

interface PetitionCardProps {
  petition: {
    id: string;
    mp_name: string;
    constituency: string;
    county: string;
    grounds: string[];
    description: string;
    signature_target: number;
    current_signatures: number;
    ward_target: number;
    wards_covered: number;
    deadline: string;
    status: string;
  };
  onJoinPetition: (petitionId: string) => void;
}

const PetitionCard = ({ petition, onJoinPetition }: PetitionCardProps) => {
  const progressPercentage = (petition.current_signatures / petition.signature_target) * 100;
  const wardProgress = (petition.wards_covered / petition.ward_target) * 100;
  const daysRemaining = Math.ceil((new Date(petition.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const getGroundsLabel = (grounds: string[]) => {
    const labels: { [key: string]: string } = {
      'chapter_6': 'Chapter 6 Violation',
      'funds_misuse': 'Funds Misappropriation', 
      'electoral_crime': 'Electoral Offense'
    };
    return grounds.map(g => labels[g] || g);
  };

  const getGroundsColor = (ground: string) => {
    switch (ground) {
      case 'chapter_6': return 'bg-red-100 text-red-800';
      case 'funds_misuse': return 'bg-yellow-100 text-yellow-800';
      case 'electoral_crime': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border-2 border-kenya-green/20 hover:border-kenya-green/40 transition-all">
      <CardHeader className="bg-gradient-to-r from-kenya-green/5 to-kenya-green/10">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl text-kenya-black">
              Recall Petition: {petition.mp_name}
            </CardTitle>
            <CardDescription className="flex items-center mt-2">
              <MapPin className="w-4 h-4 mr-1" />
              {petition.constituency}, {petition.county}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge className="bg-kenya-green text-white">
              {petition.status.toUpperCase()}
            </Badge>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              {daysRemaining} days left
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Legal Grounds */}
        <div className="mb-4">
          <h4 className="font-semibold text-kenya-black mb-2">Legal Grounds:</h4>
          <div className="flex flex-wrap gap-2">
            {getGroundsLabel(petition.grounds).map((ground, index) => (
              <Badge key={index} className={getGroundsColor(petition.grounds[index])}>
                {ground}
              </Badge>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 text-sm leading-relaxed">
          {petition.description}
        </p>

        {/* Constitutional Requirements Panel */}
        <div className="bg-kenya-green/5 border border-kenya-green/20 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-kenya-green mb-3 flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Constitutional Compliance Status
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Signature Progress */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Signatures Required</span>
                <span className="font-mono">{petition.current_signatures.toLocaleString()}/{petition.signature_target.toLocaleString()}</span>
              </div>
              <Progress value={progressPercentage} className="h-2 mb-1" />
              <p className="text-xs text-gray-600">(Elections Act §46)</p>
            </div>

            {/* Ward Distribution */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Ward Distribution</span>
                <span className="font-mono">{petition.wards_covered}/{petition.ward_target} Wards</span>
              </div>
              <Progress value={wardProgress} className="h-2 mb-1" />
              <p className="text-xs text-gray-600">(Min. 50% of wards)</p>
            </div>
          </div>

          {/* Compliance Indicators */}
          <div className="mt-3 flex items-center space-x-4 text-xs">
            <div className="flex items-center">
              {progressPercentage >= 30 ? (
                <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-yellow-600 mr-1" />
              )}
              <span>30% Threshold: {progressPercentage >= 30 ? 'Met' : 'Pending'}</span>
            </div>
            <div className="flex items-center">
              {wardProgress >= 50 ? (
                <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-yellow-600 mr-1" />
              )}
              <span>Ward Coverage: {wardProgress >= 50 ? 'Compliant' : 'Needs More'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button 
            onClick={() => onJoinPetition(petition.id)}
            className="flex-1 bg-kenya-green hover:bg-kenya-green/90 text-white"
          >
            <Users className="w-4 h-4 mr-2" />
            Sign Petition
          </Button>
          <Button variant="outline" className="border-kenya-green text-kenya-green hover:bg-kenya-green/10">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PetitionCard;
