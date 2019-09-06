export interface ProductsItem {
  id: string;
  aku?: string;
  title: string;
  description: string;
  availableSizes?: string;
  style?: string;
  price: number;
  installments?: number;
  currencyId?: string;
  currencyFormat?: string;
  isFreeShipping?: boolean;
}
