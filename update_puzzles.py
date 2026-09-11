import json
import os

files_to_update = [
    {
        "filename": "public/01_FE_Practice_Questions/06-circuit-analysis-2026-08-06.json",
        "puzzle_instance": {
            "puzzleType": "crossword",
            "gridSize": {"rows": 15, "cols": 15},
            "items": [
                {"answer": "KIRCHHOFF", "clue": "Scientist who formulated the fundamental current and voltage laws."},
                {"answer": "NODE", "clue": "A point where two or more circuit elements meet."},
                {"answer": "LOOP", "clue": "A closed path in a circuit used for KVL."}
            ],
            "config": { "max_rows": 15, "max_cols": 15, "enforce_symmetry": False, "min_word_length": 3 }
        }
    },
    {
        "filename": "public/01_FE_Practice_Questions/06-circuit-analysis-2026-08-07.json",
        "puzzle_instance": {
            "puzzleType": "system-of-equations",
            "facts": [
                {"id": "R1", "label": "Resistor 1 (ohms)", "value": 10},
                {"id": "R2", "label": "Resistor 2 (ohms)", "value": 20},
                {"id": "REQ", "label": "Series Equivalent (ohms)", "value": 30}
            ],
            "num_unknowns": 3,
            "equations": [
                {"coeffs": [1, 1, -1], "vars": ["R1", "R2", "REQ"], "result": 0},
                {"coeffs": [1, -1, 0], "vars": ["R1", "R2", "REQ"], "result": -10},
                {"coeffs": [0, 1, 1], "vars": ["R1", "R2", "REQ"], "result": 50}
            ],
            "presentation": "word_problem"
        }
    },
    {
        "filename": "public/01_FE_Practice_Questions/06-circuit-analysis-2026-08-08.json",
        "puzzle_instance": {
            "puzzleType": "wordle",
            "items": [{"answer": "norton"}],
            "config": {
                "word_length": 6,
                "max_guesses": 6,
                "guess_dictionary": ["norton", "source", "equals", "output", "series"]
            }
        }
    },
    {
        "filename": "public/01_FE_Practice_Questions/06-circuit-analysis-2026-08-10.json",
        "puzzle_instance": {
            "puzzleType": "maze",
            "gridSize": { "rows": 20, "cols": 20 },
            "algorithm": "recursiveBacktracker",
            "braidFactor": 0.0,
            "start": [0, 0],
            "end": [19, 19],
            "waypointItems": [
                {"cell": [4, 7], "content": "Supernode: Formed by a voltage source between two non-reference nodes."},
                {"cell": [10, 10], "content": "Reference Node: Typically chosen as ground (0V)."}
            ]
        }
    },
    {
        "filename": "public/01_FE_Practice_Questions/06-circuit-analysis-2026-08-11.json",
        "puzzle_instance": {
            "puzzleType": "pickARoom",
            "rooms": [
                { "id": "room1", "attributes": { "waveform": "Sinusoid", "RMS": "Peak / √2" }, "sign": "This room contains the correct RMS calculation.", "signTruthValue": True },
                { "id": "room2", "attributes": { "waveform": "Square", "RMS": "Peak / 2" }, "sign": "Square waves have RMS = Peak / 2.", "signTruthValue": False },
                { "id": "room3", "attributes": { "waveform": "Triangle", "RMS": "Peak / √2" }, "sign": "Triangle waves have the same RMS as sinusoids.", "signTruthValue": False }
            ],
            "clues": [
                "The correct room's waveform is used in AC power.",
                "Only one sign tells the truth, and it is in the correct room."
            ],
            "solution": "room1"
        }
    },
    {
        "filename": "public/01_FE_Practice_Questions/06-circuit-analysis-2026-08-12.json",
        "puzzle_instance": {
            "puzzleType": "crossword",
            "gridSize": {"rows": 15, "cols": 15},
            "items": [
                {"answer": "PHASOR", "clue": "A complex number representing the amplitude and phase of a sinusoid."},
                {"answer": "COMPLEX", "clue": "Type of math required for phasor analysis."},
                {"answer": "ANGLE", "clue": "The phase shift of a sinusoidal waveform."}
            ],
            "config": { "max_rows": 15, "max_cols": 15, "enforce_symmetry": False, "min_word_length": 3 }
        }
    },
    {
        "filename": "public/01_FE_Practice_Questions/06-circuit-analysis-2026-08-13.json",
        "puzzle_instance": {
            "puzzleType": "wordle",
            "items": [{"answer": "ohms"}],
            "config": {
                "word_length": 4,
                "max_guesses": 6,
                "guess_dictionary": ["ohms", "real", "imag", "coil", "wire"]
            }
        }
    },
    {
        "filename": "public/01_FE_Practice_Questions/06-circuit-analysis-2026-08-14.json",
        "puzzle_instance": {
            "puzzleType": "system-of-equations",
            "facts": [
                {"id": "V", "label": "Voltage (V)", "value": 120},
                {"id": "I", "label": "Current (A)", "value": 10},
                {"id": "R", "label": "Resistance (Ohms)", "value": 12}
            ],
            "num_unknowns": 3,
            "equations": [
                {"coeffs": [1, -12, 0], "vars": ["V", "I", "R"], "result": 0},
                {"coeffs": [1, 0, -10], "vars": ["V", "I", "R"], "result": 0},
                {"coeffs": [0, 1, 1], "vars": ["V", "I", "R"], "result": 22}
            ],
            "presentation": "word_problem"
        }
    }
]

for file_info in files_to_update:
    filepath = file_info["filename"]
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            data = json.load(f)
        
        # Override the puzzle instance
        data['puzzle_instance'] = file_info["puzzle_instance"]
        
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"Updated {filepath}")
    else:
        print(f"File not found: {filepath}")

print("All puzzle instances updated.")
