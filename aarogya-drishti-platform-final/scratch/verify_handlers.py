import re

html_path = r"frontend/index.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extract all script contents
scripts = re.findall(r"<script[\s\S]*?>([\s\S]*?)</script>", content, re.IGNORECASE)
full_script = "\n".join(scripts)

# Find all function definitions in scripts
func_defs = set(re.findall(r"function\s+([a-zA-Z0-9_$]+)\s*\(", full_script))
arrow_defs = set(re.findall(r"(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*(?:\([^)]*\)|[a-zA-Z0-9_$]+)\s*=>", full_script))
assigned_funcs = set(re.findall(r"(?:const|let|var|window\.)\s*([a-zA-Z0-9_$]+)\s*=\s*function", full_script))
all_defined = func_defs.union(arrow_defs).union(assigned_funcs)

# Find all event handlers in HTML
handlers = re.findall(r'on(?:click|change|input|submit|keydown|keyup)\s*=\s*["\']([^"\']+)["\']', content)
print(f"Total event handlers in HTML: {len(handlers)}")
print(f"Total defined JS functions: {len(all_defined)}")

missing = set()
for h in handlers:
    # extract function calls like myFunction(...) or myFunction(event)
    calls = re.findall(r'([a-zA-Z0-9_$]+)\s*\(', h)
    for c in calls:
        if c not in all_defined and c not in ['alert', 'console', 'document', 'window', 'event', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', 'confirm', 'prompt', 'parseInt', 'parseFloat']:
            missing.add(c)

print("Missing or undefined functions in event handlers:", missing)

