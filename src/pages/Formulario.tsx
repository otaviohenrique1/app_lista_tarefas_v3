import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { NativeStackRootStaticParamList } from './routes';
import Container from '../components/Container';

type Props = NativeStackScreenProps<NativeStackRootStaticParamList, "Formulario">;

export default function Formulario({ navigation }: Props) {
  return (
    <Container>
      <Appbar.Header dark  style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Formulario" />
      </Appbar.Header>
    </Container>
  );
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "cadetblue",
  },
});
