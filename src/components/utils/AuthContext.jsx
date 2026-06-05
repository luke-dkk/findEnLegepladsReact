  import { createContext, useState } from "react";
  import { getCurrentUser } from "../utils/authService";

  export const AuthContext = createContext();

  export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => getCurrentUser());

    
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    );
  }