import { createContext, useContext } from 'react';
import { State, Action } from '../reducers/productReducer';

interface ProductsContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ProductsContext.Provider;

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
