const { NotImplementedError } = require("../extensions/index.js");

const { ListNode } = require("../extensions/list-node.js");

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */
function removeKFromList(list, k, currentNode = list[0]) {
    // if (!currentNode) return null;
    // if (currentNode.next === null) {
    //     return list;
    // }
    // if (currentNode.next.value === k) {
    //     let nextNode = currentNode.next.next;
    //     currentNode.next = nextNode;
    //     removeKFromList(list, k, nextNode);
    // }

    let result = [];
    if (currentNode.value !== k) {
        result.push(currentNode.value);
        if (currentNode.next) {
            let nextNode = currentNode.next;
            return removeKFromList(list, k, nextNode.value);
        } else {
            return result;
        }
    } else {
        if (currentNode.next) {
            let nextNode = currentNode.next;
            return removeKFromList(list, k, nextNode.value);
        } else {
            return result;
        }
    }
}

module.exports = {
    removeKFromList,
};
