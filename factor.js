const FacParam = {
  /**
   * @property {string} id — Unique identification the element.
   * More details in Mozilla {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id Id - HTML}.
   */
  id: "",
  /**
   * @property {string} class — Attribute of class in element.
   * More details in Mozilla {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class class - HTML}.
   * @example "my-class" or "my-class your-class"
   */
  class: "",
  /**
   * @property {string} text — text node.
   * More details in Mozilla {@link https://developer.mozilla.org/en-US/docs/Web/API/Text Text}.
   */
  text: "",
  /**
   * @property {object} attr — Object of attributes.
   * More details in Mozilla {@link https://developer.mozilla.org/en-US/docs/Glossary/Attribute Attribute}.
   */
  attr: {},
  /**
   * @property {object} style — Added inline styles
   * More details in Mozilla {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style style}.
   */
  style: {},
  /**
   * @property {object} event — The good and old addEventListener :D
   * More details in Mozilla {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener event}.
   */
  event: {},
  /**
   * @type {(Factor|Factor[])}
   * @property {Factor} child — Child is one or a list element Factor
   */
  child: [],
  /**
   * @property {function} click — It's a click event with addEventListener
   */
  click: () => {},
  /**
   * @property {function} alter — Return the Factor element in execution time
   * @param {Factor} factor — The element
   * @returns {Factor} Factor element
   */
  alter: (factor) => {},
};

/** Factor Class */
class Factor {
  /**
   *
   * @param {string} name - Name of element DOM (tagName)
   * @param {FacParam} params - Parameters using in Factor
   * @returns
   */
  constructor(name, params) {
    this.name = name;
    this.create(params);

    this.params = params;

    if (params) {
      this.assemble();
    }
    this.defineMethods();

    return this._factor;
  }

  create(params) {
    this._factor = document.createElement(this.name);
    this._factor.params = params;
  }

  defineMethods() {
    this._factor.reload = this.reload.bind(this);
    this._factor.addClass = this.addClass.bind(this);
    this._factor.rmClass = this.rmClass.bind(this);
    this._factor.setHtml = this.setHtml.bind(this);
  }

  /**
   * @param {string} _ — Class
   */
  set class(_) {
    if (_) {
      this._factor.classList = _;
    }
  }

  /**
   * @param {string} _ — Id
   */
  set id(_) {
    if (_) {
      this._factor.id = _;
    }
  }

  /**
   * @param {string} _ — Html string
   */
  set html(_) {
    this._factor.innerHTML = _;
  }

  setHtml(html) {
    this.html = html;
  }

  assemble() {
    this.class = this.params.class;
    this.id = this.params.id;

    if (this.params.event) {
      this.setEvent();
    }

    if (this.params.click) {
      this._factor.addEventListener("click", (event) => {
        event.facTarget = this._factor;
        this.params.click(event);
      });
    }

    if (this.params.text && !this.params.child) {
      this.setText(this.params.text);
    }

    if (
      typeof this.params.child === "object" ||
      typeof this.params.child === "string"
    ) {
      this.setChild();
    }

    if (this.params.html) {
      this.html = this.params.html;
    }

    if (typeof this.params.style === "object") {
      this.setStyle();
    }

    if (this.params.attr) {
      this.setAttr();
    }

    if (this.params.alter) {
      this.change();
    }
  }

  change() {
    if (typeof this.params.alter === "function") {
      this.params.alter(this._factor);
    } else {
      throw "The alter parameter must be a function";
    }
  }

  addClass(className) {
    this._factor.classList.add(className);
  }

  rmClass(className) {
    this._factor.classList.remove(className);
  }

  append(child) {
    this._factor.append(child);
  }

  prepend(child) {
    this._factor.prepend(child);
  }

  reload(params) {
    // const oldElement = this._factor;
    // this.create(this.params);
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        this._factor.params[key] = params[key];
        this.params[key] = params[key];
      }
    }
    this.assemble();
    this.defineMethods();
    // oldElement.parentNode.replaceChild(this._factor, oldElement);
  }

  setStyle() {
    for (const key in this.params.style) {
      if (this.params.style.hasOwnProperty(key)) {
        const value = this.params.style[key];
        this._factor.style[key] = value;
      }
    }
  }

  setEvent() {
    for (const name in this.params.event) {
      if (this.params.event.hasOwnProperty(name)) {
        const event = this.params.event[name];
        this._factor.addEventListener(name, event);
      }
    }
  }

  setAttr() {
    for (const key in this.params.attr) {
      if (this.params.attr.hasOwnProperty(key)) {
        const attr = this.params.attr[key];
        this._factor.setAttribute(key, attr);
      }
    }
  }

  setText(t) {
    this._factor.innerHTML = "";
    let text = document.createTextNode(t);
    this._factor.appendChild(text);
  }

  setChild() {
    this.html = "";
    let child = this.params.child;
    if (Array.isArray(child)) {
      child.forEach((element) => {
        if (element) {
          if (typeof element === "object") {
            element._dad = this._factor;
            this._factor.appendChild(element);
          } else if (typeof element === "string" && element.length > 0) {
            const frag = document.createElement("div");
            frag.innerHTML = element;
            while (frag.childNodes.length != 0) {
              this._factor.appendChild(frag.childNodes[0]);
            }
          }
        }
      });
      return;
    } else {
      if (typeof child === "string" && child.length > 0) {
        this.setText(child);
      } else {
        this._factor.appendChild(child);
      }
    }
  }
}
