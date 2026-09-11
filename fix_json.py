import json
import os

files = [
    ("09-electronics-2026-08-18.json", "wordle", {"target_word": "DIODE"}),
    ("09-electronics-2026-08-19.json", "crossword", {
        "grid_size": {"rows": 4, "cols": 4},
        "words": [
            {"number": 1, "direction": "across", "row": 1, "col": 1, "answer": "FET", "clue": "Field Effect Transistor"},
            {"number": 1, "direction": "down", "row": 1, "col": 1, "answer": "FLOW", "clue": "Movement of current"},
            {"number": 2, "direction": "across", "row": 3, "col": 1, "answer": "OHM", "clue": "Unit of resistance"}
        ]
    }),
    ("09-electronics-2026-08-20.json", "wordle", {"target_word": "DRAIN"}),
    ("09-electronics-2026-08-21.json", "wordle", {"target_word": "PTYPE"}),
    ("09-electronics-2026-08-22.json", "crossword", {
        "grid_size": {"rows": 5, "cols": 5},
        "words": [
            {"number": 1, "direction": "across", "row": 1, "col": 1, "answer": "BJT", "clue": "Bipolar Junction Transistor"},
            {"number": 1, "direction": "down", "row": 1, "col": 1, "answer": "BIAS", "clue": "DC voltage applied to set operating point"},
            {"number": 2, "direction": "across", "row": 3, "col": 1, "answer": "AMP", "clue": "Short for Amplifier"}
        ]
    }),
    ("09-electronics-2026-08-23.json", "wordle", {"target_word": "PHASE"}),
    ("09-electronics-2026-08-24.json", "wordle", {"target_word": "GAUGE"}),
]

base_path = "/Users/xavierbucknor/Documents/work/clients/Jen/Jen_Studio/fe-study-arcade/public/01_FE_Practice_Questions/"

for filename, ptype, pdata in files:
    path = os.path.join(base_path, filename)
    with open(path, "r") as f:
        data = json.load(f)
    
    # If the subagent returned an array, wrap it
    if isinstance(data, list):
        new_data = {
            "topic_number": 9,
            "topic_name": "Electronics",
            "questions": data,
            "puzzle_slug": ptype,
            "puzzle_instance": {
                "slug": ptype,
                "narrative": "Complete the puzzle for today's electronics review."
            }
        }
        if ptype == "wordle":
            new_data["puzzle_instance"]["target_word"] = pdata["target_word"]
            new_data["puzzle_instance"]["config"] = {"word_length": 5, "max_guesses": 6}
        elif ptype == "crossword":
            new_data["puzzle_instance"]["grid_size"] = pdata["grid_size"]
            new_data["puzzle_instance"]["words"] = pdata["words"]
        
        with open(path, "w") as f:
            json.dump(new_data, f, indent=2)

print("Done")
