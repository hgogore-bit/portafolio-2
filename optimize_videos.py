import os
import glob

# Working directory (current directory of the script)
cwd = os.path.dirname(os.path.abspath(__file__))

# Target replacement
target = 'autoplay muted playsinline loop preload="auto"'
replacement = 'muted playsinline loop preload="metadata"'

# Find all HTML files
html_files = glob.glob(os.path.join(cwd, '*.html'))

for filepath in html_files:
    # Skip index.html since we did it manually and need specific preloads there
    if os.path.basename(filepath) == 'index.html':
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if target in content:
        count = content.count(target)
        updated_content = content.replace(target, replacement)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        print(f"Updated {os.path.basename(filepath)}: replaced {count} occurrences.")
    else:
        print(f"No match in {os.path.basename(filepath)}.")
