define([
  'json!/lang/en.json',
  'json!/lang/cn.json',
  'react',
  'react-dom'
], (EN, CN, React, ReactDOM) => {
  let Page = React.createClass({

    /**
     * Executes exactly once during the lifecycle of the
     * component and sets up the initial state of the component.
     * @returns state object
     */
    getInitialState() {
      return {langContent: EN};
    },

    render() {
      return (
        <div className="translation">
          <div>
            <a href="" id="en" onClick={this.handleLangChange}>English</a>
            &nbsp;&nbsp;
            <a href="" id="cn" onClick={this.handleLangChange}>中文</a>
          </div>
          <div>
            {this.state.langContent.HOME.HEADER.TITLE}
          </div>
        </div>
      );
    },


    /**
     * Called automatically by React after a component
     * is rendered for the first time.
     */
    componentDidMount() {
      let pathName = window.location.pathname;
      if (pathName.match(/^\/en\/.+/g))
        this.setState({langContent: EN});
      else if (pathName.match(/^\/cn\/.+/g))
        this.setState({langContent: CN});
    },


    /**
     * Handles language change event.
     * @param event
     */
    handleLangChange(event) {
      event.preventDefault();
      let lang = event.target.id;
      let pathName = window.location.pathname;
      let pageName = pathName.slice(3, pathName.length);

      if (lang === 'en') {
        this.setState({langContent: EN});
        window.history.pushState('', '', '/en' + pageName);
      } else if (lang === 'cn') {
        this.setState({langContent: CN});
        window.history.pushState('', '', '/cn' + pageName);
      }
    }
  });

  ReactDOM.render(<Page />, document.getElementById('page'));
});
