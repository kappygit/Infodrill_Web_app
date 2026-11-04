import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouteContext = createContext(null);

export function RouteProvider({ children }) {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
      setHash(window.location.hash);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = useCallback((url, options = {}) => {
    if (!url) return;

    // Handle hash links (e.g., "#portfolio" or "/#portfolio")
    if (url.startsWith('#')) {
      if (window.location.pathname !== '/') {
        // Navigate to home first, then scroll
        window.history.pushState(null, '', `/${url}`);
        setPathname('/');
        setHash(url);
        window.scrollTo({ top: 0, behavior: 'instant' });
        setTimeout(() => {
          const el = document.getElementById(url.replace('#', ''));
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.history.pushState(null, '', url);
        setHash(url);
        const el = document.getElementById(url.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }

    if (url.startsWith('/#')) {
      const targetHash = url.replace('/', '');
      window.history.pushState(null, '', url);
      setPathname('/');
      setHash(targetHash);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => {
        const el = document.getElementById(targetHash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
      return;
    }

    // Normal path navigation
    if (options.replace) {
      window.history.replaceState(null, '', url);
    } else {
      window.history.pushState(null, '', url);
    }

    setPathname(window.location.pathname);
    setHash(window.location.hash);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Detect project detail page: /projects/:slug
  const projectMatch = pathname.match(/^\/projects\/([^/]+)/);
  const isProjectPage = Boolean(projectMatch);
  const projectSlug = projectMatch ? projectMatch[1] : null;

  return (
    <RouteContext.Provider
      value={{
        pathname,
        hash,
        navigate,
        isProjectPage,
        projectSlug,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
}

export function useRoute() {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRoute must be used within a RouteProvider');
  }
  return context;
}

