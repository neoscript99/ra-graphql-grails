import React from 'react';
import get from 'lodash/get';

const VisibleUI = ({ source, children, label, record = {}, ...rest }) => {
  if (get(record, source))
    return React.Children.map(
      children,
      child =>
        React.cloneElement(child, {
          record,
          ...rest,
        })
    );
  else
    return null;
};

VisibleUI.defaultProps = {
  label: ' ',
};

export default VisibleUI;