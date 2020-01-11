enum Type
{
    Type1,
    Type2
}

export function Main(value: any)
{
    <Match />;
}

function Match(value: any)
{
    "use match";

    (value: "a") =>
    {
        console.log("value is a");
    };

    (value: "a" | "b" | "c") =>
    {
        console.log("value is ...");
    };

    (value: 1) =>
    {
        <HandleValueIsNumber />;
    };

    (value: Type.Type1) =>
    {
        console.log("value is type1");
    };

    () =>
    {
        console.log("default here");
    };
}

/*
we can keep case in Match clear and concise in this way:
*/
function HandleValueIsNumber()
{
    console.log("value is 1");
    console.log("value is 1");
    console.log("value is 1");
    console.log("value is 1");
    console.log("value is 1");
    console.log("value is 1");
    console.log("value is 1");
    console.log("value is 1");
    console.log("value is 1");
    console.log("value is 1");
    console.log("value is 1");
}
