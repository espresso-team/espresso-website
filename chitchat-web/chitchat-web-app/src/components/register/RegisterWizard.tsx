import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import MBTISurveyComponent from './mbti/MBTISurveyComponent';
import MBTIComponent from './mbti/MBTIComponent';

interface MBTISurveyComponentProps {
  onMBTITypeChange: (value: string) => void;
}

const mbtiQuestions = ["和一群人party一天后", "晚上看完抽象艺术展回家", "刷到乞讨老人的视频", "当接到一项工作/任务时"];
const mbtiOptions = [["救命！急需独处回血！", "明天咱还能聚一回吗"], ["满脑子想法乱窜到后半夜", "呀！困了...睡"], ["从 他怎么了 联想到 天下苍生", "世界就是这样 默默滑过"], ["马上开始行动计划", "卧敲！明天要交？"]];


const RegisterWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mbtiType, setMBTIType] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const questionsScores = [1, 2, 4, 8];
  // TODO: post the mbti score to backend in step 9
  const mbtiScore = selectedOptions.reduce((a, b) => a + b, 0);
  
  const handleOptionClick = (questionIndex: number, option: number) => {
    const newOptions = [...selectedOptions];
    newOptions[questionIndex] = questionsScores[questionIndex] * option;
    setSelectedOptions(newOptions);
  };

  const nextXSteps = (x: number) => {
    setCurrentStep(currentStep + x);
  };
  
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const prevXStep = (x: number) => {
    setCurrentStep(currentStep - x);
  };

  const mockSubmit = () => {
    // Mock submit function
  }

  return (
    <div>
      {currentStep === 0 && <ProfileCard headline="Step 1" progressBarPercent={0} onNext={nextStep} onSubmit={mockSubmit} onPrevious={() => { }}>ChildNode will be added here: step1</ProfileCard>}
      {currentStep === 1 && <ProfileCard headline="Step 2" progressBarPercent={10} onNext={nextStep} onSubmit={mockSubmit} onPrevious={prevStep}>ChildNode will be added here: step2</ProfileCard>}
      {currentStep === 2 && <ProfileCard headline="Step 3" progressBarPercent={20} onNext={nextStep} onSubmit={mockSubmit} onPrevious={prevStep}>ChildNode will be added here: step3</ProfileCard>}
      {currentStep === 3 && <ProfileCard headline="MBTI 小调查" progressBarPercent={30} onNext={() => {
        if (mbtiType === "IDK") {
          nextStep();
        } else {
          nextXSteps(5);
        }
      }} onSubmit={mockSubmit} onPrevious={prevStep}><MBTISurveyComponent onMBTITypeChange={setMBTIType} ></MBTISurveyComponent></ProfileCard>}
      {currentStep === 4 && <ProfileCard headline="MBTI 小调查" progressBarPercent={40} onNext={nextStep} onSubmit={mockSubmit} onPrevious={prevStep}><MBTIComponent question={mbtiQuestions[0]} option1={mbtiOptions[0][0]} option2={mbtiOptions[0][1]} onOptionSelect={handleOptionClick.bind(null, 0)}></MBTIComponent></ProfileCard>}
      {currentStep === 5 && <ProfileCard headline="MBTI 小调查" progressBarPercent={50} onNext={nextStep} onSubmit={mockSubmit} onPrevious={prevStep}><MBTIComponent question={mbtiQuestions[1]} option1={mbtiOptions[1][0]} option2={mbtiOptions[1][1]} onOptionSelect={handleOptionClick.bind(null, 1)}></MBTIComponent></ProfileCard>}
      {currentStep === 6 && <ProfileCard headline="MBTI 小调查" progressBarPercent={60} onNext={nextStep} onSubmit={mockSubmit} onPrevious={prevStep}><MBTIComponent question={mbtiQuestions[2]} option1={mbtiOptions[2][0]} option2={mbtiOptions[2][1]} onOptionSelect={handleOptionClick.bind(null, 2)}></MBTIComponent></ProfileCard>}
      {currentStep === 7 && <ProfileCard headline="MBTI 小调查" progressBarPercent={70} onNext={nextStep} onSubmit={mockSubmit} onPrevious={prevStep}><MBTIComponent question={mbtiQuestions[3]} option1={mbtiOptions[3][0]} option2={mbtiOptions[3][1]} onOptionSelect={handleOptionClick.bind(null, 3)}></MBTIComponent></ProfileCard>}
      {currentStep === 8 && <ProfileCard headline="Step 9" progressBarPercent={80} onNext={nextStep} onSubmit={mockSubmit} onPrevious={() => {
        if (mbtiType === "IDK") {
          prevStep();
        } else {
          prevXStep(5);
        }
      }}>ChildNode will be added here: step9</ProfileCard>}
      {currentStep === 9 && <ProfileCard headline="Step 10" progressBarPercent={90} onNext={() => { }} onSubmit={mockSubmit} onPrevious={prevStep} >ChildNode will be added here: step10</ProfileCard>}
    </div>
  );
}

export default RegisterWizard;
