
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { FileText, Users, Scale, CheckCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

const PetitionWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    mpName: '',
    constituency: '',
    county: '',
    description: '',
    grounds: [] as string[],
    signatureTarget: 0,
    wardTarget: 0,
    deadline: ''
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const availableGrounds = [
    'Gross misconduct',
    'Abuse of office',
    'Corruption charges',
    'Violation of constitutional oath',
    'Incompetence in service delivery',
    'Failure to attend parliamentary sessions',
    'Misrepresentation of constituents',
    'Criminal charges'
  ];

  const handleGroundsChange = (ground: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      grounds: checked 
        ? [...prev.grounds, ground]
        : prev.grounds.filter(g => g !== ground)
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('petitions')
        .insert([{
          mp_name: formData.mpName,
          constituency: formData.constituency,
          county: formData.county,
          description: formData.description,
          grounds: formData.grounds,
          signature_target: formData.signatureTarget,
          ward_target: formData.wardTarget,
          deadline: formData.deadline,
          status: 'active'
        }]);

      if (error) throw error;
      
      alert('Petition created successfully!');
      // Reset form or redirect
    } catch (error) {
      console.error('Error creating petition:', error);
      alert('Failed to create petition. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-green-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center text-green-900">
            <FileText className="w-6 h-6 mr-2" />
            Create Recall Petition
          </CardTitle>
          <CardDescription>
            Step {currentStep} of {totalSteps} - Build your constitutional petition
          </CardDescription>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent className="p-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-green-900 mb-4">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="mpName">MP Name</Label>
                  <Input
                    id="mpName"
                    value={formData.mpName}
                    onChange={(e) => setFormData(prev => ({ ...prev, mpName: e.target.value }))}
                    placeholder="Enter MP's full name"
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="constituency">Constituency</Label>
                  <Input
                    id="constituency"
                    value={formData.constituency}
                    onChange={(e) => setFormData(prev => ({ ...prev, constituency: e.target.value }))}
                    placeholder="Enter constituency name"
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="county">County</Label>
                  <Input
                    id="county"
                    value={formData.county}
                    onChange={(e) => setFormData(prev => ({ ...prev, county: e.target.value }))}
                    placeholder="Enter county name"
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="deadline">Petition Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Grounds for Recall */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-green-900 mb-4">Grounds for Recall</h3>
              <p className="text-green-700 mb-6">Select all applicable grounds (minimum 1 required):</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableGrounds.map((ground) => (
                  <div key={ground} className="flex items-center space-x-3 p-3 border border-green-200 rounded-lg">
                    <Checkbox
                      id={ground}
                      checked={formData.grounds.includes(ground)}
                      onCheckedChange={(checked) => handleGroundsChange(ground, checked as boolean)}
                    />
                    <label htmlFor={ground} className="text-sm font-medium text-green-900 cursor-pointer">
                      {ground}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Petition Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-green-900 mb-4">Petition Details</h3>
              
              <div>
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide detailed reasons for the recall petition..."
                  rows={6}
                  className="border-green-200 focus:border-green-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="signatureTarget">Signature Target</Label>
                  <Input
                    id="signatureTarget"
                    type="number"
                    value={formData.signatureTarget}
                    onChange={(e) => setFormData(prev => ({ ...prev, signatureTarget: parseInt(e.target.value) || 0 }))}
                    placeholder="30% of registered voters"
                    className="border-green-200 focus:border-green-500"
                  />
                  <p className="text-xs text-green-600 mt-1">Minimum 30% of registered voters required</p>
                </div>
                
                <div>
                  <Label htmlFor="wardTarget">Ward Coverage Target</Label>
                  <Input
                    id="wardTarget"
                    type="number"
                    value={formData.wardTarget}
                    onChange={(e) => setFormData(prev => ({ ...prev, wardTarget: parseInt(e.target.value) || 0 }))}
                    placeholder="Number of wards to cover"
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review and Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-green-900 mb-4">Review Your Petition</h3>
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>MP Name:</strong> {formData.mpName}
                  </div>
                  <div>
                    <strong>Constituency:</strong> {formData.constituency}
                  </div>
                  <div>
                    <strong>County:</strong> {formData.county}
                  </div>
                  <div>
                    <strong>Deadline:</strong> {formData.deadline}
                  </div>
                  <div className="md:col-span-2">
                    <strong>Grounds:</strong> {formData.grounds.join(', ')}
                  </div>
                  <div>
                    <strong>Signature Target:</strong> {formData.signatureTarget.toLocaleString()}
                  </div>
                  <div>
                    <strong>Ward Target:</strong> {formData.wardTarget}
                  </div>
                </div>
                
                <div className="mt-4">
                  <strong>Description:</strong>
                  <p className="mt-2 text-gray-700">{formData.description}</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Legal Notice:</strong> By submitting this petition, you confirm that all information is accurate 
                  and that you have legal grounds for this recall as per Article 104 of the Constitution of Kenya.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              variant="outline"
              className="border-green-600 text-green-600"
            >
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && (!formData.mpName || !formData.constituency || !formData.county)) ||
                  (currentStep === 2 && formData.grounds.length === 0) ||
                  (currentStep === 3 && (!formData.description || !formData.signatureTarget))
                }
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit Petition
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PetitionWizard;
