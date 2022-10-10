

    export interface Produto {
        codigo: string;
        descricao: string;
        preco: number;
        qtd: number;
    }

    export interface IVendas {
        id?: string;
        nome_cliente: string;
        telefone: string;
        status: string;
        forma_pagamento: string;
        total: number;
        produtos: Produto[];
        created_at: Date;
        updated_at: Date;
    }



