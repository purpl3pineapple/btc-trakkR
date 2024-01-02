class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export default class LinkedList {
  constructor(head = null) {
    this.head = head;
    this.size = 0;

    this[Symbol.iterator] = function () {
      let current = this.head;
      let result;

      return {
        next() {
          if (current) {
            result = { value: current.data, done: false };
            current = current.next;
          } else {
            result = { done: true };
          }

          return result;
        },
      };
    };
  }

  shift(data) {
    let node = new ListNode(data);

    node.next = this.head;

    this.head = node;

    this.size++;
  }

  add(data) {
    let node = new ListNode(data);

    let current;

    if (this.head === null) {
      this.head = node;
      this.size++;
      return;
    } else {
      current = this.head;

      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  forEach(callback, arg) {
    let current = this.head;

    while (current) {
      callback(current.data);
      current = current.next;
    }
  }

  map(func) {
    const list = new LinkedList();
    let current = this.head;

    while (current) {
      list.add(func(current.data));
      current = current.next;
    }

    return list;
  }

  getLast() {
    let node = this.head;

    while (node && node.next) {
      node = node.next;
    }

    return node;
  }

  printList() {
    let curr = this.head;
    let str = "";
    while (curr) {
      str += curr.data + " ";
      curr = curr.next;
    }
    return str;
  }

  toArray() {
    let curr = this.head;
    let arr = [];
    while (curr) {
      arr.push(curr.data);
      curr = curr.next;
    }
    return arr;
  }

  clear() {
    this.head = null;
    this.size = 0;
  }
}
