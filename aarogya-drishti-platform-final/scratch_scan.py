with open('frontend/index.html', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'data-i18n="appSub"' in l or 'data-i18n="appTitle"' in l or 'ITDA Paderu' in l:
        print(f"Line {i+1}: {l.strip()[:100]}")

