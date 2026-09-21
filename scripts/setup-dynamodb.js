#!/usr/bin/env node
/**
 * AWS DynamoDB Table Setup Script
 * Run: node scripts/setup-dynamodb.js
 *
 * Creates the "asci-payment-orders" table if it doesn't exist.
 * Requires AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION in environment.
 */

const { DynamoDBClient, CreateTableCommand, DescribeTableCommand } = require("@aws-sdk/client-dynamodb")
require("dotenv").config({ path: ".env.local" })

const region = process.env.AWS_REGION || "ap-south-1"
const tableName = process.env.AWS_DYNAMODB_TABLE || "asci-payment-orders"

const client = new DynamoDBClient({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
})

async function setupTable() {
  console.log(`\n🔧  Setting up DynamoDB table: "${tableName}" in ${region}\n`)

  // Check if table already exists
  try {
    await client.send(new DescribeTableCommand({ TableName: tableName }))
    console.log(`✅  Table "${tableName}" already exists. Nothing to do.`)
    return
  } catch (err) {
    if (err.name !== "ResourceNotFoundException") {
      throw err
    }
  }

  // Create the table
  await client.send(
    new CreateTableCommand({
      TableName: tableName,
      AttributeDefinitions: [
        { AttributeName: "orderId", AttributeType: "S" },
      ],
      KeySchema: [
        { AttributeName: "orderId", KeyType: "HASH" },
      ],
      BillingMode: "PAY_PER_REQUEST", // On-demand — no capacity planning needed
      Tags: [
        { Key: "Project", Value: "ASCI Academy" },
        { Key: "Purpose", Value: "payment-orders" },
      ],
    })
  )

  console.log(`✅  Table "${tableName}" created successfully!`)
  console.log(`\n📋  Table Configuration:`)
  console.log(`    Partition Key : orderId (String)`)
  console.log(`    Billing Mode  : PAY_PER_REQUEST`)
  console.log(`    Region        : ${region}`)
  console.log(`\n🚀  Your QR payment system is ready to use!\n`)
}

setupTable().catch((err) => {
  console.error("❌  Failed to set up DynamoDB table:", err.message)
  process.exit(1)
})
