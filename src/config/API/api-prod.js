const protocol = "http";
const host =
  "meditationbackend-env.eba-anrv7ziq.eu-west-2.elasticbeanstalk.com";
const port = "";
const trailUrl = "";

const hostUrl = `${protocol}://${host}${port ? ":" + port : ""}`;
const endpoint = `${protocol}://${host}${port ? ":" + port : ""}${trailUrl}`;

export default {
  protocol: protocol,
  host: host,
  port: port,
  apiUrl: trailUrl,
  endpoint: endpoint,
  hostUrl: hostUrl,
};
// http://13.127.149.180:5000
