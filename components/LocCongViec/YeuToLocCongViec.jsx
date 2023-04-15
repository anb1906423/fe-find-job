import React, { useState } from 'react'
import { Checkbox } from 'antd';


const YeuToLocCongViec = (props) => {
    const [checked, setChecked] = useState(false);

    const onChange = (e) => {
        const checkedValue = e.target.checked;
        setChecked(checkedValue);
        props.onCheckedChange({ checked: checkedValue, element: props.element });
    };

    return (
        <div>
            <Checkbox onChange={onChange} checked={checked}>
                {props.element}
            </Checkbox>
        </div>
    )
}

export default YeuToLocCongViec