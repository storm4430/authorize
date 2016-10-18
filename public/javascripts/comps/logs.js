
var TestBox = React.createClass({
    render: function() {
        return (
            <div className="TestBox">
            Hello, world! I am a TestBox.
        </div>
        );
    }
});
ReactDOM.render(
<TestBox />,
    document.getElementById('logs')
);
