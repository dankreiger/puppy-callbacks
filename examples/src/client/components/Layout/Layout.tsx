import React from 'react';
import { Container } from '@graffft-waggle/container';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styled from 'styled-components';
const ContainerSt = styled(Container)`
  padding-top: 40px;
  padding-bottom: 40px;
`;

export default ({ children }: { children: React.ReactNode }): JSX.Element => (
  <>
    <Header />
    <ContainerSt>{children}</ContainerSt>
    <Footer />
  </>
);
