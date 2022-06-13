import React from 'react';

const usePrevious = (value, initialValue) => {
  const ref = React.useRef();

  ref.current = initialValue;

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
