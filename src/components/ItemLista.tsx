import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Checkbox, IconButton, List, Menu } from 'react-native-paper';

export function ItemLista() {
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <List.Item
      title="First Item"
      description="Item description"
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
