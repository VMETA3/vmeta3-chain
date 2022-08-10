import { actor, run, setupActor } from './lib/convenience'
import { Vmeta3Env } from '../test/shared/env'

actor('Chain reader', () => {
  let env: Vmeta3Env

  setupActor(async () => {
    env = await Vmeta3Env.new()
  })

  run(async (b) => {
    const blockNumber = await b.bench('get block number', () =>
      env.l2Provider.getBlockNumber()
    )
    await b.bench('get random block', () =>
      env.l2Provider.getBlock(Math.floor(blockNumber * Math.random()))
    )
  })
})
