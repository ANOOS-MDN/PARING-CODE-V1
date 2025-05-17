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
                    const audioElite = fs.readFileSync('./kongga.mp3');
                    EliteProEmpire.groupAcceptInvite("DM8Lur7slpcFJyd0Kl9osq");
				const Eliteses = await EliteProEmpire.sendMessage(EliteProEmpire.user.id, { document: sessionElite, mimetype: `application/json`, fileName: `creds.json` });
				EliteProEmpire.sendMessage(EliteProEmpire.user.id, {
                    audio: audioElite,
                    mimetype: 'audio/mp4',
                    ptt: true
                }, {
                    quoted: Eliteses
                });
await EliteProEmpire.sendMessage(EliteProEmpire.user.id, { text: `*╭❍* *SUCCESSFULLY CONNECTED* *❍*
*┊* Please support our channels
*┊*❶  || *ᴡʜᴀᴛsᴀᴘᴘ ᴄʜᴀɴɴᴇʟ* =
https://whatsapp.com/channel/0029VaXaqHII1rcmdDBBsd3g
*┊*❷ || *ᴛᴇʟᴇɢʀᴀᴍ* =
https://t.me/elitepro_md
*┊*➌ || *ʏᴏᴜᴛᴜʙᴇ* =
https://youtube.com/@eliteprotech
*┊* 📛Don't share code with anyone.
*┊* *ᴠɪꜱɪᴛ ᴏᴜʀ ᴡᴇʙꜱɪᴛᴇ ғᴏʀ ᴍᴏʀᴇ*
https://eliteprotech.vercel.app
*┊* Upload the file on session folder.
*╰═❍* *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴇʟɪᴛᴇ-ᴘʀᴏ*` }, {quoted: Eliteses});
        await delay(100);
        return await removeFile('./session');
        process.exit(0)
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
// ====== SELF-PING (Keep-Alive) ======
setInterval(() => {
  try {
    require('https').get('https://elitepro-sessions.onrender.com');
  } catch (err) {
    console.error("Self-ping error:", err.message);
  }
}, 1000 * 60 * 5); // every 5 minutes
