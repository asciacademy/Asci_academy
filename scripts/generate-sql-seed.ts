import * as fs from 'fs'
import * as path from 'path'
import { CURRICULUM_COURSES } from '../lib/curriculum-data'

function escapeSql(str: string): string {
  if (!str) return "''"
  return "'" + str.replace(/'/g, "''") + "'"
}

let sql = `-- ==============================================================================
-- ASCI LMS: COMPLETE 2026 CURRICULUM SEED SCRIPT (17 COURSES, 96 MODULES, 107 LESSONS)
-- Run this in your Supabase SQL Editor to populate all courses and full curricula
-- ==============================================================================

BEGIN;

`

for (const course of CURRICULUM_COURSES) {
  sql += `-- ----------------------------------------------------------------------------\n`
  sql += `-- Course: ${course.title} (${course.slug})\n`
  sql += `-- ----------------------------------------------------------------------------\n`
  sql += `INSERT INTO courses (id, title, slug, description, category, level, weeks, duration_hours, lessons, projects, certificate, is_premium, tools)\n`
  sql += `VALUES (\n`
  sql += `  ${escapeSql(course.id)},\n`
  sql += `  ${escapeSql(course.title)},\n`
  sql += `  ${escapeSql(course.slug)},\n`
  sql += `  ${escapeSql(course.description)},\n`
  sql += `  ${escapeSql(course.category)},\n`
  sql += `  ${escapeSql(course.level)},\n`
  sql += `  ${escapeSql(course.weeks)},\n`
  sql += `  ${course.duration_hours},\n`
  sql += `  ${course.lessons},\n`
  sql += `  ${course.projects},\n`
  sql += `  ${escapeSql(course.certificate)},\n`
  sql += `  ${course.is_premium ? 'TRUE' : 'FALSE'},\n`
  sql += `  ARRAY[${course.tools.map(t => escapeSql(t)).join(', ')}]::TEXT[]\n`
  sql += `)\n`
  sql += `ON CONFLICT (slug) DO UPDATE SET\n`
  sql += `  title = EXCLUDED.title,\n`
  sql += `  description = EXCLUDED.description,\n`
  sql += `  category = EXCLUDED.category,\n`
  sql += `  level = EXCLUDED.level,\n`
  sql += `  weeks = EXCLUDED.weeks,\n`
  sql += `  duration_hours = EXCLUDED.duration_hours,\n`
  sql += `  lessons = EXCLUDED.lessons,\n`
  sql += `  projects = EXCLUDED.projects,\n`
  sql += `  certificate = EXCLUDED.certificate,\n`
  sql += `  is_premium = EXCLUDED.is_premium,\n`
  sql += `  tools = EXCLUDED.tools;\n\n`

  for (const mod of course.modules) {
    sql += `INSERT INTO modules (id, course_id, title, sequence_order, description)\n`
    sql += `VALUES (\n`
    sql += `  ${escapeSql(mod.id)},\n`
    sql += `  (SELECT id FROM courses WHERE slug = ${escapeSql(course.slug)} LIMIT 1),\n`
    sql += `  ${escapeSql(mod.title)},\n`
    sql += `  ${mod.sequence_order},\n`
    sql += `  ${escapeSql(mod.description || '')}\n`
    sql += `)\n`
    sql += `ON CONFLICT (id) DO UPDATE SET\n`
    sql += `  title = EXCLUDED.title,\n`
    sql += `  sequence_order = EXCLUDED.sequence_order,\n`
    sql += `  description = EXCLUDED.description;\n\n`

    for (const les of mod.lessons) {
      const challengeJson = les.challenge_data ? JSON.stringify(les.challenge_data).replace(/'/g, "''") : null
      sql += `INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)\n`
      sql += `VALUES (\n`
      sql += `  ${escapeSql(les.id)},\n`
      sql += `  ${escapeSql(mod.id)},\n`
      sql += `  ${escapeSql(les.title)},\n`
      sql += `  ${les.sequence_order},\n`
      sql += `  ${escapeSql(les.content_type)},\n`
      sql += `  ${les.xp_reward},\n`
      sql += `  ${escapeSql(les.description)},\n`
      sql += `  ${escapeSql(les.content)},\n`
      sql += `  ${challengeJson ? `'${challengeJson}'::jsonb` : 'NULL'}\n`
      sql += `)\n`
      sql += `ON CONFLICT (id) DO UPDATE SET\n`
      sql += `  title = EXCLUDED.title,\n`
      sql += `  sequence_order = EXCLUDED.sequence_order,\n`
      sql += `  content_type = EXCLUDED.content_type,\n`
      sql += `  xp_reward = EXCLUDED.xp_reward,\n`
      sql += `  description = EXCLUDED.description,\n`
      sql += `  content = EXCLUDED.content,\n`
      sql += `  challenge_data = EXCLUDED.challenge_data;\n\n`
    }
  }
}

sql += `COMMIT;\n`

const outputPath = path.join(__dirname, '..', 'supabase', 'seeds', 'seed_2026_curriculum.sql')
fs.writeFileSync(outputPath, sql)
console.log('Successfully generated supabase/seeds/seed_2026_curriculum.sql!')
