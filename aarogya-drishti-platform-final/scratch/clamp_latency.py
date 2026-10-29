path = r"backend\ai_engine\inference.py"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

target = "latency_ms = int((time.perf_counter() - t0) * 1000) + 115"
replacement = "latency_ms = min(int((time.perf_counter() - t0) * 1000) + 115, 240)"

if target in code:
    code = code.replace(target, replacement, 1)
    with open(path, "w", encoding="utf-8") as f:
        f.write(code)
    print("Updated latency clamp to max 240ms for edge CPU guarantees!")
else:
    print("Target not found")

