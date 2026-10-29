html_path = r'frontend/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = """          <!-- Submit Login Button -->
          <div class="pt-3">
            <button 
              type="submit" 
              id="loginSubmitBtn" 
              class="w-full bg-[#0096a6] hover:bg-[#00838f] text-white font-bold text-sm py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow hover:shadow-md transition active:scale-98"
            >
              <i class="fa-solid fa-lock-open"></i>
              <span>Login</span>
            </button>
            
            <!-- Hidden button for automated audit compatibility -->
            <button type="button" id="quickDemoLoginBtn" style="display:none;" onclick="quickLoginWithAccount(document.getElementById('loginUsername')?.value || 'anm_lakshmi')">
              Demo Login
            </button>
          </div>"""

replacement = """          <!-- Submit Login Button -->
          <div class="pt-3 space-y-2.5">
            <button 
              type="submit" 
              id="loginSubmitBtn" 
              class="w-full bg-[#0096a6] hover:bg-[#00838f] text-white font-bold text-sm py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow hover:shadow-md transition active:scale-98"
            >
              <i class="fa-solid fa-right-to-bracket"></i>
              <span>Login</span>
            </button>

            <!-- Centered Forgot Password / Credential Recovery Link -->
            <div class="text-center pt-1">
              <button 
                type="button" 
                onclick="openForgotPasswordModal()" 
                class="text-xs font-bold text-[#0096a6] hover:text-[#007b8a] hover:underline transition inline-flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-teal-50"
              >
                <i class="fa-solid fa-key text-[10px]"></i>
                <span data-i18n="btnForgotPassword">Forgot Password?</span>
              </button>
            </div>
            
            <!-- Hidden button for automated audit compatibility -->
            <button type="button" id="quickDemoLoginBtn" style="display:none;" onclick="quickLoginWithAccount(document.getElementById('loginUsername')?.value || 'anm_lakshmi')">
              Demo Login
            </button>
          </div>"""

if target in content:
    content = content.replace(target, replacement)
    print("SUCCESS: Centered Forgot Password link added below submit button!")
else:
    print("Warning: target not found exactly!")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done updating frontend/index.html")

