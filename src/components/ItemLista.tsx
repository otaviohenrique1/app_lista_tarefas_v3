import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Checkbox, Divider, IconButton, List, Menu, Text, Button } from 'react-native-paper';
import { TarefaDatabase, useTarefaDatabase } from '../database/useTarefaDatabase';
import { ModalRemover } from './ModalRemover';

interface ItemListaProps {
  item: TarefaDatabase;
  navigation: any;
}

export function ItemLista(props: ItemListaProps) {
  const { item, navigation } = props;

  const [checked, setChecked] = useState(false);
  const [exibeMenu, setExibeMenu] = useState(false);
  const [exibeModal, setExibeModal] = useState(false);
  const tarefaDatabase = useTarefaDatabase();

  const abreMenu = () => setExibeMenu(true);
  const fechaMenu = () => setExibeMenu(false);

  const abreModal = () => {
    setExibeModal(true);
    setExibeMenu(false);
  };
  const fechaModal = () => setExibeModal(false);

  useEffect(() => {
    // setChecked(item.ativo as boolean);
  }, [])

  const marcaCheckbox = async () => {
    setChecked(!checked);
    await tarefaDatabase.atualizarAtivo(item.id, !checked);
  };

  return (
    <View>
      <List.Item
        title={item.titulo}
        description={item.descricao}
        titleStyle={{ textDecorationLine: (checked) ? "line-through" : "none" }}
        descriptionStyle={{ textDecorationLine: (checked) ? "line-through" : "none" }}
        onPress={() => navigation.push("Detalhes", { id: item.id })}
        left={props => (
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={marcaCheckbox}
            {...props}
          />
        )}
        right={props => (
          <Menu
            visible={exibeMenu}
            onDismiss={fechaMenu}
            anchor={<IconButton icon="dots-vertical" onPress={abreMenu} />}
            anchorPosition="bottom"
            {...props}
          >
            <Menu.Item
              onPress={() => navigation.push("FormularioEditar", { id: item.id })}
              title="Editar"
            />
            <Menu.Item onPress={abreModal} title="Remover" />
          </Menu>
        )}
      />
      <ModalRemover
        visible={exibeModal}
        onDismiss={fechaModal}
        onPressSim={async () => {
          await tarefaDatabase.remover(item.id);
          fechaModal();
        }}
        onPressNao={fechaModal}
      />
      {
        (checked) ? (
          <Text
            variant="bodyLarge"
            style={{
              position: 'absolute',
              // margin: 16,
              right: 0,
              top: 10,
              transform: [{ rotate: '45deg' }],
            }}
          >Feito</Text>
        ) : null
      }
      <Divider style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: "black",
  },
});
