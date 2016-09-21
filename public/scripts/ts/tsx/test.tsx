class MyComponent {
    render() {}
}

// use a construct signature
var myComponent = new MyComponent();

// element class type => MyComponent
// element instance type => { render: () => void }

function MyFactoryFunction() {
    return {
        render: () => {
        }
    }
}

// use a call signature
var myComponent = MyFactoryFunction();