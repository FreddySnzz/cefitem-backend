# If this run behind corporate proxy, use that command:
# docker build --build-arg HTTP_PROXY=http://user:pass@url:port .
# docker-compose build --build-arg GIT_PERSONAL_ACCESS_TOKEN="{TOKEN}"
# docker-compose build --build-arg HTTP_PROXY=http://user:pass@url:port

# docker-compose -f 'docker-compose.testing.yml' up

FROM keymetrics/pm2:latest-alpine

WORKDIR /app

COPY ./package.json .

# RUN npm cache clean --force

RUN npm install --loglevel verbose

COPY ./.env .
COPY . .

EXPOSE 3000

# RUN chmod +x /init.sh
RUN ls -al -R

# ENTRYPOINT ["/init.sh"]

CMD ["start"]

