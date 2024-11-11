import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import Formulario from './Formulario';
import Detalhes from './Detalhes';

export type NativeStackRootStaticParamList = {
  HomePage: undefined;
  Formulario: undefined;
  Formulario2: undefined;
  Detalhes: {
    id: number;
  };
};

const Stack = createNativeStackNavigator<NativeStackRootStaticParamList>();

export function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Formulario" component={Formulario} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
