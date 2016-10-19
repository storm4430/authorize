
var Comment = React.createClass({
    render: function() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        return (
            <div className="commentList">
                <Comment author="Pete Hunt">This is one comment</Comment>
                <Comment author="Jordan Walke">This is *another* comment</Comment>
            </div>
        );
    }
});

var TestBox = React.createClass({
    loadDocsFromServer: function() {
        $.ajax({
            url: 'http://193.124.178.232:100/wbp/doclist',
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log(data);
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadDocsFromServer();
        //Подгружаются все документы с интервалом
        //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },

    render: function() {
        return (
            <div className="TestBox">
                <h1>Документы</h1>
                <CommentList data={this.state.data} />
        </div>
        );
    }
});
ReactDOM.render(
<TestBox />,
    document.getElementById('logs')
);
