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
    $jqMajor = '.version.Major="' + $major +'"';
    $jqMinor = '.version.Minor="' + $minor +'"';
    $jqPatch = '.version.Patch="' + $patch +'"';
    Write-Host "Update task from $file to version $major.$minor.$patch"

    Get-Content $file | jq $jqMajor | jq $jqMinor| jq $jqPatch | Set-Content $file
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
    Write-Host "Update manifest version to $version"

    Get-Content $file | jq $jqVersion | Set-Content $file
}
