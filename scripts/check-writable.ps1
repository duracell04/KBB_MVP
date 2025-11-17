<#
.SYNOPSIS
Verifies that the provided directory is writable by touching a sentinel file.
#>
[CmdletBinding()]
param (
    [Parameter(Position = 0)]
    [string]$Path = (Get-Location)
)

$resolved = Resolve-Path -Path $Path -ErrorAction Stop
$sentinel = Join-Path -Path $resolved -ChildPath '.writable_test'

try {
    'ok' | Set-Content -Path $sentinel -Encoding utf8 -ErrorAction Stop
    Remove-Item $sentinel -Force -ErrorAction Stop
}
catch {
    Write-Error "Directory '$resolved' is not writable. Fix permissions or rerun elevated. $($_.Exception.Message)"
    exit 1
}
