import core from 'mathjs/core';
import type from 'mathjs/lib/type';
import constants from 'mathjs/lib/constants';
import mathParse from 'mathjs/lib/expression/function/parse';
import node from 'mathjs/lib/expression/node';
import arithmetic from 'mathjs/lib/function/arithmetic';
import bitwise from 'mathjs/lib/function/bitwise';
import combinatorics from 'mathjs/lib/function/combinatorics';
import complex from 'mathjs/lib/function/complex';
import geometry from 'mathjs/lib/function/geometry';
import logical from 'mathjs/lib/function/logical';
import matrix from 'mathjs/lib/function/matrix';
import probability from 'mathjs/lib/function/probability';
import relational from 'mathjs/lib/function/relational';
import set from 'mathjs/lib/function/set';
import special from 'mathjs/lib/function/special';
import statistics from 'mathjs/lib/function/statistics';
import string from 'mathjs/lib/function/string';
import trigonometry from 'mathjs/lib/function/trigonometry';
import unit from 'mathjs/lib/function/unit';
import utils from 'mathjs/lib/function/utils';
import json from 'mathjs/lib/json';
import error from 'mathjs/lib/error';

const math = core.create();

math.import(type);

math.import(constants);

math.import([mathParse, node]);

math.import([
  arithmetic,
  bitwise,
  combinatorics,
  complex,
  geometry,
  logical,
  matrix,
  probability,
  relational,
  set,
  special,
  statistics,
  string,
  trigonometry,
  unit,
  utils,
]);

math.import(json);

math.import(error);

export const createUnit = math.createUnit;
export const parse = math.parse;

math.import(
  {
    import: function() {
      throw new Error('Function import is disabled');
    },
    createUnit: function() {
      throw new Error('Function createUnit is disabled');
    },
    eval: function() {
      throw new Error('Function eval is disabled');
    },
    parse: function() {
      throw new Error('Function parse is disabled');
    },
    simplify: function() {
      throw new Error('Function simplify is disabled');
    },
    derivative: function() {
      throw new Error('Function derivative is disabled');
    },
  },
  { override: true }
);

export default math;
