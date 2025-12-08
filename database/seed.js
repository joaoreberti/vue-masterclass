import { fakerEN_US as faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_KEY)

const seedProjects = async (numEntries) => {
  const projects = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)
    const entry = {
      name: name,
      slug: name.toLocaleLowerCase().replaceAll(' ', '-'),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    }
    projects.push(entry)
  }

  const response = await supabase.from('projects').insert(projects)
  console.log(response)
}

await seedProjects(10)
