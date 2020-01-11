/*
ref: https://github.com/mistlog/algorithm/blob/master/src/tree/huffman-tree.tsx
*/
import { NumberNode } from "../common/binary-tree";
import { default as PriorityQueue } from "ts-priority-queue";

export class HuffmanTree {
  m_Root: HuffmanNode;
}

export class HuffmanNode extends NumberNode {}

<HuffmanTree /> +
  function constructor(this: HuffmanTree, values: Array<number>) {
    //@ts-ignore
    <PrepareQueue />;

    //@ts-ignore
    <CombineNodes />;

    //@ts-ignore
    <SetRoot />;
  };

function PrepareQueue(values: Array<number>) {
  const queue = new PriorityQueue<HuffmanNode>({
    comparator: (a: HuffmanNode, b: HuffmanNode) => a.m_Info - b.m_Info,
    initialValues: values.map(each => new NumberNode(each))
  });
}

function SetRoot(this: HuffmanTree, queue: PriorityQueue<HuffmanNode>) {
  this.m_Root = queue.dequeue();
}

function CombineNodes(queue: PriorityQueue<HuffmanNode>) {
  while (queue.length !== 1) {
    const left = queue.dequeue();
    const right = queue.dequeue();
    const node = new HuffmanNode(left.m_Info + right.m_Info, left, right);
    queue.queue(node);
  }
}
