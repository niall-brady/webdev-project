@echo off
cd %~dp0\..

git add .
@echo on
git status
@echo off
git reset

echo[
echo DONE
echo[
echo[
pause