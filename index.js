"use strict";
const Discord = require("discord.js");
const client = new Discord.Client();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.send(`<svg height="100px" width="400px" xmlns="http://www.w3.org/2000/svg" fill="none">
  <style type="text/css">
    .caption {
      fill: #99aab5;
    }
  </style>
  <rect x="0" y="0" width="100%" height="100%" fill="#23272A"></rect>
  <image href="https://discord.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg" x="10" y="10" width="80" height="80" />
  <text fill="#ffffff" x="40%" y="40%" alignment-baseline="middle" text-anchor="middle" font-size="25"
    font-family="Verdana" class="caption">
    Playing...
  </text>
  <text fill="#ffffff" x="55%" y="75%" alignment-baseline="middle" text-anchor="middle" font-size="20"
    font-family="Verdana" font-weight="bold" class="caption">
    ${getUser(process.env.USERID).activities[0].name}
  </text>
</svg>`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const dotenv = require("dotenv");
dotenv.config();

client.once("ready", () => {});

const getUser = (discordUserId) => {
  const list = client.guilds.cache.get(process.env.GUILDID);
  let userPresence = undefined;

  list.members.cache.forEach((member) => {
    if (member.presence.userID == discordUserId) userPresence = member.presence;
  });

  return userPresence;
};

client.login(process.env.DISCORDTOKEN);
