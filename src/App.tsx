/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { AuthButton } from './components/AuthButton';
import { useAuth } from './hooks/useAuth';
import { subscribeUserProgress, DayProgress } from './lib/progress';

declare global {
  interface Window {
    syncFirestoreProgress: (data: Record<string, DayProgress>) => void;
  }
}

export default function App() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // User logged in: subscribe to their progress
      const unsubscribe = subscribeUserProgress(user.uid, (data) => {
        if (window.syncFirestoreProgress) {
          window.syncFirestoreProgress(data);
        }
      });
      return () => unsubscribe();
    } else {
      // User logged out: clear calendar progress
      if (window.syncFirestoreProgress) {
        window.syncFirestoreProgress({});
      }
    }
  }, [user]);

  return <AuthButton />;
}
