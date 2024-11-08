import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { NativeStackRootStaticParamList } from './routes';
import { ItemLista } from '../components/ItemLista';
import Container from '../components/Container';

type Props = NativeStackScreenProps<NativeStackRootStaticParamList, "HomePage">;

export default function HomePage({ navigation }: Props) {
  return (
    <Container>
      <Appbar.Header dark style={styles.appbar}>
        <Appbar.Content title="HomePage" />
        {/* <Appbar.Action icon="plus" onPress={() => navigation.push("Formulario")} /> */}
      </Appbar.Header>
      <ScrollView style={styles.itemVazio}>
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <View style={styles.itemVazio}></View>
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push("Formulario")}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "cadetblue",
  },
  itemVazio: {
    height: 80,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});
