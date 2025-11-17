<#
.SYNOPSIS
Checks writability, clears stale builds if requested, finds a free port, and starts the frontend dev server.
#>
[CmdletBinding()]
param (
    [int]$Port,
    [int]$StartPort = 3000,
    [int]$EndPort = 3100,
    [switch]$Clean
)

$root = Resolve-Path -Path (Join-Path $PSScriptRoot '..')
$frontendDir = Join-Path $root 'apps/frontend'

& "$PSScriptRoot/check-writable.ps1" -Path $frontendDir

if ($Clean -and (Test-Path (Join-Path $frontendDir '.next'))) {
    Remove-Item -Recurse -Force (Join-Path $frontendDir '.next')
}

try {
    [Console]::OutputEncoding = New-Object System.Text.UTF8Encoding $false
    chcp 65001 | Out-Null
}
catch {
    Write-Warning "Could not force UTF-8 console encoding: $($_.Exception.Message)"
}

if ($PSBoundParameters.ContainsKey('Port')) {
    $port = $Port
}
else {
    $port = & "$PSScriptRoot/find-free-port.ps1" -StartPort $StartPort -EndPort $EndPort
    if (-not $port) {
        exit 1
    }
}

if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Error 'pnpm not found in PATH. Install pnpm (corepack enable pnpm).'
    exit 1
}

$env:PORT = $port
Write-Host "Starting frontend on port $port ..." -ForegroundColor Cyan
pnpm --dir $frontendDir dev
