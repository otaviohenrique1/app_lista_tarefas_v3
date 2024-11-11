import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { NativeStackRootStaticParamList } from './routes';
import Container from '../components/Container';
import { useTarefaDatabase } from '../database/useTarefaDatabase';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { CampoTexto } from '../components/CampoTexto';
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaValidacao, valoresIniciais } from '../utils/constantes';

type Props = NativeStackScreenProps<NativeStackRootStaticParamList, "FormularioEditar">;

export default function FormularioEditar({ navigation }: Props) {
  const tarefaDatabase = useTarefaDatabase();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors,  },
  } = useForm({
    defaultValues: valoresIniciais,
    resolver: yupResolver(schemaValidacao)
  });

  return (
    <Container>
      <Appbar.Header dark style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Formulario" />
      </Appbar.Header>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <View>
            <CampoTexto
              control={control}
              label="Titulo"
              name="titulo"
              errors={errors.titulo}
            />
          </View>
          <View style={{ marginVertical: 20 }}>
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
                  const data = format(new Date(), "MM/dd/yyyy HH:mm");
                  const resposta = await tarefaDatabase.criar({
                    titulo: values.titulo,
                    descricao: values.descricao,
                    data_criacao: data,
                  });
                  console.log(resposta.insertedRowId);
                  reset();
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
