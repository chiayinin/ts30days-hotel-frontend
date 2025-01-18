import { createContext, Dispatch, Reducer } from "react";
import { User } from "@types";

/**
 * 對話框的設定
 */
export type MyToastProps = {
  severity?: "success" | "info" | "warn" | "error" | "secondary" | "contrast" | undefined;
  summary?: string;
  detail?: string;
  life?: number;
  display: boolean;
};

/**
 * Reducer 的動作類型
 */
export type ReducerActionType = 'SET_USER' | 'SET_TOAST';

export type GlobalState = {
  user: User | null;
  toastPayload: MyToastProps;
  dispatch: Dispatch<ReducerAction>;
}

/**
 * Reducer 接收的狀態
 */
export type ReducerState = Omit<GlobalState, 'dispatch'>;

/**
 * Reducer 的動作類型
 */
export type ReducerAction = {
  type: ReducerActionType;
  payload: ReducerState[keyof ReducerState];
}

/**
 * 處理全域狀態的函式
 * @param state 要處理的狀態
 * @param action 要執行的動作
 * @returns
 */
export const reducer: Reducer<ReducerState, ReducerAction> = (state, action) => {
  switch(action.type) {
    case 'SET_USER':
      state = { ...state, user: action.payload as User | null };
      break;
    case 'SET_TOAST':
      state = { ...state, toastPayload: action.payload as MyToastProps}
      break;
    default:
      throw new Error("Invalid action type");
  }
  return state;
};

/**
 * 建立全域狀態的 Context
 */
export const GlobalContext = createContext<GlobalState>({
  // products: [],
  // orders: [],
  user: null,
  toastPayload: { display: false },
  dispatch: () => null,
})
