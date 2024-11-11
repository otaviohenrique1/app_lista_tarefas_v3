import { PaperProvider } from 'react-native-paper';
import { AppRoutes } from './src/pages/routes';
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from './src/database/initializeDatabase';

export default function App() {
  return (
    <SQLiteProvider databaseName="database.db" onInit={initializeDatabase}>
      <PaperProvider>
        <AppRoutes />
      </PaperProvider>
    </SQLiteProvider>
  );
}
