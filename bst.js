class Node {
  constructor(item) {
    this.item = item;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}

// AVL Tree implementation
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Helper Methods
  //return height of the node
  getHeight(node) {
    return node != null ? node.height : 0;
  }

  // get balance factor of a node
  getBalanceFactor(node) {
    return node != null ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  //get node with minimum value
  nodeWithMimumValue(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  //right rotate
  rightRotate(node) {
    let leftNode = node.left;
    let rightLeftNode = leftNode.right;

    leftNode.right = node;
    node.left = rightLeftNode;
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    leftNode.height = Math.max(this.getHeight(leftNode.left), this.getHeight(leftNode.right)) + 1;

    return leftNode;
  }

  //left rotate
  leftRotate(node) {
    let rightNode = node.right;
    let leftRightNode = rightNode.left;

    rightNode.left = node;
    node.right = leftRightNode;
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    rightNode.height = Math.max(this.getHeight(rightNode.left), this.getHeight(rightNode.right)) + 1;

    return rightNode;
  }

  findNodeHelper(node, item) {
    if (node === null) {
      return null;
    }

    if (item < node.item) {
      return this.findNodeHelper(node.left, item);
    } else if (item > node.item) {
      return this.findNodeHelper(node.right, item);
    } else {
      return node;
    }
  }

  insertNodeHelper(node, item) {
    // find the position and insert the node
    if (node === null) {
      return new Node(item);
    }

    if (item < node.item) {
      node.left = this.insertNodeHelper(node.left, item);
    } else if (item > node.item) {
      node.right = this.insertNodeHelper(node.right, item);
    } else {
      // Already exists
      return node;
    }

    // update the balance factor of each node
    // and, balance the tree
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    let balanceFactor = this.getBalanceFactor(node);

    if (balanceFactor > 1) {
      if (item < node.left.item) {
        return this.rightRotate(node);
      } else if (item > node.left.item) {
        node.left = this.leftRotate(node.left);
        return this.rightRotate(node);
      }
    }

    if (balanceFactor < -1) {
      if (item > node.right.item) {
        return this.leftRotate(node);
      } else if (item < node.right.item) {
        node.right = this.rightRotate(node.right);
        return this.leftRotate(node);
      }
    }

    return node;
  }

  deleteNodeHelper(node, item) {
    // find the node to be deleted and remove it
    if (node == null) {
      return node;
    }
    if (item < node.item) {
      node.left = this.deleteNodeHelper(node.left, item);
    } else if (item > node.item) {
      node.right = this.deleteNodeHelper(node.right, item);
    } else {
      if (node.left != null && node.right != null) {
        let temp = this.getNodeWithMimumValue(node.right);
        node.item = temp.item;
        node.right = this.deleteNodeHelper(node.right, temp.item);
      } else {
        let temp = node.left != null ? node.left : node.right;
        if (temp == null) {
          temp = node;
          node = null;
          return node;
        } else {
          node = temp;
        }
      }
    }

    // Update the balance factor of each node and balance the tree
    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;

    let balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor > 1) {
      if (this.getBalanceFactor(node.left) >= 0) {
        return this.rightRotate(node);
      } else {
        node.left = this.leftRotate(node.left);
        return this.rightRotate(node);
      }
    }
    if (balanceFactor < -1) {
      if (this.getBalanceFactor(node.right) <= 0) {
        return this.leftRotate(node);
      } else {
        node.right = this.rightRotate(node.right);
        return this.leftRotate(node);
      }
    }
    return node;
  }

  findNode(item) {
    return this.findNodeHelper(this.root, item);
  }

  insertNode(item) {
    this.root = this.insertNodeHelper(this.root, item);
  }

  deleteNode(item) {
    this.root = this.deleteNodeHelper(this.root, item);
  }
}
