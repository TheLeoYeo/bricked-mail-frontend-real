import React from 'react'
import styled from "styled-components/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, View } from 'react-native';

import { useAppContext } from '../AppProvider';
const StyledRefreshIcon = styled(Icon)`
  color: #ffffff;/* Set the icon color */
  font-size: 18px; /* Set the icon size */
  opacity: 0.7;
  &:hover {
    opacity: 1;
    color: white; /* Change color on hover */
  }
`;

const StyledMenuIcon = styled(Icon)`
  color: white;/* Set the icon color */
  font-size: 17px; /* Set the icon size */
  &:hover {
    opacity: 1;
    color: #c12cf3; /* Change color on hover */
  }
  position: absolute;
  left: 1em;
`;

const AppText = styled.Text`
  color: white;
`

const DailySummary = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  padding-top: 3em;
  padding-inline: 4em;
  box-sizing: border-box;
  position: relative;
  padding-bottom: 1em;
`

const SummaryText = styled.Text`
	text-align: center;
	color: white;
	font-size: 18px;
  padding-bottom: 10px;
`

const Heading2 = styled.Text`
  font-weight: bold;
`

const LightText = styled.Text`
  font-weight:100;
  color: white;
`

const ImportantText = styled.Text`
  font-weight: 400;
  color: #e19200;
`

const UrgentText = styled.Text`
  font-weight: bold;
  color: #d70505;
`

const NavigationBar = styled.View`
    width: 100%;
    height: fit-content;
    padding: 1em;
    min-height: 1.5em;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    background-color: #000000;
`

const StatusBar = styled.View`
  height: 1em;
  font-family: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif';
  font-weight: 200;
  margin-bottom: 1em;
  padding-left: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    width: fit-content;
  }
  font-size: 14px;
  padding: 1em;
  color: white;
`

export const EmailSummary = () => {
  const context = useAppContext();
  const importantEmails = context.emails.reduce((count, item) => count + (item.importance >= 7 ? 1 : 0), 0); 
  const urgentEmails = context.emails.reduce((count, item) => count + (item.importance >= 9 ? 1 : 0), 0); 

  const requestNewSummary = () => {
    context.socket.emit('request-summary', true);
    context.setAnalysis(null);
    console.log("Requesting a new summary")
  }

	return (
		<View>
			<DailySummary>
				<SummaryText>{context.analysis  ? `〞${context.analysis}〞`: "Loading email summary ..."}</SummaryText>
				<StyledRefreshIcon name='refresh' onClick={requestNewSummary}/>
			</DailySummary>
			<StatusBar>
				<AppText>
					<LightText>
            {`Last updated ${context.lastUpdated ? new Date(context.lastUpdated).toLocaleTimeString() : 'never'} ago `}
          </LightText>
          |
          <UrgentText>{` ${urgentEmails} urgent `}</UrgentText>
        | <ImportantText>{`${importantEmails} important`}</ImportantText>
				</AppText>
			</StatusBar>
		</View>
	)
}
