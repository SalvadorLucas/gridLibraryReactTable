import React from 'react';
import CustomDropdown from '../CustomDropdown/CustomDropdown.js';

export default function DropDown(props){
const [buttonText, setButtonText] = React.useState({text: '10'})

const onClick = key =>{
    props.onChange(key)
    setButtonText({
        text: key
    })
}
    return(
        <CustomDropdown
            hoverColor="success"
            onClick={(key)=>onClick(key)}
            buttonText={buttonText.text}
            buttonProps={{
                round: true,
                style: { marginBottom: "0", width: "1px"},
                color: "transparent"
            }}
            dropdownHeader="Select Rows to Show"
            dropdownList={[
                "10",
                "20",
                { divider: true },
                "30"
            ]}
        />
    )
}