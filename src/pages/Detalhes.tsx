import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Divider, Text } from 'react-native-paper';
import { NativeStackRootStaticParamList } from './routes';
import Container from '../components/Container';
import { TarefaDatabase, useTarefaDatabase } from '../database/useTarefaDatabase';
import { useEffect, useState } from 'react';

const dadosIniciais: TarefaDatabase = {
  id: 0,
  titulo: '',
  descricao: '',
  data_criacao: '',
  ativo: false,
};

type Props = NativeStackScreenProps<NativeStackRootStaticParamList, "Detalhes">;

export default function Detalhes({ navigation, route }: Props) {
  const [tarefa, setTarefa] = useState<TarefaDatabase>(dadosIniciais);
  const tarefaDatabase = useTarefaDatabase();

  const buscaUmaTarefa = async () => {
    const data = await tarefaDatabase.listarUm(id);
    setTarefa((data !== null) ? data : dadosIniciais);
  };

  useEffect(() => {
    buscaUmaTarefa();
  }, [tarefa])

  const { id } = route.params;

  return (
    <Container>
      <Appbar.Header dark style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="HomePage" />
      </Appbar.Header>
      <View style={styles.main}>
        <ScrollView>
          <Text variant="displaySmall" style={styles.texto}>{tarefa.titulo}</Text>
          <Text variant="bodyLarge" style={styles.texto}>{tarefa.descricao}</Text>
          <Divider />
          <Text variant="bodyLarge" style={styles.texto}>
            Data de criação: {tarefa.data_criacao}
          </Text>
        </ScrollView>
      </View>
      <View style={styles.botoes}>
        <Button
          mode="contained"
          style={styles.editar}
          onPress={() => navigation.push("FormularioEditar", { id: id })}
        >Editar</Button>
        <Button
          mode="outlined"
          onPress={() => {}}
        >Remover</Button>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "cadetblue",
  },
  main: {
    padding: 20,
    flex: 1,
  },
  texto: {
    textAlign: "center",
    marginBottom: 20,
  },
  botoes: {
    padding: 20,
  },
  editar: {
    marginBottom: 10,
  }
});
