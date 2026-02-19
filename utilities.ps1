function update-files()
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
    Write-Host "Update file $file version from $oldVersion to $newVersion"

    ((Get-Content $file -Raw) -replace $oldVersion, $newVersion) | Set-Content $file -NoNewline
}

# example: publish-vsix -mode "test" -major 4 -minor 3 -patch 0 -token $token
function publish-vsix()
{
    param(
        [Parameter(Mandatory = $True, Position = 0, ValueFromPipeline = $false)]
        $mode,

        [Parameter(Mandatory = $True, Position = 1, ValueFromPipeline = $false)]
        $major,

        [Parameter(Mandatory = $True, Position = 2, ValueFromPipeline = $false)]
        $minor,

        [Parameter(Mandatory = $True, Position = 3, ValueFromPipeline = $false)]
        $patch,

        [Parameter(Mandatory = $True, Position = 4, ValueFromPipeline = $false)]
        $token
    )

    $date = ([datetime]::UtcNow.ToString("yyMMddHHmm")).Substring(0, 9)
    $version = "$major.$minor.$patch.$date"
    $vsix = "dist/gittools.gittools-$version.vsix"

    echo "Release mode: $mode"
    echo "Version: $version"

    npm run publish:prepare -- --mode $mode --version $version
    npm run publish:azure:local -- --env mode=$mode version=$version --output-path $vsix
    npm run publish:azure:marketplace -- --token $token --env mode=$mode version=$version

    echo "vsix=$vsix" >> $env:GITHUB_OUTPUT
}
