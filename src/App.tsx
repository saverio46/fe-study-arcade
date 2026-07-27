import { useEffect, useState } from 'react';
import { AuthButton } from './components/AuthButton';
import { LoginScreen } from './components/LoginScreen';
import { useAuth } from './hooks/useAuth';
import { subscribeUserProgress, DayProgress } from './lib/progress';

declare global {
  interface Window {
    syncFirestoreProgress: (data: Record<string, DayProgress>) => void;
  }
}

export default function App() {
  const { user, loading } = useAuth();

  useEffect(() => {
    const arcadeApp = document.getElementById('arcade-app');
    
    if (user) {
      // User logged in: subscribe to their progress
      const unsubscribe = subscribeUserProgress(user.uid, (data) => {
        if (window.syncFirestoreProgress) {
          window.syncFirestoreProgress(data);
        }
      });
      
      // Reveal the calendar HTML
      if (arcadeApp) arcadeApp.style.display = 'flex';
      
      return () => {
        unsubscribe();
      };
    } else {
      // User logged out: clear calendar progress
      if (window.syncFirestoreProgress) {
        window.syncFirestoreProgress({});
      }
      
      // Hide the calendar HTML
      if (arcadeApp) arcadeApp.style.display = 'none';
    }
  }, [user]);

  if (loading) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
        backgroundColor: '#0a0a12', display: 'flex', justifyContent: 'center', alignItems: 'center',
        color: '#2de2ff', fontFamily: '"Orbitron", sans-serif', fontSize: '2rem'
      }}>
        LOADING...
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  // Floating button for signed in users
  return (
    <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 50 }}>
      <AuthButton />
    </div>
  );
}
