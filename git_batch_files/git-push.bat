@echo off
set /p cmnt="Enter a commit comment: "
cd %~dp0\..

@echo on
git add .
git status
git commit -m "%cmnt%"
git push origin main

@echo off
echo[
echo DONE
echo[
echo[
pause