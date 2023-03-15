function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function getImgSrc(path) {
  return path.replace('//cdn.weatherapi.com', './img');
}

export {removeAllChildNodes, getImgSrc};