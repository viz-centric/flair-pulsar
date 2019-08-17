FROM node:8.16.0

LABEL maintainer="admin@vizcentric.com"
LABEL name="Vizcentric"

COPY package*.json /flair-pulsar/
COPY tsconfig*.json /flair-pulsar/
COPY tslint.json /flair-pulsar/
COPY nest-cli.json /flair-pulsar/
COPY docker /flair-pulsar/
COPY dist /flair-pulsar/src/
COPY src/resources/proto /flair-pulsar/src/resources/proto

WORKDIR /flair-pulsar/

RUN npm update && \
  npm i -g typescript ts-node
RUN npm install --only=production

VOLUME [ "/flair-pulsar/config" ]

EXPOSE 5031
EXPOSE 3000

RUN groupadd -g 999 flairuser && \
    useradd --shell /bin/bash --create-home --home /home/flairuser -r -u 999 -g flairuser flairuser

RUN chown -R flairuser:flairuser /flair-pulsar
RUN chmod -R 755 /flair-pulsar

USER flairuser

CMD [ "sh", "./button.sh" ]
