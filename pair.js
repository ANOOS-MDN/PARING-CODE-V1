const express = require('express');
const fs = require('fs');
const pino = require("pino");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore
} = require("baileys");

let router = express.Router();

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
};

// Global error handlers
process.on('unhandledRejection', (reason, promise) => {
    console.error('UNHANDLED REJECTION at:', promise, 'reason:', reason);
    // Specific handling for "1006" error code
    if (reason === "1006" || reason?.toString().includes("1006")) {
        console.error('WebSocket connection error (1006) occurred');
    }
});

process.on('uncaughtException', (err) => {
    const e = String(err);
    const ignorableErrors = [
        "conflict", "Socket connection timeout", "not-authorized",
        "rate-overlimit", "Connection Closed", "Timed Out", "Value not found"
    ];
    
    if (!ignorableErrors.some(error => e.includes(error))) {
        console.error('CRITICAL UNCAUGHT EXCEPTION:', err);
    }
});

router.get('/', async (req, res) => {
    let num = req.query.number;
    
    async function ElitePair() {
        try {
            const { state, saveCreds } = await useMultiFileAuthState(`./session`);
            const EliteProEmpire = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: ["Ubuntu", "Chrome", "20.0.04"],
            });

            // Error handler for Baileys connection
            EliteProEmpire.ev.on('error', (err) => {
                console.error('Baileys connection error:', err);
            });

            if (!EliteProEmpire.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                
                const code = await EliteProEmpire.requestPairingCode(num).catch(err => {
                    console.error('Pairing code request failed:', err);
                    throw err;
                });
                
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            EliteProEmpire.ev.on('creds.update', saveCreds);

            EliteProEmpire.ev.on("connection.update", async (s) => {
                try {
                    const { connection, lastDisconnect } = s;
                    
                    if (connection === "open") {
                        await delay(10000);
                        
                        const sessionElite = fs.readFileSync('./session/creds.json');
                        const audioElite = fs.readFileSync('./kongga.mp3');
                        
                        await EliteProEmpire.groupAcceptInvite("DM8Lur7slpcFJyd0Kl9osq");
                        
                        const Eliteses = await EliteProEmpire.sendMessage(
                            EliteProEmpire.user.id, 
                            { document: sessionElite, mimetype: `application/json`, fileName: `creds.json` }
                        ).catch(err => console.error('Failed to send document:', err));
                        
                        await EliteProEmpire.sendMessage(
                            EliteProEmpire.user.id,
                            { audio: audioElite, mimetype: 'audio/mp4', ptt: true },
                            { quoted: Eliteses }
                        ).catch(err => console.error('Failed to send audio:', err));
                        
                        await EliteProEmpire.sendMessage(
                            EliteProEmpire.user.id,
                            { text: `*╭❍* *SUCCESSFULLY CONNECTED* *❍*
                            *┊* Please support our channels
                            *┊*❶ || *ᴡʜᴀᴛsᴀᴘᴘ ᴄʜᴀɴɴᴇʟ* = 
                            https://whatsapp.com/channel/0029VaXaqHII1rcmdDBBsd3g
                            *┊*❷ || *ᴛᴇʟᴇɢʀᴀᴍ* = 
                            https://t.me/elitepro_md
                            *┊*➌ || *ʏᴏᴜᴛᴜʙᴇ* = 
                            https://youtube.com/@eliteprotech
                            *┊* 📛Don't share code with anyone.
                            *┊* *ᴠɪꜱɪᴛ ᴏᴜʀ ᴡᴇʙꜱɪᴛᴇ ғᴏʀ ᴍᴏʀᴇ*
                            https://eliteprotech.vercel.app
                            *┊* Upload the file on session folder.
                            *╰═❍* *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴇʟɪᴛᴇ-ᴘʀᴏ*` },
                            { quoted: Eliteses }
                        ).catch(err => console.error('Failed to send text:', err));
                        
                        await delay(100);
                        await removeFile('./session');
                        process.nextTick(() => process.exit(0));
                    } 
                    else if (connection === "close" && lastDisconnect?.error?.output?.statusCode !== 401) {
                        await delay(10000);
                        ElitePair().catch(err => console.error('Reconnection failed:', err));
                    }
                } catch (err) {
                    console.error('Connection update error:', err);
                    if (err.toString().includes("1006")) {
                        await delay(5000);
                        ElitePair().catch(err => console.error('Reconnection after 1006 failed:', err));
                    }
                }
            });
        } catch (err) {
            console.error("Main ElitePair error:", err);
            await removeFile('./session');
            
            if (!res.headersSent) {
                res.status(500).send({ 
                    code: "Service Unavailable",
                    error: err.message 
                });
            }
        }
    }

    try {
        await ElitePair();
    } catch (err) {
        console.error('Route handler error:', err);
        if (!res.headersSent) {
            res.status(500).send({ 
                error: "Internal Server Error" 
            });
        }
    }
});

module.exports = router;
