export function Main() {
    console.log("hello from main");
    <ContextA />;
}

function ContextA() {
    console.log("hello from context A");
}