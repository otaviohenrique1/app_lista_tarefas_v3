import * as Yup from 'yup';
import { FormTypes } from '../types/types';

export const valoresIniciais: FormTypes = {
  titulo: '',
  descricao: ''
};

export const schemaValidacao = Yup.object().shape({
  titulo: Yup.string().required('Campo vazio'),
  descricao: Yup.string().required('Campo vazio'),
});