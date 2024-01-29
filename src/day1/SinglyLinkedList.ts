class Node {
    public value: number;
    public next: Node | null;

    constructor(value: number) {
        this.value = value;
        this.next = null;
    }
}

export default class SinglyLinkedList<T> {
    public length: number;
    private head: Node | null;
    private tail: Node | null;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    get(idx: number): number | undefined {
        if (idx < 0 || idx > this.length || !this.head) {
            return undefined;
        }

        let counter = 0;
        let currentNode = this.head;

        while (counter !== idx && currentNode.next) {
            currentNode = currentNode.next;
            counter++;
        }

        return currentNode.value;
    }

    getNode(idx: number): Node | undefined {
        if (idx < 0 || idx > this.length || !this.head) {
            return undefined;
        }

        let counter = 0;
        let currentNode = this.head;

        while (counter !== idx && currentNode.next) {
            currentNode = currentNode.next;
            counter++;
        }

        return currentNode;
    }

    prepend(item: number): void {
        const node = new Node(item);

        if (!this.head) {
            this.head = node;
            this.tail = this.head;
        } else {
            node.next = this.head;
            this.head = node;
        }

        this.length++;
    }

    append(item: number): void {
        const node = new Node(item);

        if (!this.head) {
            this.head = node;
            this.tail = this.head;
        } else if (this.head && this.tail) {
            this.tail.next = node;
            this.tail = node;
        }

        this.length++;
    }

    shift(): number | undefined {
        if (!this.head) {
            return undefined;
        }

        const currentHead = this.head;
        this.head = currentHead.next;
        this.length--;

        if (this.length === 0) {
            this.tail = null;
        }

        return currentHead.value;
    }

    pop(): number | undefined {
        if (!this.head) {
            return undefined;
        }

        let currentNode = this.head;
        let newTail = currentNode;

        while (currentNode.next) {
            newTail = currentNode;
            currentNode = currentNode.next;
        }

        this.tail = newTail;
        this.tail.next = null;
        this.length--;

        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }

        return currentNode.value;
    }

    insertAt(item: number, idx: number): void {
        if (idx < 0 || idx > this.length) {
            return;
        }

        if (idx === 0) {
            this.prepend(item);
        }

        if (idx === this.length) {
            this.append(item);
        }

        const newNode = new Node(item);
        let prevNode = this.getNode(idx - 1);
        let tmpNext = prevNode?.next;

        if (prevNode) prevNode.next = newNode;
        if (tmpNext) newNode.next = tmpNext;

        this.length++;
    }

    removeAt(idx: number): number | undefined {
        if (idx < 0 || idx > this.length) {
            return undefined;
        }

        if (idx === 0) {
            return this.shift();
        }

        if (idx === this.length - 1) {
            return this.pop();
        }

        let previousNode = this.getNode(idx - 1);
        let removedNode = this.getNode(idx);

        if (previousNode && removedNode) previousNode.next = removedNode.next;
        this.length--;

        return removedNode?.value;
    }

    remove(item: number): number | undefined {
        if (!this.head) {
            return undefined;
        }

        let currentNode = this.head;
        let targetNode = currentNode;
        let targetIdx = 0;

        while (currentNode.next) {
            if (currentNode.value === item) {
                break;
            }

            targetNode = currentNode.next;
            currentNode = currentNode.next;
            targetIdx++;
        }

        if (targetNode.value !== item) return undefined;

        if (targetIdx === 0) this.shift();
        else if (targetIdx === this.length - 1) this.pop();
        else {
            let prevNode = this.getNode(targetIdx - 1);
            if (prevNode) prevNode.next = currentNode.next;
            this.length--;

            if (this.length === 0) {
                this.head = null;
                this.tail = null;
            }
        }

        return currentNode.value;
    }
}
