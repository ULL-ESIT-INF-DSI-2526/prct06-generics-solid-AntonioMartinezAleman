/**
 * Representa un usuario del sistema.
 */
export interface User {
  /**
   * Identificador del usuario.
   */
  id: string;

  /**
   * Nombre del usuario.
   */
  name: string;
}

/**
 * Abstracción para repositorios de usuarios.
 */
export interface UserRepository {
  /**
   * Busca un usuario por identificador.
   * @param id Identificador del usuario.
   * @returns Usuario encontrado o `null`.
   */
  findById(id: string): User | null;
}

/**
 * Implementación concreta de repositorio usando MySQL.
 */
export class MySqlUserRepository implements UserRepository {
  /**
   * Busca un usuario por identificador.
   * @param id Identificador del usuario.
   * @returns Usuario encontrado o `null`.
   */
  findById(id: string): User | null {
    console.log("Querying MySQL...");
    return { id, name: "Ada" };
  }
}

/**
 * Implementación alternativa en memoria.
 */
export class InMemoryUserRepository implements UserRepository {
  /**
   * @param users Usuarios iniciales.
   */
  constructor(private readonly users: User[] = []) {}

  /**
   * Busca un usuario por identificador.
   * @param id Identificador del usuario.
   * @returns Usuario encontrado o `null`.
   */
  findById(id: string): User | null {
    return this.users.find((user) => user.id === id) ?? null;
  }
}

/**
 * Servicio de usuarios desacoplado del almacenamiento concreto.
 */
export class UserService {
  /**
   * @param repo Repositorio de usuarios inyectado.
   */
  constructor(private readonly repo: UserRepository) {}

  /**
   * Devuelve el nombre del usuario en mayúsculas.
   * @param id Identificador del usuario.
   * @returns Nombre en mayúsculas.
   * @throws Error Si el usuario no existe o el id es vacío.
   */
  getUserName(id: string): string {
    if (id.trim().length === 0) {
      throw new Error("User id cannot be empty");
    }

    const user = this.repo.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user.name.toUpperCase();
  }
}