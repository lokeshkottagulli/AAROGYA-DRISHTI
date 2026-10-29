import re

file_path = r"c:\Users\lokesh\OneDrive\Pictures\Documents\Desktop\aarogya-drishti-platform-final\frontend\index.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace loginScreen bg-slate-50
old_login = '<div id="loginScreen" class="w-full min-h-screen bg-slate-50 flex flex-col animate-fade-in font-sans">'
new_login = '<div id="loginScreen" class="w-full min-h-screen bg-gradient-to-br from-[#d84a1b] via-[#e05423] to-[#b0360e] flex flex-col animate-fade-in font-sans relative overflow-x-hidden">'

if old_login in content:
    content = content.replace(old_login, new_login, 1)
    print("Replaced loginScreen background!")
else:
    print("Could not find old_login!")

# Upgrade login card to shadow-2xl and rounded-2xl
old_card = '<div class="bg-white rounded-xl shadow-lg border border-slate-200 p-6 sm:p-8 space-y-5 w-full">'
new_card = '<div class="bg-white rounded-2xl shadow-2xl border border-white/40 p-6 sm:p-8 space-y-5 w-full">'

if old_card in content:
    content = content.replace(old_card, new_card, 1)
    print("Replaced login card styling!")
else:
    print("Could not find old_card!")

# Upgrade footer
old_footer = '<div class="bg-white border-t border-slate-200 py-3 text-center text-xs text-slate-500 mt-auto">'
new_footer = '<div class="bg-white/95 backdrop-blur border-t border-orange-200/50 py-3 text-center text-xs text-slate-600 mt-auto">'

if old_footer in content:
    content = content.replace(old_footer, new_footer, 1)
    print("Replaced footer styling!")
else:
    print("Could not find old_footer!")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Saved updated index.html")

