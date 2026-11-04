import React, { Suspense, lazy } from 'react';
import { RouteProvider, useRoute } from '../context/RouteContext';
import { ModalProvider } from '../context/ModalContext';
import { GetStartedModal } from '../components/GetStartedModal';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HomePage } from '../features/home';
import { ProjectDetailPage } from '../features/projects/ProjectDetailPage';
import './App.css';

const CompanyChatbot = lazy(() =>
  import('../components/chat/CompanyChatbot').then((m) => ({ default: m.CompanyChatbot }))
);

function AppContent() {
  const { isProjectPage, projectSlug } = useRoute();

  return (
    <div className="app-root">
      {/* Accessible Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Persistent Floating Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main id="main-content">
        {isProjectPage ? (
          <ProjectDetailPage slug={projectSlug} />
        ) : (
          <HomePage />
        )}
      </main>

      {/* Enterprise Footer */}
      <Footer />

      {/* Lead Capture Modal on "Get Started" Click */}
      <GetStartedModal />

      {/* Floating AI Assistant Chatbot */}
      <Suspense fallback={null}>
        <CompanyChatbot />
      </Suspense>
    </div>
  );
}

export function App() {
  return (
    <RouteProvider>
      <ModalProvider>
        <AppContent />
      </ModalProvider>
    </RouteProvider>
  );
}

export default App;
