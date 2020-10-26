"use strict";
const Discord = require("discord.js");
const client = new Discord.Client();
const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("response.ejs", {
    data: getUser(process.env.USERID).activities[0].name,
  });
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
