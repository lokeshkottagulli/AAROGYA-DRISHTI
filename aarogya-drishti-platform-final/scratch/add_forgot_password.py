import re

html_path = r'frontend/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Let's check password input block
old_password_block = """          <!-- Password Input -->
          <div>
            <label class="block text-xs font-bold text-slate-800 mb-1">
              Password <span class="text-rose-600 font-bold">*</span>
            </label>
            <div class="relative">
              <input id="loginPassword" type="password" value="" required placeholder="" class="w-full pl-3.5 pr-10 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0096a6] focus:border-[#0096a6] focus:outline-none bg-white text-slate-900 transition shadow-sm"
              />
              <button 
                type="button" 
                onclick="togglePasswordVisibility()" 
                class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                <i id="loginEyeIcon" class="fa-solid fa-eye-slash text-sm"></i>
              </button>
            </div>
          </div>"""

new_password_block = """          <!-- Password Input -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-xs font-bold text-slate-800">
                Password <span class="text-rose-600 font-bold">*</span>
              </label>
              <button 
                type="button" 
                onclick="openForgotPasswordModal()" 
                class="text-xs font-bold text-[#0096a6] hover:text-[#007b8a] hover:underline transition flex items-center gap-1"
                data-i18n="btnForgotPassword"
              >
                <i class="fa-solid fa-key text-[10px]"></i>
                <span>Forgot Password?</span>
              </button>
            </div>
            <div class="relative">
              <input id="loginPassword" type="password" value="" required placeholder="" class="w-full pl-3.5 pr-10 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0096a6] focus:border-[#0096a6] focus:outline-none bg-white text-slate-900 transition shadow-sm"
              />
              <button 
                type="button" 
                onclick="togglePasswordVisibility()" 
                class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                <i id="loginEyeIcon" class="fa-solid fa-eye-slash text-sm"></i>
              </button>
            </div>
          </div>"""

# Also let's check submit button block to add a centered recovery link below it
old_submit_block = """          <!-- Submit Login Button -->
          <div class="pt-3">
            <button 
              type="submit" 
              id="loginSubmitBtn" 
              class="w-full bg-[#0096a6] hover:bg-[#00838f] text-white font-bold text-sm py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow hover:shadow-md transition active:scale-98"
            >
              <span>Login to Portal</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
            
            <button type="button" id="quickDemoLoginBtn" style="display:none;" onclick="quickLoginWithAccount(document.getElementById('loginUsername')?.value || 'anm_lakshmi')">
              Demo Login
            </button>
          </div>"""

new_submit_block = """          <!-- Submit Login Button -->
          <div class="pt-3 space-y-2.5">
            <button 
              type="submit" 
              id="loginSubmitBtn" 
              class="w-full bg-[#0096a6] hover:bg-[#00838f] text-white font-bold text-sm py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow hover:shadow-md transition active:scale-98"
            >
              <span>Login to Portal</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>

            <!-- Centered Forgot Password / Credential Recovery Link -->
            <div class="flex items-center justify-center pt-1">
              <button 
                type="button" 
                onclick="openForgotPasswordModal()" 
                class="text-xs font-semibold text-slate-600 hover:text-[#0096a6] transition flex items-center gap-1.5 py-1 px-2 rounded hover:bg-slate-50"
              >
                <i class="fa-solid fa-unlock-keyhole text-[#0096a6] text-xs"></i>
                <span data-i18n="btnForgotPassword">Forgot Password?</span>
                <span class="text-slate-400 font-normal">| Self-Service Recovery</span>
              </button>
            </div>
            
            <button type="button" id="quickDemoLoginBtn" style="display:none;" onclick="quickLoginWithAccount(document.getElementById('loginUsername')?.value || 'anm_lakshmi')">
              Demo Login
            </button>
          </div>"""

if old_password_block in content:
    content = content.replace(old_password_block, new_password_block)
    print("SUCCESS: Added Forgot Password link above password input!")

if old_submit_block in content:
    content = content.replace(old_submit_block, new_submit_block)
    print("SUCCESS: Added Forgot Password recovery link below login button!")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Finished writing frontend/index.html")

