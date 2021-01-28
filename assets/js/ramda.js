// Object
import assoc from 'ramda/src/assoc'
import dissoc from 'ramda/src/dissoc'
import omit from 'ramda/src/omit'
import propEq from 'ramda/src/propEq'
import prop from 'ramda/src/prop'
import clone from 'ramda/src/clone'
import eqProps from 'ramda/src/eqProps'
import equals from 'ramda/src/equals'
import evolve from 'ramda/src/evolve'
import forEachObjIndexed from 'ramda/src/forEachObjIndexed'
import has from 'ramda/src/has'
import keys from 'ramda/src/keys'
import values from 'ramda/src/values'
import mapObjIndexed from 'ramda/src/mapObjIndexed'
import mergeLeft from 'ramda/src/mergeLeft'
import mergeDeepLeft from 'ramda/src/mergeDeepLeft'
import mergeRight from 'ramda/src/mergeRight'
import mergeDeepRight from 'ramda/src/mergeDeepRight'
import mergeAll from 'ramda/src/mergeAll' // 将对象类型列表合并为一个对象。
import mergeWith from 'ramda/src/mergeWith'
import mergeDeepWith from 'ramda/src/mergeDeepWith'
import path from 'ramda/src/path'
import pathEq from 'ramda/src/pathEq'
import pick from 'ramda/src/pick'
import project from 'ramda/src/project' // 模拟 SQL 中的 select 语句。

// Function
import once from 'ramda/src/once'
import addIndex from 'ramda/src/addIndex'
import compose from 'ramda/src/compose'
import pipe from 'ramda/src/pipe'

// Relation
import max from 'ramda/src/max'
import maxBy from 'ramda/src/maxBy'
import min from 'ramda/src/min'
import minBy from 'ramda/src/minBy'

// List
import append from 'ramda/src/append'
import prepend from 'ramda/src/prepend'
import find from 'ramda/src/find'
import adjust from 'ramda/src/adjust'
import head from 'ramda/src/head'
import concat from 'ramda/src/concat'
import includes from 'ramda/src/includes'
import filter from 'ramda/src/filter'
import reject from 'ramda/src/reject'
import findIndex from 'ramda/src/findIndex'
import flatten from 'ramda/src/flatten'
import forEach from 'ramda/src/forEach'
import indexOf from 'ramda/src/indexOf'
import intersperse from 'ramda/src/intersperse'
import init from 'ramda/src/init'
import join from 'ramda/src/join'
import length from 'ramda/src/length'
import map from 'ramda/src/map'
import move from 'ramda/src/move'
import none from 'ramda/src/none'
import pluck from 'ramda/src/pluck'
import range from 'ramda/src/range'
import remove from 'ramda/src/remove'
import repeat from 'ramda/src/repeat'
import slice from 'ramda/src/slice'
import sort from 'ramda/src/sort'
import tail from 'ramda/src/tail'
import take from 'ramda/src/take'
import uniq from 'ramda/src/uniq'
import update from 'ramda/src/update'
import xprod from 'ramda/src/xprod'
import without from 'ramda/src/without'
import reverse from 'ramda/src/reverse'
import unnest from 'ramda/src/unnest'

// String
import match from 'ramda/src/match'
import test from 'ramda/src/test'
import replace from 'ramda/src/replace'
import split from 'ramda/src/split'
import toLower from 'ramda/src/toLower'
import toUpper from 'ramda/src/toUpper'
import trim from 'ramda/src/trim'

// Mah
import add from 'ramda/src/add'
import subtract from 'ramda/src/subtract'
import multiply from 'ramda/src/multiply'
import product from 'ramda/src/product' // 列表中的所有元素相乘。
import divide from 'ramda/src/divide'
import sum from 'ramda/src/sum'
import mean from 'ramda/src/mean' // 平均值
import median from 'ramda/src/median' // 中位数
import dec from 'ramda/src/dec' // 减1。
import inc from 'ramda/src/inc' // 加1。

// Logic
import isEmpty from 'ramda/src/isEmpty'
import pathSatisfies from 'ramda/src/pathSatisfies'
import propSatisfies from 'ramda/src/propSatisfies'

// Type
import is from 'ramda/src/is'
import propIs from 'ramda/src/propIs'
import type from 'ramda/src/type' // 返回类型'Object'、'Number'、'Array'、'Null'、'Boolean'、'String'、'RegExp'、'Function'、'Undefined'
import isNil from 'ramda/src/isNil' // 检测输入值是否为 null 或 undefined 。

export default {
  is,
  type,
  propIs,
  isNil,
  isEmpty,
  pathSatisfies,
  propSatisfies,
  add,
  sum,
  multiply,
  product,
  subtract,
  divide,
  median,
  mean,
  inc,
  dec,
  match,
  trim,
  toUpper,
  toLower,
  test,
  replace,
  split,
  once,
  compose,
  pipe,
  mapIndexed: addIndex(map),
  addIndex,
  min,
  max,
  maxBy,
  minBy,
  project,
  pick,
  pathEq,
  path,
  mergeLeft,
  mergeRight,
  mergeDeepLeft,
  mergeDeepRight,
  mergeWith,
  mergeDeepWith,
  clone,
  eqProps,
  equals,
  evolve,
  forEachObjIndexed,
  has,
  keys,
  values,
  mapObjIndexed,
  assoc,
  omit,
  append,
  prop,
  prepend,
  propEq,
  dissoc,
  find,
  adjust,
  concat,
  includes,
  filter,
  reject,
  findIndex,
  flatten,
  forEach,
  indexOf,
  intersperse,
  init,
  join,
  length,
  mergeAll,
  map,
  move,
  none,
  pluck,
  range,
  remove,
  repeat,
  slice,
  sort,
  reverse,
  unnest,
  tail,
  take,
  uniq,
  update,
  xprod,
  without,
  head
}
