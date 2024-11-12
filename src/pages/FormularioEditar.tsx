import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
import { NativeStackRootStaticParamList } from './routes';
import Container from '../components/Container';
import { TarefaDatabase, useTarefaDatabase } from '../database/useTarefaDatabase';
import { useForm } from 'react-hook-form';
import { CampoTexto } from '../components/CampoTexto';
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaValidacao, valoresIniciais } from '../utils/constantes';
import { useEffect, useState } from 'react';

const dadosIniciais: TarefaDatabase = {
  id: 0,
  titulo: '',
  descricao: '',
  data_criacao: '',
  ativo: false,
};

type Props = NativeStackScreenProps<NativeStackRootStaticParamList, "FormularioEditar">;

export default function FormularioEditar({ navigation, route }: Props) {
  const [tarefa, setTarefa] = useState<TarefaDatabase>(dadosIniciais);
  const tarefaDatabase = useTarefaDatabase();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: valoresIniciais,
    values: {
      titulo: tarefa.titulo,
      descricao: tarefa.descricao
    },
    resolver: yupResolver(schemaValidacao)
  });
  
  const { id } = route.params;

  const buscaUmaTarefa = async () => {
    const data = await tarefaDatabase.listarUm(id);
    setTarefa((data !== null) ? data : dadosIniciais);
  };

  useEffect(() => {
    buscaUmaTarefa();
  }, [tarefa])

  return (
    <Container>
      <Appbar.Header dark style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Formulario" />
      </Appbar.Header>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <View>
            <Text>{tarefa.titulo}</Text>
            <CampoTexto
              control={control}
              label="Titulo"
              name="titulo"
              errors={errors.titulo}
            />
          </View>
          <View style={{ marginVertical: 20 }}>
            <Text>{tarefa.descricao}</Text>
            <CampoTexto
              control={control}
              label="Descrição"
              name="descricao"
              errors={errors.descricao}
            />
          </View>
          <Button
            onPress={handleSubmit(async (values) => {
                try {
                  await tarefaDatabase.atualizar({
                    id: id,
                    titulo: values.titulo,
                    descricao: values.descricao,
                    data_criacao: tarefa.data_criacao,
                    ativo: tarefa.ativo,
                  });
                  navigation.goBack();
                } catch (error) {
                  console.error(error);
                }
              })}
            mode="contained"
            style={{ marginBottom: 10 }}
          >Salvar</Button>
          <Button onPress={() => reset()} mode="outlined">Limpar</Button>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "cadetblue",
  },
});
