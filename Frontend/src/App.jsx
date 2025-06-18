import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./components/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
