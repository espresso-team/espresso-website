import React, { useState } from 'react';
import ProfileCard from './ProfileCard';

const RegisterWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const mockSubmit = () => {

  }

  return (
    <div>
      {currentStep === 0 && <ProfileCard headline="Step 1" progressBarPercent={0} onNext={nextStep} onSubmit={mockSubmit} onPrevious={() => { }}>ChildNode will be added here: step1</ProfileCard>}
      {currentStep === 1 && <ProfileCard headline="Step 2" progressBarPercent={50} onNext={nextStep} onSubmit={mockSubmit} onPrevious={prevStep}>ChildNode will be added here: step2</ProfileCard>}
      {currentStep === 2 && <ProfileCard headline="Step 3" progressBarPercent={100} onNext={() => { }} onSubmit={mockSubmit} onPrevious={prevStep} >ChildNode will be added here: step3</ProfileCard>}
    </div>
  );
}

export default RegisterWizard;
