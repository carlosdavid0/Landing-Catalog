export interface produto {
    excluido: boolean;
    codigo: string;
    observacao: string;
    ipi: number;
    peso: number;
    ativo: boolean | null;
    codigo_barra: string;
    qtd_embalagem: number;
    categoria: string;
    nome: string;
    id_parceiro?: string | number | any;
    grades: any[];
    validade?: Date | null | any;
    estoque: number;
    marca: string;
    venda: number;
    comissao: number;
    ultima_alteracao: Date;
    custo: number;
    id_fornecedor?: number;
    estoque_minimo: number;
    ncm: string;
    id: number;
    embalagem: string;
    referencia: string;
}

export default interface Iprodutos {
    href_proxima_pagina: string;
    produtos: produto[];
}

