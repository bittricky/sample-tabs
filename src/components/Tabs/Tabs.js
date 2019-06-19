import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Tabs.css";

class Tabs extends Component {
    state = {
      tab: 0
    };

    constructor(props) {
      super(props);
      this.indicator = React.createRef();
      this.tabRefs = [];
    }

    componentDidMount() {
      this.tabRefs.forEach(elem => elem.addEventListener("click", e => this.handleTabClick(e)));

      this.positionIndicator(0);

      window.addEventListener("resize", this.resizeWindow.bind(this));
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.resizeWindow.bind(this));
    }

    handleTabClick = e => {
      e.preventDefault();
      this.setState({ tab: e.currentTarget.dataset.id });
      this.positionIndicator(e.currentTarget.dataset.id);
    };

    positionIndicator(elementId) {
      const target = ReactDOM.findDOMNode(this.indicator);
      const elem = ReactDOM.findDOMNode(this.tabRefs[elementId]);

      this.tabRefs.forEach((elem) => {
          if (elem.classList.contains("active")) {
              elem.classList.remove("active");
          }
      });

      elem.classList.add("active");

      const width = elem.getBoundingClientRect().width;
      const height = elem.getBoundingClientRect().height - 7;
      const left = elem.getBoundingClientRect().left + window.pageXOffset;
      const top = elem.getBoundingClientRect().top + window.pageYOffset;

      target.style.width = `${width}px`;
      target.style.height = `${height}px`;
      target.style.left = `${left}px`;
      target.style.top = `${top}px`;
      target.style.transform = "none";
    }

    resizeWindow() {
      const active = document.querySelector(".tabs .active");

      if (active) {
          const left = active.getBoundingClientRect().left + window.pageXOffset;
          const top = active.getBoundingClientRect().top + window.pageYOffset;
          const target = ReactDOM.findDOMNode(this.indicator);

          target.style.left = `${left}px`;
          target.style.top = `${top}px`;
      }
    }

    render() {
      return (
          <div className="tabs">
              <div className="container">
                  <nav>
                      <ul>
                          {
                            this.props.menu.cities.map((city, index) => {
                              const { section, label } = city;
                              return (
                                  <li key={index}>
                                      <a href={`${section}`}
                                        data-id={index}
                                        ref={ref => (this.tabRefs[index] = ref)}>
                                          {label}
                                      </a>
                                  </li>
                              );
                            })
                          }
                      </ul>
                  </nav>
                  <hr ref={elem => { this.indicator = elem; }} />
              </div>
          </div>
      );
    }
}

export default Tabs;
