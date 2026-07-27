import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { PacmanGame } from './PacmanGame';

export function LoginScreen() {
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error('Sign-in error:', err);
      setError(err.message);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundColor: 'var(--void, #0a0a12)',
      display: 'flex',
      flexDirection: 'row',
      color: 'var(--text, #eef0f7)',
      fontFamily: '"Press Start 2P", "Orbitron", monospace',
      zIndex: 9999
    }}>
      
      {/* Arcade scanlines purely for the login screen to match aesthetic */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 2px, 3px 100%',
        pointerEvents: 'none',
        zIndex: 1
      }}></div>

      {/* Left side: Pacman Game */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRight: '2px dashed var(--neon-cyan, #2de2ff)',
        zIndex: 10,
        padding: '2rem'
      }}>
        <PacmanGame />
      </div>

      {/* Right side: Login Panel */}
      <div style={{ 
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10, 
        textAlign: 'center', 
        padding: '2rem' 
      }}>
        <h1 style={{
          fontSize: '3rem',
          margin: '0 0 1rem 0',
          color: 'var(--neon-cyan, #2de2ff)',
          textShadow: '0 0 10px var(--neon-cyan, #2de2ff), 0 0 20px var(--neon-cyan, #2de2ff)',
          fontFamily: '"Orbitron", sans-serif',
          fontWeight: 900,
          letterSpacing: '4px'
        }}>
          FE STUDY ARCADE
        </h1>
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-dim, #8a8aa8)',
          marginBottom: '3rem',
          fontFamily: '"Press Start 2P", monospace',
          lineHeight: 1.5
        }}>
          INSERT COIN TO CONTINUE<br/>
          (Or Just Sign In)
        </p>

        {error && (
          <div style={{
            color: 'var(--neon-pink, #ff3d81)',
            marginBottom: '1rem',
            fontFamily: '"Inter", sans-serif'
          }}>
            Error: {error}
          </div>
        )}

        <button 
          onClick={handleSignIn}
          style={{
            backgroundColor: 'transparent',
            border: '2px solid var(--neon-pink, #ff3d81)',
            color: 'var(--neon-pink, #ff3d81)',
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            fontFamily: '"Press Start 2P", monospace',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(255, 61, 129, 0.4), inset 0 0 10px rgba(255, 61, 129, 0.2)',
            transition: 'all 0.2s',
            textTransform: 'uppercase'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--neon-pink, #ff3d81)';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 61, 129, 0.8), inset 0 0 15px rgba(255, 61, 129, 0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--neon-pink, #ff3d81)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 61, 129, 0.4), inset 0 0 10px rgba(255, 61, 129, 0.2)';
          }}
        >
          SIGN IN WITH GOOGLE
        </button>
      </div>
    </div>
  );
}
