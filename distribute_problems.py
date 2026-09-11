import re
import json
import os

# 1. Read the 47 problems from the HTML
with open('circuit-analysis-problems.html', 'r') as f:
    html = f.read()

m = re.search(r'const problems = (\[.*?\]);', html, re.DOTALL)
if not m:
    print("Could not find problems array")
    exit(1)

html_problems = json.loads(m.group(1))

# 2. Read the base circuit analysis json
base_json_path = 'public/01_FE_Practice_Questions/06-circuit-analysis.json'
with open(base_json_path, 'r') as f:
    base_json = json.load(f)

base_questions = base_json['questions']

# 3. Create the assignments
assignments = [
    {"date": "2026-08-06", "suffix": "2026-08-06", "subtopic": "KCL, KVL", "count": 6},
    {"date": "2026-08-07", "suffix": "2026-08-07", "subtopic": "Series/parallel equivalent circuits", "count": 6},
    {"date": "2026-08-08", "suffix": "2026-08-08", "subtopic": "Thevenin and Norton theorems", "count": 6},
    {"date": "2026-08-10", "suffix": "2026-08-10", "subtopic": "Node and loop analysis", "count": 6},
    {"date": "2026-08-11", "suffix": "2026-08-11", "subtopic": "Waveform analysis", "count": 6},
    {"date": "2026-08-12", "suffix": "2026-08-12", "subtopic": "Phasors", "count": 6},
    {"date": "2026-08-13", "suffix": "2026-08-13", "subtopic": "Impedance", "count": 6},
    {"date": "2026-08-14", "suffix": "2026-08-14", "subtopic": "Full Topic Review", "count": 5},
]

problem_idx = 0
date_file_map = {}

for assign in assignments:
    # Deep copy the base json
    day_json = json.loads(json.dumps(base_json))
    
    # We will append the assigned number of problems
    count = assign["count"]
    for i in range(count):
        if problem_idx >= len(html_problems):
            break
            
        p = html_problems[problem_idx]
        
        # Format for json
        new_q = {
            "id": f"CA-NEW-{problem_idx+1}",
            "subtopic": assign["subtopic"],
            "difficulty": "medium",  # Defaulting to medium
            "stem": p["problemText"],
            "choices": {
                "A": p["choices"][0],
                "B": p["choices"][1],
                "C": p["choices"][2],
                "D": p["choices"][3]
            },
            "correct_answer": p["correctAnswer"],
            "explanation": p["solutionText"],
            "reference": f"Added from {p['chapter']}"
        }
        
        day_json["questions"].append(new_q)
        problem_idx += 1
        
    # Write the new json file
    file_name = f"06-circuit-analysis-{assign['suffix']}.json"
    date_file_map[assign["date"]] = file_name
    
    out_path = f"public/01_FE_Practice_Questions/{file_name}"
    with open(out_path, 'w') as f:
        json.dump(day_json, f, indent=2)
        
print(f"Created {len(date_file_map)} new files.")

# 4. Update the manifest
manifest_path = 'public/01_FE_Practice_Questions/_manifest.json'
with open(manifest_path, 'r') as f:
    manifest = json.load(f)
    
for topic in manifest['topics']:
    if topic['topic_name'] == "Circuit Analysis":
        topic['date_file_map'] = date_file_map
        break

with open(manifest_path, 'w') as f:
    json.dump(manifest, f, indent=2)

print("Updated _manifest.json successfully.")
