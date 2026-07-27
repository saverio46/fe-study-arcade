import { 
  collection, doc, getDoc, getDocs, onSnapshot, runTransaction, serverTimestamp, setDoc 
} from 'firebase/firestore';
import { db } from '../firebase';

export type Status = 'not_started' | 'in_progress' | 'completed';

export interface DayProgress {
  status: Status;
  startedAt: any;
  completedAt: any;
  totalPuzzles: number;
  completedPuzzles: number;
}

export interface PuzzleProgress {
  status: Status;
  startedAt: any;
  completedAt: any;
  totalQuestions: number;
  completedQuestions: number;
}

export interface QuestionProgress {
  status: 'unanswered' | 'correct' | 'incorrect';
  selectedAnswer: string | null;
  answeredAt: any;
  attempts: number;
}

/** Subscribe to all day progress docs for a user */
export function subscribeUserProgress(uid: string, onUpdate: (data: Record<string, DayProgress>) => void) {
  const daysRef = collection(db, `users/${uid}/days`);
  return onSnapshot(daysRef, (snapshot) => {
    const data: Record<string, DayProgress> = {};
    snapshot.forEach(doc => {
      data[doc.id] = doc.data() as DayProgress;
    });
    onUpdate(data);
  });
}

/** Mark a day as in_progress if not started */
export async function startDay(uid: string, dayId: string, totalPuzzles: number) {
  const dayRef = doc(db, `users/${uid}/days/${dayId}`);
  const snap = await getDoc(dayRef);
  
  if (!snap.exists()) {
    await setDoc(dayRef, {
      status: 'in_progress',
      startedAt: serverTimestamp(),
      completedAt: null,
      totalPuzzles,
      completedPuzzles: 0
    });
  }
}

/** Mark a puzzle as in_progress if not started */
export async function startPuzzle(uid: string, dayId: string, puzzleId: string, totalQuestions: number) {
  const puzzleRef = doc(db, `users/${uid}/days/${dayId}/puzzles/${puzzleId}`);
  const snap = await getDoc(puzzleRef);
  
  if (!snap.exists()) {
    await setDoc(puzzleRef, {
      status: 'in_progress',
      startedAt: serverTimestamp(),
      completedAt: null,
      totalQuestions,
      completedQuestions: 0
    });
  }
}

/**
 * Answer a question.
 * Atomically updates the question, and if it completes the puzzle, updates the puzzle.
 * If the puzzle completes the day, updates the day.
 */
export async function answerQuestion(
  uid: string, 
  dayId: string, 
  puzzleId: string, 
  qId: string, 
  answer: string, 
  isCorrect: boolean,
  totalQuestions: number,
  totalPuzzles: number
) {
  const dayRef = doc(db, `users/${uid}/days/${dayId}`);
  const puzzleRef = doc(db, `users/${uid}/days/${dayId}/puzzles/${puzzleId}`);
  const questionRef = doc(db, `users/${uid}/days/${dayId}/puzzles/${puzzleId}/questions/${qId}`);

  await runTransaction(db, async (transaction) => {
    // 1. Read current states
    const [daySnap, puzzleSnap, qSnap] = await Promise.all([
      transaction.get(dayRef),
      transaction.get(puzzleRef),
      transaction.get(questionRef)
    ]);

    let qData = qSnap.exists() ? qSnap.data() as QuestionProgress : {
      status: 'unanswered',
      selectedAnswer: null,
      answeredAt: null,
      attempts: 0
    };

    let pData = puzzleSnap.exists() ? puzzleSnap.data() as PuzzleProgress : {
      status: 'in_progress',
      startedAt: serverTimestamp(),
      completedAt: null,
      totalQuestions,
      completedQuestions: 0
    };

    let dData = daySnap.exists() ? daySnap.data() as DayProgress : {
      status: 'in_progress',
      startedAt: serverTimestamp(),
      completedAt: null,
      totalPuzzles,
      completedPuzzles: 0
    };

    // 2. Compute new question state
    // If it was already correct, don't recount it
    const wasAlreadyCorrect = qData.status === 'correct';
    
    qData.status = isCorrect ? 'correct' : 'incorrect';
    qData.selectedAnswer = answer;
    qData.answeredAt = serverTimestamp();
    qData.attempts += 1;

    // 3. Compute new puzzle state if this question just became correct
    if (!wasAlreadyCorrect && isCorrect) {
      pData.completedQuestions += 1;
      
      if (pData.completedQuestions >= pData.totalQuestions) {
        pData.status = 'completed';
        pData.completedAt = serverTimestamp();
        
        // Puzzle completed! Update day state.
        dData.completedPuzzles += 1;
        if (dData.completedPuzzles >= dData.totalPuzzles) {
          dData.status = 'completed';
          dData.completedAt = serverTimestamp();
        }
      }
    }

    // 4. Write everything back
    transaction.set(questionRef, qData);
    transaction.set(puzzleRef, pData);
    transaction.set(dayRef, dData);
  });
}

/** Get full day progress for resuming */
export async function getDayProgress(uid: string, dayId: string) {
  const dayRef = doc(db, `users/${uid}/days/${dayId}`);
  const daySnap = await getDoc(dayRef);
  if (!daySnap.exists()) return null;

  const data = daySnap.data() as DayProgress;
  const puzzlesSnap = await getDocs(collection(dayRef, 'puzzles'));
  
  const puzzles: Record<string, PuzzleProgress & { questions: Record<string, QuestionProgress> }> = {};
  
  for (const p of puzzlesSnap.docs) {
    const pData = p.data() as PuzzleProgress;
    const questionsSnap = await getDocs(collection(p.ref, 'questions'));
    
    const questions: Record<string, QuestionProgress> = {};
    questionsSnap.forEach(q => {
      questions[q.id] = q.data() as QuestionProgress;
    });

    puzzles[p.id] = { ...pData, questions };
  }

  return { ...data, puzzles };
}

/** 
 * New Sync Hooks for full local storage migration
 */

export function subscribeCalendarState(uid: string, onUpdate: (data: any) => void) {
  const ref = doc(db, `users/${uid}/calendarState/main`);
  return onSnapshot(ref, (snap) => {
    if (snap.exists()) onUpdate(snap.data());
  });
}

export async function updateCalendarState(uid: string, data: any) {
  const ref = doc(db, `users/${uid}/calendarState/main`);
  await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

export function subscribeDayState(uid: string, dayId: string, onUpdate: (data: any) => void) {
  const ref = doc(db, `users/${uid}/daysState/${dayId}`);
  return onSnapshot(ref, (snap) => {
    if (snap.exists()) onUpdate(snap.data());
  });
}

export async function updateDayState(uid: string, dayId: string, data: any) {
  const ref = doc(db, `users/${uid}/daysState/${dayId}`);
  await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true });
}
