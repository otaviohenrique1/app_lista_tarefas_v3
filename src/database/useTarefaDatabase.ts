import { useSQLiteContext } from "expo-sqlite";

export type TarefaDatabase = { 
  id: number;
  titulo: string;
  descricao: string;
  data_criacao: string;
  ativo: boolean | number;
}

export function useTarefaDatabase() {
  const database = useSQLiteContext()

  async function criar(data: Omit<TarefaDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO tarefas (titulo, descricao, data_criacao, ativo) VALUES ($titulo, $descricao, $data_criacao, $ativo)"
    );

    try {
      const resultado = await statement.executeAsync({
        $titulo: data.titulo,
        $descricao: data.descricao,
        $data_criacao: data.data_criacao,
        $ativo: data.ativo,
      });
      const insertedRowId = resultado.lastInsertRowId.toLocaleString();      
      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function atualizar(data: TarefaDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE tarefas SET titulo = $titulo, descricao = $descricao, data_criacao = $data_criacao, $ativo = ativo WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: data.id,
        $titulo: data.titulo,
        $descricao: data.descricao,
        $data_criacao: data.data_criacao,
        $ativo: data.ativo,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function atualizarAtivo(id: number, ativo: boolean) {
    const statement = await database.prepareAsync(
      "UPDATE tarefas SET ativo = $ativo WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: id,
        $ativo: ativo,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function remover(id: number) {
    try {
      await database.execAsync("DELETE FROM tarefas WHERE id = " + id);
    } catch (error) {
      throw error;
    }
  }

  async function listarUm(id: number) {
    try {
      const query = "SELECT * FROM tarefas WHERE id = ?";

      const response = await database.getFirstAsync<TarefaDatabase>(query, [
        id,
      ]);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function listarTodos() {
    try {
      const query = "SELECT * FROM tarefas";

      const response = await database.getAllAsync<TarefaDatabase>(query);

      return response.map((item) => {
        return {
          id: item.id,
          titulo: item.titulo,
          descricao: item.descricao,
          data_criacao: item.data_criacao,
          ativo: (item.ativo === 0) ? false : true,
        };
      });
    } catch (error) {
      throw error;
    }
  }

  return { criar, atualizar, atualizarAtivo, remover, listarUm, listarTodos };
}
