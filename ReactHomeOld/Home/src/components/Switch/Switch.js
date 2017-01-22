var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react'], function (require, exports, React) {
    var Switch = (function (_super) {
        __extends(Switch, _super);
        function Switch(props) {
            _super.call(this, props);
            this.state = { value: this.props.value };
            this.onClick = this.onClick.bind(this);
        }
        Switch.prototype.onClick = function () {
            var value = !this.state.value;
            this.props.onChange(this.props.id, value);
        };
        Switch.prototype.componentWillReceiveProps = function (nextProps) {
            if (nextProps.value != this.state.value) {
                this.setState({
                    value: nextProps.value
                });
            }
        };
        Switch.prototype.render = function () {
            var classNames = 'btn btn-sm Switch';
            if (this.state.value) {
                classNames += ' btn-primary';
            }
            else {
                classNames += ' btn-default';
            }
            return (React.createElement("a", {"className": classNames, "onClick": this.onClick}, React.createElement("i", {"className": "glyphicon glyphicon-off"})));
        };
        return Switch;
    })(React.Component);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Switch;
});
//# sourceMappingURL=Switch.js.map