function update-task() {
    param(
    [Parameter(Mandatory=$True, Position=0, ValueFromPipeline=$true)]
    [System.String]
    $file,

    [Parameter(Mandatory=$True, Position=1, ValueFromPipeline=$false)]
    [System.String]
    $major,

    [Parameter(Mandatory=$True, Position=2, ValueFromPipeline=$false)]
    [System.String]
    $minor,

    [Parameter(Mandatory=$True, Position=3, ValueFromPipeline=$false)]
    [System.String]
    $patch
)
    $file = Resolve-Path $file
    $jqMajor = '.version.Major=' + $major;
    $jqMinor = '.version.Minor=' + $minor;
    $jqPatch = '.version.Patch=' + $patch;
    Write-Host "Update task from $file to version $major.$minor.$patch"

    Get-Content $file | jq $jqMajor | jq $jqMinor | jq $jqPatch | ConvertFrom-Json -Depth 5 | ConvertTo-Json -Depth 5 | Set-Content $file -NoNewline
}

function update-manifest() {
    param(
    [Parameter(Mandatory=$True, Position=0, ValueFromPipeline=$true)]
    [System.String]
    $file,

    [Parameter(Mandatory=$True, Position=1, ValueFromPipeline=$false)]
    [System.String]
    $version
)
    $file = Resolve-Path $file
    $jqVersion = '.version="' + $version +'"';
    Write-Host "Update manifest $file version to $version"

    Get-Content $file | jq $jqVersion | ConvertFrom-Json -Depth 5 | ConvertTo-Json -Depth 5 | Set-Content $file -NoNewline
}

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
