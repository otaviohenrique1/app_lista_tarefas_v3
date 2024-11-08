import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ReactNode, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar, Checkbox, Divider, IconButton, List, Menu } from 'react-native-paper';

interface ContainerProps {
  children: ReactNode;
}

export default function Container(props: ContainerProps) {
  const { children } = props;
  return (
    <View style={styles.container}>
      {children}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
