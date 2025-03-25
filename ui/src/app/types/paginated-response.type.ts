/**
 * Representa uma resposta paginada para consultas na API.
 *
 * @template T Tipo dos elementos retornados na página.
 */
export type PaginatedResponse<T> = {
  /**
   * Lista de elementos na página atual.
   */
  content: T[]

  /**
   * Número total de elementos disponíveis na consulta.
   */
  totalElements: number

  /**
   * Total de páginas disponíveis.
   */
  totalPages: number

  /**
   * Tamanho da página (quantidade de elementos por página).
   */
  size: number

  /**
   * Número da página atual (começa em 0).
   */
  page: number
}
