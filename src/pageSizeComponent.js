import React from 'react';

import CustomDropdown from './components/CustomDropdown/CustomDropdown.jsx';

export default function Dropdup(){
  return (
    <CustomDropdown
      dropup
      dropdownHeader="Dropdown header"
      buttonText="Dropup"
      buttonProps={{
        round: true,
        color: "info"
      }}
      dropdownList={[
        "Action",
        "Another action",
        "Something else here",
        {divider: true},
        "Separated link",
        {divider: true},
        "One more separated link",
      ]}
    />
  );
}