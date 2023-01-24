import path from "path";
import { google } from "googleapis";

import "dotenv/config";

const credentialsFilename = process.env.CREDENTIALS_FILENAME;
const spreadsheetId = process.env.SPREADSHEET_ID;

if (!credentialsFilename) {
  throw new Error("Missing CREDENTIALS_FILENAME env variable");
}

if (!spreadsheetId) {
  throw new Error("Missing SPREADSHEET_ID env variable");
}

const credentialsPath = path.join(process.cwd(), credentialsFilename);
const scopes = ["https://www.googleapis.com/auth/spreadsheets"];

const auth = new google.auth.GoogleAuth({
  keyFile: credentialsPath,
  scopes,
});

const sheets = google.sheets({ version: "v4", auth });

const spreadsheet = await sheets.spreadsheets.get({
  spreadsheetId,
});

const { title } = spreadsheet.data?.sheets[0]?.properties || {};

const data = await sheets.spreadsheets.values.get({
  spreadsheetId,
  range: `${title}!A1:B10`,
});

console.log(data.data);
