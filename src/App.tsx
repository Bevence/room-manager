import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import TenantsPage from "./pages/TenantsPage";
import TenantFormPage from "./pages/TenantFormPage";
import TenantDetailPage from "./pages/TenantDetailPage";
import RoomsPage from "./pages/RoomsPage";
import RoomFormPage from "./pages/RoomFormPage";
import BillsPage from "./pages/BillsPage";
import BillFormPage from "./pages/BillFormPage";
import BillDetailPage from "./pages/BillDetailPage";
import MeterReadingPage from "./pages/MeterReadingPage";
import SettingsPage from "./pages/SettingsPage";
import InstallPage from "./pages/InstallPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tenants" element={<TenantsPage />} />
          <Route path="/tenants/new" element={<TenantFormPage />} />
          <Route path="/tenants/:id" element={<TenantDetailPage />} />
          <Route path="/tenants/:id/edit" element={<TenantFormPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/rooms/new" element={<RoomFormPage />} />
          <Route path="/rooms/:id" element={<RoomFormPage />} />
          <Route path="/bills" element={<BillsPage />} />
          <Route path="/bills/new" element={<BillFormPage />} />
          <Route path="/bills/meter" element={<MeterReadingPage />} />
          <Route path="/bills/:id" element={<BillDetailPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/install" element={<InstallPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
