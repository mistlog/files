/*
local context is function that used as standalone jsx element
 */
export function Main()
{
    <ContextA />;
    <ContextB />;
}

function ContextA()
{
    console.log("in context A");
    <NestedA1 />;
}

function ContextB()
{
    console.log("in context B");
}

/*
context can be nested
*/
function NestedA1()
{
    console.log("in context A1");
    <NestedA11 />;
}

function NestedA11()
{
    console.log("in context A11");
}