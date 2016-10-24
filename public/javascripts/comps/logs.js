
var Comment = React.createClass({
    render: function() {
        return (
                <li>
                    <div className="collapsible-header">
                        <div className="row center">
                            <div className="col s2"><i className="material-icons green-text">info</i>{this.props.author}</div>
                            <div className="col s4">{this.props.tip}</div>
                            <div className="col s6">{this.props.tit}</div>
                        </div>
                    </div>
                    <div className="collapsible-body deep-orange lighten-3">
                        <p>
                            {this.props.txt}
                        </p>
                    </div>
                </li>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                    <Comment author={comment.createrfio} key={comment.id} tip={comment.typename} tit={comment.title} txt={comment.text}>
                        {/*{comment.text}*/}
                        {/*{comment.typename}*/}
                    </Comment>
            );
        });
        return (
            <ul className="collapsible popout commentList" data-collapsible="accordion">
                {commentNodes}
                </ul>
        );
    }
});

var TestBox = React.createClass({
    loadDocsFromServer: function() {
        $('#pl').html(`<div class="progress green">
      <div class="indeterminate red"></div>
  </div>`)
        $.ajax({
            url: 'http://193.124.178.232:100/wbp/orgsdocs',
            dataType: 'json',
            cache: false,
            crossDomain : true,
            success: function(data) {
                this.setState({data: data});
                $('#pl').empty();
            }.bind(this),
            error: function(xhr, status, err) {
                Materialize.toast(err.toString(), 4000, 'rounded red');
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
        // setInterval(this.loadDocsFromServer, 2000);
    },

    render: function() {
        return (
            <div className="TestBox">
                <nav className="indigo darken-3 z-depth-1">
                    <div className="nav-wrapper">
                        <div className="col s12">
                            <a className="breadcrumb navigate" href="/"> Главная</a>
                            <a className="breadcrumb navigate" href="/history"> История операций</a>
                        </div>
                    </div>
                </nav>
                <div id="pl"></div>
                <ul className="collapsible popout">
                    <li>
                        <div className="indigo darken-3 white-text  p-up">
                            <div className="row center">
                                <div className="col s2">Автор</div>
                                <div className="col s4">Тип документа</div>
                                <div className="col s6">Кратко</div>
                            </div>
                        </div>
                        </li>
                </ul>
                    {/*<div className="row">*/}
                        {/*<div className="col s12 tab_h">*/}
                            {/*<div className="col s2">Автор</div>*/}
                            {/*<div className="col s4">Тип документа</div>*/}
                            {/*<div className="col s6">Кратко</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    <CommentList data={this.state.data} />
        </div>
        );
    }
});

function InitLogs() {
    ReactDOM.render(
        <TestBox />,
        document.getElementById('logs')
    );
    $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
}
