function update-md-files()
{
    param(
        [Parameter(Mandatory = $True, Position = 0, ValueFromPipeline = $true)]
        [System.String]
        $file,

        [Parameter(Mandatory = $True, Position = 1, ValueFromPipeline = $false)]
        [System.String]
        $oldVersion,

        [Parameter(Mandatory = $True, Position = 2, ValueFromPipeline = $false)]
        [System.String]
        $newVersion
    )
    $file = Resolve-Path $file
    Write-Host "Update md file $file version from $oldVersion to $newVersion"

    ((Get-Content $file -Raw) -replace $oldVersion, $newVersion) | Set-Content $file -NoNewline
}
