import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, HelperText, TextInput } from 'react-native-paper';
import { NativeStackRootStaticParamList } from './routes';
import Container from '../components/Container';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTarefaDatabase } from '../database/useTarefaDatabase';
import { format } from 'date-fns';

interface FormTypes {
  titulo: string;
  descricao: string;
}

const valoresIniciais: FormTypes = {
  titulo: '',
  descricao: ''
};

const schemaValidacao = Yup.object().shape({
  titulo: Yup.string().required('Campo vazio'),
  descricao: Yup.string().required('Campo vazio'),
  data: Yup.date().required('Campo vazio'),
});

type Props = NativeStackScreenProps<NativeStackRootStaticParamList, "Formulario2">;

export default function Formulario2({ navigation }: Props) {
  const tarefaDatabase = useTarefaDatabase();

  return (
    <Container>
      <Appbar.Header dark style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Formulario" />
      </Appbar.Header>
      <ScrollView>
        <Formik
          initialValues={valoresIniciais}
          onSubmit={(values) => {
            console.log(values.titulo)
          }}
          validationSchema={schemaValidacao}
          // onSubmit={async (values, helpers) => {
          //   try {
          //     const data = format(new Date(), "MM/dd/yyyy HH:mm");
          //     const resposta = await tarefaDatabase.criar({
          //       titulo: values.titulo,
          //       descricao: values.descricao,
          //       data_criacao: data,
          //     });
          //     console.log(resposta.insertedRowId);
          //     helpers.resetForm();
          //     navigation.goBack();
          //   } catch (error) {
          //     console.error(error);
          //   }
          // }}
        >
          {({ handleChange, handleBlur, handleSubmit, resetForm, values, errors, touched }) => (
            <View style={{ padding: 20 }}>
              <View>
                <TextInput
                  onChangeText={handleChange('titulo')}
                  onBlur={handleBlur('titulo')}
                  value={values.titulo}
                  label="Titulo"
                />
                {errors.titulo && touched.titulo ? (
                  <HelperText type="error">
                    {errors.titulo}
                  </HelperText>
                ) : null}
              </View>
              <View style={{ marginVertical: 20 }}>
                <TextInput
                  onChangeText={handleChange('descricao')}
                  onBlur={handleBlur('descricao')}
                  value={values.descricao}
                  label="Descrição"
                  multiline
                  numberOfLines={10}
                />
                {errors.descricao && touched.descricao ? (
                  <HelperText type="error">
                    {errors.descricao}
                  </HelperText>
                ) : null}
              </View>
              <Button
                onPress={() => handleSubmit()}
                mode="contained"
                style={{ marginBottom: 10 }}
              >Salvar</Button>
              <Button onPress={() => resetForm()} mode="outlined">Limpar</Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "cadetblue",
  },
});
