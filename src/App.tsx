import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Analytics }      from "@vercel/analytics/react";
import { Navbar }         from "./components/Navbar";
import { Footer }         from "./components/Footer";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home         from "./pages/Home";
import Guides       from "./pages/Guides";
import Analyze      from "./pages/Analyze";
import History      from "./pages/History";
import Profile      from "./pages/Profile";
import Subscription from "./pages/Subscription";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import SubscriptionCancel  from "./pages/SubscriptionCancel";
import Auth         from "./pages/Auth";
import Legal        from "./pages/Legal";
import CGU          from "./pages/CGU";
import NotFound     from "./pages/NotFound";

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing — self-contained (own Navbar + Footer) */}
        <Route path="/" element={<Home />} />
        <Route path="/guides" element={<Guides />} />
        {/* App pages — shared Navbar + Footer */}
        <Route element={<AppLayout />}>
          <Route path="/analyser"   element={<Analyze />} />
          <Route path="/auth"       element={<Auth />} />
          <Route path="/abonnement"       element={<Subscription />} />
          <Route path="/abonnement/succes" element={<ProtectedRoute><SubscriptionSuccess /></ProtectedRoute>} />
          <Route path="/abonnement/annule" element={<SubscriptionCancel />} />
          <Route path="/historique" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/profil"     element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/mentions-legales" element={<Legal />} />
          <Route path="/cgu"              element={<CGU />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}
