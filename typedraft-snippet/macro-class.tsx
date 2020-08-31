export class ClassTest { }


/**
 * put important method first
 */
<ClassTest /> +
    function ImportMethodA() {
        console.log("in important method");
    };


/**
 * trivial
 */
<ClassTest /> +
    function constructor() {
        <TrivialInitialization />;
    };

function TrivialInitialization() {
    console.log("in trivial init");
}