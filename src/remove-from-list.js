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
function removeKFromList(head, k) {
    let nodeToRemove = findNode(head, k);
    if (!nodeToRemove) return head;

    if (nodeToRemove === head) {
        return removeKFromList(head.next, k);
    }
    let nodeToRemoveParent = findParentNode(head, nodeToRemove);

    nodeToRemoveParent.next = nodeToRemove.next;
    return removeKFromList(head, k);
}

function findNode(node, k) {
    if (!node) return null;
    if (node.value === k) return node;
    return findNode(node.next, k);
}

function findParentNode(head, node) {
    if (!head) return null;
    if (head.next === node) return head;
    return findParentNode(head.next, node);
}

module.exports = {
    removeKFromList,
};
