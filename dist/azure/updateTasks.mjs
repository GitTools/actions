#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises'
import { glob } from 'glob'
import path from 'node:path'
import { parseArgs } from 'node:util'

import tasks from './tasks.json' with { type: 'json' }

// Function to read JSON file
const readJsonFile = async (filePath) => {
    const rawData = await readFile(filePath, 'utf8')
    return JSON.parse(rawData)
}

// Function to write JSON file
const writeJsonFile = async (filePath, data) => {
    const jsonData = JSON.stringify(data, null, 2)
    await writeFile(filePath, jsonData)
}

// Function to update JSON fields
const updateJsonFields = async (filePath, versionStr, mode) => {
    const data = await readJsonFile(filePath)

    const parentDir = path.basename(path.dirname(filePath))
    const grandParentDir = path.basename(path.dirname(path.dirname(filePath)))

    const version = versionStr.split('.').map(Number)
    const id = mode === 'prod' ? tasks[grandParentDir][parentDir].prod : tasks[grandParentDir][parentDir].test
    const friendlyNameSuffix = mode === 'prod' ? "" : " (Test)"
    let updates = {
        id: id,
        friendlyName: `${data.friendlyName}${friendlyNameSuffix}`,
        minimumAgentVersion: "4.244.1",
        version: {
            Major: version[0],
            Minor: version[1],
            Patch: version[2]
        }
    }

    // Update the fields
    for (let key in updates) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            data[key] = updates[key]
        }
    }

    console.log(`Updating ${filePath} with version ${versionStr} and mode ${mode}`)
    await writeJsonFile(filePath, data)
}

// Function to find and update all task.json files
const updateTasks = async (pattern, version, mode) => {
    try {
        const files = await glob(pattern)
        await Promise.all(files.map(file => updateJsonFields(file, version, mode)))
        console.log('All task.json files updated successfully.')
    } catch (err) {
        console.error('Error finding files:', err)
    }
}

// Glob pattern to find task.json files
const pattern = './**/task.json'

const { version, mode } = parseArgs({
    options: {
        version: { type: 'string', short: 'v', default: '0.0.1' },
        mode: { type: 'string', short: 'm', default: 'test' }
    }
}).values


// Update all task.json files
await updateTasks(pattern, version, mode)
