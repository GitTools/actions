module.exports = (env) => {
    let [idPostfix, namePostfix, descPostfix] = (env.mode === 'test')
        ? ['-test', ' (Test)', ' (Internal testing only)']
        : ['', '', '']

    const gitversion = [
        { id: 'setup', path: 'gitversion/setup' },
        { id: 'execute', path: 'gitversion/execute' },
        { id: 'command', path: 'gitversion/command' }
    ]

    const gitreleasemanager = [
        { id: 'setup', path: 'gitreleasemanager/setup' },
        { id: 'create', path: 'gitreleasemanager/create' },
        { id: 'discard', path: 'gitreleasemanager/discard' },
        { id: 'close', path: 'gitreleasemanager/close' },
        { id: 'open', path: 'gitreleasemanager/open' },
        { id: 'publish', path: 'gitreleasemanager/publish' },
        { id: 'addasset', path: 'gitreleasemanager/addasset' }
    ]

    const generateContributions = (tasks, tool) => tasks.map(task => ({
        id: `${task.id}-${tool}-task`,
        type: 'ms.vss-distributed-task.task',
        targets: [
            'ms.vss-distributed-task.tasks'
        ],
        properties: {
            name: `${task.path}`
        }
    }))

    const version = env.version ?? '0.0.1'

    return {
        manifestVersion: 1,
        id: `gittools${idPostfix}`,
        name: `GitTools${namePostfix}`,
        version: version,
        publisher: 'gittools',
        public: true,
        author: 'GitTools Contributors',
        description: `Build tasks for easy semantic versioning for projects using Git and release management. ${descPostfix}`,
        targets: [
            {
                id: 'Microsoft.VisualStudio.Services'
            }
        ],
        files: [
            { path: 'images', addressable: true },
            ...gitversion.map(task => ({ path: task.path, packagePath: `${task.path}` })),
            ...gitversion.map(task => ({ path: '../tools/azure', packagePath: `${task.path}/tools/azure` })),
            ...gitversion.map(task => ({ path: '../tools/libs', packagePath: `${task.path}/tools/libs` })),
            ...gitversion.map(task => ({ path: '../tools/lib.mjs', packagePath: `${task.path}/tools/lib.mjs` })),
            ...gitreleasemanager.map(task => ({ path: task.path, packagePath: `${task.path}` })),
            ...gitreleasemanager.map(task => ({ path: '../tools/azure', packagePath: `${task.path}/tools/azure` })),
            ...gitreleasemanager.map(task => ({ path: '../tools/libs', packagePath: `${task.path}/tools/libs` })),
            ...gitreleasemanager.map(task => ({ path: '../tools/lib.mjs', packagePath: `${task.path}/tools/lib.mjs` })),
        ],
        categories: [
            'Azure Pipelines'
        ],
        galleryFlags: [
            'Public'
        ],
        icons: {
            default: 'images/icon.png'
        },
        tags: [
            'semver',
            'git',
            'gitversion',
            'gitreleasemanager',
            'version',
            'versioning',
            'gitflow',
            'githubflow',
            'release'
        ],
        links: {
            learn: {
                uri: 'https://github.com/GitTools/actions'
            },
            getstarted: {
                uri: 'https://github.com/GitTools/actions'
            },
            license: {
                uri: 'https://github.com/GitTools/actions/blob/master/LICENSE'
            },
            repository: {
                uri: 'https://github.com/GitTools/actions.git'
            },
            support: {
                uri: 'https://github.com/GitTools/actions/issues'
            }
        },
        screenshots: [
            {
                path: 'screenshots/pipeline-editor-setup-gitversion-task.png'
            },
            {
                path: 'screenshots/pipeline-run-setup-gitversion-task.png'
            },
            {
                path: 'screenshots/pipeline-editor-execute-gitversion-task.png'
            },
            {
                path: 'screenshots/pipeline-run-execute-gitversion-task.png'
            }
        ],
        content: {
            details: {
                path: 'overview.md'
            }
        },
        contributions: [
            ...generateContributions(gitversion, 'gitversion'),
            ...generateContributions(gitreleasemanager, 'gitreleasemanager')
        ]
    }
}
