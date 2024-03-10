import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';

// Styled button component
const StyledButton = styled(TouchableOpacity)`
  background-color: #a718b9;
  width: fit-content;
  padding: 0.5rem 0.5rem;
  border-radius: 200px;
  align-items: center;
  justify-content: center;
`;

// Styled text component for the button's label
const ButtonText = styled(Text)`
  color: #ffffff;
  font-weight: 600;
`;

// Usage example
export const CustomButton = ({ onPress, title }) => {
	return (
		<StyledButton onPress={onPress}>
			<ButtonText>{title}</ButtonText>
		</StyledButton>
	)
}
