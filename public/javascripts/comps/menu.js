class _MenuItems extends React.Component{
    constructor() {
        super();
    }

    handleClick(event) {
        const {id} = event.target;
    }

    render() {
        return (
            <li><a href={this.props.apiurl} className="navigate"><i className="material-icons">{this.props.icon}</i>{this.props.ptitle}</a></li>
        );
    };
}

class _MenuHeader extends React.Component {
    constructor() {
        super();
    }

    render() {
    var menuItems = this.props.data.data.map(function (mitems) {
        return (
            <Items ptitle={mitems.ptitle} apiurl={mitems.apiurl} icon={mitems.icon} >
            </Items>
        );
    });

    return(
                <ul className="collapsible popout commentList" data-collapsible="accordion">
                {menuItems}
                </ul>
            )
    ;
}
}


class Menu extends React.Component{
    constructor() {
        super();
        // this.onClick = this.handleClick.bind(this);
    }

    GetMenuFromServer() {
        $.ajax({
                url: 'http://193.124.178.232:100/wbp/menu',
                dataType: 'json',
                cache: false,
                crossDomain : true,
                success: function(data) {
                    this.setState({data: data});
                    console.log(data.data.sort(function(a,b){return a.orderby-b.orderby;}));
                    $('#pl').empty();
                }.bind(this),
                error: function(xhr, status, err) {
                    Materialize.toast(err.toString(), 4000, 'rounded red');
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
    }

    componentDidMount() {
        this.GetMenuFromServer();
        //Подгружаются все документы с интервалом
        // setInterval(this.loadDocsFromServer, 2000);
    }

    render() {
        return(
            <div>
                <li><a className="navigate" href="/history">First Sidebar Link</a></li>
                <li><a href="#!">Second Sidebar Link</a></li>
                <li className="no-padding">
                    <ul className="collapsible collapsible-accordion">
                        <li>
                            <a className="collapsible-header">Dropdown<i className="material-icons">arrow_drop_down</i></a>
                            <div className="collapsible-body">
                                <ul>
                                    <li><a href="#!">First</a></li>
                                    <li><a href="#!">Second</a></li>
                                    <li><a href="#!">Third</a></li>
                                    <li><a href="#!">Fourth</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </li>
            </div>
        )
    }
}

function InitMenu() {
    ReactDOM.render(
        <_MenuHeader />,
        document.getElementById('mmenu')
    );
    $("#button-collapse").sideNav();
    $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    Init.Navigation();

}