const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
    constructor(root = null) {
        this._root = root;
    }

    root() {
        return this._root;
    }

    add(data, node = this._root) {
        if (!node) return (this._root = new Node(data));
        if (data > node.data) {
            if (node.right === null) return (node.right = new Node(data));
            return this.add(data, node.right);
        } else {
            if (node.left === null) return (node.left = new Node(data));
            return this.add(data, node.left);
        }
    }

    has(data, node = this._root) {
        if (!node) return false;
        if (node.data === data) {
            return true;
        }
        if (data > node.data) {
            if (node.right === null) return false;
            return this.has(data, node.right);
        } else {
            if (node.left === null) return false;
            return this.has(data, node.left);
        }
    }

    find(data, node = this._root) {
        if (!node) return null;
        if (node.data === data) {
            return node;
        }
        if (data > node.data) {
            if (node.right === null) return null;
            return this.find(data, node.right);
        } else {
            if (node.left === null) return null;
            return this.find(data, node.left);
        }
    }

    remove(data, node = this._root) {
        if (!node) return;

        let nodeToRemove = this.find(data);
        if (!nodeToRemove) return;
        let nodeParent = this._findParentNode(nodeToRemove.data);

        if (nodeToRemove === this._root && this._isLeaf(nodeToRemove)) {
            this._root = null;
            return;
        }

        if (nodeToRemove === this._root && this._hasOneChild(nodeToRemove)) {
            if (this._root.left) {
                this._root = this._root.left;
            } else {
                this._root = this._root.right;
            }
            return;
        }

        if (nodeToRemove === this._root && this._hasTwoChildren(nodeToRemove)) {
            let replacement = this.find(this.max(this._root.left));
            if (nodeToRemove.left === replacement) {
                this._root = replacement;
                replacement.right = this._root.right;
                return;
            } else {
                let replacementParent = this._findParentNode(replacement.data);
                replacementParent.right = replacement.left;
                replacement.left = this._root.left;
                replacement.right = this._root.right;
                this._root = replacement;
                return;
            }
        }

        if (this._isLeaf(nodeToRemove)) {
            let direction = this._getDirection(nodeToRemove, nodeParent);
            nodeParent[direction] = null;
            return;
        }

        if (this._hasOneChild(nodeToRemove)) {
            let direction = this._getDirection(nodeToRemove, nodeParent);
            if (nodeToRemove.left) {
                nodeParent[direction] = nodeToRemove.left;
            } else {
                nodeParent[direction] = nodeToRemove.right;
            }
            return;
        }

        if (this._hasTwoChildren(nodeToRemove)) {
            let direction = this._getDirection(nodeToRemove, nodeParent);
            let replacement = this.find(this.max(nodeToRemove.left));
            if (nodeToRemove.left === replacement) {
                nodeParent[direction] = replacement;
                replacement.right = nodeToRemove.right;
                return;
            } else {
                let replacementParent = this._findParentNode(replacement.data);
                replacementParent.right = replacement.left;
                replacement.right = nodeToRemove.right;
                replacement.left = nodeToRemove.left;
                nodeParent[direction] = replacement;
                return;
            }
        }
    }

    min(node = this._root) {
        if (!node) return null;
        if (node.left === null) return node.data;
        return this.min(node.left);
    }

    max(node = this._root) {
        if (!node) return null;
        if (node.right === null) return node.data;
        return this.max(node.right);
    }

    _findParentNode(data, node = this._root) {
        if (!node) return null;
        if (
            (node.right != null && node.right.data === data) ||
            (node.left != null && node.left.data === data)
        ) {
            return node;
        }
        if (data > node.data) {
            if (node.right === null) return null;
            return this._findParentNode(data, node.right);
        } else {
            if (node.left === null) return null;
            return this._findParentNode(data, node.left);
        }
    }

    _getDirection(node, parent) {
        if (parent.left === node) {
            return "left";
        } else {
            return "right";
        }
    }

    _isLeaf(node) {
        return !node.left && !node.right;
    }

    _hasOneChild(node) {
        return (!node.left && node.right) || (node.left && !node.right);
    }

    _hasTwoChildren(node) {
        return node.left && node.right;
    }
}

module.exports = {
    BinarySearchTree,
};
