import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useAuth } from '../hooks/useAuth';

export function AuthButton() {
  const { user, loading } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) return <div className="text-neon-cyan font-ui text-sm">Loading...</div>;

  return (
    <div className="flex items-center gap-4 bg-panel/80 p-2 rounded border border-grid-line backdrop-blur-sm">
      {user ? (
        <>
          <img src={user.photoURL || ''} alt="Avatar" className="w-8 h-8 rounded-full border border-neon-cyan" />
          <div className="flex flex-col hidden sm:flex">
            <span className="text-text font-ui text-xs">{user.displayName}</span>
            <button onClick={handleSignOut} className="text-neon-pink text-[10px] text-left hover:underline cursor-pointer">
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={handleSignIn}
          className="text-void bg-neon-cyan px-4 py-2 rounded font-ui font-bold text-sm hover:shadow-[0_0_10px_var(--neon-cyan)] transition-shadow cursor-pointer"
        >
          Sign In
        </button>
      )}
    </div>
  );
}
