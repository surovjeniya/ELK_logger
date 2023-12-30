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

  setStatusCode(status_code) {
    this.logger.defaultMeta = { ...this.logger.defaultMeta, status_code };
    return this;
  }

  setDescription(description) {
    this.logger.defaultMeta = { ...this.logger.defaultMeta, description };
    return this;
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

module.exports = new Logger();
