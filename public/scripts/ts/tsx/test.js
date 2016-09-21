var MyComponent = (function () {
    function MyComponent() {
    }
    MyComponent.prototype.render = function () { };
    return MyComponent;
})();
// use a construct signature
var myComponent = new MyComponent();
// element class type => MyComponent
// element instance type => { render: () => void }
function MyFactoryFunction() {
    return {
        render: function () {
        }
    };
}
// use a call signature
var myComponent = MyFactoryFunction();
//# sourceMappingURL=test.js.map