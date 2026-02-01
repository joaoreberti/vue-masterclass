import { fakerEN_US as faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_KEY)
const projectIds = []

const seedProjects = async (numEntries) => {
  const projects = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)
    const entry = {
      name: name,
      slug: name.toLocaleLowerCase().replaceAll(' ', '-'),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(2),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    }
    projects.push(entry)
  }

  const { data, error } = await supabase.from('projects').insert(projects).select('id')
  if (error) {
    console.log('seed: failed to insert projects', error)
    throw error
  }

  console.log(data)
  data.forEach((row) => projectIds.push(row.id))
}

const seedTasks = async (numbEntries, projectsIds) => {
  const tasks = []

  for (let i = 0; i < numbEntries; i++) {
    const entry = {
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future(),
      project_id: faker.helpers.arrayElement(projectsIds),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    }
    tasks.push(entry)
  }
  const { data, error } = await supabase.from('tasks').insert(tasks).select('id')
  if (error) {
    console.log('seed: failed to insert tasks', error)
    throw error
  }
  console.log(data)
}

await seedProjects(10)
await seedTasks(20, projectIds)
