const { NotImplementedError } = require("../extensions/index.js");

const { ListNode } = require("../extensions/list-node.js");

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
    constructor(head = null) {
        this.head = head;
    }

    getUnderlyingList(node = this.head) {
        if (!node) return null;
        return this.head;
    }

    enqueue(value, node = this.head) {
        if (!node) return (this.head = new ListNode(value));
        return (this._getLast(node).next = new ListNode(value));
    }

    dequeue(node = this.head) {
        if (!node) return null;
        let deletedNode = this.head;
        this.head = deletedNode.next;
        return deletedNode.value;
    }

    _getLast(node = this.head) {
        if (node.next === null) return node;
        return this._getLast(node.next);
    }
}

module.exports = {
    Queue,
};
