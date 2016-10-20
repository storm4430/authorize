
var Comment = React.createClass({
    render: function() {
        return (
            <div className="comment">
                <table>
                    <thead>
                        <tr>
                            <th>Автор</th>
                            <th>Тип</th>
                            <th>Кратко</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {this.props.author}
                        </tr>
                    </tbody>
                </table>
                {/*<h2 className="commentAutho23r">*/}
                    {/*{this.props.author}*/}
                {/*</h2>*/}
                {/*{this.props.children}*/}
            </div>
        );
    }
});

// tutorial10.js
var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.createrfio} key={comment.id}>
                    {/*{comment.text}*/}
                    {/*{comment.typename}*/}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var TestBox = React.createClass({
    loadDocsFromServer: function() {
        $.ajax({
            url: 'http://193.124.178.232:100/wbp/orgsdocs',
            dataType: 'json',
            cache: false,
            crossDomain : true,
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
                <h2>Документы</h2>
                <CommentList data={this.state.data} />
        </div>
        );
    }
});
ReactDOM.render(
<TestBox />,
    document.getElementById('logs')
);
