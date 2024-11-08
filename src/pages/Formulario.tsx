import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, HelperText, TextInput } from 'react-native-paper';
import { NativeStackRootStaticParamList } from './routes';
import Container from '../components/Container';
import { Formik } from 'formik';
import * as Yup from 'yup';

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

type Props = NativeStackScreenProps<NativeStackRootStaticParamList, "Formulario">;

export default function Formulario({ navigation }: Props) {
  return (
    <Container>
      <Appbar.Header dark style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Formulario" />
      </Appbar.Header>
      <ScrollView>
        <Formik
          initialValues={valoresIniciais}
          validationSchema={schemaValidacao}
          onSubmit={values => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
              <View>
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
              <Button onPress={() => handleSubmit()}>
                Salvar
              </Button>
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
