@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo    ELETOY site  -  push update to GitHub
echo ============================================
echo.

REM --- check git is available ---
where git >nul 2>nul
if errorlevel 1 (
  echo [ERROR] git not found.
  echo Install "Git for Windows": https://git-scm.com/download/win
  echo.
  pause
  exit /b 1
)

REM --- make sure this folder is a git repo ---
git rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 (
  echo [ERROR] This folder is not a git repository.
  echo Put this .bat file inside your cloned "eletoy" folder.
  echo.
  pause
  exit /b 1
)

echo Changed files:
git status --short
echo.

REM --- commit message: use argument if given, else default ---
set "MSG=%*"
if "%MSG%"=="" set "MSG=update site"

git add -A
git commit -m "%MSG%"

echo.
echo Pushing to GitHub...
git push
if errorlevel 1 (
  echo.
  echo [ERROR] push failed - see the message above.
  echo If it says "rejected / non-fast-forward", run:  git pull   then try again.
  echo.
  pause
  exit /b 1
)

echo.
echo Done. The site will update in about a minute.
echo.
pause
