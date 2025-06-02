
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SecurityProvider } from "@/components/SecurityProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingProvider } from "@/components/LoadingProvider";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  console.log('🚀 App component rendering...', {
    pathname: window.location.pathname,
    href: window.location.href
  });

  return (
    <ErrorBoundary>
      <SecurityProvider>
        <QueryClientProvider client={queryClient}>
          <LoadingProvider>
            <TooltipProvider>
              <Toaster />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/dashboard" element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </LoadingProvider>
        </QueryClientProvider>
      </SecurityProvider>
    </ErrorBoundary>
  );
}

export default App;
