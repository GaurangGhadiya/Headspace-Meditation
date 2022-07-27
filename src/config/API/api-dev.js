const protocol = "http";
const host =
  "meditationbackend-env.eba-anrv7ziq.eu-west-2.elasticbeanstalk.com";
const port = "";
const trailUrl = "";
// https://api.loginvm.com http://192.168.29.135/   https://grubgrams.virtual-manager-backend.ml/ https://api.grubgrams.com/
const hostUrl = `${protocol}://${host}${port ? ":" + port : ""}/`;
const endpoint = `${protocol}://${host}${port ? ":" + port : ""}${trailUrl}`;

export default {
  protocol: protocol,
  host: host,
  port: port,
  apiUrl: trailUrl,
  endpoint: endpoint,
  hostUrl: hostUrl,
};
