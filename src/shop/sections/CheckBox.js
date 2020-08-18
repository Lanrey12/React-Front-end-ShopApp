import React, { Fragment, useState } from "react";
import { Checkbox, Collapse } from "antd";
import "antd/dist/antd.css";

const { Panel } = Collapse;



function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {
         const currentIndex = Checked.indexOf(value)
         const newChecked = [...Checked]

         if(currentIndex === -1){
             newChecked.push(value)
         }else{
             newChecked.splice(currentIndex, 1)
         }
         setChecked(newChecked)
         props.handleFilters(newChecked)
    }
    
    const renderChecboxList = () => 
     props.list && props.list.map((value, index) => (
        <Fragment key={index}>
          <Checkbox onChange={() => handleToggle(value._id)} 
          type="checkbox"
           checked={Checked.indexOf(value._id) === -1 ? false : true} />
          <span>{value.name}</span>
        </Fragment>
     ))


  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Continents" key="1">
          {renderChecboxList()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
