export function Main() {
    console.log("hello from main");
    <ContextA />;
}

function ContextA() {
    console.log("hello from context A");
    <ContextA2 />;
}

function ContextA2() {
    console.log("hello from context A, nested");
}