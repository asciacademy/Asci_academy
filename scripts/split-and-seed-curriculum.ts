import * as fs from 'fs'
import { CURRICULUM_COURSES } from '../lib/curriculum-data'

function escapeSql(str: string | null | undefined): string {
  if (str === null || str === undefined) return 'NULL'
  return "'" + str.replace(/'/g, "''") + "'"
}

function escapeJson(obj: any): string {
  if (!obj) return 'NULL'
  return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb"
}

function escapeArray(arr: string[] | undefined): string {
  if (!arr || arr.length === 0) return "'{}'::text[]"
  return 'ARRAY[' + arr.map((item) => escapeSql(item)).join(', ') + ']::text[]'
}

const BATCH_SIZE = 8
const batches: string[] = []
let currentSql = 'BEGIN;\n'
let count = 0
let batchIndex = 1

for (let i = 0; i < CURRICULUM_COURSES.length; i++) {
  const course = CURRICULUM_COURSES[i]
  const courseUuid = `md5('asci-course-' || ${escapeSql(course.slug)})::uuid`

  currentSql += `INSERT INTO courses (
    id, title, slug, description, category, difficulty, weeks, duration_hours,
    lessons, projects, certificate, is_published, is_premium, tools, thumbnail_url, is_deleted
  ) VALUES (
    ${courseUuid},
    ${escapeSql(course.title)},
    ${escapeSql(course.slug)},
    ${escapeSql(course.description)},
    ${escapeSql(course.category)},
    ${escapeSql(course.level)},
    ${escapeSql(course.weeks)},
    ${course.duration_hours || 0},
    ${course.lessons || (course.modules ? course.modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) : 0)},
    ${course.projects || 0},
    ${escapeSql(course.certificate)},
    TRUE,
    ${course.is_premium ? 'TRUE' : 'FALSE'},
    ${escapeArray(course.tools)},
    ${escapeSql(course.thumbnail_url || '/placeholder.svg')},
    FALSE
  ) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    weeks = EXCLUDED.weeks,
    duration_hours = EXCLUDED.duration_hours,
    lessons = EXCLUDED.lessons,
    projects = EXCLUDED.projects,
    certificate = EXCLUDED.certificate,
    is_published = EXCLUDED.is_published,
    is_premium = EXCLUDED.is_premium,
    tools = EXCLUDED.tools,
    thumbnail_url = EXCLUDED.thumbnail_url,
    is_deleted = FALSE;\n\n`

  if (course.modules) {
    for (const mod of course.modules) {
      const modUuid = `md5('asci-mod-' || ${escapeSql(course.slug)} || '-' || ${mod.sequence_order})::uuid`
      currentSql += `INSERT INTO modules (
        id, course_id, title, sequence_order, description, is_deleted
      ) VALUES (
        ${modUuid},
        ${courseUuid},
        ${escapeSql(mod.title)},
        ${mod.sequence_order},
        ${escapeSql(mod.description || '')},
        FALSE
      ) ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        sequence_order = EXCLUDED.sequence_order,
        description = EXCLUDED.description,
        is_deleted = FALSE;\n\n`

      if (mod.lessons) {
        for (const les of mod.lessons) {
          const lesUuid = `md5('asci-les-' || ${escapeSql(course.slug)} || '-' || ${mod.sequence_order} || '-' || ${les.sequence_order})::uuid`
          currentSql += `INSERT INTO lessons (
            id, module_id, title, sequence_order, content_type, xp_reward,
            description, content, challenge_data, is_deleted
          ) VALUES (
            ${lesUuid},
            ${modUuid},
            ${escapeSql(les.title)},
            ${les.sequence_order},
            ${escapeSql(les.content_type || 'text')}::content_type,
            ${les.xp_reward || 50},
            ${escapeSql(les.description || '')},
            ${escapeSql(les.content || '')},
            ${escapeJson(les.challenge_data)},
            FALSE
          ) ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            sequence_order = EXCLUDED.sequence_order,
            content_type = EXCLUDED.content_type,
            xp_reward = EXCLUDED.xp_reward,
            description = EXCLUDED.description,
            content = EXCLUDED.content,
            challenge_data = EXCLUDED.challenge_data,
            is_deleted = FALSE;\n\n`
        }
      }
    }
  }

  count++
  if (count === BATCH_SIZE || i === CURRICULUM_COURSES.length - 1) {
    currentSql += 'COMMIT;\n'
    fs.writeFileSync(`scripts/batch_curriculum_${batchIndex}.sql`, currentSql)
    console.log(`Generated batch ${batchIndex} (${count} courses)`)
    batchIndex++
    currentSql = 'BEGIN;\n'
    count = 0
  }
}
