html_path = r'frontend/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_str = '            <!-- Traditional Cadre Switcher Dropdown -->'
idx_start = content.find(start_str)

end_marker = '          </div>\n\n        </div>\n      `;'
idx_end = content.find(end_marker, idx_start)

print("idx_start:", idx_start)
print("idx_end:", idx_end)
print("Section to remove:")
print(repr(content[idx_start:idx_end]))

