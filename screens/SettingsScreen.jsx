import React from 'react'
import { CustomButton } from '../components/CustomButton';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppContext } from '../AppProvider';

const Container = styled.View`
	background: #000;
	overflow-y: scroll;
    overflow-x: clip;
    height: 100%;
	padding: 1rem;
`

const Header = styled.Text`
	font-weight: bold;
	color: white;
	font-size: 19px;
	padding-top: 2rem;
`

const StyledTextInput = styled.TextInput.attrs({
	placeholderTextColor: '#7a1187'
})`
	border-radius: 10px;
	border-width: 1px;
	border-color: #f07bff;
	height: 100px;
	color: white;
	font-weight: bold;
	white-space: wrap;
	padding: 1rem;
	margin: 0.7rem 0rem;
	font-weight: 200;
`

export const SettingsScreen = () => {
	const prefRef = React.useRef();
	const catRef = React.useRef();
	const [preferences, setPreferences] = React.useState('');
	const [categories, setCategories] = React.useState('');
	const context = useAppContext();

	React.useEffect(() => {
	  const loadStorageData = async () => {
		const storedPreferences = await AsyncStorage.getItem('preferences');
		const storedCategories = await AsyncStorage.getItem('categories');
		if (storedPreferences) setPreferences(JSON.parse(storedPreferences));
		if (storedCategories) setCategories(JSON.parse(storedCategories));
	  };
	  loadStorageData();
	}, []);
  
	const SaveChanges = async () => {
	  console.log("Saving changes: ", catRef.current.value, prefRef.current.value);
	  
	  await AsyncStorage.setItem('preferences', JSON.stringify(prefRef.current.value));
	  await AsyncStorage.setItem('categories', JSON.stringify(catRef.current.value));
	  context.socket.emit('update-user-categories', catRef.current.value);
	  context.socket.emit('update-user-preferences', prefRef.current.value);
	};

	return (
		<Container>
			<Header>Preferences</Header>
			<StyledTextInput
				multiline = {true}
				numberOfLines={8}
				onChangeText={setPreferences}
				placeholder='No Preferences'
				value={preferences}
				ref={prefRef}
			/>
			<Header>Categories</Header>
			<StyledTextInput
				multiline = {true}
				numberOfLines={8}
				onChangeText={setCategories}
				placeholder='No Categories'
				value={categories}
				ref={catRef}
			/>
			
			<CustomButton onPress={SaveChanges} title = "Save changes" />
		</Container>
	)
}
