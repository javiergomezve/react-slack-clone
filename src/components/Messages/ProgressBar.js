import React from 'react';
import { Progress } from 'semantic-ui-react';

const ProgressBar = ({ uploadState, percentageUploaded }) => (
  uploadState && (
    <Progress className="progress__bar" percent={percentageUploaded} progress
      indicating size="medium" inverted />
  )
);

export default ProgressBar;