// with bind method
<button onClick={DetailsPopUp.bind(this, item)}>button</button>;

// without bind method
<button onClick={() => DetailsPopUp(item)}>button</button>;
