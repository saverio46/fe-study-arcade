import fitz

doc = fitz.open("fe-electrical-and-computer-practice-problems.pdf")
output = []

start_page = -1
end_page = -1

for page_num in range(len(doc)):
    text = doc[page_num].get_text("text")
    if "Semiconductor Devices" in text and "Circuits" in text:
        if start_page == -1 and page_num > 10:  
            start_page = page_num
    if "Control Systems" in text and "PRACTICE PROBLEMS" in text and start_page != -1 and page_num > start_page:
        end_page = page_num
        break

if start_page != -1:
    if end_page == -1: end_page = start_page + 30
    print(f"Extracting pages {start_page} to {end_page}")
    for page_num in range(start_page, end_page):
        page = doc[page_num]
        blocks = page.get_text("blocks")
        # Sort blocks into columns: x < half page width is column 1, else column 2
        # Then sort by y
        page_width = page.rect.width
        blocks.sort(key=lambda b: (0 if b[0] < page_width/2 else 1, b[1]))
        
        for b in blocks:
            if b[6] == 0:  # text block
                text = b[4].strip()
                if text and not text.startswith("ppi2pass.com") and not text.startswith("PPI"):
                    output.append(text)
        output.append("\n--- PAGE BREAK ---\n")

with open("/Users/xavierbucknor/Documents/work/clients/Jen/Jen_Studio/fe-study-arcade/public/data/electronics-questions.txt", "w") as f:
    f.write("\n\n".join(output))

print("Extraction complete.")
