import type { PuppyData, Puppy } from '../models/Puppy.ts'
import initialData from './initial-data.ts'
import * as fs from 'node:fs/promises'

const filePath = 'storage/data.json '
interface Data {
  puppies: Puppy[]
}

export async function getPuppies(): Promise<Data> {
  try {
    const json = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(json)
    return data
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return initialData
    }
    throw error
  }
}

export async function getPuppyById(id: number): Promise<Puppy | undefined> {
  const puppies = await getPuppies()
  return puppies.puppies.find((puppy) => puppy.id === id)
}

export function findPuppy(puppies: Puppy[], id: number): Puppy | undefined {
  return puppies.find((puppy) => puppy.id === id)
}

export async function updatePuppy(
  id: number,
  newData: PuppyData
): Promise<void> {
  try {
    const { puppies } = await getPuppies()

    const updatedPuppies = puppies.map((puppy) =>
      puppy.id === id ? { ...puppy, ...newData } : puppy
    )
    // fs.WriteFile
    const updatedData = JSON.stringify({ puppies: updatedPuppies })
    await fs.writeFile(filePath, updatedData)
  } catch (error) {
    throw new Error(`Puppy update failed ${error}`)
  }
}

// export async function updatePuppy(id: number, data: PuppyData): Promise<void> {
//   try {
//     const jsonData = await fs.readFile(filePath, 'utf-8');
//     const parsedData: Data = JSON.parse(jsonData);
//     const index = parsedData.puppies.findIndex(puppy => puppy.id === id);
//     if (index !== -1) {
//       parsedData.puppies[index] = { ...parsedData.puppies[index], ...data };
//       await fs.writeFile(filePath, JSON.stringify(parsedData, null, 2));
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }
