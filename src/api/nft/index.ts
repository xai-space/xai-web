export interface EVMNFTListRes {
    code: number,
    msg: null,
    data: NetworkNFTList[]
}


export interface NetworkNFTList {
    chain: 'eth' | 'bnb' | "ploygon" | 'arbitrum' | 'optimism' | 'zksync' | 'linea' | 'avalanche' | 'fantom',
    exceed_max_items: false,
    collection_assets: NFTInfo[]
}

export interface NFTInfo {
    contract_address: string;
    contract_name: string;
    logo_url: string;
    owns_total: number;
    items_total: number;
    symbol: string;
    description: null;
    floor_price: null;
    verified: boolean;
    opensea_verified: boolean;
    is_spam: boolean;
    assets: Asset[];
}

export interface Asset {
    contract_address: string;
    contract_name: string;
    contract_token_id: string;
    token_id: string;
    erc_type: string;
    amount: string;
    minter: string;
    owner: null;
    own_timestamp: null;
    mint_timestamp: number;
    mint_transaction_hash: string;
    mint_price: null;
    token_uri: string;
    metadata_json: string;
    name: string;
    content_type: string;
    content_uri: string;
    description: string;
    image_uri: string;
    external_link: string;
    latest_trade_price: null;
    latest_trade_symbol: null;
    latest_trade_token: null;
    latest_trade_timestamp: null;
    nftscan_id: string;
    nftscan_uri: null;
    small_nftscan_uri: null;
    attributes: any[];
    rarity_score: null;
    rarity_rank: null;
}
