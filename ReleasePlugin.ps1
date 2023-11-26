# Display a message indicating that deployment items are being gathered
Write-Host "Gathering deployment items..."

# Display the root directory of the script
Write-Host "Script root: $PSScriptRoot`n"

# Set the base path for deployment
$basePath = $PSScriptRoot

# If the script root is empty, use the current working directory
if ($PSSCriptRoot.Length -eq 0) {
  $basePath = $PWD.Path;
}

# Remove existing 'Release' directory and create a new one
Remove-Item -Recurse -Force -Path $basePath\Release
New-Item -Type Directory -Path $basePath\Release -ErrorAction SilentlyContinue

# Set the path for the DistributionTool.exe
$toolPath = Join-Path $PSScriptRoot "DistributionTool.exe"

# Build command to execute DistributionTool.exe
$buildCommand = "& `"$toolPath`" -b -i `"$basePath\src\ch.sohneg.server-manager.sdPlugin`" -o `"$basePath\Release`""
Invoke-Expression -Command $buildCommand

# Get the path to the StreamDeck.exe
$streamDeckExePath = "$($ENV:ProgramFiles)\Elgato\StreamDeck\StreamDeck.exe"

# Stop the StreamDeck process and wait for 2 seconds
Stop-Process -Name "StreamDeck" -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Set the path for the release files
$bindir = "$basePath\Release"
$releaseFileNameOriginal = Get-ChildItem -Path $basePath\Release | Select-Object -ExpandProperty Name
$releaseFileName = $releaseFileNameOriginal -replace ".streamDeckPlugin", ".sdPlugin"

# Set the destination directory in the Stream Deck Plugin folder
$destDir = "$($env:APPDATA)\Elgato\StreamDeck\Plugins\$releaseFileName"

# If the destination directory exists, remove it
if (Test-Path $destDir) {
    Remove-Item -Recurse -Force -Path $destDir
    Write-Host "Old Version removed: $releaseFileName"
} else {
    Write-Host "First time installation: $releaseFileName"
}

# Set the path for the executable
$executablePath = Join-Path $basePath\Release $releaseFileNameOriginal

# Start the process for the executable
Start-Process -FilePath $executablePath

# Display a message indicating that deployment is complete and Stream Deck is restarting
Write-Host "Deployment complete. Restarting the Stream Deck desktop application..."

# Exit the script with a success code
exit 0
