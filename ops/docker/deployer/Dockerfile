# This Dockerfile builds all the dependencies needed by the monorepo, and should
# be used to build any of the follow-on services
#
# ### BASE: Install deps
FROM ghcr.io/foundry-rs/foundry:latest as foundry
FROM node:14.18.1-alpine3.14 as base

RUN apk --no-cache add curl jq python3 ca-certificates git make gcc musl-dev linux-headers bash build-base

RUN mkdir -p /root/.cache/hardhat-nodejs/compilers/linux-amd64 \
  &&  curl -o /root/.cache/hardhat-nodejs/compilers/linux-amd64/solc-linux-amd64-v0.8.9+commit.e5eed63a -L https://binaries.soliditylang.org/linux-amd64/solc-linux-amd64-v0.8.9+commit.e5eed63a \
  &&  curl -o /root/.cache/hardhat-nodejs/compilers/linux-amd64/solc-linux-amd64-v0.5.17+commit.d19bba13 -L https://binaries.soliditylang.org/linux-amd64/solc-linux-amd64-v0.5.17+commit.d19bba13

COPY --from=foundry /usr/local/bin/forge /usr/local/bin/forge
COPY --from=foundry /usr/local/bin/cast /usr/local/bin/cast


# copy over the needed configs to run the dep installation
# note: this approach can be a bit unhandy to maintain, but it allows
# us to cache the installation steps
WORKDIR /opt/vmeta3
COPY ./packages ./packages
RUN rm -rf packages/*/.git

FROM base as deployer
WORKDIR /opt/vmeta3/packages/contracts
RUN yarn && yarn build
COPY ./ops/scripts/deployer.sh .
CMD ["yarn", "run", "deploy"]
