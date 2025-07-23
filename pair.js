const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore
} = require("baileys");

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
router.get('/', async (req, res) => {
    let num = req.query.number;
        async function ElitePair() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState(`./session`)
     try {
            let EliteProEmpire = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: [ "Ubuntu", "Chrome", "20.0.04" ],
             });
             if(!EliteProEmpire.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await EliteProEmpire.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            EliteProEmpire.ev.on('creds.update', saveCreds)
            EliteProEmpire.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(10000);
                    const sessionElite = fs.readFileSync('./session/creds.json');
                    EliteProEmpire.groupAcceptInvite("DM8Lur7slpcFJyd0Kl9osq");
				const Eliteses = await EliteProEmpire.sendMessage(EliteProEmpire.user.id, { document: sessionElite, mimetype: `application/json`, fileName: `creds.json` });
				
await EliteProEmpire.sendMessage(EliteProEmpire.user.id, {
  text: `✅ *جلسه بوتات انوس!*  
📁 ضيف ملف الجلسه هذا الي بوتك creds.json.

📢 *الدعم:*

➊ *واتساب l*  
https://chat.whatsapp.com/BlUx7LC9KLD24RocTSb6cD

➋ *مطور*  
+967771160204

➌ *يوتيوب*  
https://youtube.com/@vhhgvgghhvh?si=94OUCewCXiJLZF_s

🚫 *الملف بدل الجلسه او الايدي ID or creds.json .*

🌐 *رابط موقع الجلسه انشره:*  
`,

  contextInfo: {
    externalAdReply: {
      title: "Successfully Generated Session",
      body: "EliteProTech Session Generator 1",
      thumbnailUrl: "https://files.catbox.moe/1jquts.jpg",
      sourceUrl: "https://chat.whatsapp.com/BlUx7LC9KLD24RocTSb6cD",
      mediaType: 1,
      renderLargerThumbnail: true,
      showAdAttribution: true
    }
  }
}, { quoted: Eliteses });

        await delay(100);
        removeFile('./session');
        return;
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    ElitePair();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./session');
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await ElitePair()
});

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("conflict")) return
if (e.includes("Socket connection timeout")) return
if (e.includes("not-authorized")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})

module.exports = router
