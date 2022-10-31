# This Dockerfile builds all the dependencies needed by the monorepo, and should
# be used to build any of the follow-on services
#
# ### BASE: Install deps
FROM ghcr.io/foundry-rs/foundry:latest as foundry
FROM node:14.18.1-alpine3.14 as base

RUN apk --no-cache add curl jq python3 ca-certificates git make gcc musl-dev linux-headers bash build-base

COPY --from=foundry /usr/local/bin/forge /usr/local/bin/forge
COPY --from=foundry /usr/local/bin/cast /usr/local/bin/cast


# copy over the needed configs to run the dep installation
# note: this approach can be a bit unhandy to maintain, but it allows
# us to cache the installation steps
WORKDIR /opt/vmeta3
COPY ./packages ./packages
RUN rm -rf packages/*/.git

FROM base as message-relayer
WORKDIR /opt/vmeta3/packages/message-relayer
RUN yarn && yarn build
COPY ./ops/scripts/relayer.sh .
CMD ["npm", "run", "start"]
