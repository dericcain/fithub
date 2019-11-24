import styled from 'styled-components/native/dist/styled-components.native.esm';
import { colors } from '../assets/colors';

export const Container = styled.View`
  flex: 1;
`;
export const Top = styled.View`
  height: 300px;
  width: 100%;
  padding: 36px;
  justify-content: center;
  align-items: center;
`;
export const Middle = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  padding: 24px;
`;
export const Bottom = styled.View`
  flex: 3;
  padding: 24px;
  align-items: center;
  background-color: ${ colors.purple.dark };
`;
export const HeaderImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 220px;
`;
export const ZipContainer = styled.View`
  max-width: 200px;
`;
export const VeryBottom = styled.View`
  padding: 24px;
`;
export const SpecialtiesContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;
export const SpecialtyLeft = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
  padding: 6px;
`;
export const SpecialtyRight = styled(SpecialtyLeft)`
  align-items: flex-start;
`;
