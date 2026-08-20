import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";
import { AuthProvider, useAuth } from "./state";
import DashLayout from "./components/DashLayout";
import { Spinner } from "./components/ui";
import LoginPage from "./pages/LoginPage";
import Portfolio from "./pages/Portfolio";
import RoomDeepDive from "./pages/RoomDeepDive";
import Account from "./pages/Account";

/**
 * Client-side guard — a UX nicety that stops an empty shell flashing for
 * logged-out visitors, not a security boundary. The API independently rejects
 * unauthenticated requests; nothing here protects data.
 */
function RequireOrganizer({ children }: { children: ReactNode }) {
  const { ready, user } = useAuth();
  if (!ready) return <Spinner label="Checking session" />;
  if (!user?.is_organizer) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* The OTP step is in-page state, so /login/verify just re-enters the flow. */}
          <Route path="/login/*" element={<Navigate to="/login" replace />} />

          <Route
            path="/dashboard"
            element={
              <RequireOrganizer>
                <DashLayout>
                  <Portfolio />
                </DashLayout>
              </RequireOrganizer>
            }
          />
          <Route
            path="/dashboard/rooms/:roomId"
            element={
              <RequireOrganizer>
                <DashLayout>
                  <RoomDeepDive />
                </DashLayout>
              </RequireOrganizer>
            }
          />
          <Route
            path="/dashboard/account"
            element={
              <RequireOrganizer>
                <DashLayout>
                  <Account />
                </DashLayout>
              </RequireOrganizer>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
