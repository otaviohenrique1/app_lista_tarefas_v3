import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Checkbox, Divider, IconButton, List, Menu } from 'react-native-paper';
import { TarefaDatabase } from '../database/useTarefaDatabase';

interface ItemListaProps {
  item: TarefaDatabase;
  navigation: any;
}

export function ItemLista(props: ItemListaProps) {
  const { item, navigation } = props;

  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View>
      <List.Item
        title={item.titulo}
        description={item.descricao}
        onPress={() => navigation.push("Detalhes", { id: item.id })}
        left={props => (
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
            {...props}
          />
        )}
        right={props => (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
            anchorPosition="bottom"
            {...props}
          >
            <Menu.Item onPress={() => { }} title="Editar" />
            <Menu.Item onPress={() => { }} title="Remover" />
          </Menu>
        )}
      />
      <Divider style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: "black",
  },
});
