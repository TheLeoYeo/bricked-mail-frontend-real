import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './navigation/DrawerNavigator';
import { AppProvider } from './AppProvider';

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer >
          <DrawerNavigator/>
      </NavigationContainer>
    </AppProvider>
  );
}