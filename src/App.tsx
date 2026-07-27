import { useEffect, useState } from 'react';
import { AuthButton } from './components/AuthButton';
import { LoginScreen } from './components/LoginScreen';
import { useAuth } from './hooks/useAuth';
import { subscribeUserProgress, DayProgress, subscribeCalendarState, updateCalendarState, subscribeDayState, updateDayState } from './lib/progress';

declare global {
  interface Window {
    syncFirestoreProgress?: (data: Record<string, DayProgress>) => void;
    currentDayId?: string;
    loadCloudCalendarState?: (state: any) => void;
    saveCalendarStateToCloud?: (state: any) => void;
    loadCloudDayState?: (dayId: string, state: any) => void;
    saveDayStateToCloud?: (dayId: string, state: any) => void;
  }
}

export default function App() {
  const { user, loading } = useAuth();

  useEffect(() => {
    const arcadeApp = document.getElementById('arcade-app');
    const dayDetailsApp = document.getElementById('day-details-app');
    
    if (user) {
      // Expose save hooks to Vanilla JS
      window.saveCalendarStateToCloud = (state) => updateCalendarState(user.uid, state);
      window.saveDayStateToCloud = (dayId, state) => updateDayState(user.uid, dayId, state);

      // Old compatibility hook
      const unsubscribeOld = subscribeUserProgress(user.uid, (data) => {
        if (window.syncFirestoreProgress) window.syncFirestoreProgress(data);
      });

      // New Calendar hook
      const unsubCalendar = subscribeCalendarState(user.uid, (data) => {
        if (window.loadCloudCalendarState) window.loadCloudCalendarState(data);
      });

      // New Day hook (only if on a day page)
      let unsubDay: any = null;
      if (window.currentDayId) {
        unsubDay = subscribeDayState(user.uid, window.currentDayId, (data) => {
          if (window.loadCloudDayState) window.loadCloudDayState(window.currentDayId!, data);
        });
      }
      
      // Reveal the main HTML
      if (arcadeApp) arcadeApp.style.display = 'flex';
      if (dayDetailsApp) dayDetailsApp.style.display = 'flex';
      
      return () => {
        unsubscribeOld();
        unsubCalendar();
        if (unsubDay) unsubDay();
      };
    } else {
      // User logged out: clear progress
      if (window.syncFirestoreProgress) window.syncFirestoreProgress({});
      
      // Hide the main HTML
      if (arcadeApp) arcadeApp.style.display = 'none';
      if (dayDetailsApp) dayDetailsApp.style.display = 'none';
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
