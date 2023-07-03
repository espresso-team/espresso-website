import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import MBTISurveyComponent from './mbti/MBTISurveyComponent';
import MBTIComponent from './mbti/MBTIComponent';
import UserTagSelection from './userTag/UserTagSelection';
import AvatarSelection from './avatar/AvatarSelction';
import GenericCollection from './profile/GenericCollection';
import GenderCollection from './profile/GenderCollection';
import { usePkSystemHook } from '../../state/pk-system-hook';
import GenderType from '../../types/GenderType';

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
  const [state, action] = usePkSystemHook();
  const [nickname, setNickname] = useState("");
  const [dob, setDOB] = useState(new Date());
  const [gender, setGender] = useState(GenderType.UNKNOWN);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
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
  const handleNicknameChange = (nickname: string) => {
    setNickname(nickname);
  };
  const handleDOBChange = (dob: Date) => {
    setDOB(dob);
  };
  const handleGenderChange = (gender: GenderType) => {
    setGender(gender);
  };
  const handlePhoneNumberChange = (phoneNumber: string) => {
    setPhoneNumber(phoneNumber);
  };
  const handleAvatarUrlChange = (avatarUrl: string) => {
    setAvatarUrl(avatarUrl);
  };

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

  const emptySubmit = () => {

  }

  const nickNameSubmit = () => {
    nickname && action.setProfileNickname(nickname);
  }

  const birthdaySubmit = () => {
    dob && action.setProfileBirthday(dob);
  }

  const genderSubmit = () => {
    gender && action.setProfileGender(gender);
  }

  const phoneNumberSubmit = () => {
    phoneNumber && action.setProfilePhoneNumber(phoneNumber);
  }

  const avatarUrlSubmit = () => {
    avatarUrl && action.setProfileAvatar(avatarUrl);
  }

  const mbtiSubmit = () => {
    mbtiScore && action.setProfileMbtiScore(mbtiScore);
  }

  const selectedTagsSubmit = () => {
    selectedTags && action.setProfileSelectedTags(selectedTags);
  }

  const profileSubmit = () => {
    console.log("submitting profile", state.user.profile);
    // TBD: Call backend
  }

  return (
    <div>
      {currentStep === 0 && <ProfileCard headline="昵称" progressBarPercent={8} onNext={nextStep} onSubmit={nickNameSubmit} onPrevious={prevStep} isAllowGoBack={false}><GenericCollection inputType='text' value={nickname} onInputChange={handleNicknameChange} /></ProfileCard>}
      {currentStep === 1 && <ProfileCard headline="生日" progressBarPercent={16} onNext={nextStep} onSubmit={birthdaySubmit} onPrevious={prevStep}><GenericCollection inputType='date' value={dob} onInputChange={handleDOBChange} /></ProfileCard>}
      {currentStep === 2 && <ProfileCard headline="性别" progressBarPercent={24} onNext={nextStep} onSubmit={genderSubmit} onPrevious={prevStep}><GenderCollection selectedOption={gender} onSelectOption={handleGenderChange} /></ProfileCard>}
      {currentStep === 3 && <ProfileCard headline="手机号" progressBarPercent={30} onNext={nextStep} onSubmit={phoneNumberSubmit} onPrevious={prevStep}><GenericCollection value={phoneNumber} inputType='text' onInputChange={handlePhoneNumberChange} /></ProfileCard>}
      {currentStep === 4 && <ProfileCard headline="选头像" progressBarPercent={35} onNext={nextStep} onSubmit={avatarUrlSubmit} onPrevious={prevStep}><AvatarSelection selectedAvatar={avatarUrl} onSelectAvatar={handleAvatarUrlChange} /></ProfileCard>}
      {currentStep === 5 && <ProfileCard headline="MBTI 小调查" progressBarPercent={40} onNext={() => {
        if (mbtiType === "IDK") {
          nextStep();
        } else {
          nextXSteps(5);
        }
      }} onSubmit={mbtiSubmit} onPrevious={prevStep}><MBTISurveyComponent onMBTITypeChange={setMBTIType} ></MBTISurveyComponent></ProfileCard>}
      {currentStep >= 6 && currentStep <= 9 && (
        <ProfileCard
          headline="MBTI 小调查"
          progressBarPercent={40 + (currentStep - 6) * 8}
          onNext={nextStep}
          onSubmit={mbtiSubmit}
          onPrevious={prevStep}
        >
          <MBTIComponentWrapper
            question={mbtiQuestions[currentStep - 7]}
            options={mbtiOptions[currentStep - 7]}
            onOptionSelect={handleOptionClick.bind(null, currentStep - 7)}
          />
        </ProfileCard>
      )}
      {currentStep === 10 && <ProfileCard headline="请选择最符合你的几项" progressBarPercent={85} onNext={nextStep} onSubmit={selectedTagsSubmit} onPrevious={() => {
        if (mbtiType === "IDK") {
          prevStep();
        } else {
          prevXStep(5);
        }
      }}><UserTagSelection onTagsChange={handleTagsChange} /></ProfileCard>}
      {currentStep === 11 && <ProfileCard headline="开始探索" progressBarPercent={100} onNext={() => { }} onSubmit={profileSubmit} onPrevious={prevStep} >这里可以放一些具体的instructions</ProfileCard>}
    </div>
  );
}

export default RegisterWizard;