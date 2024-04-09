FROM bitnami/node:18 AS build
WORKDIR /app

# install pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . ./

# RUN pnpm clean:all


RUN pnpm install

RUN pnpm build:web


FROM bitnami/node:18 AS prod
WORKDIR /app

# add non root user
RUN groupadd -g 10101 nuxt && \
    useradd -u 11001 -g nuxt nuxt \
    && chown -R nuxt:nuxt /app

USER nuxt:nuxt

# copy only the .output directory
COPY --chown=nuxt:nuxt --from=build /app/.web/.output .output

ENV PORT=8080

EXPOSE 8080

CMD [ "node", ".output/server/index.mjs" ]