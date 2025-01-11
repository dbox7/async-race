export default function createElem(type: string, cl: string[] = [], value: string = '', attr: string[] = []) {
  const res = document.createElement(type);
  if (typeof cl === 'object' && cl.length > 0) {
    cl.forEach((item) => res.classList.add(item));
  }

  if (value) {
    res.innerHTML = value;
  }

  if (attr.length !== 0) {
    res.setAttribute(attr[0], attr[1]);
  }

  return res;
}