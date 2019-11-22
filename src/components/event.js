import styled from 'styled-components/native';
import { colors } from '../assets/colors';

export const NoEvents = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Event = styled.View`
  flex-direction: row;
  background-color: white;
  border-radius: 2px;
  margin-right: 10px;
  margin-top: 17px;
  ${({ isFithubEvent }) =>
    isFithubEvent
      ? `
  border-left-color: ${colors.accent};
  border-left-width: 4px;
  border-style: solid;
  `
      : ''}
`;

export const EventLeft = styled.View`
  padding: 18px;
  flex: 5;
`;

export const EventRight = styled.View`
  padding: 18px;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-end;
`;

export const EventTime = styled.View`
  margin-bottom: 12px;
`;

export const EventTimeText = styled.Text`
  font-weight: 400;
  color: ${colors.purple.lighter};
`;

export const EventName = styled.View`
  margin-bottom: 12px;
`;

export const EventNameText = styled.Text`
  font-size: 20px;
  font-weight: 300;
  color: ${colors.purple.dark};
`;

export const EventDetails = styled.View``;

export const EventDetailsText = styled.Text`
  color: ${colors.grey.dark};
`;
