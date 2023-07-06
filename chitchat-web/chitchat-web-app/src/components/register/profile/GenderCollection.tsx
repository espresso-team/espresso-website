import React from 'react';
import { Radio } from 'antd';
import GenderType from '../../../types/GenderType';

interface GenderCollectionProps {
  selectedOption?: GenderType | undefined;
  onSelectOption: (option: GenderType) => void;
}

const GenderCollection: React.FC<GenderCollectionProps> = ({
  selectedOption,
  onSelectOption
}) => {
  return (
    <div>
      <Radio.Group
        value={selectedOption}
        onChange={(e) => onSelectOption(e.target.value)}
      >
        <Radio value={GenderType.MALE}>男</Radio>
        <Radio value={GenderType.FEMALE}>女</Radio>
        <Radio value={GenderType.OTHER}>保密</Radio>
      </Radio.Group>
    </div>
  );
};

export default GenderCollection;