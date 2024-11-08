import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { NativeStackRootStaticParamList } from './routes';
import { ItemLista } from '../components/ItemLista';
import Container from '../components/Container';

type Props = NativeStackScreenProps<NativeStackRootStaticParamList, "HomePage">;

export default function HomePage({ navigation }: Props) {
  return (
    <Container>
      <Appbar.Header dark style={styles.appbar}>
        <Appbar.Content title="HomePage" />
        <Appbar.Action icon="plus" onPress={() => navigation.push("Formulario")}/>
      </Appbar.Header>
      <ItemLista />
      <ItemLista />
      <ItemLista />
      <ItemLista />
      <ItemLista />
    </Container>
  );
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "cadetblue",
  },
});
