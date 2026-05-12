$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$commands = @(
    @{
        Name = 'server'
        File = 'npm.cmd'
        Args = @('run', 'dev:server')
    },
    @{
        Name = 'client'
        File = 'npm.cmd'
        Args = @('run', 'dev:client')
    }
)

$processes = @()

function Stop-DevProcesses {
    foreach ($process in $processes) {
        if ($process -and -not $process.HasExited) {
            Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
        }
    }
}

try {
    foreach ($command in $commands) {
        Write-Host "Starting $($command.Name)..."
        $processes += Start-Process `
            -FilePath $command.File `
            -ArgumentList $command.Args `
            -WorkingDirectory $root `
            -NoNewWindow `
            -PassThru
    }

    while ($true) {
        Start-Sleep -Milliseconds 500

        foreach ($process in $processes) {
            if ($process.HasExited) {
                Stop-DevProcesses
                exit $process.ExitCode
            }
        }
    }
}
finally {
    Stop-DevProcesses
}
