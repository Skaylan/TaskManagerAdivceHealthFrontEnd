import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { PrivateRoute } from "./components/PrivateRoute";
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { PrivateRoute } from './components/PrivateRoute';
import Dashboard from './pages/Dashborad';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
            <ToastContainer />
          </PrivateRoute>
        } />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;