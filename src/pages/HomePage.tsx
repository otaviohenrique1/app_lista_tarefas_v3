import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { NativeStackRootStaticParamList } from './routes';
import { ItemLista } from '../components/ItemLista';
import Container from '../components/Container';
import { TarefaDatabase, useTarefaDatabase } from '../database/useTarefaDatabase';
import { useEffect, useState } from 'react';

type Props = NativeStackScreenProps<NativeStackRootStaticParamList, "HomePage">;

export default function HomePage({ navigation }: Props) {
  const [tarefas, setTarefas] = useState<TarefaDatabase[]>([]);
  const tarefaDatabase = useTarefaDatabase();

  async function buscaTodos() {
    const resposta = await tarefaDatabase.listarTodos();
    setTarefas(resposta);
  }

  useEffect(() => {
    buscaTodos();
  }, [tarefas])

  return (
    <Container>
      <Appbar.Header dark style={styles.appbar}>
        <Appbar.Content title="HomePage" />
        {/* <Appbar.Action icon="plus" onPress={() => navigation.push("Formulario")} /> */}
      </Appbar.Header>
      <FlatList
        data={tarefas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ItemLista item={item} navigation={navigation} />
        )}
        contentContainerStyle={styles.listaEstilo}
      />
      <View style={styles.itemVazio}></View>
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
  },
  listaEstilo: {
    gap: 16,
  }
});
