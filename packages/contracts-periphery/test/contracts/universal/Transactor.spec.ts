import hre from 'hardhat'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { Contract } from 'ethers'

import { expect } from '../../setup'
import { decodeSolidityRevert, deploy } from '../../helpers'

describe('AssetReceiver', () => {
  let signer1: SignerWithAddress
  let signer2: SignerWithAddress
  before('signer setup', async () => {
    ;[signer1, signer2] = await hre.ethers.getSigners()
  })

  let CallRecorder: Contract
  let Reverter: Contract
  let Transactor: Contract
  beforeEach('deploy contracts', async () => {
    CallRecorder = await deploy('CallRecorder')
    Reverter = await deploy('Reverter')
    Transactor = await deploy('Transactor', {
      signer: signer1,
      args: [signer1.address],
    })
  })

  describe('CALL', () => {
    describe('when called by authorized address', () => {
      it('should do a call to the target contract', async () => {
        const data = CallRecorder.interface.encodeFunctionData('record')
        await Transactor.CALL(CallRecorder.address, data, 1_000_000, 0, {
          gasLimit: 2_000_000,
        })

        const call = await CallRecorder.lastCall()
        expect(call.data).to.equal(data)
        expect(call.sender).to.equal(Transactor.address)
      })

      it('should be able to call with value', async () => {
        const data = CallRecorder.interface.encodeFunctionData('record')
        const value = 69
        await Transactor.CALL(CallRecorder.address, data, 1_000_000, value, {
          gasLimit: 2_000_000,
          value,
        })

        const call = await CallRecorder.lastCall()
        expect(call.value).to.equal(value)
      })

      it('should be able to set gas limit', async () => {
        const data = CallRecorder.interface.encodeFunctionData('record')
        const gas = 100_000
        await Transactor.CALL(CallRecorder.address, data, gas, 0, {
          gasLimit: 2_000_000,
        })

        const call = await CallRecorder.lastCall()
        expect(call.gas.toNumber()).to.be.lessThan(gas)
      })
    })

    describe('when called by not authorized address', () => {
      it('should be reverted', async () => {
        const data = CallRecorder.interface.encodeFunctionData('record')
        await expect(
          Transactor.connect(signer2).CALL(
            CallRecorder.address,
            data,
            1_000_000,
            0,
            {
              gasLimit: 2_000_000,
            }
          )
        ).to.be.revertedWith('Ownable: caller is not the owner')
      })
    })
  })

  describe('DELEGATECALL', () => {
    describe('when called by authorized address', () => {
      it('should do a delegatecall to the target contract', async () => {
        const data = Reverter.interface.encodeFunctionData('doRevert')
        const ret = await Transactor.callStatic.DELEGATECALL(
          Reverter.address,
          data,
          1_000_000,
          {
            gasLimit: 2_000_000,
          }
        )

        expect(ret[0]).to.equal(false)
        expect(decodeSolidityRevert(ret[1])).to.deep.equal('Reverter reverted')
      })
    })

    describe('when called by not authorized address', () => {
      it('should be reverted', async () => {
        const data = Reverter.interface.encodeFunctionData('doRevert')
        await expect(
          Transactor.connect(signer2).DELEGATECALL(
            Reverter.address,
            data,
            1_000_000,
            {
              gasLimit: 2_000_000,
            }
          )
        ).to.be.revertedWith('Ownable: caller is not the owner')
      })
    })
  })
})
