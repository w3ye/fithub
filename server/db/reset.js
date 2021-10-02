// load .env data into process.env
require("dotenv").config();

// other dependencies
const fs = require("fs");
const chalk = require("chalk");
const Client = require("pg-native");

// PG connection setup
const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
const client = new Client();

/**
 * run sql files
 * @param {String} path - relative path
 * @param {String} name - Name of the directory
 */
const runFiles = (path, name) => {
  console.log(chalk.cyan(`-> Loading ${name} ...`));
  const files = fs.readdirSync(path);
  for (let i of files) {
    const sql = fs.readFileSync(`${path}/${i}`, "utf8");
    console.log(`\t-> Running ${chalk.green(i)}`);
    client.querySync(sql);
  }
};

try {
  console.log(`-> Connecting to PG using ${connectionString} ...`);
  client.connectSync(connectionString);
  runFiles("./db/schema", "Schema");
  runFiles("./db/seeds", "Seeds");
  runFiles("./db/views", "Views");
  client.end();
} catch (err) {
  console.error(chalk.red(`Failed due to error: ${err}`));
  client.end();
}
