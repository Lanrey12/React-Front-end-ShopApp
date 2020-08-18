import React, { useState } from "react";
import { Radio, Collapse } from "antd";
import "antd/dist/antd.css";

const { Panel } = Collapse;



function RadioButton(props) {

    const [Value, setValue] = useState('0')

    const renderRadioBox = () => (
       props.list && props.list.map((value) => (
            <Radio key= {value._id}
            value={`${value._id}`}>
                {value.name}
            </Radio>
        ))
    )

    const handleChange = (event) => {
       setValue(event.target.value)
       props.handleFilters(event.target.value)
    }

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="price" key="1">
          <Radio.Group 
          onChange = {handleChange}
          value= {Value}
          >
              {renderRadioBox()}
              
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioButton;
