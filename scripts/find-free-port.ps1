<#
.SYNOPSIS
Finds the first available TCP port within a range and prints it.
#>
[CmdletBinding()]
param (
    [int]$StartPort = 3000,
    [int]$EndPort = 3100
)

if ($EndPort -lt $StartPort) {
    Write-Error "EndPort must be >= StartPort."
    exit 1
}

for ($port = $StartPort; $port -le $EndPort; $port++) {
    $inUse = Get-NetTCPConnection -State Listen -LocalPort $port -ErrorAction SilentlyContinue
    if (-not $inUse) {
        Write-Output $port
        exit 0
    }
}

Write-Error "No free port found between $StartPort and $EndPort."
exit 1
