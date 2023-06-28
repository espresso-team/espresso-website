import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import MBTISurveyComponent from './mbti/MBTISurveyComponent';
import MBTIComponent from './mbti/MBTIComponent';
import UserTagSelection from './userTag/UserTagSelection';

interface MBTISurveyComponentProps {
  onMBTITypeChange: (value: string) => void;
}

interface MBTIComponentWrapperProps {
  question: string;
  options: string[];
  onOptionSelect: (option: number) => void;
}

const MBTIComponentWrapper: React.FC<MBTIComponentWrapperProps> = ({
  question,
  options,
  onOptionSelect
}) => {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionSelect = (option: number) => {
    setSelectedOption(option);
    onOptionSelect(option);
  };

  return (
    <MBTIComponent
      question={question}
      option1={options[0]}
      option2={options[1]}
      selectedOption={selectedOption}
      onOptionSelect={handleOptionSelect}
    />
  );
};

const RegisterWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mbtiType, setMBTIType] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  // TODO: post the selectedTags to backend
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const questionsScores = [1, 2, 4, 8];
  const mbtiQuestions = ["和一群人party一天后", "晚上看完抽象艺术展回家", "刷到乞讨老人的视频", "当接到一项工作/任务时"];
  const mbtiOptions = [
    ["救命！急需独处回血！", "明天咱还能聚一回吗"],
    ["满脑子想法乱窜到后半夜", "呀！困了...睡"],
    ["从他怎么了联想到天下苍生", "世界就是这样默默滑过"],
    ["马上开始行动计划", "卧敲！明天要交？"]
  ];
  // TODO: store the mbtiScore in state and post to backend
  // TODO: if user select MBTI type, transform into a score
  const mbtiScore = selectedOptions.reduce((accumulator, current, index) => {
    return accumulator + (current * questionsScores[index]);
  }, 0);

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };
  
  const handleOptionClick = (questionIndex: number, option: number) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = option;
    setSelectedOptions(newSelectedOptions);
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
      {currentStep >= 4 && currentStep <= 7 && (
        <ProfileCard
          headline="MBTI 小调查"
          progressBarPercent={30 + (currentStep - 3) * 10}
          onNext={nextStep}
          onSubmit={mockSubmit}
          onPrevious={prevStep}
        >
          <MBTIComponentWrapper
            question={mbtiQuestions[currentStep - 4]}
            options={mbtiOptions[currentStep - 4]}
            onOptionSelect={handleOptionClick.bind(null, currentStep - 4)}
          />
        </ProfileCard>
      )}
      {currentStep === 8 && <ProfileCard headline="请选择最符合你的几项" progressBarPercent={80} onNext={nextStep} onSubmit={mockSubmit} onPrevious={() => {
        if (mbtiType === "IDK") {
          prevStep();
        } else {
          prevXStep(5);
        }
      }}><UserTagSelection onTagsChange={handleTagsChange} /></ProfileCard>}
      {currentStep === 9 && <ProfileCard headline="Step 10" progressBarPercent={90} onNext={() => { }} onSubmit={mockSubmit} onPrevious={prevStep} >ChildNode will be added here: step10</ProfileCard>}
    </div>
  );
}

export default RegisterWizard;
