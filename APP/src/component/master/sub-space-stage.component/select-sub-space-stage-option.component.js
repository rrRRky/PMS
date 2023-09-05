import React, { useState, useEffect } from 'react';
import { AgSelectCellEditor } from 'ag-grid-react';

const StageSelectCellEditor = (props) => {
  const { stages } = props; // Ensure that props.stages is defined

  // Initialize selectedStage state and handleStageChange function as before
  const [selectedStage, setSelectedStage] = useState(null);

  useEffect(() => {
    setSelectedStage(props.value);
  }, [props.value]);

  const handleStageChange = (event) => {
    const selectedStageName = event.target.value;
    const selectedStage = stages.find((stage) => stage.name === selectedStageName);
    setSelectedStage(selectedStage);
    console.log('selected satge id' , selectedStageName);
  };

  const getValue = () => {
    return selectedStage ? selectedStage.id : null;
  };

  return (
    <div>
      <select
        className="ag-input"
        onChange={handleStageChange}
        value={selectedStage ? selectedStage.name : ''}
      >
        {stages.map((stage) => (
          <option key={stage.id} value={stage.id}>
            {stage.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StageSelectCellEditor;
