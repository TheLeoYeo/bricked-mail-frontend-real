import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { EmailsScreen } from '../screens/EmailsScreen'
import { SettingsScreen } from '../screens/SettingsScreen'
import styled from 'styled-components/native';


const Drawer = createDrawerNavigator();

const StyledDrawerContentScrollView = styled(DrawerContentScrollView)`
  background-color: #111;
`

const StyledDrawerList = styled(DrawerItemList)`
  color: white;
`

function CustomDrawerContent(props) {
  const { state } = props;
  // Extract the routes and navigation object
  const { routes, index } = state;
  const { navigate } = props.navigation;

  return (
    <StyledDrawerContentScrollView {...props}>
      {routes.map((route, i) => {
        // Determine if the route is the currently active route
        const isFocused = i === index;

        return (
          <DrawerItem
            key={route.key}
            label={route.name}
            focused={isFocused}
            onPress={() => navigate(route.name)}
            // Additional customization based on `isFocused` or `route.name` can be applied here
            labelStyle={{ color: isFocused ? '#ffffff' : '#646464' }}
            style={{ backgroundColor: isFocused ? '#a718b9' : 'transparent' }}
          />
        );
      })}
      {/* Add more custom components or items here */}
    </StyledDrawerContentScrollView>
  );
}

export const DrawerNavigator = () => {

  return (
      <Drawer.Navigator initialRouteName="Emails"
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          
        }}
      >
        <Drawer.Screen name="Emails" component={EmailsScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
  )
}
