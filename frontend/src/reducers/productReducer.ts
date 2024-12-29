// Define the types for a product and actions
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface FetchProductsSuccessAction {
  type: 'FETCH_PRODUCTS_SUCCESS';
  payload: Product[];
}

interface FetchProductsErrorAction {
  type: 'FETCH_PRODUCTS_ERROR';
  payload: string; // Error message
}

interface AddProductAction {
  type: 'ADD_PRODUCT';
  payload: Product;
}

interface UpdateProductAction {
  type: 'UPDATE_PRODUCT';
  payload: Product; // The updated product
}

interface DeleteProductAction {
  type: 'DELETE_PRODUCT';
  payload: string; // The product ID
}

interface SetLoadingAction {
  type: 'SET_LOADING';
  payload: boolean;
}

// Union type for all possible actions
type Action =
  | FetchProductsSuccessAction
  | FetchProductsErrorAction
  | AddProductAction
  | UpdateProductAction
  | DeleteProductAction
  | SetLoadingAction;

// Define the state structure
interface State {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Initial state
export const initialState: State = {
  products: [],
  loading: false,
  error: null,
};

// Reducer function
export const productReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };

    case 'FETCH_PRODUCTS_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
        error: null,
      };

    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? { ...product, ...action.payload } : product
        ),
        error: null,
      };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
        error: null,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export type { Action, State };
