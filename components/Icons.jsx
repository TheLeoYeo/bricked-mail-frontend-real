import styled from "styled-components/native";
import Icon from 'react-native-vector-icons/MaterialIcons';


const RefreshIcon = () => {
    return <Icon name = "refresh"/>
}

export const StyledRefreshIcon = styled(RefreshIcon)`
  color: #ffffff;/* Set the icon color */
  font-size: 24px; /* Set the icon size */
  opacity: 1;
`