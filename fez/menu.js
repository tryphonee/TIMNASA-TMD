const util = require('util');
const fs = require('fs-extra');
const { timnasa } = require(__dirname + "../timnasa/timoth");
const { format } = require(__dirname + "../timnasa/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

timoth({ nomCom: "menu2", categorie: "Menu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "../timnasa/timoth");
    let coms = {};
    let mode = "public";

    if ((s.MODE).toLowerCase() !== "yes") {
        mode = "private";
    }

    cm.map((com) => {
        if (!coms[com.categorie]) {
            coms[com.categorie] = [];
        }
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
╭━═「 *${s.BOT}* 」═━❂
┃⊛╭────••••────➻
┃⊛│◆ 𝙾𝚠𝚗𝚎𝚛 : ${s.OWNER_NAME}
┃⊛│◆ 𝙿𝚛𝚎𝚏𝚒𝚡 : [ ${s.PREFIXE} ]
┃⊛│◆ 𝙼𝚘𝚍𝚎 : *${mode}*
┃⊛│◆ 𝚁𝚊𝚖  : 𝟴/𝟭𝟯𝟮 𝗚𝗕
┃⊛│◆ 𝙳𝚊𝚝𝚎  : *${date}*
┃⊛│◆ 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖 : ${os.platform()}
┃⊛│◆ 𝙲𝚛𝚎𝚊𝚝𝚘𝚛 : 𝚝𝚒𝚖𝚗𝚊𝚜𝚊
┃⊛│◆ 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 : ${cm.length}
┃⊛│◆ 𝚃𝚑𝚎𝚖𝚎 : 𝚝𝚒𝚖𝚗𝚊𝚜𝚊
┃⊛└────••••────➻
╰─━━━━══──══━━━❂\n${readmore}
`;

    let menuMsg ='*𝗧𝗜𝗠𝗡𝗔𝗦𝗔 𝗖𝗠𝗗*';
    
    for (const cat in coms) {
        menuMsg += `
❁━━〔 *${cat}* 〕━━❁
╭━━══••══━━••⊷
║∭┊ `;
        for (const cmd of coms[cat]) {
            menuMsg += `          
║∭┊ ${s.PREFIXE}  *${cmd}*`;    
        }
        menuMsg += `
║∭┊
╰─━━═••═━━••⊷`;
    }
    
    menuMsg += `
> Made By 𝗧𝗜𝗠𝗡𝗔𝗦𝗔-𝗧𝗠𝗗\n`;

    try {
        const senderName = nomAuteurMessage || message.from;  // Use correct variable for sender name
        await zk.sendMessage(dest, {
            text: infoMsg + menuMsg,
            contextInfo: {
                mentionedJid: [senderName],
                externalAdReply: {
                    title: "𝐓𝐈𝐌𝐍𝐀𝐒𝐀 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓",
                    body: "Dont worry bro I have more tap to follow",
                    thumbnailUrl: "https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31",
                    sourceUrl: "https://files.catbox.moe/n4fjap.jpg",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (error) {
        console.error("Menu error: ", error);
        repondre("🥵🥵 Menu error: " + error);
    }
});
