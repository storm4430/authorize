
var Comment = React.createClass({
    render: function() {
        return (
                <tr className="doc">
                    <td>{this.props.author}</td>
                    <td>{this.props.tip}</td>
                    <td>{this.props.tit}</td>
                </tr>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                    <Comment author={comment.createrfio} key={comment.id} tip={comment.typename} tit={comment.title}>
                        {/*{comment.text}*/}
                        {/*{comment.typename}*/}
                    </Comment>
            );
        });
        return (
            <tbody className="commentList">
                {commentNodes}
            </tbody>
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
                <table className="highlight bordered">
                    <thead>
                        <tr>
                            <th>Автор</th>
                            <th>Тип</th>
                            <th>Кратко</th>
                        </tr>
                    </thead>
                    <CommentList data={this.state.data} />
                </table>
        </div>
        );
    }
});
ReactDOM.render(
<TestBox />,
    document.getElementById('logs')
);
