/*!
 * Created by Rex Wang on Sept. 14, 2016
 * app.js, kicks off the app.
 */

define([
  'jquery',
  'react',
  'react-dom'
], function($, React, ReactDOM) {

  var api = 'http://jsonplaceholder.typicode.com';

  var CommentForm = React.createClass({displayName: "CommentForm",
    getInitialState: function() {
      return {author: '', text: ''};
    },
    handleAuthorChange: function(e) {
      this.setState({author: e.target.value});
    },
    handleTextChange: function(e) {
      this.setState({text: e.target.value})
    },
    handleSubmit: function(e) {
      e.preventDefault();
      var author = this.state.author.trim();
      var text = this.state.text.trim();
      if (!text || !author) {
        return;
      }
      this.props.onCommentSubmit({author: author, text: text});
      this.setState({author: '', text: ''});
    },
    render: function() {
      return (
          React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
            React.createElement("input", {
                type: "text", 
                placeholder: "Your name", 
                value: this.state.author, 
                onChange: this.handleAuthorChange}
            ), 
            React.createElement("input", {
                type: "text", 
                placeholder: "Say something...", 
                value: this.state.text, 
                onChange: this.handleTextChange}
            ), 
            React.createElement("input", {type: "submit", value: "Post"})
          )
      );
    }
  });


  var CommentBox = React.createClass({displayName: "CommentBox",
    getInitialState: function() {
      return {data: []};
    },
    handleCommentSubmit: function(comment) {
      // TODO: submit to the server and refresh the list
      console.log(comment);
    },
    loadCommentsFromServer: function() {
      $.ajax({
        url: this.props.api,
        dataType: 'json',
        cache: false,
        success: function(data) {
          // The key to dynamic updates.
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    // componentDidMount is a method called automatically by React
    // after a component is rendered for the first time.
    componentDidMount: function() {
      this.loadCommentsFromServer();
      // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },

    render: function() {
      return (
          React.createElement("div", {className: "commentBox"}, 
            React.createElement("h1", null, this.state.data.title), 
            React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
          )
      );
    }
  });

  ReactDOM.render(
      React.createElement(CommentBox, {api: api + '/posts/1', pollInterval: 2000}),
      document.getElementById('example')
  );

});
