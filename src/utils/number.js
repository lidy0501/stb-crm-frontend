import {trueTypeFunc} from './base'

const isNumberFunc = trueTypeFunc('Number')
const isNaNFunc = window.isNaN

export const MAX_SAFE_INTEGER = 9007199254740991

/**
 * 判断是否是 NaN, 与原生 isNaN 不同, 例如 String 类型传入为 false
 *
 * @param value       验证值
 * @returns {boolean} 是否是 NaN 值
 */
export const isNaN = value => isNumberFunc(value) && isNaNFunc(value)

/**
 * 判断是否是数字, 不包括 NaN 值
 *
 * @param value       验证值
 * @returns {boolean} 是否是纯数字
 */
export const isNumber = value => isNumberFunc(value) && !isNaNFunc(value)

export const toNum = (numText, trans = true) => {
  if (!numText) return trans ? 0 : numText

  numText = numText.toString().trim()
  const isNegative = numText.indexOf('-') === 0

  numText = numText.replace(/[^\d.]/g, '')
  const pointIndex = numText.indexOf('.')
  numText = numText.replace(/\./g, '')

  if (pointIndex !== -1 && pointIndex !== numText.length) {
    const arr = numText.split('')
    arr.splice(pointIndex, 0, '.')
    numText = arr.join('')
  }

  numText = numText && isNegative ? `-${numText}` : numText

  return trans ? +numText : numText
}

export const isLength = value => isNumber(value) && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER

export const isEven = value => isNumber(value) && !Math.abs(value % 2)
export const isOdd = value => isNumber(value) && Math.abs(value % 2) === 1

export const intervalVal = (min, max, value) => Math.min(Math.max(value, min), max)

/* eslint-disable */
export const fixToNum = (value) => {
  if (!value) return value
  value += ''
  value = value.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
  value = value.replace(/\.{2,}/g, '') // 只保留第一个. 清除多余的
  value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
  if (value.indexOf('.') < 0 && value !== '') { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    value = parseFloat(value)
  }

  return value
}

/* eslint-enable */
