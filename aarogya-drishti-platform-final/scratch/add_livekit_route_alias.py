path = r"backend\main.py"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

target = '@app.get("/api/v1/livekit/config")\ndef get_livekit_config():'
replacement = '@app.get("/api/v1/livekit/config")\n@app.get("/livekit/config")\ndef get_livekit_config():'

if target in code:
    code = code.replace(target, replacement, 1)
    with open(path, "w", encoding="utf-8") as f:
        f.write(code)
    print("Successfully added @app.get('/livekit/config') alias!")
else:
    print("Target not found with standard newlines, trying with \r\n...")
    target_crlf = '@app.get("/api/v1/livekit/config")\r\ndef get_livekit_config():'
    replacement_crlf = '@app.get("/api/v1/livekit/config")\r\n@app.get("/livekit/config")\r\ndef get_livekit_config():'
    if target_crlf in code:
        code = code.replace(target_crlf, replacement_crlf, 1)
        with open(path, "w", encoding="utf-8") as f:
            f.write(code)
        print("Successfully added @app.get('/livekit/config') alias (CRLF)!")
    else:
        print("Could not find target!")

