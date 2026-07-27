window.CHEAT_CODES = {
  "2026-07-27": {
    topic: "Mathematics · Algebra & Equations",
    codes: [
      {
        title: "Cheat Code #1: Numerical Equation Solver (num-solv)",
        desc: "Solve any single equation for an unknown — no algebra required.",
        keys: "[2nd] → [num-solv]\nType your equation using [alpha][x] for the variable\nPress [enter], input a \"Guess\" value, press [enter] again",
        example: "Solve 3x² - 12 = 0\nInput: 3 [alpha][x] [x²] -12=0, guess 2 → Answer: x = 2"
      },
      {
        title: "Cheat Code #2: Polynomial Root Solver (poly-solv)",
        desc: "Find roots of quadratic or cubic equations instantly.",
        keys: "[2nd] → [poly-solv]\nSelect order: 2 (quadratic) or 3 (cubic)\nEnter coefficients a, b, c (and d for cubic)\nPress [enter] → displays all roots (real & complex)",
        example: "x² - 5x + 6 = 0 → coefficients: a=1, b=-5, c=6 → Roots: x=2, x=3"
      },
      {
        title: "Cheat Code #3: System of Equations Solver (sys-solv)",
        desc: "Solve 2×2 or 3×3 linear systems in seconds.",
        keys: "[2nd] → [sys-solv]\nSelect 2 (2×2) or 3 (3×3)\nEnter coefficients row by row\nPress [enter] → displays x, y (and z)"
      },
      {
        title: "Cheat Code #4: Store & Recall Variables (STO→ / ANS)",
        desc: "Avoid re-typing intermediate results.",
        keys: "Store:  [result] [sto→] [alpha][A]   → saves to variable A\nRecall: [alpha][A]                    → reuses stored value\nANS:    [2nd][ans]                    → recalls last answer",
        example: "Pro Tip: Chain multi-step problems: compute part 1 → STO→A → use A in part 2."
      },
      {
        title: "Cheat Code #5: Stacked Fraction Entry",
        desc: "Enter fractions exactly as they appear in the NCEES Handbook.",
        keys: "[n/d] key (above the [7] key)\nEnter numerator → [▼] → enter denominator\nPress [enter] to evaluate"
      }
    ]
  },
  "2026-07-28": {
    topic: "Mathematics · Trigonometry & Geometry",
    codes: [
      {
        title: "Cheat Code #6: Switch Degree ↔ Radian Mode",
        desc: "The #1 exam mistake. Always verify mode first.",
        keys: "[mode] → scroll to find DEG or RAD → [enter]\nOR quick toggle: press [drg] key repeatedly",
        example: "⚠️ Rule: Trig problems with °, sin/cos/tan tables → DEG mode\nCalculus problems (derivatives, integrals) → RAD mode"
      },
      {
        title: "Cheat Code #7: Inverse Trig Functions (arcsin, arccos, arctan)",
        desc: "Access inverse trig functions easily.",
        keys: "arcsin(x):  [2nd][sin]  → type value → [enter]\narccos(x):  [2nd][cos]  → type value → [enter]\narctan(x):  [2nd][tan]  → type value → [enter]"
      },
      {
        title: "Cheat Code #8: Reciprocal Trig (csc, sec, cot)",
        desc: "No dedicated button — use these combos:",
        keys: "csc(x) = 1/sin(x):   [1][÷][sin(x)]\nsec(x) = 1/cos(x):   [1][÷][cos(x)]\ncot(x) = 1/tan(x):   [1][÷][tan(x)]"
      },
      {
        title: "Cheat Code #9: Degrees-Minutes-Seconds (DMS) Conversion",
        desc: "Convert between DMS and decimal degrees.",
        keys: "DMS → Decimal:\n[math] → scroll to DMS symbols (°, ', \")\nEnter angle: 30°45'20\" → [math] → convert option → [enter]\n\nDecimal → DMS:\nEnter decimal angle → [2nd][math] → ▶DMS → [enter]"
      },
      {
        title: "Cheat Code #10: Exact ↔ Decimal Toggle",
        desc: "Toggle between exact form (fractions, √, π) and decimal approximation.",
        keys: "After computing, press [⟺≈] key (above [enter])\nToggles between exact: π/4 ↔ decimal: 0.7854"
      }
    ]
  },
  "2026-07-29": {
    topic: "Mathematics · Calculus",
    codes: [
      {
        title: "Cheat Code #11: Numerical Derivative at a Point",
        desc: "Find f'(x) at x = a numerically — no chain rule needed.",
        keys: "[2nd][d/dx]  (derivative key)\nEnter the function using x\nPress [enter] → enter the x-value (point of evaluation)\nPress [enter] → result is f'(a)",
        example: "f(x) = x³, find f'(2)\nInput: x^3, x-value = 2 → Answer: 12"
      },
      {
        title: "Cheat Code #12: Numerical Definite Integral",
        desc: "Compute ∫[a to b] f(x) dx without anti-derivatives.",
        keys: "[2nd][∫]  (integral key)\nEnter: lower bound [enter] → upper bound [enter]\nEnter the function → [enter]\nResult = area under curve",
        example: "∫[0 to 3] x² dx\nLower=0, Upper=3, f(x)=x² → Answer: 9"
      },
      {
        title: "Cheat Code #13: Verify Answers with Plug-In Method",
        desc: "For multiple-choice: plug answer choices back in rather than solving from scratch.",
        keys: "Strategy:\n1. Note the answer choices (e.g., x = 3, 4, 5)\n2. Enter f(x) with x=[2nd][ans] or [alpha][x]\n3. STO answer choice to [alpha][x], evaluate\n4. Pick the one that satisfies the equation"
      },
      {
        title: "Cheat Code #14: Power Functions & Roots",
        desc: "Quick access to powers and roots.",
        keys: "x squared:     [x²]\nx cubed:       [x^] [3] [enter]\nAny power:     [x^] [n] [enter]\nSquare root:   [2nd][x²] = √\nCube root:     [2nd][x^] [3]\nnth root:      [x^] [1÷n]   OR  value [^] [(1÷n)]"
      },
      {
        title: "Cheat Code #15: Logarithms — Any Base",
        desc: "The TI-36X Pro only has log (base 10) and ln (base e) buttons, but handles any base.",
        keys: "log base 10:  [log] (x) [enter]\nnatural log:  [ln] (x) [enter]\nlog base b:   [log](x) ÷ [log](b)   ← Change of Base Formula!\nantilog 10^x: [2nd][log] (x)\ne^x:          [2nd][ln] (x)"
      }
    ]
  },
  "2026-07-30": {
    topic: "Mathematics · Linear Algebra & Vectors",
    codes: [
      {
        title: "Cheat Code #16: Enter a Matrix",
        desc: "Define matrices A, B, or C (up to 3×3).",
        keys: "[2nd][matrix] → arrow to EDIT → [enter]\nSelect: 1:[A]  (or B, C)\nEnter Rows × Cols (e.g., 3 [enter] 3 [enter])\nFill in values row by row, press [enter] after each\nWhen done: [2nd][quit] → returns to home screen"
      },
      {
        title: "Cheat Code #17: Matrix Determinant",
        desc: "Find det(A) in 3 key presses.",
        keys: "[2nd][matrix] → scroll to MATH tab → 1:det( → [enter]\n[2nd][matrix] → NAMES → 1:[A] → [enter]\nClose paren: [)] → [enter] → result shown"
      },
      {
        title: "Cheat Code #18: Matrix Inverse [A]⁻¹",
        desc: "Solve systems by using the inverse directly.",
        keys: "[2nd][matrix] → NAMES → 1:[A]\nPress [x⁻¹] key → [enter]\nResult: displays the inverse matrix",
        example: "Usage: For Ax = B, compute [A]⁻¹[B] → x solution vector"
      },
      {
        title: "Cheat Code #19: Matrix Multiplication & Row Reduction (RREF)",
        desc: "Multiply matrices or row reduce.",
        keys: "Matrix Multiply:\n[matrix A] [×] [matrix B] → [enter]\n\nRREF (Row Reduced Echelon Form):\n[2nd][matrix] → MATH tab → rref( → [enter]\nSelect matrix → [)] → [enter]",
        example: "Pro Tip: Use RREF to solve large systems of linear equations directly!"
      },
      {
        title: "Cheat Code #20: Vectors — Dot Product & Cross Product",
        desc: "Define vectors (V1, V2), then compute products.",
        keys: "Define Vector:\n[2nd][vector] → EDIT → V1 → enter dimension (2 or 3)\nEnter components → [2nd][quit]\n\nDot Product:\n[2nd][vector] → MATH → dotP( → V1, V2 → [)] → [enter]\n\nCross Product:\n[2nd][vector] → MATH → crossP( → V1, V2 → [)] → [enter]\n\nMagnitude (Norm):\n[2nd][vector] → MATH → norm( → V1 → [)] → [enter]"
      }
    ]
  },
  "2026-07-31": {
    topic: "Probability & Statistics — Part 1",
    codes: [
      {
        title: "Cheat Code #21: Enter Data into Lists",
        desc: "Load a dataset for instant statistical calculations.",
        keys: "[data] key\nEnter values into L1 (one per row, press [enter] after each)\nFor paired data (x,y): L1 = x values, L2 = y values\nWhen done: [2nd][quit]"
      },
      {
        title: "Cheat Code #22: 1-Variable Statistics (Mean, SD, Median)",
        desc: "Get all descriptive stats at once.",
        keys: "[2nd][stat-reg/distr] → 1:1-Var Stats → [enter]\nConfirm xDATA = L1, FRQ = ONE → highlight CALC → [enter]",
        example: "Results shown:\nx̄  = Mean\nSx = Sample Standard Deviation\nσx = Population Standard Deviation\nn  = Count\nΣx = Sum\nminX, Q1, Med, Q3, maxX = 5-number summary"
      },
      {
        title: "Cheat Code #23: Normal Distribution CDF",
        desc: "Find probabilities P(a < X < b) for a normal distribution.",
        keys: "[2nd][stat-reg/distr] → scroll to DISTR tab\nSelect normalCDF → [enter]\nEnter: lower bound, upper bound, μ (mean), σ (std dev)\n→ [enter] = probability\n\nSpecial values:\n-∞ = type -1E99 (press [2nd][EE] for E)\n+∞ = type  1E99",
        example: "Example: P(X < 75) with μ=70, σ=5\nLower=-1E99, Upper=75, μ=70, σ=5 → 0.8413"
      },
      {
        title: "Cheat Code #24: Binomial Distribution",
        desc: "For n trials, probability p, find P(X = k).",
        keys: "[2nd][stat-reg/distr] → DISTR tab\nbinompdf(n, p, k) → exact probability P(X = k)\nbinomcdf(n, p, k) → cumulative P(X ≤ k)",
        example: "Example: 10 flips, p=0.5, P(X=6)?\nbinompdf(10, 0.5, 6) → 0.2051"
      }
    ]
  },
  "2026-08-01": {
    topic: "Probability & Statistics — Part 2",
    codes: [
      {
        title: "Cheat Code #25: Linear Regression (2-Var Stats)",
        desc: "Find slope, intercept, and correlation coefficient for a dataset.",
        keys: "[data] → enter x in L1, y in L2 → [2nd][quit]\n[2nd][stat-reg/distr] → 4:LinReg ax+b → [enter]\nConfirm xDATA=L1, yDATA=L2, FRQ=ONE → CALC → [enter]",
        example: "Exam Trick: Use LinReg for linear interpolation between two data points!"
      },
      {
        title: "Cheat Code #26: Predicting Y-Values from Regression",
        desc: "After running LinReg, compute predicted values directly.",
        keys: "After LinReg is run:\nOn home screen: type x-value\nUse stored a and b:\n[alpha][A] [×] x-value [+] [alpha][B]  → gives ŷ"
      },
      {
        title: "Cheat Code #27: Permutations & Combinations",
        desc: "For counting problems (P and C).",
        keys: "nPr (Permutations):\nEnter n → [math] → PRB tab → 2:nPr → enter r → [enter]\n\nnCr (Combinations):\nEnter n → [math] → PRB tab → 3:nCr → enter r → [enter]",
        example: "Example: C(10,3) = 120 | P(10,3) = 720"
      },
      {
        title: "Cheat Code #28: Poisson & Other Distributions",
        desc: "Access all built-in probability distributions.",
        keys: "[2nd][stat-reg/distr] → scroll to DISTR tab:\n- poissonpdf(λ, k) = P(X=k) for Poisson\n- poissoncdf(λ, k) = P(X≤k)\n- Use for arrival rates, defect counts, queuing problems"
      }
    ]
  },
  "2026-08-02": {
    topic: "Ethics — (Calculator Efficiency & Complex Number Review)",
    codes: [
      {
        title: "Cheat Code #29: Complex Number Mode Setup",
        desc: "Enable complex number calculations.",
        keys: "[2nd][x²] → REAL menu → select a+bi → [enter]\n(Enables rectangular complex number display)\n\nEnter imaginary unit i:\nPress [2nd][.] = i",
        example: "Example: 3 + 4i → type [3][+][4][2nd][.][enter]"
      },
      {
        title: "Cheat Code #30: Rectangular ↔ Polar Conversion",
        desc: "Critical for AC circuit analysis and phasor problems.",
        keys: "Rectangular → Polar:\nEnter a+bi value → press [2nd][complex] → 4:▶r∠θ → [enter]\n\nPolar → Rectangular:\nEnter r∠θ → [2nd][complex] → 5:▶a+bi → [enter]\n\nEnter ∠ symbol:\n[2nd][complex] → 6:∠",
        example: "Example: 5∠30° → [5][∠][30]"
      },
      {
        title: "Cheat Code #31: Complex Number Arithmetic",
        desc: "Add, subtract, multiply, and get magnitudes.",
        keys: "Complex Add/Subtract:  Just type normally!\n  (3+4i) + (1-2i) → [enter] = 4+2i\n\nComplex Multiply:\n  (3+4i)(1-2i) → [enter] = 11-2i\n\nConjugate:\n  [2nd][complex] → conj( → enter value → [)] → [enter]\n\nMagnitude |z|:\n  [2nd][complex] → abs( → enter value → [)] → [enter]"
      }
    ]
  },
  "2026-08-03": {
    topic: "Ethics — (Engineering Notation & Full Review)",
    codes: [
      {
        title: "Cheat Code #32: Engineering Notation Mode (ENG)",
        desc: "Display results in powers of 3 (kilo, milli, micro, etc.).",
        keys: "[mode] → scroll to find SCI/ENG/FIX/FLOAT options\nSelect ENG → [enter]",
        example: "Results display as: 12,000 → 12 × 10³\n0.0056 → 5.6 × 10⁻³\nEngineering prefix reference:\n10³ = kilo (k) | 10⁶ = mega (M) | 10⁻³ = milli (m) | 10⁻⁶ = micro (μ)"
      },
      {
        title: "Cheat Code #33: Built-in Unit Converter",
        desc: "Convert between unit systems without lookup tables.",
        keys: "Enter value to convert\n[2nd][convert]\nSelect category (e.g., 1:English-Metric, 2:Temperature)\nScroll to specific conversion → [enter]",
        example: "Available Categories: Length, Area, Volume, Speed, Mass, Force, Pressure, Energy, Power, Temperature"
      },
      {
        title: "Cheat Code #34: Scientific Notation Input",
        desc: "Enter very large or very small numbers efficiently.",
        keys: "Enter 3.5 × 10⁸:\n[3][.][5] [2nd][EE] [8] → displays as 3.5E8\n\nEnter 6.022 × 10²³ (Avogadro):\n[6][.][022][2nd][EE][23]"
      },
      {
        title: "Cheat Code #35: Reset Calculator (Emergency!)",
        desc: "If the calculator behaves unexpectedly during exam.",
        keys: "[2nd][reset] → select ALL MEMORY or DEFAULT\nOR: Remove batteries for 30 seconds (not during exam!)"
      }
    ]
  },
  "2026-08-04": {
    topic: "Engineering Economics — Part 1",
    codes: [
      {
        title: "Cheat Code #36: Compound Interest — Future Value F = P(1+i)ⁿ",
        desc: "Formula for Future Value",
        keys: "Keystroke sequence for F = P(1+i)^n:\nEnter P [×] [(] [1][+] i [)] [^] n [enter]",
        example: "Example: P=1000, i=8%=0.08, n=5 years\n[1000][×][(][1][+][.08][)][^][5][enter] = 1469.33"
      },
      {
        title: "Cheat Code #37: Store & Chain Economic Formulas",
        desc: "Use STO→ heavily for multi-step economic problems.",
        keys: "Step 1: Compute P/F factor → STO→ A\nStep 2: Compute A/P factor → STO→ B\nStep 3: [alpha][A][×][alpha][B] = combined factor\n\nStore interest rate:\ni → STO→ [alpha][I]\nn → STO→ [alpha][N]"
      },
      {
        title: "Cheat Code #38: Logarithm for Solving Exponential Growth",
        desc: "Find how many periods to double an investment.",
        keys: "Rule of 72 on calculator:\n[72][÷] interest rate [%] [enter] = approx. years to double\n\nExact calculation:\nln(2) ÷ ln(1+i) [enter] = exact years to double",
        example: "Example: i = 8%\n[ln][2][÷][ln][(][1][+][.08][)][enter] = 9.006 years"
      },
      {
        title: "Cheat Code #39: Effective Annual Rate (EAR)",
        desc: "Convert nominal rate to effective annual rate.",
        keys: "Formula: EAR = (1 + r/m)^m - 1",
        example: "Example: 12% nominal, compounded monthly (m=12)\n[(][1][+][.12][÷][12][)][^][12][-][1][enter] = 0.1268 = 12.68%"
      }
    ]
  },
  "2026-08-05": {
    topic: "Engineering Economics — Part 2",
    codes: [
      {
        title: "Cheat Code #40: Present Worth Factor P/F",
        desc: "P = F × (1+i)^(-n)",
        keys: "Example: F=5000, i=6%, n=8 years\n[5000][×][(][1][+][.06][)][^][(][(-)][ 8][)][enter] = $3,132.87"
      },
      {
        title: "Cheat Code #41: Annuity Factor A/P (Capital Recovery)",
        desc: "A = P × [i(1+i)^n] / [(1+i)^n - 1]",
        keys: "Efficient entry — store intermediate:\n[(][1][+] i [)][^] n → STO→ A\nP [×] i [×] [alpha][A] [÷] [(][alpha][A] [-][1][)][enter]"
      },
      {
        title: "Cheat Code #42: Geometric Gradient Factors",
        desc: "Use the num-solv trick to verify geometric series problems.",
        keys: "For rate-of-growth problems:\nEnter the closed-form PW formula as an equation\nUse [2nd][num-solv] to back-solve for any unknown\n(e.g., find n when PW = target value)"
      },
      {
        title: "Cheat Code #43: Fraction Display for Exact Answers",
        desc: "Engineering economics sometimes gives \"nice\" fraction answers.",
        keys: "After computing: press [⟺≈] to toggle\n→ If answer is rational, it displays as a fraction\n→ Helps match exact multiple-choice options",
        example: "Example: 1/1.06^5 → toggle → shows exact decimal or fraction"
      },
      {
        title: "Cheat Code #44: Full Speed Drill — All 10 Days",
        desc: "Run through every function back-to-back to build pure muscle memory.",
        keys: "Speed Drill Order (5 minutes each):\n1. [2nd][num-solv]\n2. [2nd][poly-solv]\n3. [2nd][sys-solv]\n4. [2nd][matrix]\n5. [2nd][vector]\n6. [data] → [2nd][stat-reg] — 1-Var Stats\n7. [2nd][stat-reg] → DISTR → normalCDF\n8. [2nd][complex] — rectangular ↔ polar\n9. [2nd][d/dx] — derivative at a point\n10. [2nd][∫] — definite integral"
      }
    ]
  }
};
