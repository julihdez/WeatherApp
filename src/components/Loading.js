import { CircularProgress } from '@material-ui/core';
import React from 'react';

function Loading(){
	const [progress, setProgress] = React.useState(10);

	React.useEffect(() => {
	  const timer = setInterval(() => {
		setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
	  }, 550);
  
	  return () => {
		clearInterval(timer);
	  };
	}, []);
  
	return (
		<div className="d-flex flex-row position-absolute h-75 w-100 justify-content-center align-items-center">
			     <CircularProgress size={90} variant="determinate" value={progress} />
		</div>
	);
}


export default Loading;