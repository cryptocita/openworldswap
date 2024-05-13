import { IfoStatus, IfoV3Status } from '../types'

export const getStatus = (
  currentBlock: number,
  startBlock: number,
  endBlock: number,
  claimBlock: number,
): IfoStatus => {
  // Add an extra check to currentBlock because it takes awhile to fetch so the initial value is 0
  // making the UI change to an inaccurate status
  if (currentBlock === 0) {
    return 'idle'
  }

  if (currentBlock < startBlock) {
    return 'coming_soon'
  }

  if (currentBlock >= startBlock && currentBlock <= endBlock) {
    return 'live'
  }

  if (currentBlock >= endBlock && currentBlock <= claimBlock) {
    return 'finished'
  }

  return 'claimable'
}

export const getV3Status = (
  currentTime: number,
  wlStartTime: number,
  pubStartTime: number,
  endTime: number,
  claimTime: number,
): IfoV3Status => {
  // Add an extra check to currentBlock because it takes awhile to fetch so the initial value is 0
  // making the UI change to an inaccurate status
  if (currentTime === 0) {
    return 'idle'
  }

  if (currentTime < wlStartTime) {
    return 'coming_soon'
  }

  if (currentTime < pubStartTime) {
    return 'wl_sale'
  }

  if (currentTime < endTime) {
    return 'pub_sale'
  }

  if (currentTime <= claimTime) {
    return 'finished'
  }

  return 'claimable'
}

export default null
