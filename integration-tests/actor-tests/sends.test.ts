import { utils, Wallet } from 'ethers'
import { expect } from 'chai'

import { actor, setupRun, setupActor, run } from './lib/convenience'
import { Vmeta3Env } from '../test/shared/env'

interface Context {
  wallet: Wallet
}

actor('Value sender', () => {
  let env: Vmeta3Env

  setupActor(async () => {
    env = await Vmeta3Env.new()
  })

  setupRun(async () => {
    const wallet = Wallet.createRandom()
    const tx = await env.l2Wallet.sendTransaction({
      to: wallet.address,
      value: utils.parseEther('0.01'),
    })
    await tx.wait()
    return {
      wallet: wallet.connect(env.l2Wallet.provider),
    }
  })

  run(async (b, ctx: Context) => {
    const randWallet = Wallet.createRandom().connect(env.l2Wallet.provider)
    await b.bench('send funds', async () => {
      const tx = await ctx.wallet.sendTransaction({
        to: randWallet.address,
        value: 0x42,
      })
      await tx.wait()
    })
    expect((await randWallet.getBalance()).toString()).to.deep.equal('66')
  })
})
