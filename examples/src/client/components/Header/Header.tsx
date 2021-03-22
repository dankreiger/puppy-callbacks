import React from 'react';
import { Kopf } from '@graffft-waggle/kopf';
import * as props from './constants';
import useMenuToggler from './useMenuToggler';

export default (): JSX.Element => {
  const togglerProps = useMenuToggler();
  return <Kopf {...props} {...togglerProps} />;
};
