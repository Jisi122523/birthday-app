# GitHub Upload Script
# This script uploads your birthday app to GitHub using the API

# Configuration
$GITHUB_TOKEN = Read-Host "Enter your GitHub Personal Access Token"
$GITHUB_USER = "Jisi122523"
$REPO_NAME = "birthday-app"
$BRANCH = "main"
$COMMIT_MESSAGE = "Update birthday app with all files"

$API_URL = "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME/contents"
$HEADERS = @{
    "Authorization" = "token $GITHUB_TOKEN"
    "Accept" = "application/vnd.github.v3+json"
    "Content-Type" = "application/json"
}

# Get all files recursively
$AppPath = Get-Location
Write-Host "Scanning files in: $AppPath"

$files = Get-ChildItem -Recurse -File | Where-Object { $_.Name -ne "push-to-github.ps1" }

$uploadedCount = 0
$failedCount = 0

foreach ($file in $files) {
    $relativePath = $file.FullName -replace [regex]::Escape($AppPath), "" -replace "^\\", ""
    $encodedPath = [System.Uri]::EscapeUriString($relativePath)
    
    # Read file content
    if ($file.Extension -in @('.jpg', '.jpeg', '.png', '.gif', '.mp3', '.mp4')) {
        # Binary file - encode as base64
        $fileContent = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes($file.FullName))
        $encoding = "base64"
    } else {
        # Text file
        $fileContent = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Content $file.FullName -Raw)))
        $encoding = "utf-8"
    }
    
    # Check if file exists
    $checkUrl = "$API_URL/$encodedPath"
    try {
        $existingFile = Invoke-RestMethod -Uri $checkUrl -Headers $HEADERS -ErrorAction SilentlyContinue
        $sha = $existingFile.sha
    }
    catch {
        $sha = $null
    }
    
    # Prepare upload data
    $uploadData = @{
        message = $COMMIT_MESSAGE
        content = $fileContent
        branch = $BRANCH
    }
    
    if ($sha) {
        $uploadData.sha = $sha
    }
    
    $jsonData = $uploadData | ConvertTo-Json
    
    # Upload file
    try {
        Write-Host "Uploading: $relativePath" -ForegroundColor Cyan
        $response = Invoke-RestMethod -Uri $checkUrl -Method Put -Headers $HEADERS -Body $jsonData
        Write-Host "Success: $relativePath" -ForegroundColor Green
        $uploadedCount++
    }
    catch {
        Write-Host "Failed: $relativePath - $($_.Exception.Message)" -ForegroundColor Red
        $failedCount++
    }
    
    Start-Sleep -Milliseconds 500  # Rate limiting
}

Write-Host ""
Write-Host "======================================"
Write-Host "Upload Summary:" -ForegroundColor Yellow
Write-Host "Uploaded: $uploadedCount files"
Write-Host "Failed: $failedCount files"
Write-Host "======================================"
Write-Host ""
Write-Host "Your app is now on GitHub!" -ForegroundColor Green
Write-Host "Live at: https://jisi122523.github.io/birthday-app"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Go to: https://github.com/Jisi122523/birthday-app/settings/pages"
Write-Host "2. Set Source to 'main' branch"
Write-Host "3. Wait 2-3 minutes for deployment"
Write-Host "4. Share the link with Joyjoy! 💜"
