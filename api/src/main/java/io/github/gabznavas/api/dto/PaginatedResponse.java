package io.github.gabznavas.api.dto;

import java.util.List;

/**
 * Representa uma resposta paginada para consultas na API.
 *
 * @param <T> Tipo dos elementos retornados na página.
 */
public record PaginatedResponse<T>(
        /**
         * Lista de elementos na página atual.
         */
        List<T> content,

        /**
         * Número total de elementos disponíveis na consulta.
         */
        long totalElements,

        /**
         * Total de páginas disponíveis.
         */
        int totalPages,

        /**
         * Tamanho da página (quantidade de elementos por página).
         */
        int size,

        /**
         * Número da página atual (começa em 0).
         */
        int page
) {
}
