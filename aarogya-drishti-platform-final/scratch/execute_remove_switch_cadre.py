html_path = r'frontend/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_str = '            <!-- Traditional Cadre Switcher Dropdown -->'
idx_start = content.find(start_str)

end_marker = '          </div>\n\n        </div>\n      `;'
idx_end = content.find(end_marker, idx_start)

if idx_start == -1 or idx_end == -1:
    print("Markers not found!")
    exit(1)

# Remove the block cleanly
updated = content[:idx_start] + content[idx_end:]

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(updated)

print("SUCCESS: Switch Cadre dropdown removed!")

