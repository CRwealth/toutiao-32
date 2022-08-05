function Set () {
  this.items = {}
  // union方法 并集
  Set.prototype.union = function (otherSet) {
    // this 是A集合    otherSet 是B集合
    // 创建新集合 将A中元素add进去，再将B中元素add进去
    const unionSet = new Set()
    let values = this.values()
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i])
    }
    values = otherSet.values()
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i])
    }
    return unionSet
  }
  // intersection 交集
  Set.prototype.intersection = function (otherSet) {
    // 创建新集合 遍历A，判断元素是否存在于B中
    const intersectionSet = new Set()
    const setA = this.values()
    for (let i = 0; i < setA.length; i++) {
      const value = setA[i]
      if (otherSet.has(value)) {
        intersectionSet.add(value)
      }
    }
    return intersectionSet
  }
  // diffsection方法  差集
  Set.prototype.diffsection = function (otherSet) {
    // 创建新集合， 遍历A  判断元素不存在B中
    const diffsection = new Set()
    const setA = this.values()
    for (let i = 0; i < setA.length; i++) {
      const value = setA[i]
      if (!otherSet.has(value)) {
        diffsection.add(value)
      }
    }
    return diffsection
  }
  // subset方法 子集
  Set.prototype.subset = function (otherSet) {
    // 创建新集合  遍历A  如果存在不属于B的元素 return false
    const subset = new Set()
    const setA = this.values()
    for (let i = 0; i < setA.length; i++) {
      const value = setA[i]
      if (!otherSet.has(value)) return false
    }
    return true
  }
}
