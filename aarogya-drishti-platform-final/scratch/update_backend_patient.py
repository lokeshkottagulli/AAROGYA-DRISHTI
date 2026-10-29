main_path = r'backend/main.py'
with open(main_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = "    phone: str\n    tobacco_chewing: bool = True"
replacement = "    phone: str\n    abha_id: Optional[str] = None\n    aarogyasri_card: Optional[str] = None\n    tobacco_chewing: bool = True"

if target in content:
    content = content.replace(target, replacement)
    with open(main_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("SUCCESS: Added abha_id and aarogyasri_card to PatientCreate in backend/main.py!")
else:
    print("Warning: target not found!")

