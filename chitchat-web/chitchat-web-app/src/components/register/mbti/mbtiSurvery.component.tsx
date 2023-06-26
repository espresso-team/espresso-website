import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MBTIComponent from "./mbti.component";

const MBTISurveyComponent = () => {
  const navigate = useNavigate();
  const [mbtiType, setMBTIType] = useState("");

  const handleMBTITypeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMBTIType(event.target.value);
  };

  const handleStartSurvey = () => {
    if (mbtiType === "IDK") {
      // Redirect to the four MBTI questions pages
      navigate("/mbti/question1");
    } else {
      // Send the mbit info to backend
    }
  };

  const handleFinishSurvey = () => {
    // Send the survey answers to the backend
    // ...
    // Redirect to the completion page
    navigate("/mbti/completion");
  };

  return (
    <div>
      <h1>MBTI 小调查</h1>
      <p>选择你的MBTI人格:</p>
      <select value={mbtiType} onChange={handleMBTITypeChange}>
        <option value="">请选择你的MBTI人格</option>
        <option value="IDK">我不知道</option>
        <option value="ISTJ">ISTJ - 检查员人格</option>
        <option value="ISFJ">ISFJ - 提供者人格</option>
        <option value="INFJ">INFJ - 占卜师人格</option>
        <option value="INTJ">INTJ - 建筑师人格</option>
        <option value="ISTP">ISTP - 冒险家人格</option>
        <option value="ISFP">ISFP - 艺术家人格</option>
        <option value="INFP">INFP - 中介者人格</option>
        <option value="INTP">INTP - 逻辑学家人格</option>
        <option value="ESTP">ESTP - 实干家人格</option>
        <option value="ESFP">ESFP - 表演家人格</option>
        <option value="ENFP">ENFP - 公关人员人格</option>
        <option value="ENTP">ENTP - 发明家人格</option>
        <option value="ESTJ">ESTJ - 执行官人格</option>
        <option value="ESFJ">ESFJ - 主人人格</option>
        <option value="ENFJ">ENFJ - 教师人格</option>
        <option value="ENTJ">ENTJ - 统帅人格</option>
      </select>
      <button onClick={handleStartSurvey}>确认</button>

      <button onClick={handleFinishSurvey}>继续</button>
    </div>
  );
};

export default MBTISurveyComponent;
