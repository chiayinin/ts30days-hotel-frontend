import { createContext, Dispatch, Reducer } from "react";
import { User } from "@types";

/**
 * 設定對話框的資料類型
 */
export type DialogPayload = {
  title?: string;
  content?: string;
  display: boolean;
  autoFocus?: 'reject' | 'accept';
  showReject?: boolean;
  rejectLabel?: string;
  acceptLabel?: string;
  rejectAction?: () => void;
  acceptAction?: () => void;
}

/**
 * Reducer 的動作類型
 */
export type ReducerActionType = 'SET_USER' | 'SET_DIALOG';

export type GlobalState = {
  user: User | null;
  dialogPayload: DialogPayload;
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
    case 'SET_DIALOG':
      state = { ...state, dialogPayload: action.payload as DialogPayload };
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
  dialogPayload: { display: false },
  dispatch: () => null,
})
