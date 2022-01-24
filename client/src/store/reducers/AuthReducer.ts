import { AuthActionsType } from "../types/AuthTypes";

export interface AuthenticatedUserData {
  _id: string;
  email: string;
  username: string;
  fullName: string;
  avatarURL: string;
}

export interface AuthState {
  isLoadingAuth: boolean;
  isAuthenticated: boolean;
  authenticatedUser: AuthenticatedUserData | null;
}

const initialState: AuthState = {
  isLoadingAuth: false,
  isAuthenticated: false,
  authenticatedUser: null,
};

export default function AuthReducer(
  state = initialState,
  action: AuthActionsType
): AuthState {
  switch (action.type) {
    case "STOP_LOADING_AUTH":
      return {
        ...state,
        isLoadingAuth: false,
      };
    case "LOADING_AUTH":
      return {
        ...state,
        isLoadingAuth: true,
      };
    case "SET_AUTHENTICATED":
      return {
        ...state,
        isAuthenticated: true,
        authenticatedUser: action.payload,
      };
    case "SET_UNAUTHENTICATED":
      return {
        ...state,
        isAuthenticated: false,
        authenticatedUser: null,
      };
    default:
      return state;
  }
}
