import React from 'react';
import { SimpleFooter } from '@graffft-waggle/simple-footer';
import { CircleBadge } from '@graffft-waggle/circle-badge';
import { Icon, IconType, IconMap } from '@graffft-waggle/icon';
import { Colors } from '@graffft-waggle/themes-portfolio';

const footerItems = [
  {
    key: IconType.GITHUB,
    navItem: (
      <a
        style={{ textDecoration: 'none' }}
        href="https://github.com/dankreiger"
      >
        <CircleBadge key={IconType.GITHUB} size="40px">
          <Icon
            title={IconType.GITHUB}
            color={IconMap.get(IconType.GITHUB).defaultColor}
          />
        </CircleBadge>
      </a>
    ),
    navItemColor: '#fff',
  },

  {
    key: IconType.STACKOVERFLOW,
    navItem: (
      <a
        style={{ textDecoration: 'none' }}
        href="https://stackoverflow.com/users/3922099/dan-kreiger"
      >
        <CircleBadge key={IconType.STACKOVERFLOW} size="40px">
          <Icon
            title={IconType.STACKOVERFLOW}
            color={IconMap.get(IconType.STACKOVERFLOW).defaultColor}
          />
        </CircleBadge>
      </a>
    ),
    navItemColor: '#fff',
  },
];

const staticProps = {
  footerBgColor: Colors.Primary,
  footerCopyrightText: `Dan Kreiger ${new Date().getFullYear()}`,
  footerCopyrightTextColor: '#fff',
  footerItems,
  customScss: '',
};

export default () => {
  return <SimpleFooter {...staticProps} />;
};
