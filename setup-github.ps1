# PowerShell script to initialize git and push to GitHub
# Run this script after creating your repository on GitHub

# Set the GitHub repository URL (replace with your own)
$repoUrl = "https://github.com/your-username/padholikhoweb.git"

# Initialize Git repository if not already initialized
if (!(Test-Path -Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Green
    git init
}

# Add all files
Write-Host "Adding files to Git..." -ForegroundColor Green
git add .

# Create initial commit
Write-Host "Creating initial commit..." -ForegroundColor Green
git commit -m "Initial commit of Padho Likho App"

# Add remote origin
Write-Host "Adding remote origin..." -ForegroundColor Green
git remote add origin $repoUrl

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push -u origin main

Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
Write-Host "Repository URL: $repoUrl" -ForegroundColor Yellow 