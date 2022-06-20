import { regions } from '@/env/constants';

const matchedRegions = [];

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
};

const sortedArrayToBinarySearchTree = (arr, start, end) => {
  if (start > end) { return null; };

  const mid = parseInt((start + end) / 2);
  const node = new Node(arr[mid]);

  node.left = sortedArrayToBinarySearchTree(arr, start, mid - 1);
  node.right = sortedArrayToBinarySearchTree(arr, mid + 1, end);

  return node;
};

const getMatchedRegions = function (node, key) {
  const normalizedKey = key.toLowerCase();
  if (node === null) {
    return null;
  };

  if (node.data.toLowerCase().startsWith(normalizedKey)) {
    matchedRegions.push(node.data);
    if (node.left) {
      getMatchedRegions(node.left, normalizedKey);
    }
    if (node.right) {
      getMatchedRegions(node.right, normalizedKey);
    }
    return node;
  };

  if (node.data.toLowerCase() < normalizedKey) {
    return getMatchedRegions(node.right, normalizedKey);
  };

  if (node.data.toLowerCase() > normalizedKey) {
    return getMatchedRegions(node.left, normalizedKey);
  };
};

const searchRegionsByQuery = function (searchQuery) {
  if (searchQuery === '') {
    return null;
  };
  matchedRegions.length = 0;
  const regionsBinarySearchTree = sortedArrayToBinarySearchTree(regions, 0, regions.length - 1);
  getMatchedRegions(regionsBinarySearchTree, searchQuery);
  return matchedRegions;
};

export default searchRegionsByQuery;
