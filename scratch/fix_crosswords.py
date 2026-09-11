import json
import os

files_to_update = [
    {
        "filename": "public/01_FE_Practice_Questions/06-circuit-analysis-2026-08-06.json",
        "puzzle_instance": {
            "slug": "crossword",
            "title": "Circuit Fundamentals Crossword",
            "grid_size": {"rows": 8, "cols": 11},
            "words": [
                {"number": 1, "direction": "across", "answer": "KIRCHHOFF", "row": 2, "col": 1, "clue": "Scientist who formulated the fundamental current and voltage laws."},
                {"number": 2, "direction": "down", "answer": "NODE", "row": 1, "col": 7, "clue": "A point where two or more circuit elements meet."},
                {"number": 3, "direction": "across", "answer": "LOOP", "row": 5, "col": 1, "clue": "A closed path in a circuit used for KVL."}
            ]
        }
    },
    {
        "filename": "public/01_FE_Practice_Questions/06-circuit-analysis-2026-08-10.json",
        "puzzle_instance": {
            "slug": "crossword",
            "title": "Node Analysis Crossword",
            "grid_size": {"rows": 11, "cols": 11},
            "words": [
                {"number": 1, "direction": "down", "answer": "REFERENCE", "row": 1, "col": 5, "clue": "The node typically chosen as ground (0V)."},
                {"number": 2, "direction": "across", "answer": "SUPERNODE", "row": 5, "col": 1, "clue": "Formed by a voltage source between two non-reference nodes."}
            ]
        }
    },
    {
        "filename": "public/01_FE_Practice_Questions/06-circuit-analysis-2026-08-12.json",
        "puzzle_instance": {
            "slug": "crossword",
            "title": "Phasor Crossword",
            "grid_size": {"rows": 9, "cols": 9},
            "words": [
                {"number": 1, "direction": "down", "answer": "COMPLEX", "row": 1, "col": 5, "clue": "Type of math required for phasor analysis."},
                {"number": 2, "direction": "across", "answer": "PHASOR", "row": 2, "col": 1, "clue": "A complex number representing amplitude and phase."},
                {"number": 3, "direction": "across", "answer": "ANGLE", "row": 5, "col": 2, "clue": "The phase shift of a sinusoidal waveform."}
            ]
        }
    }
]

for file_info in files_to_update:
    filepath = file_info["filename"]
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            data = json.load(f)
        
        data['puzzle_instance'] = file_info["puzzle_instance"]
        
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"Updated {filepath} crossword layout")
    else:
        print(f"File not found: {filepath}")

print("Crossword puzzles fixed.")
