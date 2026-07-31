const siteUrl = "https://metis.sabara.com";

const contacts = {
  "mail": "gabriel@lts.app.br",
  "repo": "https://github.com/gabriersdev/metis-website",
}

const appConfigs = {
  "app-name": "Metis",
  "app-name-slug": "metis-website",
  "title": "Metis - Pensamentos, histórias e ideias",
  "description": "As últimas edições, histórias e ideias do The Journal.",
  
  "locale": "pt-BR",
  "timezone": "America/Sao_Paulo",
  "datetime-format": "YYYY-MM-DD HH:mm:ss",
  "UTC": -3,
  "UTC2": -180,
  "timeFormat": "HH:mm",
  "timeFormatFriendly": "HH[h]mm"
}

const numberConfigs = {
  lang: "pt-BR",
  fixed: 2
}

const newsletterConfigs = {
  "visible": true,
  "endpoint": "",
  "method": "POST",
  "params": "",
}

export {
  appConfigs,
  contacts,
  newsletterConfigs,
  numberConfigs,
  siteUrl,
}
