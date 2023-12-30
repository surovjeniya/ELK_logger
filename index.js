const winston = require("winston");
const LogstashTransport = require("winston-logstash/lib/winston-logstash-latest");

class Logger {
  logger = winston.createLogger({
    defaultMeta: {
      tag: null,
    },
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize()),
      }),
      new LogstashTransport({
        port: 5959,
        node_name: "nodejs_logs",
        host: "127.0.0.1",
      }),
    ],
  });

  info(data) {
    return this.logger.info(data);
  }

  error(data) {
    return this.logger.error(data);
  }

  setTag(tag) {
    this.logger.defaultMeta = { ...this.logger.defaultMeta, tag };
    return this;
  }

  setCampaignId(campaign_id) {
    this.logger.defaultMeta = { ...this.logger.defaultMeta, campaign_id };
    return this;
  }
}

(async () => {
  for await (const item of new Array(100).fill(null).map((item, idx) => idx)) {
    await new Promise((r) => setTimeout(r, 1500));
    new Logger().setTag("TAG").setCampaignId(14123213).info();
  }
})();
