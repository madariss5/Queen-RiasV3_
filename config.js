const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Martin",
    ownerNumber: process.env.OWNER_NUMBER || "4915563151347",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "BLACKSKY-MD",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUJlakY3aFVRZ3o4akFhM2JmMURDVkwwaDI0eHVweHNWaWhlVEFPL2NrVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOC91RUVzTTl2NzVaV0ExUCtkbGFSZ2NENTVORmZBRkZHTFIzTUd0WGF6WT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxUC8zb0g5M0FLZWthaXFROUVKNk1OMHM5MlluRlBEQ2JoUzFIWHhVN0VZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJQ3hqTWxNdFpTSS8wVlpzemc4empyZm9JZVkrb3dGSmtWN1B3clJvbkIwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldFMUhrN2kyV3NNL3FzYmRkMG0rZFdlNWhWV3pEQm02a3BCN0J6ZWkzbnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNsZGgzMkNEb0VpeGFiTGRMb2xtLzFjM0lIVDJhMGUralI2VThqVE9YaUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUdBTFMvTDVjZ0VWOWZMNStYQ1JiMm01eXRrS2NRMitramtnVmk4MmwwOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUjF0c0NFUllOL2lTWmNjV2RzblZkNWxyRGM4ZDZwL2dTYUdVYi9tVHJuMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InMzT2tLNW1Scjc2WGhGb0Z6WU52MSswVDdhbGVkSlgwNml1Z090clBXdVFWaVdNT01BRFY5Y1NCSGovM0lUeTBWbEN5cVpaNXpoQ1duYWY5ME84ampRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTIsImFkdlNlY3JldEtleSI6Im1kYmMyaHB3WVlLTmxFV2htZkVKbmo5Y0ZnM01NRzg3YStDbHdhRmtkY0U9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiNDkxNTU2MjM3ODM0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDNUE4MUY3MEUzMjdDRkQzQUE2OUE0QTEwMDM5QkFBQyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQxMDg2ODA1fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI0OTE1NTYyMzc4MzQzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjM1ODU4RTg0RjBENDVFMzYyN0Q4NDc1QzBBRkZGREMxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDEwODY4MDV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjQ5MTU1NjIzNzgzNDNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNzVDNTQ3RUQxMUI2OTE4NjUzMjIxNzgzQTY4RURCQUIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0MTA4NjgxMH1dLCJuZXh0UHJlS2V5SWQiOjYxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6NjEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiWU5SR1FTWUoiLCJtZSI6eyJpZCI6IjQ5MTU1NjIzNzgzNDM6NjVAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI4NzcxMjQyNjExMDk4OTo2NUBsaWQiLCJuYW1lIjoiLiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTVRQeVMwUXg4Q2J2Z1lZQVNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNzJWMTFsSVp2YWxKdkYyNjJiTVh3MzRuS2dSTjlLbzNDT2d3KzRINGVScz0iLCJhY2NvdW50U2lnbmF0dXJlIjoid3J0NVpwWHlFZzJyQlFiZDlJQlpIYkZhQ1UyVkFiK3dsbWtHc0hIRTFYYmxOMk9wSnZFSXY0QldMd1NBS0YyV21SNnlBSzVFdzdmSm1Nc1lzMjNZQUE9PSIsImRldmljZVNpZ25hdHVyZSI6IjZzOGY1Ulh0QWU0ckZMV1gxa1dDRjRkc1N5VkxxMlk5VlJxVm5PNEhZQk8yR21HdUpBMDgzditDZnpnZmNpK2dpK0hYQk91Y1ZwSUo2Z1VERjF1UmpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDkxNTU2MjM3ODM0Mzo2NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlOWxkZFpTR2IycFNieGR1dG16RjhOK0p5b0VUZlNxTndqb01QdUIrSGtiIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJQWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDEwODY4MDUsImxhc3RQcm9wSGFzaCI6IlBXazVCIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOZEQifQ",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
